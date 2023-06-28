import { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import { createWritingSession } from '~/models/writing-session.server'

export async function action({ request }: ActionArgs) {
	const user = await auth.isAuthenticated(request)
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const goal = formData.get('goal') as string
			const target = Number(formData.get('target') as string)
			const result = Number(formData.get('result') as string)
			const startingWordCount = Number(formData.get('startingWordCount') as string)
			const endingWordCount = Number(formData.get('endingWordCount') as string)

			await createWritingSession({
				goal,
				target,
				result,
				startingWordCount,
				endingWordCount,
				userId: user?.id as string,
			})

			return json({ message: 'saved' })
		}
	}
}
