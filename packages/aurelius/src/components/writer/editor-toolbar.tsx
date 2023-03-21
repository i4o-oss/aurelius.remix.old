import type { KeyboardEventHandler } from 'react'
import type { EditorToolbarProps } from '../../types'
import { useEffect, useRef, useState } from 'react'
import { Button, Dialog, Toolbar } from '@i4o/catalystui'
import {
	CodeIcon,
	FontBoldIcon,
	FontItalicIcon,
	Link2Icon,
	LinkBreak2Icon,
	QuoteIcon,
} from '@radix-ui/react-icons'

// TODO: Fix types here
export default function EditorToolbar({ editor }: EditorToolbarProps) {
	const linkInputRef = useRef<HTMLInputElement>(null)
	const [link, setLink] = useState('')
	const [toggleLink, setToggleLink] = useState(false)

	useEffect(() => {
		if (toggleLink) {
			// @ts-ignore
			linkInputRef?.current?.focus()
		}
	}, [toggleLink])

	const linkChangeHandler: KeyboardEventHandler<HTMLInputElement> = (
		event
	) => {
		if (event.key === 'Enter' || event.keyCode === 13) {
			editor
				?.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: link, target: '_blank' })
				.run()
			setLink('')
			setToggleLink(false)
		}
	}

	const toggleBold = () => {
		console.log(editor)
		editor?.chain().focus().toggleBold().run()
	}

	const items = [
		{
			type: 'toggle-group',
			groupType: 'multiple',
			groupItems: [
				{
					id: 'bold',
					icon: (
						<FontBoldIcon className='au-text-black dark:au-text-white' />
					),
					onSelect: toggleBold,
				},
				{
					id: 'italic',
					icon: (
						<FontItalicIcon className='au-text-black dark:au-text-white' />
					),
					onSelect: () =>
						editor?.chain().focus().toggleItalic().run(),
				},
			],
		},
		{ type: 'separator' },
		{
			type: 'toggle-group',
			groupType: 'single',
			groupItems: [
				{
					id: 'h2',
					icon: (
						<svg
							className='h-4 w-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						>
							<path d='M4 12h8'></path>
							<path d='M4 18V6'></path>
							<path d='M12 18V6'></path>
							<path d='M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1'></path>
						</svg>
					),
					onSelect: () =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 2 })
							.run(),
				},
				{
					id: 'h3',
					icon: (
						<svg
							className='h-4 w-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						>
							<path d='M4 12h8'></path>
							<path d='M4 18V6'></path>
							<path d='M12 18V6'></path>
							<path d='M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2'></path>
							<path d='M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2'></path>
						</svg>
					),
					onSelect: () =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 3 })
							.run(),
				},
				{
					id: 'h4',
					icon: (
						<svg
							className='h-4 w-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						>
							<path d='M4 12h8'></path>
							<path d='M4 18V6'></path>
							<path d='M12 18V6'></path>
							<path d='M17 10v4h4'></path>
							<path d='M21 10v8'></path>
						</svg>
					),
					onSelect: () =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 3 })
							.run(),
				},
			],
		},
		{ type: 'separator' },
		{
			type: 'toggle-group',
			groupType: 'multiple',
			groupItems: [
				{
					id: 'quote',
					icon: (
						<QuoteIcon className='au-text-black dark:au-text-white' />
					),
					onSelect: () =>
						editor?.chain().focus().toggleBlockquote().run(),
				},
				{
					id: 'link',
					icon: (
						<Link2Icon className='au-text-black dark:au-text-white' />
					),
					onSelect: () => setToggleLink(true),
				},
				{
					id: 'code',
					icon: (
						<CodeIcon className='au-text-black dark:au-text-white' />
					),
					onSelect: () => editor?.chain().focus().toggleCode().run(),
				},
			],
		},
	]

	return (
		<>
			<Toolbar
				ariaLabel='Text Formatting Options'
				className='au-w-full au-text-black dark:au-text-white'
				// @ts-ignore
				items={items}
			/>
			<Dialog
				isOpen={toggleLink}
				onOpenChange={setToggleLink}
				title={<h3 className='au-text-lg'>Add link</h3>}
			>
				<div className='au-flex au-h-12 au-w-full au-items-center au-justify-center au-space-x-2'>
					<input
						className='au-h-full au-w-auto au-rounded-lg au-border au-bg-transparent au-px-2 au-py-1 au-text-black au-outline-black dark:au-text-white dark:au-outline-white'
						onBlur={() => {
							if (!editor?.getAttributes('link').href) {
								setToggleLink(false)
							}
						}}
						onChange={(e) => setLink(e.target.value)}
						onKeyUp={linkChangeHandler}
						ref={linkInputRef}
						type='text'
						value={link || editor?.getAttributes('link').href}
					/>
					{editor?.getAttributes('link').href && (
						<Button
							aria-label='Unlink'
							bg='au-bg-gray-300'
							className='au-flex au-h-full au-w-8 au-items-center au-justify-center au-rounded-md'
							onClick={() => {
								editor?.chain().focus().unsetLink().run()
								setToggleLink(false)
							}}
							padding='au-p-0'
							textColor='au-text-black'
						>
							<LinkBreak2Icon />
						</Button>
					)}
				</div>
			</Dialog>
		</>
	)
}
