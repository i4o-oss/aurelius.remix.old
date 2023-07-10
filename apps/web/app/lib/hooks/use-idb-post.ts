import { nanoid } from 'nanoid/async'
import { useCallback, useEffect, useRef, useState } from 'react'
import { postStore } from '../local.client'

interface LocalPost {
    id?: string
    title: string
    content: string
    wordCount: number
    createdAt: Date
    updatedAt?: Date
}

export default function useIDBPost(id = '') {
    const [posts, setPosts] = useState<LocalPost[]>([])
    const postRef = useRef<LocalPost>()

    useEffect(() => {
        async function readAllPosts() {
            const localPosts: LocalPost[] = []
            await postStore.iterate(
                (value: LocalPost, key: string) => {
                    localPosts.push({
                        id: key,
                        ...value,
                    })
                }
            )
            const sortedLocalPosts = localPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            setPosts(sortedLocalPosts)
        }

        readAllPosts().then(() => { })
    }, [])

    useEffect(() => {
        async function readPostById() {
            const post = await postStore.getItem(id)
            if (post) {
                postRef.current = post as LocalPost
            } else {
                postRef.current = { title: '', content: '', wordCount: 0, createdAt: new Date() }
            }
        }

        if (id) {
            readPostById().then(() => { })
        }
    }, [id])

    const create = useCallback(
        async (post: LocalPost) => {
            const id = await nanoid(16)
            const data = {
                ...post,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            await postStore.setItem(id, data)
            postRef.current = data
            return id
        },
        [postRef]
    )

    const read = useCallback(async (id: string) => {
        const post = await postStore.getItem(id)
        return post
    }, [])

    const update = useCallback(
        async (id: string, post: LocalPost) => {
            const data = Object.assign({}, postRef.current, post, {
                updatedAt: new Date(),
            })
            await postStore.setItem(id, data)
            postRef.current = data
        },
        [postRef]
    )

    const remove = useCallback(async (id: string) => {
        await postStore.removeItem(id)
    }, [])

    return {
        create,
        read,
        remove,
        update,
        posts,
        post: postRef.current,
    }
}
