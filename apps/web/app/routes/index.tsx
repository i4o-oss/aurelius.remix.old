import { Link } from '@remix-run/react'
import { PrimaryButton } from '@i4o-oss/catalystui'
import { Footer, Header } from '@i4o/aurelius'
import {
	ArrowTopRightIcon,
	Crosshair2Icon,
	Pencil1Icon,
	PlayIcon,
	UploadIcon,
} from '@radix-ui/react-icons'

const features = [
	{
		name: 'Focus Mode',
		description:
			"Eliminate distracting UI and in fullscreen while you're writing. Just your words and you.",
		icon: Crosshair2Icon,
	},
	{
		name: 'Writing Sessions',
		description:
			'Set a daily word count or time goal and track your habit and improvements over time.',
		icon: Pencil1Icon,
	},
	{
		name: 'Cloud Sync',
		description:
			'Save all your work locally with the desktop app or optionally save it to the cloud.',
		icon: UploadIcon,
	},
	{
		name: 'Music Player',
		description:
			'No need to search for focus music elsewhere. Aurelius has a built-in music player that plays lo-fi music to help you focus.',
		icon: PlayIcon,
	},
]

export default function Home() {
	return (
		<>
			<Header />
			<div className='flex min-h-[calc(100vh-10rem)] w-full flex-col'>
				<div className='isolate h-full'>
					<div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
						<svg
							className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
							viewBox='0 0 1155 678'
						>
							<path
								fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
								fillOpacity='.3'
								d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
							/>
							<defs>
								<linearGradient
									id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
									x1='1155.49'
									x2='-78.208'
									y1='.177'
									y2='474.645'
									gradientUnits='userSpaceOnUse'
								>
									<stop stopColor='#124A33' />
									<stop offset={1} stopColor='#2cb67d' />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<main className='h-full'>
						<div className='relative mx-auto flex w-full max-w-5xl justify-center px-6 lg:px-8'>
							<div className='w-full max-w-4xl py-20 sm:py-32 lg:py-40'>
								<div className='flex flex-col items-start text-center'>
									<img
										className='mb-4 w-80 invert'
										src='/images/writing.svg'
										alt='writing illustration'
									/>
									<h1 className='text-4xl font-bold tracking-tight text-gray-100 dark:text-gray-100 sm:text-6xl sm:leading-tight'>
										Beautiful, minimal writing app
									</h1>
									<p className='mt-6 text-lg leading-8 text-gray-300 dark:text-gray-300'>
										Eliminate distractions when writing,
										build a writing habit, and track your
										daily writing goal.
									</p>
									<div className='mt-10 flex items-center justify-center gap-x-6'>
										<Link to='/write'>
											<PrimaryButton
												className='h-12'
												padding='px-8'
												textSize='text-base'
											>
												Start Writing
											</PrimaryButton>
										</Link>
										<a
											target='_blank'
											href='https://twitter.com/i4o_dev'
											rel='noreferrer'
										>
											<button className='text-brand-500 flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium leading-8'>
												<span>Get Updates</span>
												<ArrowTopRightIcon className='ml-1 mt-1 h-[18px] w-[18px]' />
											</button>
										</a>
									</div>
								</div>
							</div>
							<div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
								<svg
									className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
									viewBox='0 0 1155 678'
								>
									<path
										fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
										fillOpacity='.3'
										d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
									/>
									<defs>
										<linearGradient
											id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
											x1='1155.49'
											x2='-78.208'
											y1='.177'
											y2='474.645'
											gradientUnits='userSpaceOnUse'
										>
											<stop stopColor='#124A33' />
											<stop
												offset={1}
												stopColor='#2cb67d'
											/>
										</linearGradient>
									</defs>
								</svg>
							</div>
						</div>
					</main>
					<div className='overflow-hidden py-24 sm:py-32'>
						<div className='mx-auto max-w-7xl px-6 lg:px-8'>
							<div className='mx-auto grid max-w-2xl grid-cols-2 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
								<div className='lg:pr-8 lg:pt-4'>
									<div className='lg:max-w-lg'>
										<h2 className='text-brand-500 text-base font-semibold leading-7'>
											Become a better writer
										</h2>
										<p className='mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl'>
											The Ultimate Writing App
										</p>
										{/* <p className='mt-6 text-lg leading-8 text-gray-300'> */}
										{/* 	Lorem ipsum, dolor sit amet */}
										{/* 	consectetur adipisicing elit. */}
										{/* 	Maiores impedit perferendis suscipit */}
										{/* 	eaque, iste dolor cupiditate */}
										{/* 	blanditiis ratione. */}
										{/* </p> */}
										<dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none'>
											{features.map((feature) => (
												<div
													key={feature.name}
													className='relative pl-9'
												>
													<dt className='inline font-semibold text-gray-100'>
														<feature.icon
															className='text-brand-500 absolute top-1 left-1 h-5 w-5'
															aria-hidden='true'
														/>
														{feature.name}
													</dt>{' '}
													<dd className='inline'>
														{feature.description}
													</dd>
												</div>
											))}
										</dl>
									</div>
								</div>
								<img
									src='/images/features.svg'
									alt='features illustration'
									className='w-[32rem] invert'
									width={2432}
									height={1442}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
