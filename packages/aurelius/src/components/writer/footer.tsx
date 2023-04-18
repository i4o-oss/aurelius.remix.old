import type { ReactPlayerProps } from 'react-player/types/lib'
import React, { Suspense, useContext } from 'react'
import { default as _ReactPlayer } from 'react-player/youtube'
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import { Button } from '@i4o/catalystui'
import { MUSIC_STATIONS, SETTINGS_LOCAL_STORAGE_KEY } from '../../constants'
import useLocalStorage from '@rehooks/local-storage'
import { AureliusContext, AureliusProviderData } from './provider'

// fixes react-player typescript issue
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>

export default function Footer() {
	const context: AureliusProviderData = useContext(AureliusContext)
	const {
		focusMode,
		isMusicPlaying,
		setIsMusicPlaying,
		isSaving,
		wordCount,
	} = context
	const [settings] = useLocalStorage(SETTINGS_LOCAL_STORAGE_KEY)
	const youtubeVideo = JSON.parse(JSON.stringify(settings))?.music
		?.youtubeVideo

	return (
		<div
			className={`au-fixed au-bottom-0 au-left-0 au-flex au-h-12 au-w-full au-items-center au-justify-between au-px-6 `}
		>
			<div
				className={`au-flex au-items-center au-justify-start au-transition-all au-duration-200 hover:au-opacity-100 ${
					focusMode ? 'au-opacity-5' : 'au-opacity-100'
				}`}
			>
				<span className='au-text-sm au-text-slate-500 dark:au-text-slate-600'>{`${wordCount} words`}</span>
				{isSaving && (
					<div className='au-flex au-items-center au-justify-center au-px-4'>
						<svg
							className='-au-ml-1 au-mr-2 au-h-4 au-w-4 au-animate-spin au-text-gray-500'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle
								className='au-opacity-25'
								cx='12'
								cy='12'
								r='10'
								stroke='currentColor'
								strokeWidth='4'
							/>
							<path
								className='au-opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							/>
						</svg>
						<span className='au-text-sm au-text-slate-500 dark:au-text-slate-600'>
							Saving...
						</span>
					</div>
				)}
			</div>
			<div
				className={`au-flex au-items-center au-justify-start au-transition-all au-duration-200 hover:au-opacity-100 ${
					focusMode ? 'au-opacity-5' : 'au-opacity-100'
				}`}
			>
				{isMusicPlaying ? (
					<Button
						bg='au-bg-transparent hover:!au-bg-slate-300 hover:dark:!au-bg-slate-700'
						className='au-flex au-h-8 au-w-8 au-items-center au-justify-center'
						onClick={() => setIsMusicPlaying?.(false)}
						padding='au-px-0 au-py-4'
					>
						<PauseIcon className='au-h-4 au-w-4 au-text-slate-800 dark:au-text-slate-100' />
					</Button>
				) : (
					<Button
						bg='au-bg-transparent hover:!au-bg-slate-300 hover:dark:!au-bg-slate-700'
						className='au-flex au-h-8 au-w-8 au-items-center au-justify-center'
						onClick={() => setIsMusicPlaying?.(true)}
						padding='au-px-0 au-py-4'
					>
						<PlayIcon className='au-h-4 au-w-4 au-text-slate-800 dark:au-text-slate-100' />
					</Button>
				)}
				<Suspense fallback={<div>Loading...</div>}>
					<ReactPlayer
						playing={isMusicPlaying}
						url={youtubeVideo || MUSIC_STATIONS.LOFI_GIRL_FOCUS}
						width='0'
						height='0'
						loop={true}
						config={{
							youtube: {
								playerVars: { control: 1, start: 1 },
							},
						}}
					/>
				</Suspense>
			</div>
		</div>
	)
}
