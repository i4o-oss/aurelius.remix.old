// TODO: Move this component to web package?

import { useContext } from 'react'
import {
	Button,
	Dialog,
	PrimaryButton,
	RadioGroup,
	Switch,
} from '@i4o/catalystui'
import { AureliusContext, AureliusProviderData } from './provider'

const SESSION_GOAL_OPTIONS = [
	{
		id: 'duration',
		label: 'Duration',
		value: 'duration',
	},
	{
		id: 'wordCount',
		label: 'Word Count',
		value: 'wordCount',
	},
]

export default function NewSession({
	startSession,
}: {
	startSession: () => void
}) {
	const context: AureliusProviderData = useContext(AureliusContext)
	const {
		notifyOnSessionEnd,
		setNotifyOnSessionEnd,
		sessionFocusMode,
		setSessionFocusMode,
		sessionGoal,
		setSessionGoal,
		sessionMusic,
		setSessionMusic,
		sessionTarget,
		setSessionTarget,
		showNewSessionDialog,
		setShowNewSessionDialog,
	} = context

	const onRadioValueChange = (value: string) => {
		setSessionGoal?.(value as 'duration' | 'wordCount')
	}

	function startWritingSession() {
		startSession()
		setShowNewSessionDialog?.(false)
	}

	return (
		<Dialog
			isOpen={showNewSessionDialog}
			onOpenChange={setShowNewSessionDialog}
			title={<h3 className='au-px-2 au-text-lg'>New Writing Session</h3>}
			action={
				<PrimaryButton onClick={startWritingSession}>
					<span className='au-text-sm'>Start</span>
				</PrimaryButton>
			}
			cancel={
				<Button
					bg='!au-bg-slate-400 dark:!au-bg-slate-800 hover:!au-bg-slate-300 hover:dark:!au-bg-slate-700'
					onClick={() => setShowNewSessionDialog?.(false)}
				>
					<span className='au-text-sm'>Cancel</span>
				</Button>
			}
		>
			<div className='au-mt-4 au-w-96 au-px-2'>
				<div className='au-grid au-w-full au-grid-cols-5 au-gap-4 au-text-black dark:au-text-white'>
					<label
						htmlFor='session_goal'
						className='au-col-span-3 au-text-sm'
					>
						Session Type
					</label>
					<RadioGroup
						className='au-col-span-2 au-space-y-2'
						defaultValue='duration'
						name='session_goal'
						options={SESSION_GOAL_OPTIONS}
						onChange={onRadioValueChange}
					/>
					<label
						htmlFor='session_target'
						className='au-col-span-3 au-text-sm'
					>
						Target
					</label>
					<div className='au-col-span-2 au-flex au-items-center au-justify-start au-space-x-2'>
						<input
							className='au-h-8 au-w-16 au-rounded-md au-border au-border-black au-bg-transparent au-px-2 au-py-1 au-text-sm dark:au-border-white'
							value={
								sessionGoal === 'duration'
									? (sessionTarget || 0) / 60
									: sessionTarget
							}
							onChange={(e) => {
								if (sessionGoal === 'duration') {
									setSessionTarget?.(
										Number(e.target.value) * 60
									)
								} else {
									setSessionTarget?.(Number(e.target.value))
								}
							}}
							name='session_target'
							type='number'
						/>
						<span className='au-text-sm'>
							{sessionGoal === 'duration' ? 'minutes' : 'words'}
						</span>
					</div>
					<label
						htmlFor='focus_mode'
						className='au-col-span-3 au-text-sm'
					>
						Focus Mode
					</label>
					<div className='au-col-span-2'>
						<Switch
							defaultChecked={sessionFocusMode}
							onCheckedChange={setSessionFocusMode}
							name='focus_mode'
						/>
					</div>
					<label
						htmlFor='session_music'
						className='au-col-span-3 au-text-sm'
					>
						Music
					</label>
					<div className='au-col-span-2'>
						<Switch
							defaultChecked={sessionMusic}
							onCheckedChange={setSessionMusic}
							name='session_music'
						/>
					</div>
					<label
						htmlFor='session_end_notification'
						className='au-col-span-3 au-text-sm'
					>
						Notify when session ends
					</label>
					<div className='au-col-span-2'>
						<Switch
							defaultChecked={notifyOnSessionEnd}
							onCheckedChange={setNotifyOnSessionEnd}
							name='session_end_notification'
						/>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
