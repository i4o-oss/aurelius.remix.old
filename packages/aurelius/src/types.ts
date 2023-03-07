import type { Dispatch, SetStateAction } from 'react'
import type { Editor } from '@tiptap/core'

export interface EditorToolbarProps {
	editor: Editor | null
}

export interface FloatingMenuProps {
	fileUploadInputRef: any
}

export interface FooterProps {
	focusMode: boolean
	isSaving?: boolean
	wordCount: number
}

export interface EditorToolbarProps {
	editor: Editor | null
}

export interface TipTapProps {
	editor: Editor | null
	setContent: Dispatch<SetStateAction<string>>
	setTitle: Dispatch<SetStateAction<string>>
	setWordCount: Dispatch<SetStateAction<number>>
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
