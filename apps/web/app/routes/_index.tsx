import { Writer } from '@i4o/aurelius'
import { Theme, useTheme } from '~/lib/theme'

export default function Write() {
	const [theme, setTheme] = useTheme()

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		)
	}

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Writer theme={theme as Theme} toggleTheme={toggleTheme} />
		</main>
	)
}
