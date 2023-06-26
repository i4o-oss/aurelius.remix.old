import { nanoid } from 'nanoid/async'
import { useCallback, useEffect, useRef } from 'react'
import { postStore } from '../local.client'

interface LocalPost {
    title: string
    content: string
    wordCount: number
    createdAt?: Date
    updatedAt?: Date
}

export default function useIDBPost(id = '') {
    const posts = useRef<LocalPost[]>()
    const postRef = useRef<LocalPost>()

    useEffect(() => {
        async function readAllPosts() {
            const localPosts: any[] = []
            await postStore.iterate(
                (value: LocalPost, key: string, index: number) => {
                    localPosts.push({
                        id: key,
                        ...value,
                    })
                }
            )
            posts.current = localPosts
        }

        readAllPosts().then(() => {})
    }, [])

    useEffect(() => {
        async function readPostById() {
            const post = await postStore.getItem(id)
            if (post) {
                postRef.current = post as LocalPost
            } else {
                postRef.current = { title: '', content: '', wordCount: 0 }
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
                updatedAt: new Date()
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
        (id: string, post: LocalPost) => {
            const data = {
                ...post,
                ...postRef.current,
                updatedAt: new Date()
            }
            postStore.setItem(id, data)
            postRef.current = data
        },
        [postRef]
    )

    return {
        create,
        read,
        update,
        posts: posts.current,
        post: postRef.current,
    }
}
