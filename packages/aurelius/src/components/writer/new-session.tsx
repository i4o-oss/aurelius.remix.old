// TODO: Move this component to web package?

import { Dispatch, SetStateAction, useState } from 'react'
import {
	Button,
	Dialog,
	PrimaryButton,
	RadioGroup,
	Switch,
} from '@i4o/catalystui'

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
	showNewSessionDialog,
	setShowNewSessionDialog,
}: {
	showNewSessionDialog: boolean
	setShowNewSessionDialog: Dispatch<SetStateAction<boolean>>
}) {
	const [sessionGoal, setSessionGoal] = useState('duration')

	const onRadioValueChange = (value: string) => {
		setSessionGoal(value)
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				console.log('submitted')
				setShowNewSessionDialog(false)
			}}
		>
			<Dialog
				isOpen={showNewSessionDialog}
				onOpenChange={setShowNewSessionDialog}
				title={<h3 className='px-2 text-lg'>New Writing Session</h3>}
				action={
					<PrimaryButton type='submit'>
						<span className='text-sm'>Start</span>
					</PrimaryButton>
				}
				cancel={
					<Button onClick={() => setShowNewSessionDialog(false)}>
						<span className='text-sm'>Cancel</span>
					</Button>
				}
			>
				<div className='mt-4 w-96 px-2'>
					<div className='grid w-full grid-cols-5 gap-4 text-white'>
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
								className='h-8 w-16 rounded-md border border-white bg-transparent px-2 py-1 text-sm'
								value={sessionGoal === 'duration' ? 30 : 500}
								name='session_target'
								type='number'
							/>
							<span className='text-sm'>
								{sessionGoal === 'duration'
									? 'minutes'
									: 'words'}
							</span>
						</div>
						<label
							htmlFor='focus_mode'
							className='col-span-3 text-sm'
						>
							Enable focus mode
						</label>
						<div className='col-span-2'>
							<Switch defaultChecked={true} name='focus_mode' />
						</div>
						<label
							htmlFor='session_music'
							className='col-span-3 text-sm'
						>
							Music
						</label>
						<div className='col-span-2'>
							<Switch
								defaultChecked={true}
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
								defaultChecked={true}
								name='session_end_notification'
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</form>
	)
}
