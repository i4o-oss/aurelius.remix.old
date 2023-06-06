import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
// import { nanoid } from 'nanoid/async'
import {
	deletePost,
	getPost,
	getPostBySlug,
	updatePost,
} from '~/models/post.server'

export async function action({ request, params }: ActionArgs) {
	switch (request.method) {
		case 'PUT': {
			const savedPost = await getPost(params.id as string)
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
					if (published) {
						const slug = savedPost?.title
							.replace(/[^a-zA-Z ]/g, '')
							.toLowerCase()
							.split(' ')
							.join('-')

						const post = await getPostBySlug(slug as string)

						if (post) {
							// @ts-ignore
							update.slug = `${slug}-${Date.now()}`
						} else {
							// create slug when post is published
							// @ts-ignore
							update.slug = slug
						}
					}
					// @ts-ignore
					update[key as string] = published
				} else if (key === 'title') {
					const title = formData.get('title') as string
					// const id = await nanoid(16)
					const slug = title
						.replace(/[^a-zA-Z ]/g, '')
						.toLowerCase()
						.split(' ')
						.join('-')
					// const shareId = `${slug}-${id}`

					// @ts-ignore
					update[key as string] = formData.get(key)
					// update shareid when post title changes
					// @ts-ignore
					// update.shareId = shareId
					// update slug if post is already published
					if (savedPost?.published) {
						// @ts-ignore
						update.slug = slug
					}
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
