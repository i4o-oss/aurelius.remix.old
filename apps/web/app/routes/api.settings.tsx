import { DailyGoal } from '@aurelius/writer'
import { ActionArgs, json, redirect } from '@remix-run/node'
import { createOrUpdateSettings } from '~/models/settings.server'
import { auth } from '~/services/auth.server'

export async function action({ request }: ActionArgs) {
	const user = await auth.isAuthenticated(request)

	if (!user) {
		throw redirect('/login', 401)
	}

	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const dailyGoal = formData.get('dailyGoal') as DailyGoal
			const target = Number(formData.get('target') as string)
			const background = formData.get('background') as string
			const footer = formData.get('footer') as string
			const watermark = Boolean(formData.get('watermark') as string)
			const musicChannel = formData.get('musicChannel') as string
			const youtubeVideo = formData.get('youtubeVideo') as string

			let record = {}

			if (dailyGoal && target) {
				record = {
					dailyGoal,
					target,
				}
			} else if (background && footer) {
				record = {
					background,
					footer,
					watermark,
				}
			} else {
				record = {
					musicChannel,
					youtubeVideo,
				}
			}

			await createOrUpdateSettings(record, user.id)

			return json({ message: 'settings_updated' }, 200)
		}
	}
}
