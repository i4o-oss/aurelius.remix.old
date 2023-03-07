import { useCallback, useState } from 'react'
import { Autosave } from 'react-autosave'
import { writeStorage } from '@rehooks/local-storage'
import TipTap from './tiptap'
import WriterFooter from './footer'
import MainMenu from './main-menu'
import { POST_LOCAL_STORAGE_KEY } from '../../constants'

export default function Writer() {
	const [content, setContent] = useState('')
	const [focusMode, setFocusMode] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

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

	return (
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
				<MainMenu focusMode={focusMode} setFocusMode={setFocusMode} />
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
						content={content}
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
	)
}
