import { Alert, Button, PrimaryButton } from '@i4o/catalystui'
import { useContext } from 'react'
import { AureliusContext, AureliusProviderData } from './provider'

export default function Reset({
	confirmResetEditor,
}: {
	confirmResetEditor: () => void
}) {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { showResetAlert, setShowResetAlert } = context
	return (
		<Alert
			open={showResetAlert}
			onOpenChange={setShowResetAlert}
			cancel={
				<Button
					bg='!au-bg-slate-400 dark:!au-bg-slate-800 hover:!au-bg-slate-300 hover:dark:!au-bg-slate-700'
					onClick={() => setShowResetAlert?.(false)}
				>
					Cancel
				</Button>
			}
			action={
				<PrimaryButton onClick={confirmResetEditor}>
					Confirm
				</PrimaryButton>
			}
			title={<h3 className='au-pb-2 au-text-lg'>Are you sure?</h3>}
			description='This will clear all the content from the editor. This action cannot be undone.'
		/>
	)
}
