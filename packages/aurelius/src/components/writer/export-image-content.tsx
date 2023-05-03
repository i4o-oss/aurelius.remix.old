import { forwardRef } from 'react'
import { TitleAlignment } from '../../types'

interface ExportImageContentProps {
	author?: string
	background: string
	content: string
	footer?: string
	scale: string
	title: string
	titleAlignment: TitleAlignment
	watermark?: boolean
}

const ExportImageContent = forwardRef<HTMLDivElement, ExportImageContentProps>(
	(
		{
			author,
			background,
			content,
			footer,
			scale,
			title,
			titleAlignment,
			watermark,
		},
		ref
	) => {
		return (
			<div
				className='au-flex au-h-full au-aspect-[3/4] au-flex-col au-items-start au-justify-start au-bg-ui au-bg-no-repeat au-bg-cover au-bg-opacity-50 au-select-none'
				style={{
					backgroundImage: background,
				}}
				ref={ref}
			>
				<div
					className={`au-relative au-flex au-w-full au-max-w-none au-h-full au-flex-col au-items-start au-justify-center au-py-4 au-px-12 au-prose au-prose-slate ${scale} prose-headings:au-mb-2 au-prose-p:au-mt-2 au-prose-p:au-mb-2 au-leading-snug au-prose-li:au-mt-0 prose-blockquote:au-border-slate-900`}
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
						<p className={`au-w-full au-flex au-flex-col au-text-gray-900 au-font-medium au-my-2 ${
							titleAlignment === 'left'
								? 'au-text-left'
								: 'au-text-center'
						}`}>
							{author}
						</p>
					) : null}
					<div
						className='au-w-full au-text-gray-900'
						dangerouslySetInnerHTML={{
							__html: content,
						}}
					/>
					<div className='au-absolute au-bottom-8 au-left-12 au-w-[calc(100%-6rem)] au-text-gray-700 au-flex au-items-center au-justify-between au-text-sm'>
						{footer ? (
							<p className='au-m-0'>{footer}</p>
						) : (
							<p className='au-m-0'></p>
						)}
						{watermark ? (
							<p className='au-m-0'>Made with Aurelius</p>
						) : null}
					</div>
				</div>
			</div>
		)
	}
)

export default ExportImageContent
