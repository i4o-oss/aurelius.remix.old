import { Link, useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@remix-run/node'
import { formatDate } from '~/lib/utils'
import { getUserByUsername } from '~/models/user.server'
import invariant from 'tiny-invariant'
import { getAllPostsFromAuthor } from '~/models/post.server'

export async function loader({ params }: LoaderArgs) {
	const username = params.username
	invariant(typeof username === 'string', 'username must be a string')
	invariant(
		username !== '' || username !== undefined,
		'username must not be empty or undefined'
	)
	const user = await getUserByUsername(username)
	invariant(typeof user?.id === 'string', 'userId must be a string')
	const posts = await getAllPostsFromAuthor(user?.id)
	return json({ user: { username, name: user.name, bio: user.bio }, posts })
}

export default function Profile() {
	const data = useLoaderData<typeof loader>()
	const { posts, user } = data
	return (
		<div className='container max-w-4xl p-6 lg:py-10 lg:px-0'>
			<div className='mb-4 flex h-64 flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8'>
				<div className='flex-1 space-y-4'>
					<h1 className='inline-block text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 lg:text-5xl'>
						{user.name}
					</h1>
					<p className='text-xl text-slate-700 dark:text-slate-300'>
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
								className='group relative flex flex-col space-y-2'
							>
								{/* {post.og_image && ( */}
								{/* 	<img */}
								{/* 		src={post.og_image} */}
								{/* 		alt={post.title} */}
								{/* 		className='rounded-lg border border-slate-800 bg-slate-800 transition-colors group-hover:border-slate-900' */}
								{/* 	/> */}
								{/* )} */}
								<div className='flex items-center justify-between py-2'>
									{post.createdAt && (
										<p className='text-sm text-slate-500 dark:text-slate-500'>
											{formatDate(post.createdAt)}
										</p>
									)}
									{/* {post.tag && ( */}
									{/* 	<span className='rounded-lg bg-slate-300 px-2 py-1 text-xs text-slate-900 dark:bg-slate-700 dark:text-slate-50'> */}
									{/* 		{post.tag} */}
									{/* 	</span> */}
									{/* )} */}
								</div>
								<h2 className='text-2xl font-extrabold text-slate-900 dark:text-slate-50'>
									{post.title}
								</h2>
								{post.description && (
									<p className='text-slate-700 dark:text-slate-300'>
										{post.description}
									</p>
								)}
								<Link
									to={`/blog/${post.slug}`}
									className='absolute inset-0'
								>
									<span className='sr-only'>
										View Article
									</span>
								</Link>
							</article>
						)
					)}
				</div>
			) : (
				<p className='text-slate-900 dark:text-slate-50'>
					No posts published.
				</p>
			)}
		</div>
	)
}
