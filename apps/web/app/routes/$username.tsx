import { Outlet } from '@remix-run/react'
import { Footer, Header } from '~/components'

export default function Blog() {
	return (
		<div className='flex min-h-screen flex-col'>
			<Header />
			<main className='flex min-h-[calc(100vh-20rem)] flex-1 items-start justify-center pb-16'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
