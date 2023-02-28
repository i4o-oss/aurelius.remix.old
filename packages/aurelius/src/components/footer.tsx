import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

export default function Footer() {
	return (
		<div className='sticky top-0 z-50 flex h-20 w-screen flex-wrap items-center justify-center border-t border-gray-200/20 bg-[#040303] py-4 dark:border-gray-700'>
			<div className='flex w-[88rem] items-center justify-between sm:px-2 lg:px-8 xl:px-12'>
				<div className='flex items-center gap-2 text-gray-300 dark:text-gray-300'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
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
					<p>
						Built by{' '}
						<a
							className='underline'
							href='https://i4o.dev'
							target='_blank'
							rel='noreferrer noopener'
						>
							i4o
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
						<TwitterLogoIcon className='h-6 w-6 text-gray-100 dark:text-gray-100' />
					</a>
				</div>
			</div>
		</div>
	)
}
