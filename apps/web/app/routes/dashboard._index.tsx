import { useState } from 'react'
import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { getAllPostsFromAuthor, Post } from '~/models/post.server'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import {
	Alert,
	Button,
	CopyToClipboard,
	DangerButton,
	IconButton,
	PrimaryButton,
	Toast,
} from '@i4o/catalystui'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { formatDistance } from 'date-fns'
import { getGreeting } from '~/lib/utils'
import { auth } from '~/services/auth.server'

interface GreetingProps {
	name: string
}

function Greeting(props: GreetingProps) {
	const { name } = props

	return (
		<div className='flex w-full items-center justify-start'>
			<h1 className='text-4xl font-bold text-white'>
				{getGreeting(name)}
			</h1>
		</div>
	)
}

interface Props {
	posts: Post[]
}

function Posts(props: Props) {
	const { posts } = props

	return (
		<div className='flex h-full w-full flex-col items-center justify-start space-y-4'>
			<div className='flex w-full items-center justify-between'>
				<h2 className='text-3xl font-semibold text-white'>Posts</h2>
				<Link to='/'>
					<PrimaryButton>Write</PrimaryButton>
				</Link>
			</div>
			<div className='flex w-full flex-col items-center justify-start divide-y divide-gray-700'>
				{posts.map((post) => {
					return <PostItem post={post} key={post.id} />
				})}
			</div>
		</div>
	)
}

interface PostItemProps {
	post: Post
}

function PostItem({ post }: PostItemProps) {
	const postFetcher = useFetcher()
	const [deletePostToast, setDeletePostToast] = useState(false)

	const deletePostHandler = async () => {
		postFetcher.submit(
			{},
			{ method: 'delete', action: `/api/posts/${post.id}` }
		)
		setDeletePostToast(true)
	}

	const shareLink = `/posts/${post.id}`

	return (
		<>
			<div className='grid w-full grid-cols-3 gap-2 py-8'>
				<div className='col-span-2 flex h-full w-full flex-col items-start justify-center space-y-4'>
					<Link to={`/?edit=${post.shareId}`}>
						<h3 className='text-xl font-medium text-white'>
							{post.title}
						</h3>
					</Link>
					<div className='flex items-center justify-start space-x-2'>
						<p className='flex items-center justify-center rounded-md bg-gray-700 px-2 py-1 text-xs text-white'>
							{post.published ? 'Published' : 'Draft'}
						</p>
						<span className='text-xs text-white'>
							{formatDistance(
								new Date(post.createdAt),
								new Date(),
								{
									addSuffix: true,
								}
							)}
						</span>
					</div>
				</div>
				<div className='col-span-1 flex h-full w-full items-center justify-end space-x-4'>
					<CopyToClipboard text={shareLink} />
					<Link to={`/?edit=${post.shareId}`}>
						<IconButton className='!p-2' icon={<Pencil1Icon />} />
					</Link>
					<Alert
						title='Are you sure?'
						description='This action cannot be undone.'
						cancel={<Button>Cancel</Button>}
						action={
							<DangerButton onClick={deletePostHandler}>
								Delete
							</DangerButton>
						}
						trigger={
							<IconButton
								className='!p-2'
								icon={<TrashIcon className='text-danger-500' />}
							/>
						}
					/>
				</div>
			</div>
			{deletePostToast && (
				<Toast
					description={<span>Post deleted.</span>}
					defaultOpen={deletePostToast}
					action=''
					actionAltText=''
				/>
			)}
		</>
	)
}

export async function loader({ request }: LoaderArgs) {
	const user = await auth.isAuthenticated(request, {
		failureRedirect: '/login',
	})
	const posts = await getAllPostsFromAuthor(user?.id as string)

	return json({ posts, user })
}

export default function DashboardHome() {
	const { posts, user } = useLoaderData<SerializeFrom<typeof loader>>()

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<div className='flex h-full w-full items-start justify-center py-16'>
				<div className='w-full max-w-3xl flex-col items-center justify-start space-y-16'>
					<Greeting name={user.name as string} />
					<Posts
						// @ts-ignore
						posts={posts}
					/>
				</div>
			</div>
		</main>
	)
}
