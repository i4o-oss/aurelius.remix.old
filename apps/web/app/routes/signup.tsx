import { PrimaryButton } from '@i4o/catalystui'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useFetcher } from '@remix-run/react'
import { createUser } from '~/models/user.server'

export let action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()
	const accessCode = formData.get('accessCode') as string
	const email = formData.get('email') as string
	await createUser({ email, accessCode })
	return json({ message: 'signed-up' })
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
			{/* <div className='my-4 flex w-full max-w-[24rem] items-center justify-center text-white before:relative before:w-1/2 before:border-t before:border-white before:content-[""] after:relative after:w-1/2 after:border-t after:border-white after:content-[""]'> */}
			{/* 	<span className='text-md mx-4'>or</span> */}
			{/* </div> */}
			{/* <Form action='/auth/google' method='post'> */}
			{/* 	<div className='flex w-96 flex-col items-center justify-center space-y-4'> */}
			{/* 		<button className='flex h-12 w-full items-center justify-center space-x-2 rounded-md bg-gray-800 text-white'> */}
			{/* 			<span>Sign In with Google</span> */}
			{/* 		</button> */}
			{/* 	</div> */}
			{/* </Form> */}
		</main>
	)
}
