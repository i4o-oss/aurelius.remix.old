import type { LoaderArgs } from '@remix-run/node'
import { useRef } from 'react'
import { Writer } from '@i4o/aurelius'
import { useFetcher, useFetchers, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { writeStorage } from '@rehooks/local-storage'
import { Theme, useTheme } from '~/lib/theme'
import { auth } from '~/services/auth.server'
import { getPostByShareId } from '~/models/post.server'
import { POST_ID_LOCAL_STORAGE_KEY } from '~/lib/constants'

export async function loader({ request }: LoaderArgs) {
	const url = new URL(request.url)
	const shareId = url.searchParams.get('edit')
	let user = await auth.isAuthenticated(request)
	if (user && shareId) {
		const post = await getPostByShareId(shareId)
		return json({ post, user })
	} else {
		return json({ user })
	}
}

export default function Write() {
	const writerFetcher = useFetcher()
	const fetchers = useFetchers()
	// @ts-ignore
	const { post, user } = useLoaderData<typeof loader>()
	const [theme, setTheme] = useTheme()

	// using useRef for storing the post id
	// since we don't want to re-render when we get the post id back on the first save
	// also, on re-render the state seems to lose it's value
	let record = useRef({
		id: '',
	})
	if (user && !record.current.id) {
		for (const f of fetchers) {
			if (
				f.formAction &&
				f.formAction.startsWith('/api/posts') &&
				f.data
			) {
				record.current.id = f.data.id
				writeStorage(POST_ID_LOCAL_STORAGE_KEY, record.current.id)
			}
		}
	}

	function savePost(title: string, content: string, wordCount: number) {
		if (title && wordCount > 1) {
			if (record.current.id) {
				writerFetcher.submit(
					{ title, content, wordCount: `${wordCount}` },
					{
						method: 'put',
						action: `/api/posts/${record.current.id}`,
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
				post={post}
				savePost={savePost}
				theme={theme as Theme}
				toggleTheme={toggleTheme}
				user={user}
			/>
		</main>
	)
}
