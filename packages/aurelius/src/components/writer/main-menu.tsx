import type { Dispatch, SetStateAction } from 'react'
import { Dropdown, IconButton } from '@i4o/catalystui'
import {
	Crosshair2Icon,
	DownloadIcon,
	FileIcon,
	FileTextIcon,
	GitHubLogoIcon,
	HamburgerMenuIcon,
	InfoCircledIcon,
	MixerHorizontalIcon,
	Pencil1Icon,
	StarFilledIcon,
	TrashIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'

interface MainMenuProps {
	focusMode: boolean
	setFocusMode: Dispatch<SetStateAction<boolean>>
	onResetEditorClick: (state: boolean) => void
}

export default function MainMenu(props: MainMenuProps) {
	const dropdownItems = [
		{
			label: 'New',
			icon: <FileIcon />,
			submenu: [
				{
					label: 'Post',
					icon: <FileTextIcon />,
					shortcut: 'Ctrl + P',
				},
				{
					label: 'Writing Session',
					icon: <Pencil1Icon />,
					shortcut: 'Ctrl + N',
				},
			],
			type: 'submenu',
		},
		{
			label: 'Save',
			icon: <DownloadIcon />,
			shortcut: 'Ctrl + S',
		},
		{
			label: 'Focus Mode',
			icon: <Crosshair2Icon />,
			onSelect: () => props.setFocusMode(!props.focusMode),
		},
		{
			label: 'Reset Editor',
			icon: <TrashIcon />,
			onSelect: () => props.onResetEditorClick(true),
		},
		{
			label: 'Settings',
			icon: <MixerHorizontalIcon />,
		},
		{ type: 'separator' },
		{
			label: 'Aurelius+',
			icon: <StarFilledIcon />,
			link: '/plus',
		},
		{ type: 'separator' },
		{
			label: 'Twitter',
			icon: <TwitterLogoIcon />,
			link: 'https://twitter.com/i4o_dev',
		},
		{
			label: 'Github',
			icon: <GitHubLogoIcon />,
			link: 'https://github.com/i4o-oss/aurelius',
		},
		{
			label: 'About',
			icon: <InfoCircledIcon />,
		},
	]

	return (
		<Dropdown
			align='start'
			items={dropdownItems}
			trigger={<IconButton icon={<HamburgerMenuIcon />} />}
		/>
	)
}
