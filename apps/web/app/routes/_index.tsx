import { Writer } from '@i4o/aurelius'
import type { LoaderArgs } from '@remix-run/node'
import { useFetcher, useFetchers, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { Theme, useTheme } from '~/lib/theme'
import { auth } from '~/services/auth.server'
import { useRef } from 'react'

export async function loader({ request }: LoaderArgs) {
	let user = await auth.isAuthenticated(request)
	return json({ user })
}

export default function Write() {
	const writerFetcher = useFetcher()
	const fetchers = useFetchers()
	const { user } = useLoaderData<typeof loader>()
	const [theme, setTheme] = useTheme()

	// using useRef for storing the post id
	// since we don't want to re-render when we get the post id back on the first save
	// also, on re-render the state seems to lose it's value
	let post = useRef({
		id: '',
	})
	if (user && !post.current.id) {
		for (const f of fetchers) {
			if (
				f.formAction &&
				f.formAction.startsWith('/api/posts') &&
				f.data
			) {
				post.current.id = f.data.id
			}
		}
	}

	function savePost(title: string, content: string, wordCount: number) {
		if (title && wordCount > 1) {
			if (post.current.id) {
				writerFetcher.submit(
					{ title, content, wordCount: `${wordCount}` },
					{
						method: 'put',
						action: `/api/posts/${post.current.id}`,
					}
				)
			} else {
				writerFetcher.submit(
					{ title, content, wordCount: `${wordCount}` },
					{ method: 'post', action: '/api/posts' }
				)
			}
		}
	}

	function toggleTheme() {
		setTheme((prevTheme) =>
			prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		)
	}

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Writer
				savePost={savePost}
				theme={theme as Theme}
				toggleTheme={toggleTheme}
				user={user}
			/>
		</main>
	)
}
