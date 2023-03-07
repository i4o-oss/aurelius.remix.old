import type { TipTapProps } from '../../types'
import { useEffect, useRef } from 'react'
import { BubbleMenu, EditorContent, FloatingMenu } from '@tiptap/react'
import { useLocalStorage } from '@rehooks/local-storage'
import { POST_LOCAL_STORAGE_KEY } from '../../constants'
import EditorToolbar from './editor-toolbar'
import ImageToolbar from './image-toolbar'
import EditorFloatingMenu from './floating-menu'

export default function TipTap({
	editor,
	setContent,
	setTitle,
	setWordCount,
}: TipTapProps) {
	const [localPost] = useLocalStorage(POST_LOCAL_STORAGE_KEY)
	const fileUploadInputRef = useRef(null)

	useEffect(() => {
		if (editor && localPost) {
			loadLocalPost()
		}
	}, [editor, localPost])

	function updateEditorWordCount(content: string) {
		const wordCount = content.split(' ').length
		setWordCount(wordCount)
	}

	function loadLocalPost() {
		if (editor && localPost) {
			const { title, content } = JSON.parse(JSON.stringify(localPost))

			setTitle(title)
			setContent(content)

			if (editor.isEmpty) {
				editor.commands.setContent(content)
				updateEditorWordCount(editor.state.doc.textContent)
			}
		}
	}

	// @ts-ignore
	const uploadImage = async (event) => {
		const file = event.target.files[0]

		if (file) {
			const formData = new FormData()
			formData.append('image', file)
		}
	}

	let activeToolbar = null
	if (editor?.isActive('super-image')) {
		activeToolbar = <ImageToolbar editor={editor} />
	} else if (
		!editor?.isActive('super-image') &&
		!editor?.isActive('video-embed') &&
		!editor?.isActive('visual-bookmark')
	) {
		activeToolbar = <EditorToolbar editor={editor} />
	}

	return (
		<div className='editor-wrapper flex h-auto min-h-max w-full items-start justify-center pb-12'>
			{editor && (
				<>
					<BubbleMenu editor={editor}>{activeToolbar}</BubbleMenu>
					<FloatingMenu editor={editor}>
						<EditorFloatingMenu
							fileUploadInputRef={fileUploadInputRef}
						/>
						<input
							accept='image/*'
							className='hidden'
							multiple={false}
							onChange={uploadImage}
							ref={fileUploadInputRef}
							type='file'
						/>
					</FloatingMenu>
				</>
			)}
			<EditorContent editor={editor} />
		</div>
	)
}
