import { useState } from 'react'
import TipTap from './tiptap'
import WriterFooter from './footer'

export default function Writer() {
	const [content, setContent] = useState('')
	const [focusMode, setFocusMode] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
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
