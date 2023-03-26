import { prisma } from '~/db.server'
export type { WritingSession } from '@prisma/client'

export interface CreateWritingSessionParams {
	goal: string
	target: number
	result: number
	startingWordCount: number
	endingWordCount: number
	postId?: string
	userId: string
	createdAt?: Date
	updatedAt?: Date
}

export async function createWritingSession({
	goal,
	target,
	result,
	startingWordCount,
	endingWordCount,
	userId,
	createdAt,
	updatedAt,
}: CreateWritingSessionParams) {
	return await prisma.writingSession.create({
		// @ts-ignore
		data: {
			goal,
			target,
			result,
			startingWordCount,
			endingWordCount,
			createdAt,
			updatedAt,
			user: {
				connect: { id: userId },
			},
		},
	})
}
