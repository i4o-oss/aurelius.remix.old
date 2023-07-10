import type { RescribeConfig } from '@i4o/rescribe'
import { Switch } from '@i4o/catalystui'
import { Theme, useTheme } from '~/lib/theme'
import {
	FileTextIcon,
	GitHubLogoIcon,
	HeartFilledIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { Logo } from './components'

function DarkModeToggle() {
	const [theme, setTheme] = useTheme()

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		)
	}

	return (
		<Switch
			defaultChecked={theme === Theme.DARK}
			name='theme-switcher'
			onCheckedChange={toggleTheme}
		/>
	)
}

const config: RescribeConfig = {
	footer: {
		socials: [
			{
				ariaLabel: 'Github Repository',
				icon: <GitHubLogoIcon className='h-6 w-6' />,
				href: 'https://github.com/i4o-oss/aurelius',
			},
			{
				ariaLabel: 'Twitter Profile',
				icon: <TwitterLogoIcon className='h-6 w-6' />,
				href: 'https://twitter.com/i4o_dev',
			},
		],
		text: (
			<div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
				<svg
					className='h-5 w-5'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='m7 11 2-2-2-2'></path>
					<path d='M11 13h4'></path>
					<rect
						x='3'
						y='3'
						width='18'
						height='18'
						rx='2'
						ry='2'
					></rect>
				</svg>
				<p className='flex items-center text-sm'>
					Built with <HeartFilledIcon className='mx-1 text-red-500' />{' '}
					by{' '}
					<a
						className='ml-1 underline'
						href='https://twitter.com/i4o_dev'
						target='_blank'
						rel='noreferrer noopener'
					>
						i4o
					</a>
					.
				</p>
			</div>
		),
	},
	navbar: {
		logo: <Logo />,
		search: false,
		socials: [
			{
				ariaLabel: 'Github Repository',
				icon: <GitHubLogoIcon className='h-6 w-6' />,
				href: 'https://github.com/i4o-oss/aurelius',
			},
		],
	},
	sidebar: {
		links: [
			{
				href: '/docs',
				icon: <FileTextIcon className='h-4 w-4' />,
				label: 'Documentation',
			},
			{
				external: true,
				href: 'https://github.com/i4o-oss/aurelius',
				icon: <GitHubLogoIcon className='h-4 w-4' />,
				label: 'Github',
			},
		],
		navigation: {
			docs: [
				{
					group: 'Overview',
					pages: {
						_index: 'Introduction',
						'getting-started': 'Getting Started',
						// changelog: 'Changelog',
						// roadmap: 'Roadmap',
					},
				},
			],
		},
		search: false,
	},
	theme: {
		darkModeToggle: <DarkModeToggle />,
	},
}

export default config
