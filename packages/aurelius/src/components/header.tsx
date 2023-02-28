import { Link } from '@remix-run/react'
import { PrimaryButton } from '@i4o-oss/catalystui'

export default function Header() {
	return (
		<header className='supports-backdrop-blur:bg-white/60 sticky top-0 z-50 flex h-20 w-screen flex-wrap items-center justify-between px-4 py-4 shadow-sm shadow-gray-200/20 backdrop-blur dark:bg-transparent dark:shadow-gray-700/20 sm:px-6 lg:px-8'>
			<div className='col-span-1 flex h-full items-center justify-start'>
				<Link to='/'>
					<img
						className='w-24'
						src='/images/logo_dark.png'
						alt='Aurelius Logo'
					/>
				</Link>
			</div>
			<div className='col-span-1 flex items-center justify-center space-x-4'>
				{/* {user && <Nav items={loggedInNavItems} />} */}
			</div>
			<div className='col-span-1 flex h-full items-center justify-end space-x-4'>
				{/* <NewSession /> */}
				{/* {user ? ( */}
				{/* 	<ProfileDropdown */}
				{/* 		image={user?.image as string} */}
				{/* 		name={user?.name as string} */}
				{/* 	/> */}
				{/* ) : ( */}
				<Link to='/login'>
					<PrimaryButton
						className='flex h-8 items-center justify-center'
						tooltip='Login'
					>
						Login
					</PrimaryButton>
				</Link>
				{/* )} */}
			</div>
		</header>
	)
}
