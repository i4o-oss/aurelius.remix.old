import { prisma } from '~/db.server'
export type { Settings } from '@prisma/client'

interface SettingsParams {
	dailyGoal?: 'duration' | 'wordCount'
	target?: number
	background?: string
	footer?: string
	watermark?: boolean
	musicChannel?: string
	youtubeVideo?: string
}

export async function getSettingsFromUserId(userId: string) {
	const settings = await prisma.settings.findUnique({
		where: { userId },
		select: {
			dailyGoal: true,
			target: true,
			background: true,
			footer: true,
			watermark: true,
			musicChannel: true,
			youtubeVideo: true,
		},
	})

	return settings
}

export async function createOrUpdateSettings(
	data: SettingsParams,
	userId: string
) {
	await prisma.settings.upsert({
		where: { userId },
		update: { ...data },
		create: { ...data, userId },
	})
}
