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
		if (user && username && user?.username !== username) {
			fetcher.load(`/api/me?username=${username}`)
		}
	}

	const updateUser = (update: any) => {
		if (update) {
			fetcher.submit({ ...update }, { method: 'put', action: '/api/me' })
		}
	}

	const updateSettings = (update: any) => {
		if (update) {
			fetcher.submit(
				{ ...update },
				{ method: 'post', action: '/api/settings' }
			)
		}
	}

	return (
		<SettingsDialog
			checkUsername={checkUsername}
			fetcher={fetcher}
			settings={settings}
			showSettingsDialog={showSettingsDialog}
			setShowSettingsDialog={setShowSettingsDialog}
			updateSettings={updateSettings}
			updateUser={updateUser}
			user={user}
		/>
	)
}
