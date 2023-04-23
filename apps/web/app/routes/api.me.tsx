import { ActionArgs, LoaderArgs, json, redirect } from '@remix-run/node'
import { checkUsername } from '~/models/user.server'
import { auth } from '~/services/auth.server'

export async function loader({ request, params }: LoaderArgs) {
	const user = await auth.isAuthenticated(request)

	if (!user) {
		throw redirect('/login', 302)
	}

	const username = params.username as string
	const isAvailable = await checkUsername(username)
	return json({ isAvailable })
}

export async function action({ request }: ActionArgs) {
	const user = await auth.isAuthenticated(request)
	switch (request.method) {
		case 'PUT': {
			const formData = await request.formData()
			const name = formData.get('name') as string
			const bio = formData.get('bio') as string
			const username = Number(formData.get('username') as string)
		}
	}
}
