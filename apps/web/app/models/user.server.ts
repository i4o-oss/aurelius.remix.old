import { prisma } from '~/db.server'
export type { User } from '@prisma/client'

export async function getUserById(id: string) {
	return prisma.user.findUnique({ where: { id } })
}

// @ts-ignore
export async function findOrCreateUser(
	email: string,
	password: string,
	accessCode: string
) {
	let user = await getUserByEmail(email)
	if (user) {
		return user
	} else {
		const newUser = await createUser({ email, password, accessCode })
		return newUser
	}
}

export async function getUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	return user
}

interface CreateUserParams {
	email: string
	password: string
	accessCode: string
}

export async function createUser({
	email,
	password,
	accessCode,
}: CreateUserParams) {
	// TODO: send welcome email
	const waitlistEntry = await prisma.waitlist.findFirstOrThrow({
		where: {
			email,
			accessCode,
		},
	})
	if (waitlistEntry) {
		const { email, name } = waitlistEntry

		const user = await prisma.user.create({
			data: {
				email,
				name,
				password,
			},
		})

		return user
	}
}
