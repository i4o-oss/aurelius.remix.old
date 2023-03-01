import type { KeyboardEventHandler } from 'react'
import type { EditorToolbarProps } from '../../types'
import { useEffect, useRef, useState } from 'react'
import { Toolbar } from '@i4o-oss/catalystui'
import {
	CodeIcon,
	FontBoldIcon,
	FontItalicIcon,
	Link2Icon,
	LinkBreak2Icon,
	QuoteIcon,
} from '@radix-ui/react-icons'
import { Button } from '@i4o-oss/catalystui'

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

	const items = [
		{
			type: 'toggle-group',
			groupType: 'multiple',
			groupItems: [
				{
					id: 'bold',
					icon: <FontBoldIcon />,
					onSelect: () => editor?.chain().focus().toggleBold().run(),
				},
				{
					id: 'italic',
					icon: <FontItalicIcon />,
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
					icon: <span className='text-sm font-semibold'>H</span>,
					onSelect: () =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 2 })
							.run(),
				},
				{
					id: 'h3',
					icon: <span className='text-[12px] font-semibold'>H</span>,
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
					icon: <QuoteIcon />,
					onSelect: () =>
						editor?.chain().focus().toggleBlockquote().run(),
				},
				{
					id: 'link',
					icon: <Link2Icon />,
					onSelect: () => setToggleLink(true),
				},
				{
					id: 'code',
					icon: <CodeIcon />,
					onSelect: () => editor?.chain().focus().toggleCode().run(),
				},
			],
		},
	]

	return (
		<>
			<Toolbar
				ariaLabel='Text Formatting Options'
				className='rounded-md bg-gray-800'
				items={items}
			/>
			<div className='flex h-12 items-center justify-center space-x-1 overflow-hidden rounded-md p-2 shadow-md'>
				{toggleLink ? (
					<div className='flex h-full w-full items-center justify-center space-x-2'>
						<input
							className='h-full w-auto bg-transparent px-2 py-1 text-white outline-white'
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
								bg='bg-gray-300'
								className='flex h-full w-8 items-center justify-center rounded-md'
								onClick={() => {
									editor?.chain().focus().unsetLink().run()
									setToggleLink(false)
								}}
								padding='p-0'
								textColor='text-black'
							>
								<LinkBreak2Icon />
							</Button>
						)}
					</div>
				) : null}
			</div>
		</>
	)
}
