import type { TipTapProps } from '../../types'
import { useEffect, useRef, useState } from 'react'
import {
	useEditor,
	BubbleMenu,
	EditorContent,
	FloatingMenu,
} from '@tiptap/react'
import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import SuperImage from '../extensions/super-image'
import VideoEmbed from '../extensions/video-embed'
import VisualBookmark from '../extensions/visual-bookmark'
import { deleteFromStorage, useLocalStorage } from '@rehooks/local-storage'
import { Alert, DangerButton, PrimaryButton } from '@i4o/catalystui'
import { POST_LOCAL_STORAGE_KEY } from '../../constants'
import EditorToolbar from './editor-toolbar'
import ImageToolbar from './image-toolbar'
import EditorFloatingMenu from './floating-menu'
// import { uploadImageToS3 } from '@utils/save-post'

export default function TipTap({
	content,
	setContent,
	setTitle,
	setWordCount,
}: TipTapProps) {
	const [localPost] = useLocalStorage(POST_LOCAL_STORAGE_KEY)
	const fileUploadInputRef = useRef(null)
	const [localPostAlertOpen, setLocalPostAlertOpen] = useState(false)

	const editor = useEditor({
		content,
		editorProps: {
			attributes: {
				class: '',
			},
		},
		extensions: [
			BubbleMenuExt.configure({
				tippyOptions: {
					arrow: true,
				},
			}),
			SuperImage,
			VideoEmbed,
			VisualBookmark,
			Link.configure({ linkOnPaste: true, openOnClick: false }),
			Placeholder.configure({
				placeholder: 'Start writing...',
			}),
			// @ts-ignore
			StarterKit.configure({
				heading: {
					levels: [2, 3],
				},
			}),
		],
		onUpdate({ editor }) {
			const html = editor.getHTML()
			const contentText = editor?.state?.doc?.textContent
			const wordCount = contentText?.split(' ').length
			setContent(html)
			setWordCount(wordCount)
		},
	})

	useEffect(() => {
		if (editor && localPost) {
			setLocalPostAlertOpen(true)
		}
	}, [editor])

	const updateEditorWordCount = (content: string) => {
		const wordCount = content.split(' ').length
		setWordCount(wordCount)
	}

	const discardLocalPost = () => {
		deleteFromStorage(POST_LOCAL_STORAGE_KEY)
	}

	const loadLocalPost = () => {
		if (editor && localPost) {
			const { title, content } = JSON.parse(JSON.stringify(localPost))

			setTitle(title)
			setContent(content)

			if (editor.isEmpty) {
				editor.commands.setContent(content)
				updateEditorWordCount(editor.state.doc.textContent)
			}
			// if (user) {
			// 	discardLocalPost()
			// }
		}
	}

	// @ts-ignore
	const uploadImage = async (event) => {
		const file = event.target.files[0]

		if (file) {
			const formData = new FormData()
			formData.append('image', file)

			// const url = await uploadImageToS3(formData)
			// if (url) {
			// 	editor?.chain().focus().setImage({ src: url }).run()
			// 	event.target.value = ''
			// }
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
		<>
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
			<Alert
				cancel={
					<DangerButton onClick={discardLocalPost}>
						Discard Post
					</DangerButton>
				}
				action={
					<PrimaryButton onClick={loadLocalPost}>
						Load Saved Post
					</PrimaryButton>
				}
				description='We found your post from a previous session. Do you want to load it?'
			/>
		</>
	)
}
