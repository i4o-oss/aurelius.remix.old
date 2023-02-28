import { Dispatch, SetStateAction, useState } from 'react'
import { Tiptap, WriterFooter } from '@i4o/aurelius'

interface WriterProps {
	content: string
	setContent: Dispatch<SetStateAction<string>>
	title: string
	setTitle: Dispatch<SetStateAction<string>>
	setWordCount: Dispatch<SetStateAction<number>>
}

function Writer(props: WriterProps) {
	const { content, setContent, title, setTitle, setWordCount } = props

	return (
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
				<Tiptap
					content={content}
					setContent={setContent}
					setTitle={setTitle}
					setWordCount={setWordCount}
				/>
			</div>
		</section>
	)
}

export default function Write() {
	const [content, setContent] = useState('')
	const [focusMode, setFocusMode] = useState(false)
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Writer
				content={content}
				setContent={setContent}
				title={title}
				setTitle={setTitle}
				setWordCount={setWordCount}
			/>
			<WriterFooter
				focusMode={focusMode}
				isSaving={false}
				wordCount={wordCount}
			/>
		</main>
	)
}
