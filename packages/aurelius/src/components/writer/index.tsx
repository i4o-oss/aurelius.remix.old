import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useEditor } from '@tiptap/react'
import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import SuperImage from '../extensions/super-image'
import VideoEmbed from '../extensions/video-embed'
import VisualBookmark from '../extensions/visual-bookmark'
import { Alert, Button, Dialog, PrimaryButton } from '@i4o/catalystui'
import { Autosave } from 'react-autosave'
import { deleteFromStorage, writeStorage } from '@rehooks/local-storage'
import TipTap from './tiptap'
import WriterFooter from './footer'
import MainMenu from './main-menu'
import { POST_LOCAL_STORAGE_KEY } from '../../constants'
import NewSession from './new-session'

function Reset({
	showResetAlert,
	setShowResetAlert,
	confirmResetEditor,
}: {
	showResetAlert: boolean
	setShowResetAlert: Dispatch<SetStateAction<boolean>>
	confirmResetEditor: () => void
}) {
	return (
		<Alert
			isOpen={showResetAlert}
			onOpenChange={(open: boolean) => setShowResetAlert(open)}
			cancel={
				<Button onClick={() => setShowResetAlert(false)}>Cancel</Button>
			}
			action={
				<PrimaryButton onClick={confirmResetEditor}>
					Confirm
				</PrimaryButton>
			}
			title={<h3 className='px-2 text-lg'>Are you sure?</h3>}
			description='This will clear all the content from the editor. This action cannot be undone.'
		/>
	)
}

function About({ showAboutDialog }: { showAboutDialog: boolean }) {
	return (
		<Dialog
			isOpen={showAboutDialog}
			onOpenChange={(open: boolean) => setShowAboutDialog(open)}
			title={<h3 className='px-2 text-lg'>About</h3>}
			trigger={null}
		>
			<div className='flex flex-col items-start gap-4 px-2 text-white'>
				<p>
					Aurelius was born out of a requirement for a writing app
					that suited my needs. After trying many writing apps — code
					editors to note taking app — none of them help with
					maintaining a writing habit. Some of them have a poor
					writing experience by doing too much stuff.
				</p>
				<p>
					I wanted a simple writing app that has the features for
					building a writing habit while having an enjoyable writing
					experience. While the current state only supports single
					posts suited for articles, I want to support more use-cases
					like book writing, daily journals, and more.
				</p>
			</div>
		</Dialog>
	)
}

export default function Writer() {
	const titleRef = useRef<HTMLInputElement>(null)
	const [content, setContent] = useState('')
	const [focusMode, setFocusMode] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [showAboutDialog, setShowAboutDialog] = useState(false)
	const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
	const [showResetAlert, setShowResetAlert] = useState(false)
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

	useEffect(() => {
		if (!title && !content) {
			titleRef.current?.focus()
		}
	}, [title, content])

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
		setWordCount(0)
		setShowResetAlert(false)
		titleRef?.current?.focus()
	}

	function onResetEditorClick(state: boolean) {
		if (title && content) {
			setShowResetAlert(state)
		}
	}

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
						onResetEditorClick={onResetEditorClick}
						setFocusMode={setFocusMode}
						setShowAboutDialog={setShowAboutDialog}
						setShowNewSessionDialog={setShowNewSessionDialog}
					/>
				</div>
				<section className='flex h-full w-full flex-grow flex-col items-center justify-start'>
					<div className='flex h-full w-full flex-col items-center justify-start space-y-4 py-16'>
						<div className='w-full max-w-3xl'>
							<input
								autoFocus
								className='h-24 w-full bg-transparent text-5xl font-semibold text-white focus:outline-none'
								onChange={(e) => setTitle(e.target.value)}
								placeholder='Title'
								ref={titleRef}
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
				<Reset
					showResetAlert={showResetAlert}
					setShowResetAlert={setShowResetAlert}
					confirmResetEditor={confirmResetEditor}
				/>
			) : null}
			{showAboutDialog ? (
				<About showAboutDialog={showAboutDialog} />
			) : null}
			{showNewSessionDialog ? (
				<NewSession
					showNewSessionDialog={showNewSessionDialog}
					setShowNewSessionDialog={setShowNewSessionDialog}
				/>
			) : null}
		</>
	)
}
