import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import type { WriterUpdate, WritingSession } from '@aurelius/writer'
import { useEffect, useRef, useState } from 'react'
import {
    LOCAL_STORAGE_KEYS,
    SettingsData,
    Writer,
} from '@aurelius/writer'
import { useFetcher, useFetchers, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'
import Settings from '~/components/settings'
import { Theme, useTheme } from '~/lib/theme'
import { auth } from '~/services/auth.server'
import { getPostByShareId, Post } from '~/models/post.server'
import {
    GUEST_LATEST_POST_ID_LS_KEY,
    USER_LATEST_POST_ID_LS_KEY,
} from '~/lib/constants'
import { getUserProfile } from '~/models/user.server'
import { getSettingsFromUserId } from '~/models/settings.server'
import useIDBPost from '~/lib/hooks/use-idb-post'
import useIDBWritingSession from '~/lib/hooks/use-idb-writing-session'

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url)
    const id = url.searchParams.get('edit')
    let user = await auth.isAuthenticated(request)
    if (user && id) {
        const post = await getPostByShareId(id)
        const profile = await getUserProfile(user?.id)
        const settings = await getSettingsFromUserId(user?.id)
        return json({ post, settings, user: profile })
    } else if (user) {
        const profile = await getUserProfile(user?.id)
        const settings = await getSettingsFromUserId(user?.id)
        return json({ settings, user: profile })
    } else {
        return json({ id })
    }
}

// TODO: fix these types
interface LoaderData {
    id?: string
    post?: Post
    settings?: any
    user?: any
}

export default function Write() {
    const fetchers = useFetchers()
    const fetcher = useFetcher()
    const {
        id,
        post,
        settings: settingsFromDb,
        user,
    } = useLoaderData<SerializeFrom<LoaderData>>()
    const postData: WriterUpdate = {
        title: post?.title || '',
        content: post?.content || '',
        wordCount: post?.wordCount || 0
    }
    const [latestGuestPostId] = useLocalStorage<string>(
        GUEST_LATEST_POST_ID_LS_KEY
    )
    const {
        create: createPost,
        post: localPost,
        update: updatePost,
    } = useIDBPost(id || latestGuestPostId as string)
    const { create: createWritingSession } = useIDBWritingSession()
    const [settings] = useLocalStorage<string>(LOCAL_STORAGE_KEYS.GUEST_SETTINGS)
    const settingsData =
        user && settingsFromDb
            ? settingsFromDb
            : (JSON.parse(JSON.stringify(settings)) as SettingsData)
    const localPostId = useRef<string>(id || latestGuestPostId || '')
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
        if (localPostId.current) {
            if (user) {
                writeStorage(USER_LATEST_POST_ID_LS_KEY, localPostId.current)
            } else {
                writeStorage(GUEST_LATEST_POST_ID_LS_KEY, localPostId.current)
            }
        }
    }, [localPostId.current])

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

    function reset() {
        localPostId.current = ''
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
                localPostId.current = `${post.id}`
            } else if (record.current.id) {
                fetcher.submit(
                    { title, content, wordCount: `${wordCount}` },
                    {
                        method: 'put',
                        action: `/api/posts/${record.current.id}`,
                    }
                )
                localPostId.current = record.current.id
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
        if (localPostId.current) {
            updatePost(localPostId.current, update)
        } else {
            const postId = await createPost(update)
            localPostId.current = postId
        }
    }

    function saveWritingSessionToDatabase(writingSession: WritingSession) {
        fetcher.submit(
            {
                goal: writingSession.goal,
                target: `${writingSession.target}`,
                duration: `${writingSession.duration}`,
                result: `${writingSession.result}`,
                startingWordCount: `${writingSession.startingWordCount}`,
                endingWordCount: `${writingSession.endingWordCount}`,
            },
            {
                method: 'post',
                action: '/api/sessions',
            }
        )
    }

    async function saveWritingSessionToLocal(writingSession: WritingSession) {
        await createWritingSession(writingSession)
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
                post={localPost || postData}
                reset={reset}
                savePostToDatabase={savePostToDatabase}
                savePostToLocal={savePostToLocal}
                saveWritingSessionToDatabase={saveWritingSessionToDatabase}
                saveWritingSessionToLocal={saveWritingSessionToLocal}
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
