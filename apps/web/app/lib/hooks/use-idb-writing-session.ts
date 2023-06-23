import { WritingSession } from '@aurelius/writer'
import { nanoid } from 'nanoid/async'
import { useCallback } from 'react'
import { writingSessionStore } from '../local.client'

export default function useIDBWritingSession() {
    const create = useCallback(async (writingSession: WritingSession) => {
        const id = await nanoid(16)
        await writingSessionStore.setItem(id, writingSession)
        return id
    }, [])

    const read = useCallback(async (id: string) => {
        const writingSession = await writingSessionStore.getItem(id)
        return writingSession
    }, [])

    const update = useCallback((id: string, writingSession: WritingSession) => {
        writingSessionStore.setItem(id, writingSession)
    }, [])

    return {
        create,
        read,
        update,
    }
}
