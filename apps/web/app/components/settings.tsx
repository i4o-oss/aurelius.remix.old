import { Settings as SettingsDialog, SettingsData } from '@i4o/aurelius'
import { Toast } from '@i4o/catalystui'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useFetcher } from '@remix-run/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

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
	const [saveSettingsToast, setSaveSettingsToast] = useState(false)

	useEffect(() => {
		if (
			fetcher.state === 'loading' &&
			(fetcher.data?.message === 'settings_updated' || fetcher.data?.message === 'user_updated') &&
			fetcher.formMethod === 'POST'
		) {
			setSaveSettingsToast(true)
		}
	}, [fetcher])

	const checkUsername = (username: string) => {
		if (user && username && user?.username !== username) {
			fetcher.load(`/api/me?username=${username}`)
		}
	}

	const updateUser = (update: any) => {
		if (update) {
			fetcher.submit({ ...update }, { method: 'post', action: '/api/me' })
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
		<>
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
			{saveSettingsToast && (
				<Toast
					description={
						<div className='-mt-1 flex items-center gap-2'>
							<CheckCircledIcon className='text-brand' />
							Settings updated!
						</div>
					}
					defaultOpen={saveSettingsToast}
					action=''
					actionAltText=''
				/>
			)}
		</>
	)
}
