import {
	Settings,
	SETTINGS_LOCAL_STORAGE_KEY,
	SettingsData,
} from '@i4o/aurelius'
import useLocalStorage from '@rehooks/local-storage'
import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { Footer, Header } from '~/components'
import { getSettingsFromUserId } from '~/models/settings.server'
import { getUserProfile } from '~/models/user.server'
import { auth } from '~/services/auth.server'

// TODO: Fix these types
interface LoaderData {
	post?: any
	settings?: any
	user?: any
}

export async function loader({ request }: LoaderArgs) {
	let user = await auth.isAuthenticated(request, {
        failureRedirect: '/login'
    })
	if (user) {
		const profile = await getUserProfile(user?.id)
		const settings = await getSettingsFromUserId(user?.id)
		return json({ settings, user: profile })
	}
}

export default function Dashboard() {
	const { settings: settingsFromDb, user } =
		useLoaderData<SerializeFrom<LoaderData>>()
	const [settings] = useLocalStorage<string>(SETTINGS_LOCAL_STORAGE_KEY)
	const settingsData =
		user && settingsFromDb
			? settingsFromDb
			: (JSON.parse(JSON.stringify(settings)) as SettingsData)
	const [showSettingsDialog, setShowSettingsDialog] = useState(false)

	return (
		<div className='flex min-h-screen flex-col'>
			<Header setShowSettingsDialog={setShowSettingsDialog} user={user} />
			<main className='flex min-h-[calc(100vh-20rem)] flex-1 items-start justify-center pb-16'>
				<Outlet />
				<Settings
					settings={settingsData}
					showSettingsDialog={showSettingsDialog}
					setShowSettingsDialog={setShowSettingsDialog}
					user={user}
				/>
			</main>
			<Footer />
		</div>
	)
}
