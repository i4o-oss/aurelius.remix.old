import { Authenticator } from 'remix-auth'
import { EmailLinkStrategy } from 'remix-auth-email-link'
import invariant from 'tiny-invariant'
import { sessionStorage } from '~/services/session.server'
import { sendMagicLinkEmail } from '~/services/email.server'
import type { User } from '~/models/user.server'
import { createUser, getUserByEmail } from '~/models/user.server'

const MAGIC_LINK_SECRET = process.env.MAGIC_LINK_SECRET

if (!MAGIC_LINK_SECRET) {
    throw new Error('Missing MAGIC_LINK_SECRET environment variable')
}

export let auth = new Authenticator<User>(sessionStorage)

async function sendSignUpEventToLoops(email: string) {
    const data = {
        email,
        eventName: 'signup',
        userGroup: 'beta',
    }
    const response = await fetch('https://app.loops.so/api/v1/events/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        },
    })
    const res = await response.json()
    return res
}

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
                await sendSignUpEventToLoops(email)
                return newUser
            }
        }
    )
)
