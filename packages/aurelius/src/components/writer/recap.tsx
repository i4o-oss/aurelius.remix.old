import { Dialog } from '@i4o/catalystui'
import { useContext } from 'react'
import { AureliusContext, AureliusProviderData } from './provider'

export default function WritingSessionRecap() {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { sessionData, showSessionRecapDialog, setShowSessionRecapDialog } =
		context
	return (
		<Dialog
			open={showSessionRecapDialog}
			onOpenChange={setShowSessionRecapDialog}
			title={
				<h3 className='au-px-4 au-pt-4 au-pb-2 au-text-lg'>
					Writing Session Recap
				</h3>
			}
			trigger={null}
		>
			<div className='au-grid au-w-[24rem] au-grid-cols-2 au-gap-2 au-px-4 au-py-2 au-pb-4 au-text-primary-foreground'>
				<p className='au-text-left'>Session Target:</p>
				<p className='au-text-right'>
					{sessionData?.goal === 'duration'
						? `${sessionData?.target / 60} minutes`
						: `${sessionData?.target} words`}
				</p>
				<p className='au-text-left'># of words written:</p>
				<p className='au-text-right'>
					{`${
						// @ts-ignore
						sessionData?.endingWordCount -
						// @ts-ignore
						sessionData?.startingWordCount
					}`}
				</p>
				<p className='au-text-left'>Session Duration:</p>
				<p className='au-text-right'>{`${
					// @ts-ignore
					Math.floor(sessionData?.duration / 60)
				} minutes`}</p>
			</div>
		</Dialog>
	)
}
