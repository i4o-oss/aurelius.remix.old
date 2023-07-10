import { useTheme, Theme } from '~/lib/theme'

export default function Logo() {
	const [theme] = useTheme()

	return (
		<img
			className='w-24'
			src={
				theme === Theme.DARK
					? '/images/logo_dark.png'
					: '/images/logo.png'
			}
			alt='Aurelius Logo'
		/>
	)
}
