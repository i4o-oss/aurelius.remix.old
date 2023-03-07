import { useCallback, useState } from 'react'
import { useEditor } from '@tiptap/react'
import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import SuperImage from '../extensions/super-image'
import VideoEmbed from '../extensions/video-embed'
import VisualBookmark from '../extensions/visual-bookmark'
import { Alert, Button, PrimaryButton } from '@i4o/catalystui'
import { Autosave } from 'react-autosave'
import { deleteFromStorage, writeStorage } from '@rehooks/local-storage'
import TipTap from './tiptap'
import WriterFooter from './footer'
import MainMenu from './main-menu'
import { POST_LOCAL_STORAGE_KEY } from '../../constants'

export default function Writer() {
	const [showResetAlert, setShowResetAlert] = useState(false)
	const [content, setContent] = useState('')
	const [focusMode, setFocusMode] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

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

	async function savePost(data: any) {
		if (data.title && data.content && data.wordCount) {
			setIsSaving(true)

			let saveTimeout

			clearTimeout(saveTimeout)

			const update = {
				title,
				content,
				wordCount,
			}

			writeStorage(POST_LOCAL_STORAGE_KEY, update)

			saveTimeout = setTimeout(() => {
				setIsSaving(false)
			}, 1000)
		}
	}

	const autoSavePost = useCallback(savePost, [title, content])
	const autoSaveData = { title, content, wordCount }

	function confirmResetEditor() {
		deleteFromStorage(POST_LOCAL_STORAGE_KEY)
		setTitle('')
		setContent('')
		editor?.commands.clearContent(true)
		setShowResetAlert(false)
	}

	console.log(showResetAlert)

	return (
		<>
			<main className='flex h-full w-full flex-col items-center justify-start'>
				<Autosave
					data={autoSaveData}
					interval={5000}
					onSave={autoSavePost}
				/>
				<div
					className={`absolute top-4 left-4 transition-all duration-200 hover:opacity-100 ${
						focusMode ? 'opacity-5' : 'opacity-100'
					}`}
				>
					<MainMenu
						focusMode={focusMode}
						setFocusMode={setFocusMode}
						setShowResetAlert={setShowResetAlert}
					/>
				</div>
				<section className='flex h-full w-full flex-grow flex-col items-center justify-start'>
					<div className='flex h-full w-full flex-col items-center justify-start space-y-4 py-16'>
						<div className='w-full max-w-3xl'>
							<input
								className='h-24 w-full bg-transparent text-5xl font-semibold text-white focus:outline-none'
								onChange={(e) => setTitle(e.target.value)}
								placeholder='Title'
								type='text'
								value={title}
							/>
						</div>
						<TipTap
							editor={editor}
							setContent={setContent}
							setTitle={setTitle}
							setWordCount={setWordCount}
						/>
					</div>
				</section>

				<WriterFooter
					focusMode={focusMode}
					isSaving={isSaving}
					wordCount={wordCount}
				/>
			</main>

			{showResetAlert ? (
				<Alert
					isOpen={showResetAlert}
					cancel={
						<Button onClick={() => setShowResetAlert(false)}>
							Cancel
						</Button>
					}
					action={
						<PrimaryButton onClick={confirmResetEditor}>
							Confirm
						</PrimaryButton>
					}
					title='Are you sure?'
					description='This will clear all the content from the editor. This action cannot be undone.'
				/>
			) : null}
		</>
	)
}
