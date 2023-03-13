import type { FloatingMenuProps } from '../../types'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { PlusIcon } from '@radix-ui/react-icons'

export default function FloatingMenu({
	fileUploadInputRef,
}: FloatingMenuProps) {
	function selectImageFile() {
		// @ts-ignore
		fileUploadInputRef?.current?.click()
	}

	return (
		<Menu
			as='div'
			className='absolute -left-[4.2rem] -top-4 inline-block text-left'
		>
			<div>
				<Menu.Button className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-white text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
					<PlusIcon />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items
					className='absolute top-8 -left-[12rem] mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
					unmount={false}
				>
					<div className='px-1 py-1 '>
						<Menu.Item>
							<div>
								<button
									className={`hover:bg-brand-400 group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
									onClick={selectImageFile}
								>
									Image
								</button>
							</div>
						</Menu.Item>
						<Menu.Item>
							<button
								className={`hover:bg-brand-400 group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
							>
								Bookmark
							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className={`hover:bg-brand-400 group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
							>
								Youtube
							</button>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
