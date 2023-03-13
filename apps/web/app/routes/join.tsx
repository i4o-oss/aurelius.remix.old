import type { ActionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'

export async function action({ request }: ActionArgs) {
	// TODO: Save name and email to a waitlist table
	const formData = await request.formData()
	console.log(formData)
}

export default function Join() {
	const waitlistFetcher = useFetcher()

	return (
		<main className='flex min-h-screen w-full flex-col items-center justify-center p-24'>
			<waitlistFetcher.Form method='post'>
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
						</div>
					</div>
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
						<button className='bg-brand-500 flex h-12 w-full items-center justify-center rounded-md'>
							Join
						</button>
					</div>
				</div>
			</waitlistFetcher.Form>
		</main>
	)
}
