import { Outlet } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import { Header } from '@i4o/aurelius'

export let loader: LoaderFunction = async ({ request }) => {
	// If the user is here, it's already authenticated, if not redirect them to
	// the login page.
	let user = await auth.isAuthenticated(request)
	return json({ user })
}

export default function App() {
	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Header />
			<Outlet />
		</main>
	)
}
