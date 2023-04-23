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

export type DailyGoal = 'duration' | 'wordCount'

export interface GoalSettings {
	dailyGoal: DailyGoal
	durationTarget?: number
	wordCountTarget?: number
}

export interface MusicSettings {
	musicChannel: string
	youtubeVideo?: string
}

export interface ExportSettings {
	background: string
	footer: string
}

export interface SettingsData {
	goals?: GoalSettings
	music?: MusicSettings
	export?: ExportSettings
}
