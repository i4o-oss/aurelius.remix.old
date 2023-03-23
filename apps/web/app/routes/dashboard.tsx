import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { Footer, Header } from '~/components'
import { auth } from '~/services/auth.server'

export async function loader({ request }: LoaderArgs) {
	const user = await auth.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	return json({ user })
}

export default function Dashboard() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div className='flex min-h-screen flex-col'>
			<Header user={user} />
			<main className='flex min-h-[calc(100vh-20rem)] flex-1 items-start justify-center pb-16'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
