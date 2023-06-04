import { Dialog, ScrollArea } from '@i4o/catalystui'
import { useContext } from 'react'
import { AureliusContext, AureliusProviderData } from './provider'

export default function Help() {
	const { showHelpDialog, setShowHelpDialog } =
		useContext<AureliusProviderData>(AureliusContext)

	return (
		<Dialog
			open={showHelpDialog}
			onOpenChange={setShowHelpDialog}
			title={
				<h3 className='au-p-4 au-text-lg au-border-b au-border-subtle'>
					Help
				</h3>
			}
		>
			<ScrollArea className='au-w-[40rem] au-h-[48rem] !au-bg-primary-subtle'>
				<div className='au-flex au-flex-col au-gap-y-8'>
					<section className='au-w-full au-flex au-flex-col au-items-start au-justify-start au-gap-4'>
						<h4 className='au-text-base au-font-semibold'>
							Formatting Shortcuts
						</h4>
						<ul className='au-w-full au-border au-border-subtle au-divide-y au-divide-subtle au-rounded-lg au-text-sm'>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p># text</p>
								<p>H1 heading</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>## text</p>
								<p>H2 heading</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>### text</p>
								<p>H3 heading</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>- text</p>
								<p>Bulleted List</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>1. text</p>
								<p>Numbered List</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>**text**</p>
								<p>Bold</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>*text*</p>
								<p>Italics</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>~text~</p>
								<p>Strikethrough</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>[text](url)</p>
								<p>Hyperlink</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>==text==</p>
								<p>Highlight</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>`text`</p>
								<p>Inline Code</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>```</p>
								<p>Code Block</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>{'> text'}</p>
								<p>Blockquote</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>---</p>
								<p>Divider</p>
							</li>
						</ul>
					</section>
					<section className='au-w-full au-flex au-flex-col au-items-start au-justify-start au-gap-4 au-mb-4'>
						<h4 className='au-text-base au-font-semibold'>
							Keyboard Shortcuts
						</h4>
						<ul className='au-w-full au-border au-border-subtle au-divide-y au-divide-subtle au-rounded-lg au-text-sm'>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>New Post</p>
								<p className='au-flex au-items-center au-gap-1 au-text-xs'>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										N
									</kbd>
								</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>New Writing Session</p>
								<p className='au-flex au-items-center au-gap-1 au-text-xs'>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										W
									</kbd>
								</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>Export as Image</p>
								<p className='au-flex au-items-center au-gap-1 au-text-xs'>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										I
									</kbd>
								</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>Export as Markdown</p>
								<p className='au-flex au-items-center au-gap-1 au-text-xs'>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										D
									</kbd>
								</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>Focus Mode</p>
								<p className='au-flex au-items-center au-gap-1 au-text-xs'>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										M
									</kbd>
								</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>Reset Editor</p>
								<p className='au-flex au-items-center au-gap-1 au-text-xs'>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										R
									</kbd>
								</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>Preferences</p>
								<p className='au-flex au-items-center au-gap-1 au-text-xs'>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										S
									</kbd>
								</p>
							</li>
							<li className='au-flex au-items-center au-justify-between au-px-4 au-py-2'>
								<p>Help</p>
								<p className='au-flex au-items-center au-gap-1 au-text-xs'>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										Alt
									</kbd>
									<kbd className='au-px-2 au-py-1 au-font-semibold au-text-primary-foreground-subtle au-bg-primary au-border au-border-subtle au-rounded'>
										?
									</kbd>
								</p>
							</li>
						</ul>
					</section>
				</div>
			</ScrollArea>
		</Dialog>
	)
}
