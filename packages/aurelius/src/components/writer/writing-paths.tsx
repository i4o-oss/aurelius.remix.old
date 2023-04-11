import { IconButton } from '@i4o/catalystui'
import { useContext } from 'react'
import { AureliusContext, AureliusProviderData } from './provider'

export default function WritingPaths() {
	const { focusMode, showWritingPaths, setShowWritingPaths } =
		useContext<AureliusProviderData>(AureliusContext)

	return (
		<div
			className={`au-absolute au-top-0 au-right-0 au-flex au-items-start au-transition-all au-duration-200 hover:au-opacity-100 ${
				focusMode ? 'au-opacity-5' : 'au-opacity-100'
			}`}
		>
			<IconButton
				className='au-h-10 au-w-10 au-mt-4 au-mr-4 au-stroke-slate-800 dark:au-stroke-slate-100'
				icon={
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='au-h-4 au-w-4'
					>
						<path d='m16 6 4 14'></path>
						<path d='M12 6v14'></path>
						<path d='M8 8v12'></path>
						<path d='M4 4v16'></path>
					</svg>
				}
				onClick={() => setShowWritingPaths?.(!showWritingPaths)}
			/>
			<section
				className={`au-w-96 au-h-screen au-bg-white dark:au-bg-gray-800 au-z-10 shadow-lg ${
					showWritingPaths ? 'flex' : 'hidden'
				}`}
			>
				Writing Paths
			</section>
		</div>
	)
}
