import { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import { createWritingSession } from '~/models/writing-session.server'

export async function action({ request }: ActionArgs) {
	const user = await auth.isAuthenticated(request)
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const writingSession = JSON.parse(
				formData.get('writingSession') as string
			)
			await createWritingSession({
				goal: writingSession.goal,
				target: writingSession.target,
				result: writingSession.result,
				startingWordCount: writingSession.startingWordCount,
				endingWordCount: writingSession.endingWordCount,
				userId: user?.id as string,
			})

			return json({ message: 'saved' })
		}
	}
}
