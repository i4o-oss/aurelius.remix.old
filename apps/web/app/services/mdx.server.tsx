import fs from 'fs'
import path from 'path'
import { promisify } from 'node:util'
import matter from 'gray-matter'
import remarkFrontmatter from 'remark-frontmatter'
import { compile } from '@mdx-js/mdx'
import { BLOG_POSTS_DIR } from '~/lib/constants'
import type { GetBlogMdxItemsParams, GetMdxFileParams } from '~/lib/types'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

async function readFilesInDir(dir: string) {
	const files = await readdir(dir, { withFileTypes: true })

	const promises = files.map(async (f) => {
		const filePath = path.join(dir, f.name)
		const file = await readFile(filePath, 'utf8')

		return file
	})

	const items = await Promise.all(promises)

	return items
}

async function getBlogMdxItems({
	dir = BLOG_POSTS_DIR,
}: GetBlogMdxItemsParams) {
	const items = await readFilesInDir(dir)

	const posts = items.map((item) => {
		const content = matter(item)
		const date = content.data.date_published.toISOString()

		return {
			title: content.data.title,
			description: content.data.excerpt,
			image: content.data.image,
			date,
			slug: content.data.slug,
			draft: content.data.draft,
			featured: content.data.featured,
		}
	})

	const onlyPublished = posts.filter((post) => !post.draft)

	const sortedPosts = onlyPublished.sort(
		(a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
	)

	// if (grouped === 'year') {
	// 	const articlesGroupedByYear = onlyPublished.reduce(
	// 		(groups: PostGroup, post: Post) => {
	// 			const year = post.date.toString().split('-')[0]
	// 			if (!groups[year]) {
	// 				groups[year] = []
	// 			}

	// 			groups[year].push(post)

	// 			return groups
	// 		},
	// 		{}
	// 	)

	// 	const sortedAndGroupedArticles: PostGroup = {}

	// 	for (const year in articlesGroupedByYear) {
	// 		const sortedArticlesList = articlesGroupedByYear[year].sort(
	// 			(a, b) =>
	// 				new Date(b.date).valueOf() - new Date(a.date).valueOf()
	// 		)

	// 		sortedAndGroupedArticles[year] = sortedArticlesList
	// 	}

	// 	return sortedAndGroupedArticles
	// }

	// if (filter === 'latest') {
	// 	// latest posts
	// 	return {
	// 		latest: sortedPosts.slice(0, count),
	// 	}
	// } else if (filter === 'featured') {
	// 	// featured posts
	// 	return {
	// 		featured: sortedPosts.filter((post) => post.featured),
	// 	}
	// } else if (filter === 'latest,featured') {
	// 	// latest and featured posts
	// 	const latest = sortedPosts.slice(0, count)
	// 	const featured = sortedPosts.filter((post) => post.featured)
	// 	return {
	// 		featured,
	// 		latest,
	// 	}
	// }

	return sortedPosts
}

async function getMdxFile({ dir = BLOG_POSTS_DIR, slug }: GetMdxFileParams) {
	const items = await readFilesInDir(dir)

	const posts = items.filter((item) => {
		const content = matter(item)

		return content.data.slug === slug
	})

	const frontmatter = matter(posts[0])
	const code = String(
		await compile(posts[0], {
			development: false,
			outputFormat: 'function-body',
			remarkPlugins: [remarkFrontmatter],
		})
	)

	return { frontmatter, code }
}

export { getBlogMdxItems, getMdxFile }
