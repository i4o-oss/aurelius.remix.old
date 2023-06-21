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

export interface WriterUpdate {
    title: string
    content: string
    wordCount: number
}

export interface SyncParams {
	post?: WriterUpdate
	writingSessions?: string
}

export interface WriterProps {
	exportPost: (data: any) => void
	post?: { title: string; content: string, wordCount: number }
	savePostToDatabase: (update: WriterUpdate) => void
	savePostToLocal: (update: WriterUpdate) => void
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

// export const EventType = {
// 	NEW_POST_CLICKED: 'new_post_clicked',
// 	NEW_WRITING_SESSION_CLICKED: 'new_writing_session_clicked',
// 	WRITING_SESSION_STARTED: 'writing_session_started',
// 	WRITING_SESSION_FINISHED: 'writing_session_finished',
// 	IMAGE_EXPORTED: 'image_exported',
// 	MARKDOWN_EXPORTED: 'markdown_exported',
//     POST_PUBLISHED: 'post_published'
// } as const
//
// export type EventType = (typeof EventType)[keyof typeof EventType]

export const AmplitudeEventType = {
	POST_CREATED: 'Post Created',
	POST_PUBLISHED: 'Post Published',
	WRITING_SESSION_CLICKED: 'Writing Session Clicked',
	WRITING_SESSION_STARTED: 'Writing Session Started',
	WRITING_SESSION_FINISHED: 'Writing Session Finished',
	IMAGE_EXPORTED: 'Image Exported',
	MARKDOWN_EXPORTED: 'Markdown Exported',
} as const

export type AmplitudeEventType =
	(typeof AmplitudeEventType)[keyof typeof AmplitudeEventType]
