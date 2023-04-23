import { forwardRef } from 'react'
import { TitleAlignment } from './provider'

interface ExportImageContentProps {
	author?: string
	content: string
	footer?: string
	scale: string
	title: string
	titleAlignment: TitleAlignment
	type: 'canvas' | 'preview'
	watermark?: boolean
}

const ExportImageContent = forwardRef<HTMLDivElement, ExportImageContentProps>(
	(
		{
			author,
			content,
			footer,
			scale,
			title,
			titleAlignment,
			type,
			watermark,
		},
		ref
	) => (
		<div
			className={
				type === 'canvas'
					? 'au-absolute -au-top-[1440px] -au-left-[1080px] au-flex au-h-[1440px] au-w-[1080px] au-flex-col au-items-start au-justify-start au-bg-white au-bg-no-repeat au-bg-cover au-bg-opacity-50'
					: 'au-flex au-w-full au-h-full au-aspect-[3/4] au-flex-col au-items-start au-justify-start au-bg-ui au-bg-no-repeat au-bg-cover au-bg-opacity-50 au-select-none'
			}
			style={{
				// backgroundImage: "url('/images/templates/gggrain.svg')",
				backgroundColor: '#85FFBD',
				backgroundImage:
					'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
				// backgroundColor: '#FBAB7E',
				// backgroundImage:
				// 	'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
				// backgroundColor: '#8bc6ec',
				// backgroundImage:
				// 	'linear-gradient(45deg, #8bc6ec 0%, #9599e2 100%)',
				// backgroundColor: '#A9C9FF',
				// backgroundImage:
				// 	'linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)',
			}}
			ref={ref}
		>
			<div
				className={`au-relative au-flex au-w-full au-max-w-none au-h-full au-flex-col au-items-start au-justify-center au-py-16 au-px-12 au-prose au-prose-slate ${scale} prose-headings:au-mb-2 au-prose-p:au-mt-2 au-prose-p:au-mb-2 au-prose-li:au-mt-0 prose-blockquote:au-border-slate-900`}
			>
				<h1
					className={`au-w-full au-flex au-flex-col au-text-gray-900 au-font-semibold ${
						titleAlignment === 'left'
							? 'au-text-left'
							: 'au-text-center'
					}`}
				>
					{title}
				</h1>
				{author ? (
					<p className='au-text-gray-900 au-font-medium au-my-2'>
						{author}
					</p>
				) : null}
				<div
					className='au-w-full au-text-gray-900'
					dangerouslySetInnerHTML={{
						__html: content,
					}}
				/>
				{footer || watermark ? (
					<div className='au-absolute au-bottom-16 au-left-12 au-w-[calc(100%-7rem)] au-text-gray-700 au-flex au-items-center au-justify-between'>
						{footer ? (
							<p className='au-m-0'>aurelius.ink/ilango</p>
						) : null}
						{watermark ? (
							<p className='au-m-0'>Made with Aurelius</p>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	)
)

export default ExportImageContent
