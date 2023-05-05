import { ActionArgs, LoaderArgs, json, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { USERNAME_DISALLOW_LIST } from '~/lib/constants'
import { checkUsername, updateUser } from '~/models/user.server'
import { auth } from '~/services/auth.server'

export async function loader({ request }: LoaderArgs) {
	const user = await auth.isAuthenticated(request)

	if (!user) {
		throw redirect('/login', 401)
	}

	const url = new URL(request.url)
	const username = url.searchParams.get('username')
	invariant(typeof username === 'string', 'username must be a string')
	invariant(username.length > 0, 'username cannot be empty')
    const isUsernameAllowed = !USERNAME_DISALLOW_LIST.includes(username)
	const isAvailable = await checkUsername(username)
	return json({ isAvailable: isAvailable && isUsernameAllowed })
}

export async function action({ request }: ActionArgs) {
	const user = await auth.isAuthenticated(request)

	if (!user) {
		throw redirect('/login', 401)
	}

	switch (request.method) {
		case 'POST': {
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
