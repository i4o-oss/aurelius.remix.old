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

	const checkUsername = (username: string) => {
		if (user && username) {
			fetcher.load(`/api/me?username=${username}`)
		}
	}

	const updateUser = (update: any) => {
		if (update) {
			fetcher.submit({ ...update }, { method: 'put', action: '/api/me' })
		}
	}

	return (
		<SettingsDialog
			settings={settings}
			showSettingsDialog={showSettingsDialog}
			setShowSettingsDialog={setShowSettingsDialog}
			updateUser={updateUser}
			user={user}
		/>
	)
}
