import type { EditorToolbarProps } from '../../types'
// import type { ToolbarItem } from '@i4o-oss/catalystui'
import { Toolbar } from '@i4o-oss/catalystui'

// TODO: Fix the types here
export default function ImageToolbar({ editor }: EditorToolbarProps) {
	const items = [
		{
			type: 'toggle-group',
			groupItems: [
				{
					id: 'small',
					icon: (
						<svg viewBox='0 0 16 16' className='w4 h4 fill-white'>
							<g fill='#FFF' fillRule='nonzero'>
								<path
									d='M2 3a1 1 0 010-2h12a1 1 0 010 2H2zm0 12a1 1 0 010-2h12a1 1 0 010 2H2z'
									opacity='.6'
								></path>
								<path d='M2 5h12a1 1 0 011 1v4.001a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1z'></path>
							</g>
						</svg>
					),
					onSelect: () =>
						editor
							?.chain()
							.focus()
							.setImage({ size: 'small' })
							.run(),
				},
				{
					id: 'medium',
					icon: (
						<svg
							viewBox='0 0 16 16'
							className='fill-green-l2 w4 h4'
						>
							<g fill='#FFF' fillRule='nonzero'>
								<path
									d='M6 3a1 1 0 010-2h4a1 1 0 010 2H6zm0 12a1 1 0 010-2h4a1 1 0 010 2H6z'
									opacity='.6'
								></path>
								<path d='M2 5h12a1 1 0 011 1v4.001a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1z'></path>
							</g>
						</svg>
					),
					onSelect: () =>
						editor
							?.chain()
							.focus()
							.setImage({ size: 'medium' })
							.run(),
				},
				{
					id: 'large',
					icon: (
						<svg viewBox='0 0 16 16' className='w4 h4 fill-white'>
							<g fill='#FFF' fillRule='nonzero'>
								<path
									d='M0 2a1 1 0 012 0v12a1 1 0 01-2 0V2zm14 0a1 1 0 012 0v12a1 1 0 01-2 0V2z'
									opacity='.6'
								></path>
								<path d='M10.626 7L9.312 5.691a1 1 0 111.411-1.417l3.029 3.017c.39.389.392 1.02.005 1.412l-3.029 3.059a1 1 0 01-1.421-1.407L10.648 9H5.415l1.342 1.355a1 1 0 01-1.422 1.407L2.307 8.703a1 1 0 01.005-1.412L5.34 4.274a1 1 0 011.412 1.417L5.438 7h5.188z'></path>
							</g>
						</svg>
					),

					onSelect: () =>
						editor
							?.chain()
							.focus()
							.setImage({ size: 'large' })
							.run(),
				},
			],
		},
	]

	return (
		<Toolbar
			ariaLabel='Text Formatting Options'
			className='rounded-md bg-gray-800'
			items={items}
		/>
	)
}
