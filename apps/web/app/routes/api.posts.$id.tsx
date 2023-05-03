import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { deletePost, updatePost } from '~/models/post.server'

export async function action({ request, params }: ActionArgs) {
	switch (request.method) {
		case 'PUT': {
			const formData = await request.formData()
			const keys = formData.keys()
			const update = {}

			for (const key of keys) {
				if (key === 'wordCount') {
					// @ts-ignore
					update[key as string] = Number(
						formData.get('wordCount') as string
					)
				} else if (key === 'published') {
					const published = formData.get('published') === 'true'
					// @ts-ignore
					update[key as string] = published
				} else {
					// @ts-ignore
					update[key as string] = formData.get(key)
				}
			}

			const post = await updatePost(params.id as string, update)

			// @ts-ignore
			if (update && update?.published) {
				return json({ message: 'published' }, 200)
				// @ts-ignore
			} else if (update && !update?.published) {
				return json({ message: 'unpublished' }, 200)
			}

			return json({ post }, 200)
		}
		case 'DELETE': {
			await deletePost(params.id as string)

			return json({ message: 'deleted' }, 200)
		}
	}
}
