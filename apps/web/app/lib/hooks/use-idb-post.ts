import { nanoid } from 'nanoid/async'
import { useCallback, useEffect, useRef } from 'react'
import { postStore } from '../local.client'

interface LocalPost {
    title: string
    content: string
    wordCount: number
}

export default function useIDBPost(id = '') {
    const postRef = useRef<LocalPost>()

    useEffect(() => {
        async function readPostById() {
            const post = await postStore.getItem(id)
            if (post) {
                postRef.current = post as LocalPost
            }
        }

        if (id) {
            readPostById().then(() => {})
        }
    }, [id])

    const create = useCallback(
        async (post: LocalPost) => {
            const id = await nanoid(16)
            await postStore.setItem(id, post)
            postRef.current = post
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
            postStore.setItem(id, post)
            postRef.current = post
        },
        [postRef]
    )

    return {
        create,
        read,
        update,
        post: postRef.current,
    }
}
