import type { Editor } from '@tiptap/core'
import type { EditorView } from 'prosemirror-view'
import type { Slice } from 'prosemirror-model'
import { Node } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const youtubeRegExp =
	/^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/g

export const generateEmbedUrl = (url: string) => {
	const match = youtubeRegExp.exec(url)
	const videoId = match ? match?.[1] : false
	return videoId ? `https://youtube.com/embed/${videoId}` : ''
}

export function youtubeEmbedPlugin(editor: Editor, name: string) {
	const handler = (view: EditorView, slice: Slice) => {
		if (slice.content.childCount > 1) return false

		const { state } = view
		const { selection } = state
		const { empty } = selection

		if (!empty) return false

		const pos = selection.$head
		const node = pos.node()

		if (node.content.size > 0) return false

		let textContent = ''

		slice.content.forEach((node) => {
			textContent += node.textContent
		})

		const src = generateEmbedUrl(textContent)

		if (src) {
			editor
				.chain()
				.focus()
				.insertContentAt(pos.before(), [
					{
						type: name,
						attrs: { src, provider: 'youtube' },
					},
				])
				.run()

			return true
		} else {
			return false
		}
	}

	return new Plugin({
		key: new PluginKey<any>('handlePasteVideoURL'),
		props: {
			handlePaste: (view, event, slice) => {
				return handler(view, slice)
			},
		},
	})
}

// code shamelessly "inspired" by these two:
// https://www.codemzy.com/blog/tiptap-video-embed-extension
// https://gist.github.com/forresto/733db674953fb7dd4f46ab131137423d
const VideoEmbed = Node.create({
	name: 'video-embed',
	group: 'block',
	selectable: true,
	draggable: false,
	atom: true,

	// @ts-ignore
	parseHTML() {
		return [
			{
				tag: 'div',
				getAttrs: (element: HTMLElement) => {
					const videoElement = element.querySelector('iframe')

					if (!videoElement) return false

					const src = videoElement.getAttribute('src')

					if (!src) return false

					return {
						src,
						provider: 'youtube',
					}
				},
			},
			{
				tag: 'iframe',
			},
		]
	},

	addAttributes() {
		return {
			src: {
				default: null,
			},
			provider: {
				default: 'youtube',
			},
		}
	},

	renderHTML({ HTMLAttributes }: { HTMLAttributes: any }) {
		return [
			'div',
			{ class: 'w-full aspect-w-16 aspect-h-9 relative' },
			[
				'iframe',
				{
					class: 'w-[768px] h-[432px]',
					src: HTMLAttributes.src,
				},
			],
		]
	},

	addProseMirrorPlugins() {
		return [youtubeEmbedPlugin(this.editor, this.name)]
	},

	// @ts-ignore
	addCommands() {
		return {
			insertEmbed:
				(options: any) =>
				({ chain, editor }: { chain: any; editor: Editor }) => {
					const { url } = options
					const src = generateEmbedUrl(url)
					if (src) {
						const { selection } = editor.state
						const pos = selection.$head

						return chain()
							.insertContentAt(pos.before(), [
								{
									type: this.name,
									attrs: { src, provider: 'youtube' },
								},
							])
							.run()
					}

					return false
				},
		}
	},
})

export default VideoEmbed
