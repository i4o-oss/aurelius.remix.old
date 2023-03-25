import { useContext, useEffect, useRef } from 'react'
import { BubbleMenu, EditorContent, FloatingMenu } from '@tiptap/react'
import { useLocalStorage } from '@rehooks/local-storage'
import { POST_LOCAL_STORAGE_KEY } from '../../constants'
import EditorToolbar from './editor-toolbar'
import ImageToolbar from './image-toolbar'
import EditorFloatingMenu from './floating-menu'
import { AureliusContext, AureliusProviderData } from './provider'
import type { Editor } from '@tiptap/core'

export default function TipTap() {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { editor, post, setContent, setTitle, setWordCount, user } = context
	const [localPost] = useLocalStorage(POST_LOCAL_STORAGE_KEY)
	const fileUploadInputRef = useRef(null)

	useEffect(() => {
		if (!user) {
			if (editor && localPost) {
				loadLocalPost()
			}
		} else {
			if (editor && post) {
				loadSavedPostFromDatabase()
			}
		}
	}, [editor, localPost])

	function updateEditorWordCount(content: string) {
		const wordCount = content.split(' ').length
		setWordCount?.(wordCount)
	}

	function loadSavedPostFromDatabase() {
		if (editor && post) {
			const { title, content } = post

			setTitle?.(title)
			setContent?.(content)

			if (editor.isEmpty) {
				editor.commands.setContent(content)
				updateEditorWordCount(editor.state.doc.textContent)
			}
		}
	}

	function loadLocalPost() {
		if (editor && localPost) {
			const { title, content } = JSON.parse(JSON.stringify(localPost))

			setTitle?.(title)
			setContent?.(content)

			if (editor.isEmpty) {
				editor.commands.setContent(content)
				updateEditorWordCount(editor.state.doc.textContent)
			}
		}
	}

	// @ts-ignore
	const insertImage = async (event) => {
		const file = event.target.files[0]

		if (file) {
			const fr = new FileReader()
			fr.onload = function () {
				let url = fr.result
				if (url) {
					editor
						?.chain()
						.focus()
						.setImage({ src: url as string })
						.run()
					// Enter twice so user don't have to manually press enter twice
					// and there's no chance of confusion of where the cursor went.
					editor?.commands.enter()
					editor?.commands.enter()
				}
			}
			fr.readAsDataURL(file)
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
		activeToolbar = <EditorToolbar editor={editor as Editor} />
	}

	return (
		<div className='editor-wrapper au-flex au-h-auto au-min-h-max au-w-full au-items-start au-justify-center au-pb-12'>
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
							onChange={insertImage}
							ref={fileUploadInputRef}
							type='file'
						/>
					</FloatingMenu>
				</>
			)}
			<EditorContent
				// @ts-ignore
				editor={editor as Editor}
			/>
		</div>
	)
}
