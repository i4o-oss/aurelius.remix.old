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
			<div className='flex h-10 items-center gap-2 divide-x divide-gray-500 rounded-lg bg-gray-100 p-2 text-black dark:bg-gray-900 dark:text-white'>
				{sessionData?.goal === 'duration' ? (
					<div className='flex items-center gap-0.5 px-2 text-sm'>
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
					<div className='flex items-center gap-0.5 px-2 text-sm'>
						<span>{`${
							(wordCount || 0) -
							(sessionData?.startingWordCount || 0)
						} / ${sessionData?.target}`}</span>
					</div>
				)}
				<div className='flex items-center gap-1 px-2'>
					{isRunning || isStRunning ? (
						<IconButton
							bg='!bg-transparent hover:!bg-slate-300 hover:dark:!bg-slate-700'
							icon={
								<PauseIcon className='h-4 w-4 text-slate-800 dark:text-slate-100' />
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
							bg='!bg-transparent hover:!bg-slate-300 hover:dark:!bg-slate-700'
							icon={
								<PlayIcon className='h-4 w-4 text-slate-800 dark:text-slate-100' />
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
						bg='!bg-transparent hover:!bg-slate-300 hover:dark:!bg-slate-700'
						icon={
							<StopIcon className='h-4 w-4 text-slate-800 dark:text-slate-100' />
						}
						onClick={stopTimers}
						padding='p-1'
					/>
				</div>
			</div>
			{showSessionEndToast ? (
				<Toast
					title={<h4 className='text-base'>You did it!</h4>}
					description={
						<span className='pr-3 text-sm'>
							You've reached the end of your writing session. You
							can keep going if you wish.
						</span>
					}
					action={
						<Button
							padding='px-2'
							className='text-sm !text-red-500'
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
