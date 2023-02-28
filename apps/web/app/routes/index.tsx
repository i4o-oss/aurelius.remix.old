import { Link } from '@remix-run/react'
import { PrimaryButton } from '@i4o-oss/catalystui'

export default function Home() {
	return (
		<>
			<div className='flex h-full min-h-[calc(100vh-10rem)] w-full flex-col '>
				<div className='isolate flex h-full w-full items-center'>
					<div className='absolute inset-x-0 top-[10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[20rem]'>
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
					<main className='flex h-full w-full items-center'>
						<div className='relative mx-auto flex w-full max-w-5xl justify-center px-6 lg:px-8'>
							<div className='w-full max-w-4xl py-20 sm:py-32 lg:py-40'>
								<div className='text-center'>
									<h1 className='text-4xl font-bold tracking-tight text-gray-100 dark:text-gray-100 sm:text-6xl sm:leading-tight'>
										Beautiful, minimal writing app
									</h1>
									<p className='mt-6 text-lg leading-8 text-gray-300 dark:text-gray-300'>
										Eliminate distractions when writing,
										build a writing habit, and track your
										daily writing goal.
									</p>
									<div className='mt-10 flex items-center justify-center gap-x-6'>
										<Link to='/docs'>
											<PrimaryButton
												className='h-12'
												padding='px-8'
												textSize='text-base'
											>
												Get Started
											</PrimaryButton>
										</Link>
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
				</div>
			</div>
		</>
	)
}
