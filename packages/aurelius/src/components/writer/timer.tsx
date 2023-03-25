import { useContext, useState } from 'react'
import { useTimer, useStopwatch } from 'react-timer-hook'
import { Button, IconButton, Toast } from '@i4o/catalystui'
import { PlayIcon, PauseIcon, StopIcon } from '@radix-ui/react-icons'
import { padZeroes } from '../../helpers'
import { AureliusContext, AureliusProviderData } from './provider'

interface TimerProps {
	endTimedSession?: (totalTime: number) => void
	endWordCountSession?: (totalTime: number) => void
	expiry: Date
	target: number
}

export default function Timer({
	endTimedSession,
	endWordCountSession,
	expiry,
	target,
}: TimerProps) {
	const context: AureliusProviderData = useContext(AureliusContext)
	const {
		notifyOnSessionEnd,
		sessionData,
		showSessionEndToast,
		setShowSessionEndToast,
		wordCount,
	} = context
	const [countdownExpired, setCountdownExpired] = useState(false)

	const {
		seconds: stSeconds,
		minutes: stMinutes,
		hours: stHours,
		start: stStart,
		pause: stPause,
		isRunning: isStRunning,
	} = useStopwatch({ autoStart: false })
	const { seconds, minutes, hours, isRunning, pause, resume } = useTimer({
		autoStart: true,
		expiryTimestamp: expiry,
		onExpire: () => {
			setCountdownExpired(true)
			stStart()
			if (notifyOnSessionEnd && sessionData?.goal === 'duration') {
				setShowSessionEndToast?.(true)
			}
		},
	})

	function stopTimers() {
		if (countdownExpired) {
			const extraTime = stSeconds + stMinutes * 60 + stHours * 60 * 60
			const duration = target + extraTime
			if (sessionData?.goal === 'duration') {
				endTimedSession?.(duration)
			} else {
				endWordCountSession?.(duration)
			}
		} else {
			const totalTime = seconds + minutes * 60 + hours * 60 * 60
			const duration = target - totalTime
			if (sessionData?.goal === 'duration') {
				endTimedSession?.(duration)
			} else {
				endWordCountSession?.(duration)
			}
		}
		setShowSessionEndToast?.(false)
	}

	return (
		<>
			<div className='au-flex au-h-10 au-items-center au-gap-2 au-divide-x au-divide-gray-500 au-rounded-lg au-bg-gray-100 au-p-2 au-text-black dark:au-bg-gray-900 dark:au-text-white'>
				{sessionData?.goal === 'duration' ? (
					<div className='au-flex au-items-center au-gap-0.5 au-px-2 au-text-sm'>
						<span>{isRunning ? '' : '+ '}</span>
						<span>
							{isRunning ? padZeroes(hours) : padZeroes(stHours)}
						</span>{' '}
						:{' '}
						<span>
							{isRunning
								? padZeroes(minutes)
								: padZeroes(stMinutes)}
						</span>{' '}
						:{' '}
						<span>
							{isRunning
								? padZeroes(seconds)
								: padZeroes(stSeconds)}
						</span>
					</div>
				) : (
					<div className='au-flex au-items-center au-gap-0.5 au-px-2 au-text-sm'>
						<span>{`${
							(wordCount || 0) -
							(sessionData?.startingWordCount || 0)
						} / ${sessionData?.target}`}</span>
					</div>
				)}
				<div className='au-flex au-items-center au-gap-1 au-px-2'>
					{isRunning || isStRunning ? (
						<IconButton
							bg='!au-bg-transparent hover:!au-bg-slate-300 hover:dark:!au-bg-slate-700'
							icon={
								<PauseIcon className='au-h-4 au-w-4 au-text-slate-800 dark:au-text-slate-100' />
							}
							onClick={() => {
								if (isRunning) {
									pause()
								} else {
									stPause()
								}
							}}
							padding='p-1'
						/>
					) : (
						<IconButton
							bg='!au-bg-transparent hover:!au-bg-slate-300 hover:dark:!au-bg-slate-700'
							icon={
								<PlayIcon className='au-h-4 au-w-4 au-text-slate-800 dark:au-text-slate-100' />
							}
							onClick={() => {
								if (isRunning) {
									resume()
								} else {
									stStart()
								}
							}}
							padding='p-1'
						/>
					)}
					<IconButton
						bg='!au-bg-transparent hover:!au-bg-slate-300 hover:dark:!au-bg-slate-700'
						icon={
							<StopIcon className='au-h-4 au-w-4 au-text-slate-800 dark:au-text-slate-100' />
						}
						onClick={stopTimers}
						padding='p-1'
					/>
				</div>
			</div>
			{showSessionEndToast ? (
				<Toast
					title={<h4 className='au-text-base'>You did it!</h4>}
					description={
						<span className='au-pr-3 au-text-sm'>
							You've reached the end of your writing session. You
							can keep going if you wish.
						</span>
					}
					action={
						<Button
							padding='au-px-2'
							className='au-text-sm !au-text-red-500'
							onClick={stopTimers}
						>
							End Session
						</Button>
					}
					actionAltText='End Session'
					duration={5000}
					isOpen={showSessionEndToast}
				/>
			) : null}
		</>
	)
}
