import { ReactNode } from 'react'
import type { WriterProps } from '../../types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor } from '@tiptap/react'
import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import SuperImage from '../extensions/super-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import Youtube from '@tiptap/extension-youtube'
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
	SETTINGS_LOCAL_STORAGE_KEY,
} from '../../constants'
import NewSession from './new-session'
import { downloadAsMarkdown } from '../../helpers'
import AureliusProvider from './provider'
import {
	SettingsData,
	TitleAlignment,
	WritingSession,
	WritingSessionGoal,
} from '../../types'
import Timer from './timer'
import Reset from './reset'
import WritingSessionRecap from './recap'
import Export from './export'

export default function Writer({
	post,
	savePost: savePostToDatabase,
	saveWritingSession: saveWritingSessionToDatabase,
	showSettingsDialog,
	settingsFromDb,
	setShowSettingsDialog,
	sync,
	theme,
	toggleTheme,
	user,
}: WriterProps) {
	const [localPost] = useLocalStorage(POST_LOCAL_STORAGE_KEY)
	const [writingSessions] = useLocalStorage<WritingSession[]>(
		SESSION_LOCAL_STORAGE_KEY
	)

	const [settings] = useLocalStorage<string>(SETTINGS_LOCAL_STORAGE_KEY)
	const settingsData =
		user && settingsFromDb
			? settingsFromDb
			: (JSON.parse(JSON.stringify(settings)) as SettingsData)
	const titleRef = useRef<HTMLTextAreaElement>(null)
	const [author, setAuthor] = useState<string>('')
	const [content, setContent] = useState('')
	const [focusMode, setFocusMode] = useState(false)
	const [footer, setFooter] = useState<string>(settingsData?.footer || '')
	const [isMusicPlaying, setIsMusicPlaying] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [notifyOnSessionEnd, setNotifyOnSessionEnd] = useState(true)
	const [sessionData, setSessionData] = useState<WritingSession | null>(null)
	const [sessionGoal, setSessionGoal] =
		useState<WritingSessionGoal>('duration')
	const [sessionTarget, setSessionTarget] = useState<number>(0)
	const [sessionFocusMode, setSessionFocusMode] = useState(true)
	const [sessionMusic, setSessionMusic] = useState(true)
	const [showExportImageDialog, setShowExportImageDialog] = useState(true)
	const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
	const [showResetAlert, setShowResetAlert] = useState(false)
	const [showSessionEndToast, setShowSessionEndToast] = useState(false)
	const [showSessionRecapDialog, setShowSessionRecapDialog] = useState(false)
	const [showWritingPaths, setShowWritingPaths] = useState(false)
	const [title, setTitle] = useState<string>('')
	const [titleAlignment, setTitleAlignment] = useState<TitleAlignment>('left')
	const [watermark, setWatermark] = useState<boolean>(
		settingsData?.watermark || true
	)
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

	useEffect(() => {
		if (user) {
			sync({
				post: localPost ? JSON.stringify(localPost) : '',
				writingSessions:
					writingSessions && writingSessions?.length > 0
						? JSON.stringify(writingSessions)
						: '',
			})
			clearLocalData()
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
			Highlight.configure({ multicolor: true }),
			// @ts-ignore
			StarterKit.configure({
				heading: {
					levels: [2, 3, 4, 5, 6],
				},
			}),
		],
		onUpdate({ editor }) {
			let html = editor.isEmpty ? '' : editor.getHTML()
			const contentText = editor?.state?.doc?.textContent
			const wordCount = contentText?.split(' ').length
			setContent(html)
			setWordCount(wordCount)
		},
	})

	function clearLocalData() {
		deleteFromStorage(POST_LOCAL_STORAGE_KEY)
		deleteFromStorage(SESSION_LOCAL_STORAGE_KEY)
	}

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
		if (user) {
			window.location.href = '/'
		}
	}

	function onResetEditorClick(state: boolean) {
		if (content) {
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
		if (user) {
			saveWritingSessionToDatabase(JSON.stringify(data))
		} else {
			writeStorage(SESSION_LOCAL_STORAGE_KEY, [
				...(JSON.parse(JSON.stringify(writingSessions)) || []),
				data,
			])
		}
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
		if (user) {
			saveWritingSessionToDatabase(JSON.stringify(data))
		} else {
			writeStorage(SESSION_LOCAL_STORAGE_KEY, [
				...(JSON.parse(JSON.stringify(writingSessions)) || []),
				data,
			])
		}
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

	const data = {
		author,
		setAuthor,
		content,
		setContent,
		editor,
		focusMode,
		setFocusMode,
		footer,
		setFooter,
		isMusicPlaying,
		setIsMusicPlaying,
		isSaving,
		setIsSaving,
		localPost,
		notifyOnSessionEnd,
		setNotifyOnSessionEnd,
		post,
		settings: settingsData,
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
		showExportImageDialog,
		setShowExportImageDialog,
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
		showWritingPaths,
		setShowWritingPaths,
		theme,
		toggleTheme,
		title,
		setTitle,
		titleAlignment,
		setTitleAlignment,
		user,
		watermark,
		setWatermark,
		wordCount,
		setWordCount,
	}

	return (
		<AureliusProvider data={data}>
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
				{/* <WritingPaths /> */}
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

			<Reset confirmResetEditor={confirmResetEditor} />
			<NewSession startSession={startSession} />
			<WritingSessionRecap />
			<Export />
		</AureliusProvider>
	)
}
