import { PrimaryButton } from '@i4o/catalystui'
import { BarChartIcon, ChatBubbleIcon, CodeIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { Header } from '~/components'
import { Theme, useTheme } from '~/lib/theme'

const features = [
	{
		title: 'Cloud Sync',
		description:
			'Save all your work locally with the desktop app or optionally save it to the cloud.',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-6 w-6'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'></path>
			</svg>
		),
	},
	{
		title: 'Public Profile',
		description:
			'Showcase your writing in a public page and get analytics of the visits and views.',
		icon: <PersonIcon className='h-6 w-6' />,
	},
	{
		title: 'Private Sharing',
		description:
			'Share your writing privately to get feedback without publishing to your public page.',
		icon: <Share1Icon className='h-6 w-6' />,
	},
	{
		title: 'Annotations',
		description:
			'Privately shared pages can be annotated by anyone who has the link. No account needed.',
		icon: <ChatBubbleIcon className='h-6 w-6' />,
	},
	{
		title: 'Detailed Stats',
		description:
			'Get detailed stats about your writing sessions, progression, and improvements.',
		icon: <BarChartIcon className='h-6 w-6' />,
	},
	{
		title: 'API Access',
		description:
			'Access your writing via our API and display it in an interface of your choice.',
		icon: <CodeIcon className='h-6 w-6' />,
	},
]

function Features() {
	return (
		<section className='overflow-hidden py-24 sm:py-32'>
			<div className='mx-auto max-w-5xl px-6 lg:px-8'>
				<div className='mx-auto grid max-w-4xl grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
					{/* <p className='text-brand-500 col-span-2 text-base font-semibold leading-7'> */}
					{/* 	Become a better writer */}
					{/* </p> */}
					<h2 className='text-primary-foreground col-span-2 mt-2 text-left text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'>
						Features
					</h2>
					<div className='text-primary-foreground-subtle col-span-2 mt-8 grid w-full grid-cols-2 gap-8 text-base leading-7 lg:max-w-none'>
						{features.map((feature) => (
							<div
								key={`feature-${feature.title}`}
								className='hover:ring-brand hover:dark:ring-brand ring-subtle flex flex-col items-start rounded-2xl px-6 py-5 no-underline ring-1 transition-all duration-200'
							>
								<div className='bg-brand mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-white'>
									{feature.icon}
								</div>
								<h2 className='m-0 mb-2 text-lg font-semibold'>
									{feature.title}
								</h2>
								<span className='text-base leading-normal'>
									{feature.description}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default function Home() {
    const [theme] = useTheme()  

    return (
        <>
            <Header />
            <div className='flex min-h-[calc(100vh-10rem)] w-full flex-col'>
                <div className='isolate h-full'>
                    <main className='h-full'>
                        <div className='relative mx-auto flex w-full max-w-5xl justify-start px-6 lg:px-8'>
                            <div className='w-full py-20 sm:py-32 lg:py-40'>
                                <div className='flex flex-col items-start text-center'>
                                    <img
                                        className={`${theme === Theme.DARK ? 'invert' : ''
                                            } mb-4 w-80`}
                                        src={
                                            theme === Theme.DARK
                                                ? '/images/writing.svg'
                                                : '/images/writing_light.svg'
                                        }
                                        alt='writing illustration'
                                    />
                                    <h1 className='text-primary-foreground text-left text-4xl font-bold tracking-tight sm:leading-tight md:text-6xl'>
                                        The Writing App for Modern Writers
                                    </h1>
                                    <p className='text-primary-foreground-subtle mt-6 text-lg leading-8'>
                                        Focused writing environment that helps
                                        build a writing habit and reach your
                                        writing goals.
                                    </p>
                                    <div className='mt-10 flex items-center justify-center gap-x-6'>
                                        <Link to='/login'>
                                            <PrimaryButton
                                                className='h-12'
                                                padding='px-8'
                                                textSize='text-base'
                                            >
                                                Start Writing
                                            </PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

					<Features />
                </div>
            </div>
        </>
    )
}
