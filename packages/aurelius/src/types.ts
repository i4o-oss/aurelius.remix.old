import type { Dispatch, SetStateAction } from 'react'
import type { Editor } from '@tiptap/core'

export interface EditorToolbarProps {
	editor: Editor | null
}

export interface FloatingMenuProps {
	fileUploadInputRef: any
}

export interface EditorToolbarProps {
	editor: Editor | null
}

export interface SyncParams {
	post?: string
	writingSessions?: string
}

export interface WriterProps {
	post?: { title: string; content: string }
	savePost: (title: string, content: string, wordCount: number) => void
	saveWritingSession: (WritingSession: string) => void
	showSettingsDialog?: boolean
	settingsFromDb?: SettingsData
	setShowSettingsDialog?: Dispatch<SetStateAction<boolean>>
	sync: (params: SyncParams) => void
	theme: Theme
	toggleTheme: () => void
	user: any
}

export type WritingSessionGoal = 'duration' | 'wordCount'

export interface WritingSession {
	goal: WritingSessionGoal
	target: number
	result?: number
	duration?: number
	startingWordCount: number
	endingWordCount?: number
}

export enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
}

export type TitleAlignment = 'left' | 'center'

export interface ProfileSettings {
	name?: string
	bio?: string
	username?: string
}

export type DailyGoal = 'duration' | 'wordCount'

export interface SettingsData {
    displaySplashScreen: boolean
	dailyGoal: DailyGoal
	target?: number
	musicChannel?: string
	youtubeVideo?: string
	background?: string
	footer?: string
	watermark?: boolean
	user?: ProfileSettings
}
