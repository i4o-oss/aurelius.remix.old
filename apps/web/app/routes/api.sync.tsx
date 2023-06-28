import { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { nanoid } from 'nanoid/async'
import { createPost } from '~/models/post.server'
import { auth } from '~/services/auth.server'
import { createWritingSession } from '~/models/writing-session.server'

// TODO: update sync api so it syncs all available posts
export async function action({ request }: ActionArgs) {
	const user = await auth.isAuthenticated(request)
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()

			const localPost = formData.get('post')
			const localWritingSessions = formData.get('writingSessions')

			invariant(
				typeof localPost === 'string',
				'localPost must be a string'
			)
			invariant(
				typeof localWritingSessions === 'string',
				'localPost must be a string'
			)

			const post = localPost ? JSON.parse(localPost) : null
			if (post) {
				const { title, content, wordCount } = post
				const id = await nanoid(16)
				const slug = title
					.replace(/[^a-zA-Z ]/g, '')
					.toLowerCase()
					.split(' ')
					.join('-')
				const shareId = `${slug}-${id}`
				const record = {
					title,
					content,
					wordCount,
					slug,
					shareId,
					userId: user?.id as string,
				}

				await createPost(record)
			}

			const writingSessions = localWritingSessions
				? JSON.parse(formData.get('writingSessions') as string)
				: []

			if (writingSessions.length > 0) {
				await Promise.all(
					writingSessions.map(async (writingSession: any) => {
						await createWritingSession({
							goal: writingSession.goal,
							target: writingSession.target,
							result: writingSession.result,
							startingWordCount: writingSession.startingWordCount,
							endingWordCount: writingSession.endingWordCount,
							userId: user?.id as string,
							createdAt: new Date(writingSession.date as string),
							updatedAt: new Date(writingSession.date as string),
						})
					})
				)
			}

			if (post || writingSessions.length > 0) {
				return json({ message: 'sync_complete' })
			}

			return json({ message: 'nothing_to_sync' })
		}
	}
}
