import { Dropdown, IconButton } from '@i4o/catalystui'
import {
	DownloadIcon,
	FileIcon,
	FileTextIcon,
	GitHubLogoIcon,
	HamburgerMenuIcon,
	MixerHorizontalIcon,
	Pencil1Icon,
	StarFilledIcon,
	TrashIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'

export default function MainMenu() {
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
			label: 'Reset Editor',
			icon: <TrashIcon />,
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
		{ type: 'separator' },
		{
			label: 'Settings',
			icon: <MixerHorizontalIcon />,
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
