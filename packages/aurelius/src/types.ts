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
	content: string
	setContent: Dispatch<SetStateAction<string>>
	setTitle: Dispatch<SetStateAction<string>>
	setWordCount: Dispatch<SetStateAction<number>>
}
