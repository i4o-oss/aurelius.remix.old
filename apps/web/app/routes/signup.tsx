import { PrimaryButton } from '@i4o/catalystui'
import type { ActionFunction } from '@remix-run/node'
import { Link, useFetcher } from '@remix-run/react'
import { auth } from '~/services/auth.server'

export let action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()
	return await auth.authenticate('form', request, {
		successRedirect: '/',
		failureRedirect: '/signup',
		context: { formData },
	})
}

export default function SignUp() {
	const signupFetcher = useFetcher()

	return (
		<main className='flex min-h-screen w-full flex-col items-center justify-center p-24'>
			<signupFetcher.Form method='post'>
				<div className='flex max-w-3xl flex-col items-center justify-center'>
					<div className='mb-8 flex flex-col items-center justify-center space-y-8'>
						<img
							className='w-48'
							src='/images/logo_dark.png'
							alt='Logo'
						/>
						<div className='flex flex-col items-center justify-center space-y-4 text-white'>
							<h1 className='text-3xl font-bold'>Sign Up</h1>
							<p className='text-md font-medium'>
								Sign up with your email and access code.{' '}
								<Link
									className='text-brand-500 no-underline'
									to='/join'
								>
									Don't have an access code?
								</Link>
							</p>
						</div>
					</div>
					<div className='flex w-96 flex-col items-center justify-center space-y-4 text-white'>
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
						<div className='w-full space-y-2'>
							{/* <label htmlFor='email'>Email address</label> */}
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='password'
								type='password'
								name='password'
								placeholder='Password'
								required
							/>
						</div>
						<div className='w-full space-y-2'>
							{/* <label htmlFor='email'>Access Code</label> */}
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='accessCode'
								type='text'
								name='accessCode'
								placeholder='Access Code'
								required
							/>
						</div>
						<PrimaryButton
							type='submit'
							className='bg-brand-500 flex h-12 w-full items-center justify-center rounded-md'
						>
							Sign Up
						</PrimaryButton>
					</div>
					{signupFetcher?.data?.message === 'signed-up' ? (
						<div className='my-4 w-96 text-center'>
							<p>
								Welcome! A sign in link has been sent to your
								email address.
							</p>
						</div>
					) : null}
				</div>
			</signupFetcher.Form>
		</main>
	)
}
