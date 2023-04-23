import { Dialog, PrimaryButton, Select, ToggleGroup } from '@i4o/catalystui'
import { useContext, useState } from 'react'
import { AureliusContext, AureliusProviderData } from './provider'

type TitleAlignment = 'left' | 'center'

interface ExportProps {
	exportPost: () => void
}

export default function Export({ exportPost }: ExportProps) {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { content, showExportImageDialog, setShowExportImageDialog, title } =
		context

	const [titleAlignment, setTitleAlignment] = useState<TitleAlignment>('left')

	const CHANNELS = [
		{ value: 'twitter', label: 'Twitter' },
		{ value: 'substack-notes', label: 'Substack Notes' },
		{ value: 'ig-post', label: 'IG Post (Coming Soon)', disabled: true },
		{ value: 'ig-story', label: 'IG Story (Coming Soon)', disabled: true },
	]

	return (
		<Dialog
			open={showExportImageDialog}
			onOpenChange={setShowExportImageDialog}
			title=''
		>
			<div className='au-flex au-min-h-[40rem] au-h-auto au-w-[80rem] [&_div[role="tablist"]]:!au-gap-2 au-rounded-lg au-overflow-hidden au-divide-x au-divide-subtle'>
				<div className='au-w-full au-h-auto au-min-h-[64rem] au-flex-1 au-flex-grow au-grid-cols-2 au-gap-2 au-p-4'>
					<div
						className='au-flex au-w-full au-h-full au-aspect-[8/9] au-flex-col au-items-start au-justify-start au-bg-ui au-bg-no-repeat au-bg-cover au-bg-opacity-50'
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
					>
						<div className='au-flex au-w-full au-max-w-none au-h-full au-flex-col au-items-start au-justify-center au-py-16 au-px-12 au-prose au-prose-slate au-prose-base prose-headings:au-mb-0 au-prose-p:au-mt-2 au-prose-p:au-mb-2 prose-blockquote:au-border-slate-900'>
							<h1
								className={`au-w-full au-flex au-flex-col au-text-gray-900 au-font-semibold ${
									titleAlignment === 'left'
										? 'au-text-left'
										: 'au-text-center'
								}`}
							>
								{title}
							</h1>
							<div
								className='au-w-full au-text-gray-900'
								dangerouslySetInnerHTML={{
									__html: content as string,
								}}
							/>
						</div>
					</div>
				</div>
				<div className='au-w-96 au-p-4 au-flex au-flex-col au-justify-start au-relative'>
					<h2 className='au-text-md au-font-medium au-text-primary-foreground au-mb-4'>
						Export Settings
					</h2>
					<div className='au-flex au-w-full au-flex-col au-items-center au-justify-start au-gap-4'>
						<div className='au-grid au-grid-cols-4 au-w-full au-gap-2'>
							<label className='au-col-span-2 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
								Platform
							</label>
							<div className='au-col-span-2 au-relative [&_button]:au-w-full'>
								<Select
									items={CHANNELS}
									name='music-channels'
								/>
							</div>
						</div>
						<div className='au-w-full [&_div[role="group"]]:au-col-span-2 [&_div[role="group"]]:au-divide-y-0 [&_div[role="group"]]:au-divide-x au-grid au-grid-cols-4 au-gap-2 au-text-primary-foreground [&_button[role="radio"]]:au-h-full [&_button[role="radio"]]:au-p-0 [&_button[role="radio"]]:au-col-span-1 [&_button[role="radio"]]:au-rounded-none [&_div[role="group"]]:au-grid [&_div[role="group"]]:au-h-8 [&_div[role="group"]]:au-w-full [&_div[role="group"]]:au-grid-cols-2 [&_div[role="group"]]:au-overflow-hidden [&_div[role="group"]]:au-rounded-lg'>
							<label className='au-col-span-2 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
								Title Alignment
							</label>
							<ToggleGroup
								items={[
									{
										value: 'left',
										label: 'Left',
										icon: (
											<div className='au-flex au-w-full au-h-full au-items-center au-justify-center au-px-2'>
												<span>Left</span>
											</div>
										),
									},
									{
										value: 'center',
										label: 'Center',
										icon: (
											<div className='au-flex au-w-full au-h-full au-items-center au-justify-center au-px-2'>
												<span>Center</span>
											</div>
										),
									},
								]}
								// @ts-ignore
								defaultValue={titleAlignment}
								onValueChange={(value) =>
									setTitleAlignment(value as TitleAlignment)
								}
								orientation='vertical'
								type='single'
							/>
						</div>
					</div>
					<div className='au-absolute au-bottom-0 au-left-0 au-p-4 au-flex au-flex-col au-w-full au-items-end au-justify-end'>
						<p className='au-py-4 au-text-xs au-border-b au-border-subtle'>
							<em>
								Please note: This is for preview purposes only.
								Exported image may vary slightly from what you
								see here.
							</em>
						</p>
						<PrimaryButton
							className='au-mt-4'
							onClick={exportPost}
							type='submit'
						>
							Export
						</PrimaryButton>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
