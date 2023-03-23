import { Writer } from '@i4o/aurelius'
import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { Theme, useTheme } from '~/lib/theme'
import { auth } from '~/services/auth.server'

export async function loader({ request }: LoaderArgs) {
	let user = await auth.isAuthenticated(request)
	return json({ user })
}

export default function Write() {
	const { user } = useLoaderData<typeof loader>()
	const [theme, setTheme] = useTheme()

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		)
	}

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Writer
				theme={theme as Theme}
				toggleTheme={toggleTheme}
				user={user}
			/>
		</main>
	)
}
