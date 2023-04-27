import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Links, Meta, useLoaderData } from '@remix-run/react'
import { ArrowLeftIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { ORIGIN } from '~/lib/constants'
import { Button } from '@i4o/catalystui'
import invariant from 'tiny-invariant'
import { getUserByUsername } from '~/models/user.server'
import { getPostBySlug } from '~/models/post.server'

export const meta: MetaFunction = () => {
	// @ts-ignore
	const { post, user } = useLoaderData<typeof loader>()

	return {
		charset: 'utf-8',
		title: `${post?.title} - ${user?.name}`,
		// description: post.description,
		// 'og:site': `https://aurelius.ink/blog/${post.slug}`,
		// 'og:url': `https://aurelius.ink/blog/${post.slug}`,
		// 'og:title': `${post?.title} - Aurelius Blog`,
		// 'og:description': post.description,
		// 'og:image': post.og_image,
		// 'twitter:card': 'summary_large_image',
		// 'twitter:site': '@aurelius_ink',
		// 'twitter:url': `https://aurelius.ink/blog/${post.slug}`,
		// 'twitter:creator': '@aurelius_ink',
		// 'twitter:title': `${post?.title} - Aurelius Blog`,
		// 'twitter:description': post.description,
		// 'twitter:image': post.og_image,
		viewport: 'width=device-width,initial-scale=1',
	}
}

export async function loader({ params }: LoaderArgs) {
	const username = params.username
	invariant(typeof username === 'string', 'username must be a string')
	invariant(
		username !== '' || username !== undefined,
		'username must not be empty or undefined'
	)
	const user = await getUserByUsername(username)
	invariant(typeof user?.id === 'string', 'userId must be a string')
	const slug = params.slug

	invariant(typeof slug === 'string', 'slug must be a string')
	invariant(
		slug !== '' || slug !== undefined,
		'username must not be empty or undefined'
	)
	const post = await getPostBySlug(slug)
	return json({ user: { username, name: user.name, bio: user.bio }, post })
}

export default function BlogPost() {
	const { post, user } = useLoaderData<typeof loader>()
	const permalink = `${ORIGIN}/blog/${post?.slug}`
	const tweetMessage = `I just published a post: ${post?.title} 👇`

	return (
		<>
			<head>
				<Meta />
				<Links />
				<script src='https://platform.twitter.com/widgets.js'></script>
			</head>
			<article className='prose dark:prose-invert container relative max-w-3xl p-6 lg:py-10 lg:px-0'>
				<div className='flex justify-start py-4 lg:py-8'>
					<Link
						to={`/${user.username}`}
						className='inline-flex items-center justify-center text-sm font-medium'
					>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						See all posts
					</Link>
				</div>
				<div>
					<h1 className='mt-8 mb-4 block text-4xl font-extrabold leading-tight lg:text-5xl'>
						{post?.title}
					</h1>
				</div>
				<div
					className='text-lg leading-loose'
					dangerouslySetInnerHTML={{
						__html: post?.content as string,
					}}
				/>
				<div className='mt-16 flex flex-col items-start'>
					<span className='text-sm uppercase'>Share this:</span>
					<div className='mt-4'>
						<a
							href={`https://twitter.com/intent/tweet?${new URLSearchParams(
								{
									url: permalink,
									text: tweetMessage,
								}
							)}`}
							target='_blank'
							className='no-underline'
							rel='noreferrer noopener'
						>
							<Button leftIcon={<TwitterLogoIcon />}>
								Twitter
							</Button>
						</a>
					</div>
				</div>
			</article>
		</>
	)
}
