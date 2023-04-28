import { Link, useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@remix-run/node'
import { formatDate } from '~/lib/utils'
import { getUserByUsername } from '~/models/user.server'
import invariant from 'tiny-invariant'
import { getPublishedPostsFromAuthor } from '~/models/post.server'

export async function loader({ params }: LoaderArgs) {
	const username = params.username
	invariant(typeof username === 'string', 'username must be a string')
	invariant(
		username !== '' || username !== undefined,
		'username must not be empty or undefined'
	)
	const user = await getUserByUsername(username)
	invariant(typeof user?.id === 'string', 'userId must be a string')
	const posts = await getPublishedPostsFromAuthor(user?.id)
	return json({ user: { username, name: user.name, bio: user.bio }, posts })
}

export default function Profile() {
	const data = useLoaderData<typeof loader>()
	const { posts, user } = data
	return (
		<div className='container max-w-4xl p-6 lg:py-10 lg:px-0'>
			<div className='mb-4 flex h-64 flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8'>
				<div className='flex flex-1 flex-col items-start justify-start space-y-4'>
					<h1 className='text-primary-foreground inline-block text-4xl font-extrabold tracking-tight lg:text-5xl'>
						{user.name}
					</h1>
					<p className='text-primary-foreground-subtle w-3/4 text-xl'>
						{user.bio}
					</p>
				</div>
			</div>
			{posts?.length ? (
				<div className='grid gap-10 sm:grid-cols-1'>
					{posts.map(
						// @ts-ignore
						(post: any, index: number) => (
							<article
								key={`post-${index}`}
								className='group relative flex flex-col space-y-1'
							>
								{/* {post.og_image && ( */}
								{/* 	<img */}
								{/* 		src={post.og_image} */}
								{/* 		alt={post.title} */}
								{/* 		className='rounded-lg border border-slate-800 bg-slate-800 transition-colors group-hover:border-slate-900' */}
								{/* 	/> */}
								{/* )} */}
								<Link to={`/${user.username}/${post.slug}`}>
									<h2 className='text-primary-foreground mb-0 text-2xl font-bold'>
										{post.title}
									</h2>
								</Link>
								{post.description && (
									<p className='text-primary-foreground-subtle'>
										{post.description}
									</p>
								)}
								<div className='flex items-center justify-between py-2'>
									{post.createdAt && (
										<p className='text-primary-foreground-subtle m-0 text-sm'>
											{formatDate(post.createdAt)}
										</p>
									)}
									{/* {post.tag && ( */}
									{/* 	<span className='rounded-lg bg-slate-300 px-2 py-1 text-xs text-slate-900 dark:bg-slate-700 dark:text-slate-50'> */}
									{/* 		{post.tag} */}
									{/* 	</span> */}
									{/* )} */}
								</div>
							</article>
						)
					)}
				</div>
			) : (
				<p className='text-primary-foreground-subtle'>
					No posts published.
				</p>
			)}
		</div>
	)
}
