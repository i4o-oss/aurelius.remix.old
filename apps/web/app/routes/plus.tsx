import { Link } from '@remix-run/react'
import { PrimaryButton, Switch } from '@i4o/catalystui'
import { Footer, Header } from '~/components'
import {
	BarChartIcon,
	ChatBubbleIcon,
	CheckIcon,
	ChevronDownIcon,
	CodeIcon,
	PersonIcon,
	Share1Icon,
} from '@radix-ui/react-icons'
import { Theme, useTheme } from '~/lib/theme'
import { useState } from 'react'
import { EMAIL_ADDRESS } from '~/lib/constants'

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

const freeFeatures = [
	'Unlimited Posts',
	'Cloud Sync',
	'1 Writing Session / day',
	'Simple Writing Stats',
]

const includedFeatures = [
	'Everything from free plan',
	'Unlimited Writing Sessions',
	'All updates',
	'Advanced Writing Stats',
	'Public Profiles',
	'Early access to features',
]

const faqs = [
	{
		question: 'Do you provide any free plan?',
		answer: 'The base app is free to use and we are constantly adding new features for free.',
	},
	{
		question: 'What does "lifetime access" mean exactly?',
		answer: 'Buying the lifetime membership is a one-time purchase, with no recurring subscription. Once you own a license, you get access to all features in Aurelius, forever.',
	},
	{
		question: 'What does "free updates" include?',
		answer: (
			<p>
				When you purchase the lifetime membership, you get access to
				every feature that is currently available in Aurelius, along
				with any and all features we will build in the future.
				<br />
				<br />
				For subscriptions, you get access to premium features as long as
				the subscription is active
				{/* <br /> */}
				{/* <br /> */}
				{/* To get an idea of what updates have looked like in the past,{' '} */}
				{/* <a className='text-brand-500 no-underline' href='#'> */}
				{/* 	check our changelog */}
				{/* </a> */}.
			</p>
		),
	},
	{
		question: 'Can I use Aurelius for client projects?',
		answer: 'Absolutely. Anything you write with Aurelius, is owned by you 100%. You can do whatever you want with it.',
	},
	{
		question: 'Can I use Aurelius for commercial projects?',
		answer: 'Absolutely. Anything you write with Aurelius, is owned by you 100%. You can do whatever you want with it.',
	},
	{
		question: 'Is Aurelius open-source?',
		answer: 'Yes! Aurelius is open-source. That means the entire source code of Aurelius is available for anyone to see and modify for their own use. You cannot, however, host Aurelius and resell our services under any name.',
	},
	{
		question: 'Do you offer technical support?',
		answer: (
			<p>
				Yes. We're figuring out a better way to record and handle bugs.
				In the meantime, email us at{' '}
				<a
					className='text-brand-500 no-underline'
					href={`mailto:${EMAIL_ADDRESS}`}
				>
					{`${EMAIL_ADDRESS}`}
				</a>
				.
			</p>
		),
	},
	{
		question: 'What is your refund policy?',
		answer: (
			<p>
				If you're unhappy with your purchase for any reason, email us at{' '}
				<a
					className='text-brand-500 no-underline'
					href={`mailto:${EMAIL_ADDRESS}`}
				>
					{`${EMAIL_ADDRESS}`}
				</a>{' '}
				within 30 days and we'll refund you in full, no questions asked.
			</p>
		),
	},
]

