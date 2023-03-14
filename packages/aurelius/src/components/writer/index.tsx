import {
	ReactNode,
	useCallback,
	useContext,
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
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
// import TaskItem from '@tiptap/extension-task-item'
// import TaskList from '@tiptap/extension-task-list'
import Youtube from '@tiptap/extension-youtube'
// import VisualBookmark from '../extensions/visual-bookmark'
import { Alert, Button, Dialog, PrimaryButton } from '@i4o/catalystui'
import { Autosave } from 'react-autosave'
import useLocalStorage, {
	deleteFromStorage,
	writeStorage,
} from '@rehooks/local-storage'
import TipTap from './tiptap'
import WriterFooter from './footer'
import MainMenu from './main-menu'
import {
	POST_LOCAL_STORAGE_KEY,
	SESSION_LOCAL_STORAGE_KEY,
} from '../../constants'
import NewSession from './new-session'
import Settings from './settings'
import { downloadAsMarkdown } from '../../helpers'
import AureliusProvider, {
	AureliusContext,
	AureliusProviderData,
} from './provider'
import { WritingSession, WritingSessionGoal } from '../../types'
import Timer from './timer'

function Reset({ confirmResetEditor }: { confirmResetEditor: () => void }) {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { showResetAlert, setShowResetAlert } = context
	return (
		<Alert
			isOpen={showResetAlert}
			onOpenChange={setShowResetAlert}
			cancel={
				<Button onClick={() => setShowResetAlert?.(false)}>
					Cancel
				</Button>
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

function About() {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { showAboutDialog, setShowAboutDialog } = context
	return (
		<Dialog
			isOpen={showAboutDialog}
			onOpenChange={setShowAboutDialog}
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
	const [writingSessions] = useLocalStorage<WritingSession[]>(
		SESSION_LOCAL_STORAGE_KEY
	)
	const titleRef = useRef<HTMLTextAreaElement>(null)
	const [content, setContent] = useState('')
	const [focusMode, setFocusMode] = useState(false)
	const [isMusicPlaying, setIsMusicPlaying] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [notifyOnSessionEnd, setNotifyOnSessionEnd] = useState(true)
	const [sessionData, setSessionData] = useState<WritingSession | null>(null)
	const [sessionGoal, setSessionGoal] =
		useState<WritingSessionGoal>('duration')
	const [sessionTarget, setSessionTarget] = useState<number>(0)
	const [sessionFocusMode, setSessionFocusMode] = useState(true)
	const [sessionMusic, setSessionMusic] = useState(true)
	const [showAboutDialog, setShowAboutDialog] = useState(false)
	const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
	const [showResetAlert, setShowResetAlert] = useState(false)
	const [showSettingsDialog, setShowSettingsDialog] = useState(false)
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

	useEffect(() => {
		if (!title && !content) {
			titleRef.current?.focus()
		}
	}, [title, content])

	useEffect(() => {
		if (titleRef.current) {
			titleRef.current.style.height = 'inherit'
			titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
		}
	}, [title])

	useEffect(() => {
		if (titleRef.current) {
			titleRef.current.style.height = '84px'
		}
	}, [])

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
			SuperImage.configure({
				inline: true,
				allowBase64: true,
				HTMLAttributes: {
					class: 'super-image',
				},
			}),
			CodeBlockLowlight.configure({
				lowlight,
			}),
			Youtube.configure({
				width: 762,
				height: 432,
			}),
			// TaskList,
			// TaskItem.configure({
			// 	nested: true,
			// }),
			Link.configure({ linkOnPaste: true, openOnClick: false }),
			Placeholder.configure({
				placeholder: 'Start writing...',
			}),
			// @ts-ignore
			StarterKit.configure({
				heading: {
					levels: [2, 3, 4, 5, 6],
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

	function downloadFile() {
		downloadAsMarkdown(title, content)
	}

	async function savePost(data: any) {
		if (data.title || data.content) {
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

	function startSession() {
		setSessionData?.({
			goal: sessionGoal,
			startingWordCount: wordCount,
			target: sessionTarget,
		})
		if (sessionMusic) {
			setIsMusicPlaying(true)
		}
		if (sessionFocusMode) {
			setFocusMode(true)
		}
	}

	function endTimedSession(totalTime: number) {
		const data = {
			...sessionData,
			result: totalTime,
			duration: totalTime,
			date: new Date(),
			endingWordCount: wordCount,
		} as WritingSession
		writeStorage(SESSION_LOCAL_STORAGE_KEY, [
			...(JSON.parse(JSON.stringify(writingSessions)) || []),
			data,
		])
		setSessionData?.(null)
		if (sessionMusic) {
			setIsMusicPlaying(false)
		}
		if (sessionFocusMode) {
			setFocusMode(false)
		}
	}

	function endWordCountSession(totalTime: number) {
		const data = {
			...sessionData,
			result: wordCount - (sessionData?.startingWordCount || 0),
			duration: totalTime,
			date: new Date(),
			endingWordCount: wordCount,
		} as WritingSession
		writeStorage(SESSION_LOCAL_STORAGE_KEY, [
			...(JSON.parse(JSON.stringify(writingSessions)) || []),
			data,
		])
		setSessionData?.(null)
		if (sessionMusic) {
			setIsMusicPlaying(false)
		}
		if (sessionFocusMode) {
			setFocusMode(false)
		}
		// onEndSessionModalOpen();
	}

	let SessionComponent: ReactNode
	if (sessionData && sessionData.goal === 'duration') {
		const time = new Date()
		time.setSeconds(time.getSeconds() + sessionTarget)

		SessionComponent = (
			<Timer
				endTimedSession={endTimedSession}
				expiry={time}
				target={sessionTarget}
			/>
		)
	} else if (sessionData && sessionData.goal === 'wordCount') {
		const time = new Date()
		// setting a default expiry of 1 hour so I can calculate the duration of the session
		// even if the goal is word count
		time.setSeconds(time.getSeconds() + 3600)
		SessionComponent = (
			<Timer
				endWordCountSession={endWordCountSession}
				expiry={time}
				target={3600}
			/>
		)
	}

	return (
		<AureliusProvider
			data={{
				content,
				setContent,
				editor,
				focusMode,
				setFocusMode,
				isMusicPlaying,
				setIsMusicPlaying,
				isSaving,
				setIsSaving,
				notifyOnSessionEnd,
				setNotifyOnSessionEnd,
				sessionData,
				setSessionData,
				sessionFocusMode,
				setSessionFocusMode,
				sessionGoal,
				setSessionGoal,
				sessionMusic,
				setSessionMusic,
				sessionTarget,
				setSessionTarget,
				showAboutDialog,
				setShowAboutDialog,
				showNewSessionDialog,
				setShowNewSessionDialog,
				showResetAlert,
				setShowResetAlert,
				showSettingsDialog,
				setShowSettingsDialog,
				title,
				setTitle,
				wordCount,
				setWordCount,
			}}
		>
			<main className='flex h-full w-full flex-col items-center justify-start'>
				<Autosave
					data={autoSaveData}
					interval={5000}
					onSave={autoSavePost}
				/>
				<div
					className={`absolute top-4 left-4 flex items-center gap-4 transition-all duration-200 hover:opacity-100 ${
						focusMode ? 'opacity-5' : 'opacity-100'
					}`}
				>
					<MainMenu
						downloadFile={downloadFile}
						onResetEditorClick={onResetEditorClick}
					/>
					{SessionComponent}
				</div>
				<section className='flex h-full w-full flex-grow flex-col items-center justify-start'>
					<div className='flex h-full w-full flex-col items-center justify-start space-y-4 py-16'>
						<div className='w-full max-w-3xl'>
							<textarea
								autoFocus
								className='min-h-[6rem] w-full resize-none bg-transparent text-5xl font-semibold leading-snug text-white focus:outline-none'
								onChange={(e) => setTitle(e.target.value)}
								placeholder='Title'
								ref={titleRef}
								rows={1}
								value={title}
							/>
						</div>
						<TipTap />
					</div>
				</section>

				<WriterFooter />
			</main>

			{showResetAlert ? (
				<Reset confirmResetEditor={confirmResetEditor} />
			) : null}
			{showAboutDialog ? <About /> : null}
			{showNewSessionDialog ? (
				<NewSession startSession={startSession} />
			) : null}
			{showSettingsDialog ? <Settings /> : null}
		</AureliusProvider>
	)
}
