import { Settings as SettingsDialog, SettingsData } from '@i4o/aurelius'
import { useFetcher } from '@remix-run/react'
import { Dispatch, SetStateAction } from 'react'

interface SettingsProps {
	settings: SettingsData
	showSettingsDialog?: boolean
	setShowSettingsDialog?: Dispatch<SetStateAction<boolean>>
	user?: any
}

export default function Settings({
	settings,
	showSettingsDialog,
	setShowSettingsDialog,
	user,
}: SettingsProps) {
	const fetcher = useFetcher()

	const checkUsername = (username: string) => {}

	return (
		<SettingsDialog
			settings={settings}
			showSettingsDialog={showSettingsDialog}
			setShowSettingsDialog={setShowSettingsDialog}
			user={user}
		/>
	)
}
