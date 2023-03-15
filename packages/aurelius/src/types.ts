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

export interface WriterProps {
	content: string
	setContent: Dispatch<SetStateAction<string>>
	focusMode: boolean
	isSaving: boolean
	title: string
	setTitle: Dispatch<SetStateAction<string>>
	wordCount: number
	setWordCount: Dispatch<SetStateAction<number>>
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
