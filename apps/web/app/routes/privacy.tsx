export default function PrivacyPolicy() {
	return (
		<div className='flex min-h-[calc(100vh-10rem)] w-full flex-col'>
			<div className='relative mx-auto flex w-full max-w-5xl flex-col justify-center gap-16 px-6 py-20 sm:py-32 lg:px-8 lg:py-40'>
				<div className='prose flex w-full max-w-3xl flex-col items-start text-white'>
					<h1 className='mb-2 text-center text-white'>
						Privacy Policy
					</h1>
					<p className='text-sm text-gray-500'>
						Last Updated: March 12, 2023
					</p>
				</div>
				<div className='flex w-full max-w-3xl flex-col items-start leading-loose text-white'>
					<h2 className='text-xl font-bold dark:text-white'>
						What we don't do:
					</h2>
					<ul className='mt-3 mb-12 list-disc pl-5'>
						<li>Sell your data</li>
						<li>Use your data to promote other products to you</li>
					</ul>
					<h2 className='text-xl font-bold dark:text-white'>
						What we do:
					</h2>
					<ul className='mt-3 mb-12 list-disc pl-5'>
						<li>Use anonymized data to improve Aurelius for you</li>
					</ul>
					<h2 className='text-xl font-bold dark:text-white'>
						What kind of data do we store:
					</h2>
					<ul className='mt-3 mb-12 list-disc pl-5'>
						<li>
							Your name, email and basic details (like social
							media profile information, if you've connected them
							to Aurelius)
						</li>
						<li>
							Your preferences, so you can customize your profile
							as you want
						</li>
						<li>Details of your payments to Aurelius</li>
					</ul>
					<h2 className='mb-3 text-xl font-bold dark:text-white'>
						Things we don't control:
					</h2>
					<p>
						We use some services to operate Aurelius, some of its
						features and improve overall experience. These services
						are not related to Aurelius and are separate entities.
					</p>
					<br />
					<p>
						When you use Aurelius, you indirectly accept the
						Policies of below services.
					</p>
					<ul className='mt-3 mb-12 list-disc pl-5'>
						<li>
							Railway, used to host the website. Their privacy
							policy:{' '}
							<a
								className='text-brand-500'
								href='https://railway.app/legal/privacy'
								target='_blank'
								rel='noopener noreferrer'
							>
								https://railway.app/legal/privacy
							</a>
						</li>
						<li>
							Planetscale, used as database to store user data.
							Their privacy policy:{' '}
							<a
								className='text-brand-500'
								href='https://planetscale.com/legal/privacy'
								target='_blank'
								rel='noopener noreferrer'
							>
								https://planetscale.com/legal/privacy
							</a>
						</li>
						<li>
							Pirsch Analytics, to track app usage metrics. Their
							privacy policy:{' '}
							<a
								className='text-brand-500'
								href='https://pirsch.io/privacy'
								target='_blank'
								rel='noopener noreferrer'
							>
								https://pirsch.io/privacy
							</a>
						</li>
						<li>
							Lemon Squeezy, used for enabling payments in the
							app. Their privacy policy:{' '}
							<a
								className='text-brand-500'
								href='https://www.lemonsqueezy.com/privacy'
								target='_blank'
								rel='noopener noreferrer'
							>
								https://www.lemonsqueezy.com/privacy
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
