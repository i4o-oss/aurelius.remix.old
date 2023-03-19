import { HeartFilledIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

export default function Footer() {
	return (
		<div className='flex h-20 w-screen flex-wrap items-center justify-center border-t border-gray-200/50 bg-transparent p-4 dark:border-gray-700/20 lg:px-0'>
			<div className='flex w-[88rem] items-center justify-between sm:px-2 lg:px-8 xl:px-12'>
				<div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
					<svg
						className='h-5 w-5'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='m7 11 2-2-2-2'></path>
						<path d='M11 13h4'></path>
						<rect
							x='3'
							y='3'
							width='18'
							height='18'
							rx='2'
							ry='2'
						></rect>
					</svg>
					<p className='flex items-center text-sm'>
						Built with{' '}
						<HeartFilledIcon className='mx-1 text-red-500' /> by{' '}
						<a
							className='underline ml-1'
							href='https://i4o.dev'
							target='_blank'
							rel='noreferrer noopener'
						>
							i4o
						</a>
						. Illustrations by{' '}
						<a
							className='underline'
							href='https://popsy.co'
							target='_blank'
							rel='noreferrer noopener'
						>
							popsy.co
						</a>
						.
					</p>
				</div>
				<div className='flex items-center justify-end gap-4'>
					{/* <a */}
					{/* 	aria-label='Github Repo' */}
					{/* 	href='https://github.com/i4o-oss/rescribe' */}
					{/* 	target='_blank' */}
					{/* 	rel='noreferrer noopener' */}
					{/* > */}
					{/* 	<GitHubLogoIcon className='h-6 w-6 text-gray-100 dark:text-gray-100' /> */}
					{/* </a> */}
					<a
						aria-label='Twitter Profile'
						href='https://twitter.com/i4o_dev'
						target='_blank'
						rel='noreferrer noopener'
					>
						<TwitterLogoIcon className='h-5 w-5 text-slate-700 dark:text-slate-300' />
					</a>
				</div>
			</div>
		</div>
	)
}
