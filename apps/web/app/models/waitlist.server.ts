import { prisma } from '~/db.server'
export type { Waitlist } from '@prisma/client'
import { customAlphabet } from 'nanoid/async'
import { WAITLIST_CODE_ALPHABET } from '~/lib/constants'
const nanoid = customAlphabet(WAITLIST_CODE_ALPHABET, 8)

export async function findOrCreate(email: string, name: string) {
	let user = await getWaitlistEntryByEmail(email)
	if (user) {
		return user
	} else {
		const newUser = await createWaitlistEntry({ email, name })
		return newUser
	}
}

export async function getWaitlistEntryByEmail(email: string) {
	const waitlist = await prisma.waitlist.findUnique({
		where: {
			email,
		},
	})

	return waitlist
}

interface CreateWaitlistEntry {
	email: string
	name: string
}

export async function createWaitlistEntry({
	email,
	name,
}: CreateWaitlistEntry) {
	const accessCode = await nanoid()
	const count = (await prisma.waitlist.count()) as number
	const waitlist = await prisma.waitlist.create({
		data: {
			email,
			name,
			accessCode,
			position: count + 1,
		},
	})

	return waitlist
}
