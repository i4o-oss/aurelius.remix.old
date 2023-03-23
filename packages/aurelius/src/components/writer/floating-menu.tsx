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
			className='au-absolute -au-left-[4.2rem] -au-top-4 au-inline-block au-text-left'
		>
			<div>
				<Menu.Button className='au-inline-flex au-h-8 au-w-8 au-items-center au-justify-center au-rounded-full au-border au-border-white au-text-sm au-font-medium au-text-white hover:au-bg-opacity-30 focus:au-outline-none focus-visible:au-ring-2 focus-visible:au-ring-white focus-visible:au-ring-opacity-75'>
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
					className='au-absolute au-top-8 -au-left-[12rem] au-mt-2 au-w-56 au-origin-top-right au-divide-y au-divide-gray-100 au-rounded-md au-bg-gray-800 au-shadow-lg au-ring-1 au-ring-black au-ring-opacity-5 focus:au-outline-none'
					unmount={false}
				>
					<div className='au-px-1 au-py-1 '>
						<Menu.Item>
							<div>
								<button
									className={`hover:au-bg-brand-400 au-group au-flex au-w-full au-items-center au-rounded-md au-px-2 au-py-2 au-text-sm au-text-white`}
									onClick={selectImageFile}
								>
									Image
								</button>
							</div>
						</Menu.Item>
						{/* <Menu.Item> */}
						{/* 	<button */}
						{/* 		className={`hover:au-bg-brand-400 au-group au-flex au-w-full au-items-center au-rounded-md au-px-2 au-py-2 au-text-sm au-text-white`} */}
						{/* 	> */}
						{/* 		Bookmark */}
						{/* 	</button> */}
						{/* </Menu.Item> */}
						{/* <Menu.Item> */}
						{/* 	<button */}
						{/* 		className={`hover:au-bg-brand-400 au-group au-flex au-w-full au-items-center au-rounded-md au-px-2 au-py-2 au-text-sm au-text-white`} */}
						{/* 	> */}
						{/* 		Youtube */}
						{/* 	</button> */}
						{/* </Menu.Item> */}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
