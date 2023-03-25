import type { ActionArgs } from '@remix-run/node'
import { Link, useFetcher } from '@remix-run/react'
import { json } from '@remix-run/node'
import { PrimaryButton } from '@i4o/catalystui'
import { findOrCreateWaitlistEntry } from '~/models/waitlist.server'

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()
	const name = formData.get('name') as string
	const email = formData.get('email') as string
	await findOrCreateWaitlistEntry(email, name)
	return json({ message: 'joined' })
}

export default function Join() {
	const waitlistFetcher = useFetcher()

	return (
		<main className='flex min-h-screen w-full flex-col items-center justify-center p-24'>
			<div className='flex max-w-3xl flex-col items-center justify-center'>
				<div className='mb-8 flex flex-col items-center justify-center space-y-8'>
					{/* <img */}
					{/* 	className='w-48' */}
					{/* 	src='/images/logo_dark.png' */}
					{/* 	alt='Logo' */}
					{/* /> */}
					<div className='flex flex-col items-center justify-center space-y-4 text-white'>
						<h1 className='text-5xl font-bold'>
							Join the waitlist for{' '}
							<span className='animate-text bg-gradient-to-r from-[#2cb67d] to-[#124A33] bg-clip-text text-transparent'>
								Aurelius
							</span>
						</h1>
						<p className='text-md font-medium'>
							Already have an access code?{' '}
							<Link
								className='text-brand-500 no-underline'
								to='/signup'
							>
								Sign Up!
							</Link>
						</p>
					</div>
				</div>
				<waitlistFetcher.Form method='post'>
					<div className='flex w-96 flex-col items-center justify-center space-y-4 text-white'>
						<div className='w-full space-y-2'>
							{/* <label htmlFor='email'>Name</label> */}
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='name'
								type='text'
								name='name'
								placeholder='Name'
								required
							/>
						</div>
						<div className='w-full space-y-2'>
							{/* <label htmlFor='email'>Email address</label> */}
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='email'
								type='email'
								name='email'
								placeholder='Email Address'
								required
							/>
						</div>
						<PrimaryButton
							type='submit'
							className='bg-brand-500 flex h-12 w-full items-center justify-center rounded-md'
						>
							Join
						</PrimaryButton>
					</div>
				</waitlistFetcher.Form>
				{waitlistFetcher?.data?.message === 'joined' ? (
					<div className='mt-4 w-96 text-center'>
						Thank you for joining the waitlist. We will get back to
						you very soon.
					</div>
				) : null}
			</div>
		</main>
	)
}
