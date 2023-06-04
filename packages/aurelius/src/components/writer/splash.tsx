import { Button, Dialog, Switch } from '@i4o/catalystui'
import {
	CounterClockwiseClockIcon,
	EnterIcon,
	FileTextIcon,
	GearIcon,
	InfoCircledIcon,
	Pencil1Icon,
	RocketIcon,
	StackIcon,
} from '@radix-ui/react-icons'
import { useContext } from 'react'
import { AureliusContext, AureliusProviderData } from './provider'

interface SplashScreenProps {
	continueWritingHandler: () => void
	newPostHandler: () => void
	newWritingSessionHandler: () => void
	preferencesHandler: () => void
	saveDisplaySplashScreenSetting: (checked: boolean) => void
}

export default function SplashScreen({
	continueWritingHandler,
	newPostHandler,
	newWritingSessionHandler,
	preferencesHandler,
	saveDisplaySplashScreenSetting,
}: SplashScreenProps) {
	const {
		localPost,
        setShowHelpDialog,
		showSplashScreenDialog,
		setShowSplashScreenDialog,
		user,
	} = useContext<AureliusProviderData>(AureliusContext)

	return (
		<Dialog
			open={showSplashScreenDialog}
			onOpenChange={setShowSplashScreenDialog}
			title=''
		>
			<div className='au-flex au-flex-col au-min-h-[36rem] au-h-auto au-w-[40rem] au-rounded-lg au-overflow-hidden au-divide-y au-divide-subtle'>
				<div className='au-relative au-w-full au-h-[16rem] au-flex au-items-start au-justify-start au-p-8'>
					<img
						className='au-w-full au-h-full au-object-cover au-object-center au-z-0 au-absolute au-top-0 au-left-0'
						src='/images/splash-screen-cover.png'
					/>
					<div className='au-w-full au-h-full au-absolute au-top-0 au-left-0 au-bg-gray-900/80 au-z-10' />
					<img
						className='au-w-32 au-z-20'
						src={'/images/logo_dark.png'}
						alt='Aurelius Logo'
					/>
				</div>
				<div className='au-grid au-grid-cols-2 au-flex-col au-w-full au-min-h-[20rem] au-h-auto au-flex-1 au-flex-grow au-p-8 au-gap-8'>
					<div className='au-col-span-1 au-py-2  au-flex au-flex-col'>
						<h3 className='au-text-sm au-font-semibold au-text-primary-foreground-subtle au-mb-4'>
							Getting Started
						</h3>
						<ul className='au-text-sm au-flex au-flex-col au-gap-4'>
							<li className='au-flex au-items-center au-justify-between'>
								<Button
									className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
									leftIcon={<FileTextIcon />}
									onClick={newPostHandler}
								>
									New Post
								</Button>
								<span className='au-flex au-items-center au-gap-1 au-text-xs '>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										N
									</kbd>
								</span>
							</li>
							<li className='au-flex au-items-center au-justify-between'>
								<Button
									className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
									leftIcon={<Pencil1Icon />}
									onClick={newWritingSessionHandler}
								>
									New Writing Session
								</Button>
								<span className='au-flex au-items-center au-gap-1 au-text-xs '>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										W
									</kbd>
								</span>
							</li>
							<li className='au-flex au-items-center au-justify-between'>
								<Button
									className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
									leftIcon={<GearIcon />}
									onClick={preferencesHandler}
								>
									Preferences
								</Button>
								<span className='au-flex au-items-center au-gap-1 au-text-xs '>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										S
									</kbd>
								</span>
							</li>
						</ul>
					</div>
					{user || localPost ? (
						<div className='au-col-span-1 au-py-2  au-flex au-flex-col'>
							<h3 className='au-text-sm au-font-semibold au-text-primary-foreground-subtle au-mb-4'>
								Previous Session
							</h3>
							<ul className='au-text-sm au-flex au-flex-col au-gap-4'>
								{localPost ? (
									<li className='au-flex au-items-center au-justify-between'>
										<Button
											className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
											leftIcon={
												<CounterClockwiseClockIcon />
											}
											onClick={continueWritingHandler}
										>
											Continue Writing
										</Button>
										<span className='au-flex au-items-center au-gap-1 au-text-xs '>
											<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
												Esc
											</kbd>
										</span>
									</li>
								) : null}
								{user ? (
									<li className='au-flex au-items-center au-justify-between'>
										<a href='/dashboard'>
											<Button
												className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
												leftIcon={<StackIcon />}
											>
												See all posts
											</Button>
										</a>
									</li>
								) : null}
							</ul>
						</div>
					) : (
						<div className='au-col-span-1 au-py-2  au-flex au-flex-col'>
							<h3 className='au-text-sm au-font-semibold au-text-primary-foreground-subtle au-mb-4'>
								Account
							</h3>
							<ul className='au-text-sm au-flex au-flex-col au-gap-4'>
								<li className='au-flex au-items-center au-justify-between'>
									<a href='/login'>
										<Button
											className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
											leftIcon={<EnterIcon />}
										>
											Sign Up for free!
										</Button>
									</a>
								</li>
							</ul>
						</div>
					)}
					<div className='au-col-span-2 au-py-2  au-flex au-flex-col'>
						<ul className='au-w-full au-grid au-grid-cols-2 au-text-sm au-gap-8'>
							<li className='au-col-span-1 au-flex au-items-center au-justify-between'>
								<Button
									className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
									leftIcon={<InfoCircledIcon />}
                                    onClick={() => setShowHelpDialog?.(true)}
								>
									Help
								</Button>
								<span className='au-flex au-items-center au-gap-1'>
									<kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										?
									</kbd>
								</span>
							</li>
							<li className='au-col-span-1 au-flex au-items-center au-justify-between'>
								<a
									href='/plus'
									target='_blank'
									rel='noreferrer noopener'
								>
									<Button
										className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
										leftIcon={<RocketIcon />}
									>
										Try Aurelius Plus!
									</Button>
								</a>
							</li>
						</ul>
					</div>
					{!user ? (
						<div className='au-col-span-2 au-py-2  au-flex au-flex-col'>
							<p className='au-leading-relaxed au-italic au-text-xs au-text-primary-foreground-subtle'>
								Note: All your data will be saved locally in the
								browser.
							</p>
						</div>
					) : null}
				</div>
				<div className='au-w-full au-px-8 au-py-4 au-flex au-items-center au-gap-2'>
					<Switch
						defaultChecked={false}
						name='dont-show-again'
						onCheckedChange={saveDisplaySplashScreenSetting}
					/>
					<p className='au-text-primary-foreground-subtle au-text-xs'>
						Don't show this again.
					</p>
				</div>
			</div>
		</Dialog>
	)
}
