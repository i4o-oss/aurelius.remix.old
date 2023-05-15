import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { Link, useFetcher } from '@remix-run/react'
import {
    Avatar,
    Button,
    Dropdown,
    IconButton,
    PrimaryButton,
} from '@i4o/catalystui'
import {
    DashboardIcon,
    ExitIcon,
    GearIcon,
    Pencil1Icon,
    PersonIcon,
} from '@radix-ui/react-icons'
import { Theme, useTheme } from '~/lib/theme'

interface Props {
    image: string
    name: string
    setShowSettingsDialog?: Dispatch<SetStateAction<boolean>>
}

function ProfileDropdown(props: Props) {
    const { image, name, setShowSettingsDialog } = props
    const { Form } = useFetcher()

    const dropdownItems = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon />,
            link: '/dashboard',
        },
        {
            label: 'Settings',
            icon: <GearIcon />,
            onSelect: () => setShowSettingsDialog?.(true),
        },
        { type: 'separator' },
        {
            label: 'Blog',
            icon: <Pencil1Icon />,
            link: '/blog',
            openLinkInNewTab: true,
        },
        { type: 'separator' },
        {
            icon: (<ExitIcon />) as ReactNode,
            label: (
                <Form action='/logout' method='post'>
                    <button
                        className='flex h-full w-full items-center justify-start'
                        type='submit'
                    >
                        Logout
                    </button>
                </Form>
            ) as ReactNode,
            onSelect: (e: Event) => e.preventDefault(),
        },
    ]

    return (
        <div className='flex h-full items-center justify-end'>
            <Dropdown
                align='end'
                // @ts-ignore
                items={dropdownItems}
                trigger={
                    <IconButton
                        className='!p-0'
                        icon={
                            <Avatar
                                src={image || ''}
                                alt='User Profile Image'
                                fallback={
                                    name?.charAt(0)?.toUpperCase() || (
                                        <PersonIcon className='text-primary-foreground' />
                                    )
                                }
                                variant='rounded'
                            />
                        }
                    />
                }
            />
        </div>
    )
}

export default function Header({
    setShowSettingsDialog,
    user,
}: {
    setShowSettingsDialog?: Dispatch<SetStateAction<boolean>>
    user?: any
}) {
    const [theme] = useTheme()

    return (
        <header className='supports-backdrop-blur:bg-white/60 sticky top-0 left-0 z-50 flex h-20 w-screen items-center justify-center shadow-sm shadow-gray-200/50 backdrop-blur dark:bg-transparent dark:shadow-gray-700/20'>
            <div className='w-full px-2 md:px-4 lg:px-8'>
                <div className='hidden w-full items-center justify-between py-4 lg:flex'>
                    <div className='col-span-1 flex h-full items-center justify-start gap-2'>
                        <Link to='/'>
                            <img
                                className='w-24'
                                src={
                                    theme === Theme.DARK
                                        ? '/images/logo_dark.png'
                                        : '/images/logo.png'
                                }
                                alt='Aurelius Logo'
                            />
                        </Link>
                        <span className='bg-ui rounded-lg px-2 py-1 text-[0.6rem] uppercase text-primary-foreground'>
                            beta
                        </span>
                    </div>
                    <div className='col-span-1 flex items-center justify-center space-x-4'>
                        {/* {user && <Nav items={loggedInNavItems} />} */}
                    </div>
                    <div className='col-span-1 flex h-full items-center justify-end space-x-4'>
                        {/* <NewSession /> */}
                        {user ? (
                            <ProfileDropdown
                                image={user?.image as string}
                                name={user?.name as string}
                                setShowSettingsDialog={setShowSettingsDialog}
                            />
                        ) : (
                            <>
                                <Link to='/login'>
                                    <Button
                                        className='flex h-8 items-center justify-center'
                                        tooltip='Login'
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to='/login'>
                                    <PrimaryButton
                                        className='flex h-8 items-center justify-center'
                                        tooltip='Sign Up'
                                    >
                                        Sign Up
                                    </PrimaryButton>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className='flex w-full items-center justify-between py-4 lg:hidden lg:px-8'>
                    <div className='col-span-1 flex h-full items-center justify-start'>
                        <Link to='/'>
                            <img
                                className='w-24'
                                src={
                                    theme === Theme.DARK
                                        ? '/images/logo_dark.png'
                                        : '/images/logo.png'
                                }
                                alt='Aurelius Logo'
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
