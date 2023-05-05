import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { nanoid } from 'nanoid/async'
import { createPost } from '~/models/post.server'
import { auth } from '~/services/auth.server'

export async function action({ request }: ActionArgs) {
	const user = await auth.isAuthenticated(request)
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const id = await nanoid(16)
			const title = formData.get('title') as string
			const content = formData.get('content') as string
			const wordCount = Number(formData.get('wordCount') as string)
			const slug = title
				.replace(/[^a-zA-Z ]/g, '')
				.toLowerCase()
				.split(' ')
				.join('-')
			const shareId = `${slug}-${id}`
			const record = {
				title,
				content,
				wordCount,
				slug: '',
				shareId,
				userId: user?.id as string,
			}

			const post = await createPost(record)

			return json({ id: post.id }, 200)
		}
	}
}
