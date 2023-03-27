import { Button, PrimaryButton } from '@i4o/catalystui'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { sessionStorage } from '~/services/session.server'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import { useTheme } from '~/lib/theme'
import { Theme } from '@i4o/aurelius'

export async function loader({ request }: LoaderArgs) {
	await auth.isAuthenticated(request, { successRedirect: '/' })
	const session = await sessionStorage.getSession(
		request.headers.get('Cookie')
	)

	return json({
		magicLinkSent: session.has('auth:magicLink'),
		magicLinkEmail: session.get('auth:email'),
	})
}

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()
	await auth.authenticate('email-link', request, {
		successRedirect: '/',
		failureRedirect: '/login',
		context: { formData },
	})
}

export default function SignIn() {
	const loginFetcher = useFetcher()
	const [theme] = useTheme()
	const { magicLinkSent, magicLinkEmail } = useLoaderData<typeof loader>()

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
				<div className='flex flex-col items-center justify-center space-y-4 text-slate-900 dark:text-slate-50'>
					<h1 className='text-3xl font-bold'>
						Get Started with Aurelius
					</h1>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center'>
				<div className='flex w-96 max-w-3xl flex-col items-center justify-center rounded-xl bg-slate-200 p-8 text-slate-900 shadow-lg dark:bg-slate-900 dark:text-slate-50'>
					<loginFetcher.Form method='post'>
						<div className='mb-6 w-full space-y-2'>
							<label htmlFor='email'>
								Enter your email address
							</label>
							<input
								className='focus:border-brand-500 active:border-brand-500 focus:dark:border-brand-500 active:dark:border-brand-500 h-12 w-full rounded-md border border-slate-700 bg-transparent p-4 text-slate-900 outline-none focus:bg-transparent active:bg-transparent dark:border-slate-300 dark:text-slate-50'
								id='email'
								type='email'
								name='email'
								placeholder='marcus@aurelius.ink'
								required
							/>
							{magicLinkSent ? (
								<p className='text-xs font-normal text-slate-600 dark:text-slate-400'>
									Successfully sent magic link{' '}
									{magicLinkEmail
										? `to ${magicLinkEmail}`
										: ''}
								</p>
							) : (
								<p className='text-xs font-normal text-slate-600 dark:text-slate-400'>
									If you don't have an account yet, we'll
									create one for you.
								</p>
							)}
						</div>
						<PrimaryButton
							className='bg-brand-500 flex h-12 w-full items-center justify-center rounded-md'
							textSize='text-md'
						>
							<span className='font-medium'>Sign In</span>
						</PrimaryButton>
					</loginFetcher.Form>
					<div className='my-4 flex w-full max-w-[24rem] items-center justify-center text-slate-500 before:relative before:w-1/2 before:border-t before:border-slate-400 before:content-[""] after:relative after:w-1/2 after:border-t after:border-slate-400 after:content-[""] dark:text-slate-500 before:dark:border-slate-600 after:dark:border-slate-600'>
						<span className='text-md mx-4'>or</span>
					</div>
					<loginFetcher.Form
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
						>
							<span className='font-medium'>
								Continue with Google
							</span>
						</Button>
					</loginFetcher.Form>
				</div>
			</div>
		</main>
	)
}
