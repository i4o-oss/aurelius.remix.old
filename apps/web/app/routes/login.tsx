import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { auth } from '~/services/auth.server'
import { sessionStorage } from '~/services/session.server'

export let loader: LoaderFunction = async ({ request }) => {
	await auth.isAuthenticated(request, { successRedirect: '/app' })
	let session = await sessionStorage.getSession(request.headers.get('Cookie'))
	// This session key `auth:magiclink` is the default one used by the EmailLinkStrategy
	// you can customize it passing a `sessionMagicLinkKey` when creating an
	// instance.
	if (session.has('auth:magiclink')) return json({ magicLinkSent: true })

	return json({ magicLinkSent: false })
}

export let action: ActionFunction = async ({ request }) => {
	await auth.authenticate('email-link', request, {
		successRedirect: '/login',
		failureRedirect: '/login',
	})
}

export default function () {
	let { magicLinkSent } = useLoaderData<{ magicLinkSent: boolean }>()

	return (
		<main className='flex min-h-screen w-full flex-col items-center justify-center p-24'>
			<Form action='/login' method='post'>
				<div className='flex max-w-3xl flex-col items-center justify-center'>
					<div className='mb-8 flex flex-col items-center justify-center space-y-8'>
						<img
							className='w-48'
							src='/images/logo_dark.png'
							alt='Logo'
						/>
						<div className='flex flex-col items-center justify-center space-y-4 text-white'>
							<h1 className='text-3xl font-bold'>Sign In</h1>
							<p className='text-lg font-semibold'>
								Sign in with an existing account or create a new
								account.
							</p>
						</div>
					</div>
					<div className='flex w-96 flex-col items-center justify-center space-y-4 text-white'>
						<div className='w-full space-y-2'>
							<label htmlFor='email'>Email address</label>
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='email'
								type='email'
								name='email'
								required
							/>
						</div>
						<button className='bg-brand-500 flex h-12 w-full items-center justify-center rounded-md'>
							Sign In
						</button>
					</div>
					{magicLinkSent && (
						<div className='my-4 w-96 text-center'>
							<p>
								A sign in link has been sent to your email
								address.
							</p>
						</div>
					)}
				</div>
			</Form>
			<div className='my-4 flex w-full max-w-[24rem] items-center justify-center text-white before:relative before:w-1/2 before:border-t before:border-white before:content-[""] after:relative after:w-1/2 after:border-t after:border-white after:content-[""]'>
				<span className='text-md mx-4'>or</span>
			</div>
			<Form action='/auth/google' method='post'>
				<div className='flex w-96 flex-col items-center justify-center space-y-4'>
					<button className='flex h-12 w-full items-center justify-center space-x-2 rounded-md bg-gray-800 text-white'>
						<span>Sign In with Google</span>
					</button>
				</div>
			</Form>
		</main>
	)
}
