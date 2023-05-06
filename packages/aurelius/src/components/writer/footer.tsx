import type { ReactPlayerProps } from 'react-player/types/lib'
import React, { Suspense, useContext } from 'react'
import { default as _ReactPlayer } from 'react-player/youtube'
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import { Button, IconButton } from '@i4o/catalystui'
import { MUSIC_STATIONS, SETTINGS_LOCAL_STORAGE_KEY } from '../../constants'
import useLocalStorage from '@rehooks/local-storage'
import { AureliusContext, AureliusProviderData } from './provider'
import { SettingsData } from '../../types'

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
	const settingsData = JSON.parse(JSON.stringify(settings)) as SettingsData
	const musicChannel = settingsData?.musicChannel as string
	const youtubeVideo = settingsData?.youtubeVideo as string

	return (
		<div
			className={`au-fixed au-bottom-0 au-left-0 au-flex au-h-12 au-w-full au-items-center au-justify-between au-px-6 `}
		>
			<div
				className={`au-flex au-items-center au-justify-start au-transition-all au-duration-200 hover:au-opacity-100 ${
					focusMode ? 'au-opacity-5' : 'au-opacity-100'
				}`}
			>
				<span className='au-text-sm au-text-primary-foreground-subtle au-px-2'>{`${wordCount} words`}</span>
				{isSaving && (
					<div className='au-flex au-items-center au-justify-center au-px-4'>
						<svg
							className='-au-ml-1 au-mr-2 au-h-4 au-w-4 au-animate-spin au-text-primary-foreground-subtle'
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
						<span className='au-text-sm au-text-primary-foreground-subtle'>
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
					<IconButton
                        ariaLabel='Pause Music Button'
						className='au-flex au-h-8 au-w-8 !au-p-0 au-items-center au-justify-center !au-bg-transparent'
						icon={
							<PauseIcon className='au-w-4 au-h-4 au-text-primary-foreground' />
						}
						onClick={() => setIsMusicPlaying?.(false)}
					/>
				) : (
					<IconButton
                        ariaLabel='Pause Music Button'
						className='au-flex au-h-8 au-w-8 !au-p-0 au-items-center au-justify-center !au-bg-transparent'
						icon={
							<PlayIcon className='au-w-4 au-h-4 au-text-primary-foreground' />
						}
						onClick={() => setIsMusicPlaying?.(true)}
					/>
				)}
				<Suspense fallback={<div>Loading...</div>}>
					<ReactPlayer
						playing={isMusicPlaying}
						// @ts-ignore
						url={youtubeVideo || MUSIC_STATIONS[musicChannel]}
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
