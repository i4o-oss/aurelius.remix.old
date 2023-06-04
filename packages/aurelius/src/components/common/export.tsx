import { useContext, useRef } from 'react'
import {
    Dialog,
    PrimaryButton,
    Select,
    Switch,
    ToggleGroup,
} from '@i4o/catalystui'
import { AmplitudeEventType, TitleAlignment } from '../../types'
import ExportImageContent from './export-image-content'
import { AureliusContext, AureliusProviderData } from '../writer/provider'
import { sendAmplitudeEvent } from '../../helpers'

interface ExportProps {
    exportPost: (data: any) => void
}

export default function Export({ exportPost }: ExportProps) {
    const context: AureliusProviderData = useContext(AureliusContext)
    const {
        author,
        setAuthor,
        content,
        footer,
        setFooter,
        settings,
        showExportImageDialog,
        setShowExportImageDialog,
        title,
        titleAlignment,
        setTitleAlignment,
        watermark,
        setWatermark,
        wordCount,
    } = context
    const canvasRef = useRef<HTMLDivElement>(null)
    const wordCountLimit = title !== '' ? 300 : 400
    const isExportable =
        content &&
        typeof wordCount !== 'undefined' &&
        wordCount > 0 &&
        wordCount <= wordCountLimit
    
    function exportToImage() {
        const data = {
            author,
            background: settings?.background as string,
            content,
            footer,
            title,
            titleAlignment,
            watermark
        }

        exportPost(data)
        sendAmplitudeEvent(AmplitudeEventType.IMAGE_EXPORTED)
    }

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
            <div className='au-flex au-max-h-[90vh] au-h-auto au-min-w-[60vw] au-max-w-[80vw] [&_div[role="tablist"]]:!au-gap-2 au-rounded-lg au-overflow-hidden au-divide-x au-divide-subtle'>
                <ExportImageContent
                    author={author}
                    background={settings?.background as string}
                    content={content as string}
                    footer={footer}
                    ref={canvasRef}
                    scale='au-prose-base'
                    title={title as string}
                    titleAlignment={titleAlignment as TitleAlignment}
                    watermark={watermark}
                />
                <div className='au-w-96 au-p-4 au-flex au-flex-col au-justify-start au-relative'>
                    <h2 className='au-text-md au-font-medium au-text-primary-foreground au-mb-4'>
                        Export Settings
                    </h2>
                    <div className='au-flex au-w-full au-flex-col au-items-center au-justify-start au-gap-4'>
                        <div className='au-grid au-grid-cols-4 au-w-full au-gap-2'>
                            <label className='au-col-span-2 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
                                Platform
                            </label>
                            <div className='au-col-span-2 au-relative [&_button]:au-w-full [&_>_button_>_span]:au-justify-between [&_>_button_>_span]:au-w-full'>
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
                                    setTitleAlignment?.(value as TitleAlignment)
                                }
                                orientation='vertical'
                                type='single'
                            />
                        </div>
                        <div className='au-grid au-grid-cols-4 au-w-full au-gap-2'>
                            <label className='au-col-span-2 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-flex au-items-center au-gap-2'>
                                Watermark
                                <span className='au-bg-brand au-rounded-md au-px-1.5 au-py-0.5 au-text-xs au-text-white'>
                                    Plus
                                </span>
                            </label>
                            <div className='au-col-span-2 au-relative au-py-2 au-flex au-items-center au-justify-end'>
                                <Switch
                                    defaultChecked={watermark}
                                    name='watermark'
                                    onCheckedChange={(checked) =>
                                        setWatermark?.(checked)
                                    }
                                />
                            </div>
                        </div>
                        <div className='au-grid au-grid-cols-4 au-w-full au-gap-2'>
                            <label className='au-col-span-2 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-flex au-items-center au-gap-2'>
                                Name
                            </label>
                            <input
                                className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-3 au-py-1 au-flex au-items-center au-text-sm au-leading-3 au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
                                defaultValue={author}
                                name='footer'
                                onChange={(e) => setAuthor?.(e.target.value)}
                                type='text'
                            />
                        </div>
                        <div className='au-grid au-grid-cols-4 au-w-full au-gap-2'>
                            <label className='au-col-span-2 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
                                Footer
                            </label>
                            <input
                                className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-3 au-py-1 au-flex au-items-center au-text-sm au-leading-3 au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
                                defaultValue={footer}
                                name='footer'
                                onChange={(e) => setFooter?.(e.target.value)}
                                type='text'
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
                        <div className='au-flex au-items-center au-justify-end au-pt-4 au-gap-4'>
                            {!isExportable ? (
                                <p className='au-py-2 au-text-xs au-text-red-500'>
                                    {wordCount === 0 ? (
                                        <em>Content cannot be empty</em>
                                    ) : (
                                        <em>
                                            {`Content cannot be longer than ${wordCountLimit} words.`}
                                        </em>
                                    )}
                                </p>
                            ) : null}
                            <PrimaryButton
                                disabled={!isExportable}
                                onClick={exportToImage}
                                type='submit'
                            >
                                Export
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
