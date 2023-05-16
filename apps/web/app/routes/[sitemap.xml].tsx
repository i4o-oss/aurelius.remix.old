import invariant from 'tiny-invariant'
import { ORIGIN, staticPages } from '~/lib/constants'
import { toXmlSitemap } from '~/lib/utils'
import { getPublishedPostsFromAuthor } from '~/models/post.server'

// code from: https://ericnish.io/blog/sitemap-xml-with-remix
export const loader = async () => {
    try {
        const userId = process.env.BLOG_USER_ID

        invariant(typeof userId === 'string', 'userId must be a string')
        invariant(
            userId !== '' || userId !== undefined,
            'userId must not be empty or undefined'
        )

        const posts = await getPublishedPostsFromAuthor(userId)
        const sitemap = toXmlSitemap([
            ...staticPages
                .filter(({ to }) => to !== '/')
                .map(({ to }) => `${ORIGIN}${to}`),
            ...posts.map(
                ({ slug }: { slug: string }) => `${ORIGIN}/blog/${slug}`
            ),
        ])

        return new Response(sitemap, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'X-Content-Type-Options': 'nosniff',
                'Cache-Control': 'public, max-age=3600',
            },
        })
    } catch (e) {
        throw new Response('Internal Server Error', { status: 500 })
    }
}
