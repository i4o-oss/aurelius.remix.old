import { Authenticator } from 'remix-auth'
import { EmailLinkStrategy } from 'remix-auth-email-link'
import invariant from 'tiny-invariant'
import { sessionStorage } from '~/services/session.server'
import { sendMagicLinkEmail } from '~/services/email.server'
import type { User } from '~/models/user.server'
import { getUserByEmail, createUser } from '~/models/user.server'

const MAGIC_LINK_SECRET = process.env.MAGIC_LINK_SECRET

if (!MAGIC_LINK_SECRET)
	throw new Error('Missing MAGIC_LINK_SECRET environment variable')

export let auth = new Authenticator<User>(sessionStorage)

auth.use(
	// @ts-ignore
	new EmailLinkStrategy(
		{
			sendEmail: sendMagicLinkEmail,
			secret: MAGIC_LINK_SECRET,
			callbackURL: '/api/verify',
			validateSessionMagicLink: true,
		},
		async ({ email }: { email: string }) => {
			invariant(typeof email === 'string', 'email must be a string')
			invariant(email.length > 0, 'email must not be empty')

			let user = await getUserByEmail(email)
			if (user) {
				return user
			} else {
				const newUser = await createUser({ email })
				return newUser
			}
		}
	)
)
