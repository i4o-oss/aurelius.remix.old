import { useContext, useState } from 'react'
import { useTimer, useStopwatch } from 'react-timer-hook'
import { IconButton } from '@i4o/catalystui'
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
	const { sessionData, wordCount } = context
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
			// TODO: show toast here
			// if (props.showEndOfSessionNotification) {
			// 	// toast({
			// 	// 	duration: 3000,
			// 	// 	position: 'top',
			// 	// 	status: 'info',
			// 	// 	title: 'Writing session has ended',
			// 	// 	description:
			// 	// 		"Great work! If you're in flow, feel free to keep writing.",
			// 	// });
			// }
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
	}

	return (
		<div className='flex h-10 items-center gap-2 divide-x divide-gray-500 rounded-lg bg-gray-900 p-2 text-white'>
			{sessionData?.goal === 'duration' ? (
				<div className='flex items-center gap-0.5 px-2 text-sm'>
					<span>{isRunning ? '' : '+ '}</span>
					<span>
						{isRunning ? padZeroes(hours) : padZeroes(stHours)}
					</span>{' '}
					:{' '}
					<span>
						{isRunning ? padZeroes(minutes) : padZeroes(stMinutes)}
					</span>{' '}
					:{' '}
					<span>
						{isRunning ? padZeroes(seconds) : padZeroes(stSeconds)}
					</span>
				</div>
			) : (
				<div className='flex items-center gap-0.5 px-2 text-sm'>
					<span>{`${
						(wordCount || 0) - (sessionData?.startingWordCount || 0)
					} / ${sessionData?.target}`}</span>
				</div>
			)}
			<div className='flex items-center gap-1 px-2'>
				{isRunning || isStRunning ? (
					<IconButton
						bg='!bg-transparent'
						icon={<PauseIcon />}
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
						bg='!bg-transparent'
						icon={<PlayIcon />}
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
					bg='!bg-transparent'
					icon={<StopIcon />}
					onClick={stopTimers}
					padding='p-1'
				/>
			</div>
		</div>
	)
}
