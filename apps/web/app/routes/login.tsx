import { Button, PrimaryButton } from '@i4o/catalystui'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { sessionStorage } from '~/services/session.server'
import { Form, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import { useTheme } from '~/lib/theme'
import { Theme } from '@i4o/aurelius'

export async function loader({ request }: LoaderArgs) {
	await auth.isAuthenticated(request, { successRedirect: '/' })
	let session = await sessionStorage.getSession(request.headers.get('Cookie'))
	// This session key `auth:magiclink` is the default one used by the EmailLinkStrategy
	// you can customize it passing a `sessionMagicLinkKey` when creating an
	// instance.
	if (session.has('auth:magiclink')) return json({ magicLinkSent: true })

	return json({ magicLinkSent: false })
}

export async function action({ request }: ActionArgs) {
	await auth.authenticate('email-link', request, {
		successRedirect: '/login',
		failureRedirect: '/login',
	})
}

export default function SignIn() {
	const [theme] = useTheme()
	const { magicLinkSent } = useLoaderData<typeof loader>()

	return (
		<main className='flex min-h-screen w-full flex-col items-center justify-center p-24'>
			<div className='mb-8 flex flex-col items-center justify-center space-y-8'>
				<img
					className='w-48'
					src={
						theme === Theme.DARK
							? '/images/logo_dark.png'
							: '/images/logo.png'
					}
					alt='Logo'
				/>
				<div className='text-primary-foreground flex flex-col items-center justify-center space-y-4'>
					<h1 className='text-3xl font-bold'>
						Get Started with Aurelius
					</h1>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center'>
				<div className='bg-primary-subtle text-primary-foreground flex w-96 max-w-3xl flex-col items-center justify-center rounded-xl p-8 shadow-lg'>
					<Form action='/login' method='post'>
						<div className='mb-6 w-full space-y-2'>
							<label htmlFor='email'>
								Enter your email address
							</label>
							<input
								className='focus:border-brand-500 active:border-brand-500 focus:dark:border-brand-500 active:dark:border-brand-500 border-subtle text-primary-foreground h-12 w-full rounded-md border bg-transparent p-4 outline-none focus:bg-transparent active:bg-transparent'
								id='email'
								type='email'
								name='email'
								placeholder='marcus@aurelius.ink'
								required
							/>
							{magicLinkSent ? (
								<p className='text-primary-foreground-subtle text-xs font-normal'>
									Successfully sent magic link.
								</p>
							) : (
								<p className='text-primary-foreground-subtle text-xs font-normal'>
									If you don't have an account, we'll create
									one for you.
								</p>
							)}
						</div>
						<PrimaryButton
							className='bg-brand-500 flex h-12 w-full items-center justify-center rounded-md'
							textSize='text-md'
							type='submit'
						>
							<span className='font-medium'>Sign In</span>
						</PrimaryButton>
					</Form>
					<div className='text-primary-foreground-subtle before:border-subtle after:border-subtle my-4 flex w-full max-w-[24rem] items-center justify-center before:relative before:w-1/2 before:border-t before:content-[""] after:relative after:w-1/2 after:border-t after:content-[""]'>
						<span className='text-md mx-4'>or</span>
					</div>
					<Form
						className='w-full'
						action='/auth/google'
						method='post'
					>
						<Button
							className='flex h-12 w-full'
							leftIcon={
								<svg
									className='h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 488 512'
									fill='currentColor'
								>
									<path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
								</svg>
							}
							padding='py-4'
							textSize='text-md'
							type='submit'
						>
							<span className='font-medium'>
								Continue with Google
							</span>
						</Button>
					</Form>
				</div>
			</div>
		</main>
	)
}
