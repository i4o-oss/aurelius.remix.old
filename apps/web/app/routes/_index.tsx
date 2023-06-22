import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import type { SyncParams, WriterUpdate } from '@aurelius/writer'
import { useEffect, useRef, useState } from 'react'
import {
    SETTINGS_LOCAL_STORAGE_KEY,
    SettingsData,
    Writer,
} from '@aurelius/writer'
import { useFetcher, useFetchers, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'
import Settings from '~/components/settings'
import { Theme, useTheme } from '~/lib/theme'
import { auth } from '~/services/auth.server'
import { getPostByShareId } from '~/models/post.server'
import {
    GUEST_LATEST_POST_ID_LS_KEY,
    USER_LATEST_POST_ID_LS_KEY,
} from '~/lib/constants'
import { getUserProfile } from '~/models/user.server'
import { getSettingsFromUserId } from '~/models/settings.server'
import useIDBPost from '~/lib/hooks/use-idb-post'

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

// TODO: fix these types
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
    const [latestGuestPostId] = useLocalStorage<string>(
        GUEST_LATEST_POST_ID_LS_KEY
    )
    const { create, post: localPost, update: updatePost } = useIDBPost(latestGuestPostId as string)
    const [settings] = useLocalStorage<string>(SETTINGS_LOCAL_STORAGE_KEY)
    const settingsData =
        user && settingsFromDb
            ? settingsFromDb
            : (JSON.parse(JSON.stringify(settings)) as SettingsData)
    const [localPostId, setLocalPostId] = useState(latestGuestPostId || '')
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
                writeStorage(USER_LATEST_POST_ID_LS_KEY, record.current.id)
            }
        }
    }

    useEffect(() => {
        if (
            fetcher.state === 'loading' &&
            fetcher.data?.message === 'success' &&
            fetcher.formMethod === 'POST'
        ) {
            saveAs(fetcher.data?.url, fetcher.data?.name)
        }
    }, [fetcher])

    useEffect(() => {
        if (localPostId) {
            if (user) {
                writeStorage(USER_LATEST_POST_ID_LS_KEY, localPostId)
            } else {
                writeStorage(GUEST_LATEST_POST_ID_LS_KEY, localPostId)
            }
        }
    }, [localPostId])

    const saveAs = (uri: string, filename: string) => {
        const link = document.createElement('a')

        if (typeof link.download === 'string') {
            link.href = uri
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            window.open(uri)
        }
    }

    function exportPost(data: any) {
        fetcher.submit(
            { ...data },
            {
                method: 'post',
                action: '/api/export/image',
            }
        )
    }

    // TODO: refactor all functions that save and load stuff from/to planetscale/indexeddb
    // so that only the remix app does the saving and loading operations
    // the writer package should only handle writing and should pass all data that should
    // be saved and loaded to the remix app
    function savePostToDatabase({ title, content, wordCount }: WriterUpdate) {
        if (wordCount > 1) {
            if (post?.id) {
                fetcher.submit(
                    { title, content, wordCount: `${wordCount}` },
                    {
                        method: 'put',
                        action: `/api/posts/${post.id}`,
                    }
                )
                setLocalPostId(`${post.id}`)
            } else if (record.current.id) {
                fetcher.submit(
                    { title, content, wordCount: `${wordCount}` },
                    {
                        method: 'put',
                        action: `/api/posts/${record.current.id}`,
                    }
                )
                setLocalPostId(record.current.id)
            } else {
                fetcher.submit(
                    {
                        title: title || 'Untitled Post',
                        content,
                        wordCount: `${wordCount}`,
                    },
                    { method: 'post', action: '/api/posts' }
                )
            }
        }
    }

    async function savePostToLocal(update: WriterUpdate) {
        if (!localPostId) {
            const postId = await create(update)
            setLocalPostId(postId)
        } else {
            updatePost(localPostId, update)
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

    // function syncLocallySavedData({ post, writingSessions }: SyncParams) {
    //     fetcher.submit(
    //         {
    //             post: post as string,
    //             writingSessions: writingSessions as string,
    //         },
    //         {
    //             method: 'post',
    //             action: '/api/sync',
    //         }
    //     )
    // }

    function toggleTheme() {
        setTheme((prevTheme) =>
            prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        )
    }

    return (
        <main className='flex h-full w-full flex-col items-center justify-start'>
            <Writer
                exportPost={exportPost}
                post={user ? post : localPost}
                savePostToDatabase={savePostToDatabase}
                savePostToLocal={savePostToLocal}
                saveWritingSession={saveWritingSession}
                showSettingsDialog={showSettingsDialog}
                settingsFromDb={settingsFromDb}
                setShowSettingsDialog={setShowSettingsDialog}
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
