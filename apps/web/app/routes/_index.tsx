import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import type { SyncParams } from '@i4o/aurelius'
import { useRef, useState } from 'react'
import { SETTINGS_LOCAL_STORAGE_KEY, SettingsData, Writer } from '@i4o/aurelius'
import { useFetcher, useFetchers, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'
import Settings from '~/components/settings'
import { Theme, useTheme } from '~/lib/theme'
import { auth } from '~/services/auth.server'
import { getPostByShareId } from '~/models/post.server'
import { POST_ID_LOCAL_STORAGE_KEY } from '~/lib/constants'
import { getUserProfile } from '~/models/user.server'
import { getSettingsFromUserId } from '~/models/settings.server'

export async function loader({ request }: LoaderArgs) {
	const url = new URL(request.url)
	const shareId = url.searchParams.get('edit')
	let user = await auth.isAuthenticated(request)
	if (user && shareId) {
		const post = await getPostByShareId(shareId)
		const profile = await getUserProfile(user?.id)
		const settings = await getSettingsFromUserId(user?.id)
		return json({ post, settings, user: profile })
	} else if (user) {
		const profile = await getUserProfile(user?.id)
		const settings = await getSettingsFromUserId(user?.id)
		return json({ settings, user: profile })
	} else {
		return json({})
	}
}

// TODO: Fix these types
interface LoaderData {
	post?: any
	settings?: any
	user?: any
}

export default function Write() {
	const fetchers = useFetchers()
	const fetcher = useFetcher()
	const {
		post,
		settings: settingsFromDb,
		user,
	} = useLoaderData<SerializeFrom<LoaderData>>()
	const [settings] = useLocalStorage<string>(SETTINGS_LOCAL_STORAGE_KEY)
	const settingsData =
		user && settingsFromDb
			? settingsFromDb
			: (JSON.parse(JSON.stringify(settings)) as SettingsData)
	const [showSettingsDialog, setShowSettingsDialog] = useState(false)
	const [theme, setTheme] = useTheme()

	// using useRef for storing the post id
	// since we don't want to re-render when we get the post id back on the first save
	// also, on re-render the state seems to lose it's value
	let record = useRef({
		id: '',
	})
	if (user && !record.current.id && !post) {
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
			if (post?.id) {
				fetcher.submit(
					{ title, content, wordCount: `${wordCount}` },
					{
						method: 'put',
						action: `/api/posts/${post.id}`,
					}
				)
			} else if (record.current.id) {
				fetcher.submit(
					{ title, content, wordCount: `${wordCount}` },
					{
						method: 'put',
						action: `/api/posts/${record.current.id}`,
					}
				)
			} else {
				fetcher.submit(
					{ title, content, wordCount: `${wordCount}` },
					{ method: 'post', action: '/api/posts' }
				)
			}
		}
	}

	function saveWritingSession(writingSession: string) {
		fetcher.submit(
			{
				writingSession,
			},
			{
				method: 'post',
				action: '/api/sessions',
			}
		)
	}

	function syncLocallySavedData({ post, writingSessions }: SyncParams) {
		fetcher.submit(
			{
				post: post as string,
				writingSessions: writingSessions as string,
			},
			{
				method: 'post',
				action: '/api/sync',
			}
		)
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
				saveWritingSession={saveWritingSession}
				showSettingsDialog={showSettingsDialog}
				settingsFromDb={settingsFromDb}
				setShowSettingsDialog={setShowSettingsDialog}
				sync={syncLocallySavedData}
				theme={theme as Theme}
				toggleTheme={toggleTheme}
				user={user}
			/>
			<Settings
				settings={settingsData}
				showSettingsDialog={showSettingsDialog}
				setShowSettingsDialog={setShowSettingsDialog}
				user={user}
			/>
		</main>
	)
}
