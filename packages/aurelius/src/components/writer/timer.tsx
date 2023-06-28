import { useContext, useState } from 'react'
import { useStopwatch, useTimer } from 'react-timer-hook'
import { Button, IconButton, Toast } from '@i4o/catalystui'
import { PauseIcon, PlayIcon, StopIcon } from '@radix-ui/react-icons'
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
			<div className='au-flex au-h-10 au-items-center au-gap-2 au-divide-x au-divide-subtle au-rounded-lg au-bg-ui au-p-2 au-text-primary-foreground'>
				{sessionData?.goal === 'duration' ? (
					<div className='au-flex au-items-center au-gap-0.5 au-px-2 au-text-sm'>
						<span>{!countdownExpired ? '' : '+ '}</span>
						<span>
							{!countdownExpired
								? padZeroes(hours)
								: padZeroes(stHours)}
						</span>{' '}
						:{' '}
						<span>
							{!countdownExpired
								? padZeroes(minutes)
								: padZeroes(stMinutes)}
						</span>{' '}
						:{' '}
						<span>
							{!countdownExpired
								? padZeroes(seconds)
								: padZeroes(stSeconds)}
						</span>
					</div>
				) : (
					<div className='au-flex au-items-center au-gap-0.5 au-px-2 au-text-sm'>
						<span>
							{`${
								(wordCount || 0) -
								(sessionData?.startingWordCount || 0)
							} / ${sessionData?.target}`}
						</span>
					</div>
				)}
				<div className='au-flex au-items-center au-gap-1 au-px-2'>
					{isRunning || isStRunning ? (
						<IconButton
							className='au-p-1'
							icon={
								<PauseIcon className='au-h-4 au-w-4 au-text-primary-foreground' />
							}
							onClick={() => {
								if (isRunning) {
									pause()
								} else {
									stPause()
								}
							}}
						/>
					) : (
						<IconButton
							className='au-p-1'
							icon={
								<PlayIcon className='au-h-4 au-w-4 au-text-primary-foreground' />
							}
							onClick={() => {
								if (!countdownExpired) {
									resume()
								} else {
									stStart()
								}
							}}
						/>
					)}
					<IconButton
						className='au-p-1'
						icon={
							<StopIcon className='au-h-4 au-w-4 au-text-primary-foreground' />
						}
						onClick={stopTimers}
					/>
				</div>
			</div>
			{showSessionEndToast ? (
				<>
					<Toast
						title={<h4 className='au-text-base'>You did it!</h4>}
						description={
							<span className='au-pr-3 au-text-sm'>
								You've reached the end of your writing session.
								You can keep going if you wish.
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
						duration={3000}
					/>
					<figure className='au-hidden'>
						<audio
							src='https://assets.mixkit.co/active_storage/sfx/591/591.wav'
							controls={false}
							autoPlay={true}
							crossOrigin='anonymous'
							loop={false}
							preload='auto'
						/>
					</figure>
				</>
			) : null}
		</>
	)
}
