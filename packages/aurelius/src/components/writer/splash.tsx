import { Button, Checkbox, Dialog } from '@i4o/catalystui'
import {
    CounterClockwiseClockIcon,
    DashboardIcon,
    FileTextIcon,
    InfoCircledIcon,
    Pencil1Icon,
    RocketIcon,
    TargetIcon,
} from '@radix-ui/react-icons'
import { useContext } from 'react'
import { AureliusContext, AureliusProviderData } from './provider'

export default function SplashScreen() {
    const context: AureliusProviderData = useContext(AureliusContext)
    const { showSplashScreenDialog, setShowSplashScreenDialog } = context

    return (
        <Dialog open={showSplashScreenDialog} onOpenChange={setShowSplashScreenDialog} title=''>
            <div className='au-flex au-flex-col au-min-h-[48rem] au-h-auto au-w-[32rem] au-rounded-lg au-overflow-hidden au-bg-primary au-divide-y au-divide-subtle'>
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
                <div className='au-grid au-grid-cols-2 au-flex-col au-w-full au-min-h-[32rem] au-h-auto au-flex-1 au-flex-grow au-p-8 au-gap-4'>
                    <div className='au-col-span-2 au-py-2 au-justify-center au-flex au-flex-col'>
                        <h3 className='au-text-sm au-font-semibold au-text-primary-foreground-subtle au-mb-4'>
                            Getting Started
                        </h3>
                        <ul className='au-text-sm au-flex au-flex-col au-gap-4'>
                            <li className='au-flex au-items-center au-justify-between'>
                                <Button
                                    className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
                                    leftIcon={<FileTextIcon />}
                                >
                                    New Post
                                </Button>
                                {/* <span className='au-flex au-items-center au-gap-1'> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Ctrl */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         N */}
                                {/*     </kbd> */}
                                {/* </span> */}
                            </li>
                            <li className='au-flex au-items-center au-justify-between'>
                                <Button
                                    className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
                                    leftIcon={<Pencil1Icon />}
                                >
                                    New Writing Session
                                </Button>
                                {/* <span className='au-flex au-items-center au-gap-1'> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Ctrl */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Alt */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         W */}
                                {/*     </kbd> */}
                                {/* </span> */}
                            </li>
                            <li className='au-flex au-items-center au-justify-between'>
                                <Button
                                    className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
                                    leftIcon={<TargetIcon />}
                                >
                                    Set a Writing Goal
                                </Button>
                                {/* <span className='au-flex au-items-center au-gap-1'> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Ctrl */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Alt */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         S */}
                                {/*     </kbd> */}
                                {/* </span> */}
                            </li>
                        </ul>
                    </div>
                    <div className='au-col-span-2 au-py-2 au-justify-center au-flex au-flex-col'>
                        <h3 className='au-text-sm au-font-semibold au-text-primary-foreground-subtle au-mb-4'>
                            Continue
                        </h3>
                        <ul className='au-text-sm au-flex au-flex-col au-gap-4'>
                            <li className='au-flex au-items-center au-justify-between'>
                                <Button
                                    className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
                                    leftIcon={<DashboardIcon />}
                                >
                                    Go To Dashboard
                                </Button>
                                {/* <span className='au-flex au-items-center au-gap-1'>
                                    <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
                                        Ctrl
                                    </kbd>
                                    <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
                                        W
                                    </kbd>
                                </span> */}
                            </li>
                            <li className='au-flex au-items-center au-justify-between'>
                                <Button
                                    className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
                                    leftIcon={<CounterClockwiseClockIcon />}
                                >
                                    Restore Saved Post
                                </Button>
                                {/* <span className='au-flex au-items-center au-gap-1'> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Ctrl */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Alt */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         R */}
                                {/*     </kbd> */}
                                {/* </span> */}
                            </li>
                        </ul>
                    </div>
                    <div className='au-col-span-2 au-py-2 au-justify-center au-flex au-flex-col'>
                        <ul className='au-text-sm au-flex au-flex-col au-gap-4'>
                            <li className='au-flex au-items-center au-justify-between'>
                                <Button
                                    className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
                                    leftIcon={<InfoCircledIcon />}
                                >
                                    Help
                                </Button>
                                {/* <span className='au-flex au-items-center au-gap-1'> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Ctrl */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         Alt */}
                                {/*     </kbd> */}
                                {/*     <kbd className='au-px-2 au-py-1 au-text-xs au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'> */}
                                {/*         H */}
                                {/*     </kbd> */}
                                {/* </span> */}
                            </li>
                            <li className='au-flex au-items-center au-justify-between'>
                                <Button
                                    className='!au-px-0 !au-py-1 !au-bg-transparent hover:!au-bg-transparent au-flex au-items-center au-font-normal'
                                    leftIcon={<RocketIcon />}
                                >
                                    Try Aurelius Plus!
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className='au-col-span-2 au-py-2 au-justify-center au-flex au-flex-col'>
                        <p className='au-leading-relaxed au-italic au-text-xs au-text-primary-foreground-subtle'>Note: All your data will be saved locally in the browser.</p>
                    </div>
                </div>
                <div className='au-w-full au-px-8 au-py-4'>
                    <Checkbox
                        defaultChecked={false}
                        label={
                            <p className='au-text-primary-foreground-subtle'>
                                Don't show this again.
                            </p>
                        }
                        name='dont-show-again'
                    />
                </div>
            </div>
        </Dialog>
    )
}
