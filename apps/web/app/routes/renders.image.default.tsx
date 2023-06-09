import type { TitleAlignment } from '@aurelius/writer'
import { ExportImageContent } from '@aurelius/writer'
import { json, LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useRef } from 'react'

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url)
    const author = url.searchParams.get('author') as string
    const background = url.searchParams.get('background') as string
    const content = url.searchParams.get('content') as string
    const footer = url.searchParams.get('footer') as string
    const title = url.searchParams.get('title') as string
    const titleAlignment = url.searchParams.get(
        'titleAlignment'
    ) as TitleAlignment
    const watermark = (url.searchParams.get('watermark') as string) === 'true'

    return json(
        {
            author,
            background,
            content,
            footer,
            title,
            titleAlignment,
            watermark,
        },
        200
    )
}

export default function DefaultImageRenderer() {
    const {
        author,
        background,
        content,
        footer,
        title,
        titleAlignment,
        watermark,
    } = useLoaderData<typeof loader>()
    const canvasRef = useRef<HTMLDivElement>(null)

    return (
        <div className='flex h-[1440px] w-[1080px] items-start justify-start'>
            <ExportImageContent
                author={author}
                background={background}
                content={content}
                footer={footer}
                ref={canvasRef}
                scale='!prose-xl'
                title={title}
                titleAlignment={titleAlignment}
                watermark={watermark}
            />
        </div>
    )
}
