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
import { Theme, WritingSession, WritingSessionGoal } from '../../types'
import Timer from './timer'

function Reset({ confirmResetEditor }: { confirmResetEditor: () => void }) {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { showResetAlert, setShowResetAlert } = context
	return (
		<Alert
			isOpen={showResetAlert}
			onOpenChange={setShowResetAlert}
			cancel={
				<Button
					bg='!au-bg-slate-400 dark:!au-bg-slate-800 hover:!au-bg-slate-300 hover:dark:!au-bg-slate-700'
					onClick={() => setShowResetAlert?.(false)}
				>
					Cancel
				</Button>
			}
			action={
				<PrimaryButton onClick={confirmResetEditor}>
					Confirm
				</PrimaryButton>
			}
			title={<h3 className='au-px-2 au-text-lg'>Are you sure?</h3>}
			description='This will clear all the content from the editor. This action cannot be undone.'
		/>
	)
}

function WritingSessionRecap() {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { sessionData, showSessionRecapDialog, setShowSessionRecapDialog } =
		context
	return (
		<Dialog
			isOpen={showSessionRecapDialog}
			onOpenChange={setShowSessionRecapDialog}
			title={
				<h3 className='au-px-2 au-text-lg'>Writing Session Recap</h3>
			}
			trigger={null}
		>
			<div className='au-grid au-w-[24rem] au-grid-cols-2 au-gap-2 au-px-2 au-text-black dark:au-text-white'>
				<p className='au-text-left'>Session Target:</p>
				<p className='au-text-right'>
					{sessionData?.goal === 'duration'
						? `${sessionData?.target / 60} minutes`
						: `${sessionData?.target} words`}
				</p>
				<p className='au-text-left'># of words written:</p>
				<p className='au-text-right'>
					{`${
						// @ts-ignore
						sessionData?.endingWordCount -
						// @ts-ignore
						sessionData?.startingWordCount
					}`}
				</p>
				<p className='au-text-left'>Session Duration:</p>
				<p className='au-text-right'>{`${
					// @ts-ignore
					Math.floor(sessionData?.duration / 60)
				} minutes`}</p>
			</div>
		</Dialog>
	)
}

interface WriterProps {
	savePost: (title: string, content: string, wordCount: number) => void
	theme: Theme
	toggleTheme: () => void
	user: any
}

export default function Writer({
	savePost: savePostToDatabase,
	theme,
	toggleTheme,
	user,
}: WriterProps) {
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
	const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
	const [showResetAlert, setShowResetAlert] = useState(false)
	const [showSessionEndToast, setShowSessionEndToast] = useState(false)
	const [showSessionRecapDialog, setShowSessionRecapDialog] = useState(false)
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
		if (
			sessionData &&
			sessionData.goal === 'wordCount' &&
			sessionData.target === wordCount
		) {
			setShowSessionEndToast(true)
		}
	}, [wordCount])

	useEffect(() => {
		if (!showSessionRecapDialog) {
			setSessionData(null)
		}
	}, [showSessionRecapDialog])

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

			if (user) {
				savePostToDatabase(title, content, wordCount)
			} else {
				writeStorage(POST_LOCAL_STORAGE_KEY, update)
			}

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
		setSessionData({
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
		setSessionData(data)
		writeStorage(SESSION_LOCAL_STORAGE_KEY, [
			...(JSON.parse(JSON.stringify(writingSessions)) || []),
			data,
		])
		if (sessionMusic) {
			setIsMusicPlaying(false)
		}
		if (sessionFocusMode) {
			setFocusMode(false)
		}
		setShowSessionRecapDialog(true)
	}

	function endWordCountSession(totalTime: number) {
		const data = {
			...sessionData,
			result: wordCount - (sessionData?.startingWordCount || 0),
			duration: totalTime,
			date: new Date(),
			endingWordCount: wordCount,
		} as WritingSession
		setSessionData(data)
		writeStorage(SESSION_LOCAL_STORAGE_KEY, [
			...(JSON.parse(JSON.stringify(writingSessions)) || []),
			data,
		])
		if (sessionMusic) {
			setIsMusicPlaying(false)
		}
		if (sessionFocusMode) {
			setFocusMode(false)
		}
		setShowSessionRecapDialog(true)
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
				showNewSessionDialog,
				setShowNewSessionDialog,
				showResetAlert,
				setShowResetAlert,
				showSessionEndToast,
				setShowSessionEndToast,
				showSessionRecapDialog,
				setShowSessionRecapDialog,
				showSettingsDialog,
				setShowSettingsDialog,
				theme,
				toggleTheme,
				title,
				setTitle,
				user,
				wordCount,
				setWordCount,
			}}
		>
			<main className='au-flex au-h-full au-w-full au-flex-col au-items-center au-justify-start'>
				<Autosave
					data={autoSaveData}
					interval={5000}
					onSave={autoSavePost}
				/>
				<div
					className={`au-absolute au-top-4 au-left-4 au-flex au-items-center au-gap-4 au-transition-all au-duration-200 hover:au-opacity-100 ${
						focusMode ? 'au-opacity-5' : 'au-opacity-100'
					}`}
				>
					<MainMenu
						downloadFile={downloadFile}
						onResetEditorClick={onResetEditorClick}
					/>
					{SessionComponent}
				</div>
				<section className='au-flex au-h-full au-w-full au-flex-grow au-flex-col au-items-center au-justify-start'>
					<div className='au-flex au-h-full au-w-full au-flex-col au-items-center au-justify-start au-space-y-4 au-px-4 au-py-24 md:au-py-16 lg:au-px-0'>
						<div className='au-w-full au-max-w-3xl'>
							<textarea
								autoFocus
								className='au-min-h-[2rem] au-w-full au-resize-none au-overflow-y-hidden au-bg-transparent au-text-2xl au-font-semibold au-leading-snug au-text-black focus:au-outline-none dark:au-text-white lg:au-min-h-[6rem] lg:au-text-5xl'
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
			{showNewSessionDialog ? (
				<NewSession startSession={startSession} />
			) : null}
			{showSettingsDialog ? <Settings /> : null}
			{showSessionRecapDialog ? <WritingSessionRecap /> : null}
		</AureliusProvider>
	)
}
