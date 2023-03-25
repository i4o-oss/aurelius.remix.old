import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import invariant from 'tiny-invariant'
import bcrypt from 'bcrypt'
import { sessionStorage } from '~/services/session.server'
// import sendEmail from '~/services/email.server'
import type { User } from '~/models/user.server'
import { findOrCreateUser } from '~/models/user.server'

export let auth = new Authenticator<User>(sessionStorage)

auth.use(
	// @ts-ignore
	new FormStrategy(async ({ form }) => {
		const email = form.get('email')
		const password = form.get('password')
		const accessCode = form.get('accessCode')

		// You can validate the inputs however you want
		invariant(typeof email === 'string', 'email must be a string')
		invariant(email.length > 0, 'email must not be empty')

		invariant(typeof password === 'string', 'password must be a string')
		invariant(password.length > 0, 'password must not be empty')

		invariant(
			typeof accessCode === 'string',
			'access code must be a string'
		)
		invariant(accessCode.length > 0, 'access code must not be empty')

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		const user = await findOrCreateUser(email, hashedPassword, accessCode)

		return user
	})
)
