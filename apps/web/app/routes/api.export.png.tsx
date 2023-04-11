import { ActionArgs } from '@remix-run/node'
import satori from 'satori'
import svg2img from 'svg2img'
import parse from 'html-react-parser'
import { getFont } from '~/lib/utils'

export async function action({ request }: ActionArgs) {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const title = formData.get('title') as string
			const content = formData.get('content') as string
			const wordCount = Number(formData.get('wordCount') as string)

			const contentEl = parse(content)

			if (wordCount <= 300) {
				const jsx = (
					// @ts-ignore
					<div tw='flex flex-col w-full h-full items-start justify-start bg-white'>
						<div
							// @ts-ignore
							tw='flex flex-col w-full py-20 px-16 items-start justify-start'
						>
							<h1
								// @ts-ignore
								tw='flex flex-col text-5xl font-bold tracking-tight text-gray-900 text-left'
							>
								{title}
							</h1>
							<div
								// @ts-ignore
								tw='mt-8 flex flex-col text-lg leading-normal [&>blockquote]:border-l [&>blockquote]:italic'
							>
								{contentEl}
							</div>
						</div>
					</div>
				)

				const svg = await satori(jsx, {
					width: 1280,
					height: 1440,
					fonts: await getFont('Inter'),
				})
				const { data, error } = await new Promise(
					(
						resolve: (value: {
							data: Buffer | null
							error: Error | null
						}) => void
					) => {
						svg2img(svg, (error, buffer) => {
							if (error) {
								resolve({ data: null, error })
							} else {
								resolve({ data: buffer, error: null })
							}
						})
					}
				)
				if (error) {
					return new Response(error.toString(), {
						status: 500,
						headers: {
							'Content-Type': 'text/plain',
						},
					})
				}
				return new Response(data, {
					headers: {
						'Content-Type': 'image/png',
					},
				})
			}

			break
		}
		default:
			break
	}
}
