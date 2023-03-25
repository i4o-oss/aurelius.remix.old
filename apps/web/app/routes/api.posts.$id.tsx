import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { deletePost, updatePost } from '~/models/post.server'

export async function action({ request, params }: ActionArgs) {
	switch (request.method) {
		case 'PUT': {
			const formData = await request.formData()
			const title = formData.get('title') as string
			const content = formData.get('content') as string
			const wordCount = Number(formData.get('wordCount') as string)
			const record = {
				title,
				content,
				wordCount,
			}
			const post = await updatePost(params.id as string, record)

			return json({ post }, 200)
		}
		case 'DELETE': {
			await deletePost(params.id as string)

			return json({ message: 'deleted' }, 200)
		}
	}
}
