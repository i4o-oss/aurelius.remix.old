import { Link } from '@remix-run/react'
import { PrimaryButton } from '@i4o/catalystui'
import { Theme, useTheme } from '~/lib/theme'

export default function Header() {
	const [theme] = useTheme()
	return (
		<header className='supports-backdrop-blur:bg-white/60 sticky top-0 left-0 z-50 flex h-20 w-screen shadow-sm shadow-gray-200/50 backdrop-blur dark:bg-transparent dark:shadow-gray-700/20'>
			<div className='flex w-full items-center justify-between py-4 sm:px-2 lg:px-8'>
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
					{/* <Link to='/join'> */}
					{/* 	<PrimaryButton */}
					{/* 		className='flex h-8 items-center justify-center' */}
					{/* 		tooltip='Login' */}
					{/* 	> */}
					{/* 		Join Waitlist */}
					{/* 	</PrimaryButton> */}
					{/* </Link> */}
					{/* )} */}
				</div>
			</div>
			{/* <div className='flex w-full items-center justify-between py-4 md:hidden lg:px-8'> */}
			{/* 	<div className='col-span-1 flex h-full items-center justify-start'> */}
			{/* 		<Link to='/'> */}
			{/* 			<img */}
			{/* 				className='w-24' */}
			{/* 				src={ */}
			{/* 					theme === Theme.DARK */}
			{/* 						? '/images/logo_dark.png' */}
			{/* 						: '/images/logo.png' */}
			{/* 				} */}
			{/* 				alt='Aurelius Logo' */}
			{/* 			/> */}
			{/* 		</Link> */}
			{/* 	</div> */}
			{/* </div> */}
		</header>
	)
}