function Pricing() {
	const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
		'yearly'
	)
	return (
		<section className='py-24 sm:py-32'>
			<div className='mx-auto max-w-5xl px-6 lg:px-8'>
				<div className='mx-auto max-w-2xl sm:text-center'>
					<h2 className='text-primary-foreground text-3xl font-bold tracking-tight sm:text-4xl'>
						Pricing Preview
					</h2>
					<p className='text-primary-foreground-subtle mt-6 text-lg leading-8'>
						Aurelius is currently free to use. For now, everyone who
						signs up will get all the features. Below is a preview
						of how we're thinking about pricing (but it's subject to
						change). We will let you know 2 weeks before rolling out
						pricing.
					</p>
				</div>

				<div className='ring-subtle mx-auto mt-16 max-w-2xl rounded-3xl ring-1 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
					<div className='flex flex-col justify-center p-8 sm:p-10 lg:flex-auto'>
						<h3 className='text-primary-foreground text-2xl font-bold tracking-tight'>
							Free
						</h3>
						<div className='mt-10 flex items-center gap-x-4'>
							<h4 className='text-brand-500 flex-none text-sm font-semibold leading-6'>
								What’s included
							</h4>
							<div className='bg-subtle h-px flex-auto' />
						</div>
						<ul
							role='list'
							className='text-primary-foreground-subtle mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6'
						>
							{freeFeatures.map((feature) => (
								<li key={feature} className='flex gap-x-3'>
									<CheckIcon
										className='text-brand h-6 w-5 flex-none'
										aria-hidden='true'
									/>
									{feature}
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='ring-subtle mx-auto mt-16 max-w-2xl rounded-3xl ring-1 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
					<div className='flex flex-col justify-center p-8 sm:p-10 lg:flex-auto'>
						<h3 className='text-primary-foreground text-2xl font-bold tracking-tight'>
							Subscription
						</h3>
						<div className='mt-10 flex items-center gap-x-4'>
							<h4 className='text-brand-500 flex-none text-sm font-semibold leading-6'>
								What’s included
							</h4>
							<div className='bg-subtle h-px flex-auto' />
						</div>
						<ul
							role='list'
							className='text-primary-foreground-subtle mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6'
						>
							{includedFeatures.map((feature) => (
								<li key={feature} className='flex gap-x-3'>
									<CheckIcon
										className='text-brand h-6 w-5 flex-none'
										aria-hidden='true'
									/>
									{feature}
								</li>
							))}
						</ul>
					</div>
					<div className='-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-sm lg:flex-shrink-0'>
						<div className='bg-primary-subtle late-100 ring-subtle relative rounded-2xl py-6 text-center ring-1 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-12'>
							<div className='absolute top-4 right-4 flex items-center justify-center gap-x-2'>
								<label className='text-xs'>
									{billingPeriod === 'monthly'
										? 'Monthly'
										: 'Yearly'}
								</label>
								<Switch
									name='billing-period'
									defaultChecked={billingPeriod === 'monthly'}
									onCheckedChange={(state) =>
										setBillingPeriod(
											state ? 'monthly' : 'yearly'
										)
									}
								/>
							</div>
							<div className='mx-auto max-w-xs px-8'>
								<p className='mt-6 flex items-baseline justify-center gap-x-2'>
									<span className='text-primary-foreground text-5xl font-bold tracking-tight'>
										{billingPeriod === 'monthly'
											? '$15'
											: '$12.5'}
									</span>
									<span className='text-primary-foreground-subtle text-sm font-semibold leading-6 tracking-wide'>
										/month
									</span>
								</p>
								{billingPeriod === 'yearly' ? (
									<p className='mt-4 text-sm italic'>
										billed annually ($150)
									</p>
								) : (
									<p className='mt-4 text-sm italic'>
										billed monthly
									</p>
								)}
								<PrimaryButton
									className='mt-10 w-full'
									padding='px-6 py-4'
									textSize='text-lg'
								>
									Try it free for 7 days
								</PrimaryButton>
								<p className='text-primary-foreground-subtle mt-6 text-xs leading-5'>
									Cancel anytime. We'll remind you 3 days
									before trial ends.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='ring-subtle mx-auto mt-16 max-w-2xl rounded-3xl ring-1 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
					<div className='flex flex-col justify-center p-8 sm:p-10 lg:flex-auto'>
						<h3 className='text-primary-foreground text-2xl font-bold tracking-tight'>
							Lifetime membership
						</h3>
						<div className='mt-10 flex items-center gap-x-4'>
							<h4 className='text-brand-500 flex-none text-sm font-semibold leading-6'>
								What’s included
							</h4>
							<div className='bg-subtle h-px flex-auto' />
						</div>
						<ul
							role='list'
							className='text-primary-foreground mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6'
						>
							{includedFeatures.map((feature) => (
								<li key={feature} className='flex gap-x-3'>
									<CheckIcon
										className='text-brand h-6 w-5 flex-none'
										aria-hidden='true'
									/>
									{feature}
								</li>
							))}
						</ul>
					</div>
					<div className='-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-sm lg:flex-shrink-0'>
						<div className='bg-primary-subtle ring-subtle rounded-2xl py-6 text-center ring-1 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-12'>
							<div className='mx-auto max-w-xs px-8'>
								<p className='mt-6 flex items-baseline justify-center gap-x-2'>
									<span className='text-primary-foreground text-5xl font-bold tracking-tight'>
										$50
									</span>
									<span className='text-primary-foreground-subtle text-base font-semibold italic leading-6 tracking-wide'>
										<s>$150</s>
									</span>
								</p>
								<p className='mt-4 text-sm italic'>
									Early Bird Pricing
								</p>
								<PrimaryButton
									className='mt-10 w-full'
									padding='px-6 py-4'
									textSize='text-lg'
								>
									Try it free for 14 days
								</PrimaryButton>
								<p className='text-primary-foreground-subtle mt-6 text-xs leading-5'>
									30 days refund policy. No questions asked.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function FAQ() {
	return (
		<section className='py-24 sm:py-32'>
			<div className='mx-auto max-w-5xl px-6 lg:px-8'>
				<div className='mx-auto max-w-2xl sm:text-center'>
					<h2 className='text-primary-foreground text-3xl font-bold tracking-tight sm:text-4xl'>
						FAQ
					</h2>
				</div>
				<div className='text-primary-foreground mt-8 flex w-full flex-col gap-4 text-base leading-7 lg:max-w-none'>
					{faqs.map((faq, index) => (
						<details
							className='shadow-10xl group-open:ring-brand-500 ring-subtle group flex flex-wrap justify-between rounded-2xl bg-transparent py-7 px-8 ring-1'
							key={`faq-${index}`}
						>
							<summary className='flex cursor-pointer list-none items-center justify-between font-medium'>
								<h3 className='text-primary-foreground text-lg font-semibold leading-normal'>
									{faq.question}
								</h3>
								<span className='flex w-auto items-center justify-center p-2 transition group-open:rotate-180'>
									<ChevronDownIcon className='h-6 w-6' />
								</span>
							</summary>
							<p className='group-open:animate-fadeIn text-primary-foreground-subtle mt-4 font-medium'>
								{faq.answer}
							</p>
						</details>
					))}
				</div>
			</div>
		</section>
	)
}

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
										className={`${
											theme === Theme.DARK ? 'invert' : ''
										} mb-4 w-80`}
										src={
											theme === Theme.DARK
												? '/images/writing.svg'
												: '/images/writing_light.svg'
										}
										alt='writing illustration'
									/>
									<h1 className='text-primary-foreground text-left text-4xl font-bold tracking-tight sm:leading-tight md:text-6xl'>
										Writing App for Modern Writers
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

					{/* <div className='mx-auto max-w-5xl px-8 text-left lg:px-8'> */}
					{/* 	TODO: Add a big carousel of screenshots (shots.so) */}
					{/* </div> */}

					<Features />

					<Pricing />

					<FAQ />
				</div>
			</div>
			<Footer />
		</>
	)
}
