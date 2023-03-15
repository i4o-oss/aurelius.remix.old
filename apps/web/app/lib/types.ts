export interface BlogPost {
	title: string
	description: string
	image: string
	date: string | number
	slug: string
	draft?: boolean
	featured?: boolean
}

export interface GetBlogMdxItemsParams {
	dir?: string
	filter?: 'latest' | 'featured' | 'latest,featured' | 'all'
	count?: number
	grouped?: 'year' | 'none'
}

export interface GetMdxFileParams {
	dir?: string
	slug: string
}
