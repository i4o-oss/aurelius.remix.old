import { prisma } from '~/db.server'
export type { User } from '@prisma/client'

export async function getUserById(id: string) {
	return prisma.user.findUnique({ where: { id } })
}

// @ts-ignore
export async function findOrCreateUser(email: string, name: string) {
	let user = await getUserByEmail(email)
	if (user) {
		return user
	} else {
		const newUser = await createUser({ email, name })
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
	name: string
}

export async function createUser({ email, name }: CreateUserParams) {
	// TODO: send welcome email
	const user = await prisma.user.create({
		data: {
			email,
			name,
		},
	})

	return user
}
