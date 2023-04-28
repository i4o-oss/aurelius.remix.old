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
                    update[key as string] = Number(formData.get('wordCount') as string)
                } else if (key === 'published') {
                    // @ts-ignore
                    update[key as string] = Boolean(formData.get('published') as string)
                } else {
                    // @ts-ignore
                    update[key as string] = formData.get(key)
                }
            }

            const post = await updatePost(params.id as string, update)

            return json({ post }, 200)
        }
        case 'DELETE': {
            await deletePost(params.id as string)

            return json({ message: 'deleted' }, 200)
        }
    }
}
