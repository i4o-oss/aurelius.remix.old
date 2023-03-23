import { Fragment, useEffect, useState } from 'react'
import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Links, Meta, useLoaderData } from '@remix-run/react'
import * as runtime from 'react/jsx-runtime'
import { run } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { getMdxFile } from '~/services/mdx.server'
import { formatDate } from '~/lib/utils'
import { authors } from '~/lib/constants'

type LoaderData = typeof loader

export const meta: MetaFunction = ({
	data,
}: {
	data: LoaderData | undefined
}) => {
	// @ts-ignore
	const post = data?.frontmatter?.data

	return {
		charset: 'utf-8',
		title: `${post.title} - Aurelius Blog`,
		description: post.description,
		'og:site': `https://aurelius.ink/blog/${post.slug}`,
		'og:url': `https://aurelius.ink/blog/${post.slug}`,
		'og:title': `${post.title} - Aurelius Blog`,
		'og:description': post.description,
		'og:image': post.og_image,
		'twitter:card': 'summary_large_image',
		'twitter:site': '@aurelius_ink',
		'twitter:url': `https://aurelius.ink/blog/${post.slug}`,
		'twitter:creator': '@aurelius_ink',
		'twitter:title': `${post.title} - Aurelius Blog`,
		'twitter:description': post.description,
		'twitter:image': post.og_image,
		viewport: 'width=device-width,initial-scale=1',
	}
}

export async function loader({ params }: LoaderArgs) {
	const { frontmatter, code } = await getMdxFile({
		slug: params.slug as string,
	})
	return json({ frontmatter, code })
}

function PostContent() {
	const data = useLoaderData<typeof loader>()
	const { code } = data
	const [mdxModule, setMdxModule] = useState()
	// @ts-ignore
	const Content = mdxModule ? mdxModule?.default : Fragment

	useEffect(() => {
		;(async () => {
			setMdxModule(await run(code, runtime))
		})()
	}, [code])

	return (
		<MDXProvider>
			<Content />
		</MDXProvider>
	)
}

export default function BlogPost() {
	const data = useLoaderData<typeof loader>()
	const {
		frontmatter: { data: post },
	} = data
	return (
		<>
			<head>
				<Meta />
				<Links />
			</head>
			<article className='prose dark:prose-invert container relative max-w-3xl p-6 lg:py-10 lg:px-0'>
				<div className='flex justify-start py-4 lg:py-8'>
					<Link
						to='/blog'
						className='inline-flex items-center justify-center text-sm font-medium'
					>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						See all posts
					</Link>
				</div>
				<div>
					{post.date && (
						<time
							dateTime={post.date}
							className='block text-sm text-slate-600'
						>
							Published on {formatDate(post.date)}
						</time>
					)}
					<h1 className='mt-2 mb-4 inline-block text-4xl font-extrabold leading-tight lg:text-5xl'>
						{post.title}
					</h1>
					{authors?.length ? (
						<div className='flex space-x-4 py-2'>
							{authors.map((author, index: number) =>
								author ? (
									<a
										key={`author-${index}`}
										href={`https://twitter.com/${author.twitter}`}
										className='flex items-center gap-2 text-sm no-underline'
										target='_blank'
										rel='noopener noreferrer nofollower'
									>
										<img
											src={author.avatar}
											alt={author.name}
											width={42}
											height={42}
											className='m-0 rounded-full border border-slate-200 dark:border-slate-800'
										/>
										<div className='flex flex-1 flex-col items-start gap-1 text-left leading-tight'>
											<p className='m-0 font-medium'>
												{author.name}
											</p>
											<p className='m-0 text-[12px]'>
												@{author.twitter}
											</p>
										</div>
									</a>
								) : null
							)}
						</div>
					) : null}
				</div>
				{post.image && (
					<img
						src={post.image}
						alt={post.title}
						className='my-8 w-full rounded-md border border-slate-200 bg-slate-200 transition-colors group-hover:border-slate-900'
					/>
				)}
				<div className='text-lg leading-loose'>
					<PostContent />
				</div>
			</article>
		</>
	)
}
