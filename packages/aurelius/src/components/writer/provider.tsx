import type { Editor } from '@tiptap/react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext } from 'react'
import { WritingSession, WritingSessionGoal } from '../../types'

export const AureliusContext = createContext({})

export interface AureliusProviderData {
	content?: string
	setContent?: Dispatch<SetStateAction<string>>
	editor?: Editor | null
	focusMode?: boolean
	setFocusMode?: Dispatch<SetStateAction<boolean>>
	isMusicPlaying?: boolean
	setIsMusicPlaying?: Dispatch<SetStateAction<boolean>>
	isSaving?: boolean
	setIsSaving?: Dispatch<SetStateAction<boolean>>
	notifyOnSessionEnd?: boolean
	setNotifyOnSessionEnd?: Dispatch<SetStateAction<boolean>>
	sessionData?: WritingSession | null
	setSessionData?: Dispatch<SetStateAction<WritingSession | null>>
	sessionFocusMode?: boolean
	setSessionFocusMode?: Dispatch<SetStateAction<boolean>>
	sessionGoal?: WritingSessionGoal
	setSessionGoal?: Dispatch<SetStateAction<WritingSessionGoal>>
	sessionMusic?: boolean
	setSessionMusic?: Dispatch<SetStateAction<boolean>>
	sessionTarget?: number
	setSessionTarget?: Dispatch<SetStateAction<number>>
	showAboutDialog?: boolean
	setShowAboutDialog?: Dispatch<SetStateAction<boolean>>
	showNewSessionDialog?: boolean
	setShowNewSessionDialog?: Dispatch<SetStateAction<boolean>>
	showResetAlert?: boolean
	setShowResetAlert?: Dispatch<SetStateAction<boolean>>
	showSettingsDialog?: boolean
	setShowSettingsDialog?: Dispatch<SetStateAction<boolean>>
	title?: string
	setTitle?: Dispatch<SetStateAction<string>>
	wordCount?: number
	setWordCount?: Dispatch<SetStateAction<number>>
}

interface AureliusProviderProps {
	children: ReactNode
	data: AureliusProviderData
}

export default function AureliusProvider({
	children,
	data,
}: AureliusProviderProps) {
	return (
		<AureliusContext.Provider value={data}>
			{children}
		</AureliusContext.Provider>
	)
}
