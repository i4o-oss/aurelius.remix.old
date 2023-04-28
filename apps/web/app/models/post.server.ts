import { prisma } from '~/db.server'
export type { Post } from '@prisma/client'

export async function getPublishedPostsFromAuthor(userId: string) {
    const posts = await prisma.post.findMany({
        where: { userId, published: true },
        orderBy: { createdAt: 'desc' },
    })

    return posts
}

export async function getAllPostsFromAuthor(userId: string) {
    const posts = await prisma.post.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    })

    return posts
}

export async function getPostByShareId(shareId: string) {
    return await prisma.post.findUnique({
        where: {
            shareId,
        },
        select: {
            id: true,
            title: true,
            content: true,
        },
    })
}

export async function getPostBySlug(slug: string) {
    return await prisma.post.findFirst({
        where: {
            slug,
        },
        select: {
            id: true,
            title: true,
            content: true,
            slug: true
        },
    })
}

export async function getPost(id: string) {
    return await prisma.post.findUnique({
        where: {
            id,
        },
    })
}

export async function updatePost(id: string, data: any) {
    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })
    const update = {
        title: post?.title,
        content: post?.content,
        ...data,
    }
    await prisma.post.update({
        data: update,
        where: {
            id,
        },
    })

    return { message: 'updated' }
}

export async function deletePost(id: string) {
    await prisma.post.delete({
        where: {
            id,
        },
        select: {
            title: true,
        },
    })

    // await prisma.writingSession.deleteMany({
    // 	where: {
    // 		postId: id,
    // 	},
    // })

    return { message: 'deleted' }
}

interface CreatePostParams {
    title: string
    content: string
    wordCount: number
    slug: string
    shareId: string
    userId: string
}

export async function createPost({
    title,
    content,
    wordCount,
    slug,
    shareId,
    userId,
}: CreatePostParams) {
    return await prisma.post.create({
        data: {
            title,
            content,
            wordCount,
            slug,
            shareId,
            userId,
        },
    })
}
