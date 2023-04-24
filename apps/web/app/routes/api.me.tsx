import { ActionArgs, LoaderArgs, json, redirect } from '@remix-run/node'
import { checkUsername, updateUser } from '~/models/user.server'
import { auth } from '~/services/auth.server'

export async function loader({ request, params }: LoaderArgs) {
	const user = await auth.isAuthenticated(request)

	if (!user) {
		throw redirect('/login', 401)
	}

	const username = params.username as string
	const isAvailable = await checkUsername(username)
	return json({ isAvailable })
}

export async function action({ request }: ActionArgs) {
	const user = await auth.isAuthenticated(request)

	if (!user) {
		throw redirect('/login', 401)
	}

	switch (request.method) {
		case 'PUT': {
			const formData = await request.formData()
			const name = formData.get('name') as string
			const bio = formData.get('bio') as string
			const username = formData.get('username') as string

			const record = {
				name,
				bio,
				username,
			}

			await updateUser(user.id, record)

			return json({ message: 'user_updated' }, 200)
		}
	}
}
