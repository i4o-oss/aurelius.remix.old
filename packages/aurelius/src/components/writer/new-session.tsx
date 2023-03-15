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
			title={<h3 className='px-2 text-lg'>New Writing Session</h3>}
			action={
				<PrimaryButton onClick={startWritingSession}>
					<span className='text-sm'>Start</span>
				</PrimaryButton>
			}
			cancel={
				<Button
					bg='!bg-slate-400 dark:!bg-slate-800 hover:!bg-slate-300 hover:dark:!bg-slate-700'
					onClick={() => setShowNewSessionDialog?.(false)}
				>
					<span className='text-sm'>Cancel</span>
				</Button>
			}
		>
			<div className='mt-4 w-96 px-2'>
				<div className='grid w-full grid-cols-5 gap-4 text-black dark:text-white'>
					<label
						htmlFor='session_goal'
						className='col-span-3 text-sm'
					>
						Session Type
					</label>
					<RadioGroup
						className='col-span-2 space-y-2'
						defaultValue='duration'
						name='session_goal'
						options={SESSION_GOAL_OPTIONS}
						onChange={onRadioValueChange}
					/>
					<label
						htmlFor='session_target'
						className='col-span-3 text-sm'
					>
						Target
					</label>
					<div className='col-span-2 flex items-center justify-start space-x-2'>
						<input
							className='h-8 w-16 rounded-md border border-black bg-transparent px-2 py-1 text-sm dark:border-white'
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
						<span className='text-sm'>
							{sessionGoal === 'duration' ? 'minutes' : 'words'}
						</span>
					</div>
					<label htmlFor='focus_mode' className='col-span-3 text-sm'>
						Focus Mode
					</label>
					<div className='col-span-2'>
						<Switch
							defaultChecked={sessionFocusMode}
							onCheckedChange={setSessionFocusMode}
							name='focus_mode'
						/>
					</div>
					<label
						htmlFor='session_music'
						className='col-span-3 text-sm'
					>
						Music
					</label>
					<div className='col-span-2'>
						<Switch
							defaultChecked={sessionMusic}
							onCheckedChange={setSessionMusic}
							name='session_music'
						/>
					</div>
					<label
						htmlFor='session_end_notification'
						className='col-span-3 text-sm'
					>
						Notify when session ends
					</label>
					<div className='col-span-2'>
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
