import { Link, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { BlogPost } from '~/lib/types'
import { formatDate } from '~/lib/utils'
import { getBlogMdxItems } from '~/services/mdx.server'
import { Theme, useTheme } from '~/lib/theme'

export async function loader() {
	const posts = await getBlogMdxItems({ grouped: 'year' })
	return json({ posts })
}

export default function Blog() {
	const data = useLoaderData<typeof loader>()
	const [theme] = useTheme()
	const { posts } = data
	return (
		<div className='container max-w-4xl p-6 lg:py-10 lg:px-0'>
			<div className='mb-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8'>
				<div className='flex-1 space-y-4'>
					<h1 className='inline-block text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 lg:text-5xl'>
						Blog
					</h1>
					<p className='text-xl text-slate-700 dark:text-slate-300'>
						Crafts and technical details
					</p>
				</div>

				<img
					className={`${
						theme === Theme.DARK ? 'invert' : ''
					} mb-4 w-64`}
					src={
						theme === Theme.DARK
							? '/images/blog.svg'
							: '/images/blog_light.svg'
					}
					alt='writing illustration'
				/>
			</div>
			{posts?.length ? (
				<div className='grid gap-10 sm:grid-cols-2'>
					{posts.map(
						// @ts-ignore
						(post: BlogPost, index: number) => (
							<article
								key={`post-${index}`}
								className='group relative flex flex-col space-y-2'
							>
								{post.og_image && (
									<img
										src={post.og_image}
										alt={post.title}
										className='rounded-lg border border-slate-800 bg-slate-800 transition-colors group-hover:border-slate-900'
									/>
								)}
								{post.date && (
									<p className='text-sm text-slate-500 dark:text-slate-500'>
										{formatDate(post.date)}
									</p>
								)}
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
