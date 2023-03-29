import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import * as React from 'react'

interface AureliusMagicLinkEmailProps {
	magicLink: string
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: ''

const AureliusMagicLinkEmail = ({ magicLink }: AureliusMagicLinkEmailProps) => (
	<Html>
		<Head />
		<Preview>Log in with this magic link</Preview>
		<Tailwind>
			<Body className='mx-auto my-auto bg-white font-sans'>
				<Container className='mx-auto my-auto w-[465px] px-[12px]'>
					<Heading className='mx-0 my-[40px] p-0 font-sans text-[24px] font-bold text-[#333]'>
						Login
					</Heading>
					<Link
						href={magicLink}
						target='_blank'
						className='mb-4 block font-sans text-[14px] text-[#2754C5] underline'
					>
						Click here to log in with this magic link
					</Link>
					<Text className='my-4 font-sans text-[12px] leading-tight text-[#ababab]'>
						Or, copy and paste this link in your browser:
					</Text>
					<code className='inline-block w-[90%] rounded-lg border border-[#eee] bg-[#f4f4f4] px-[4.5%] py-4 text-[#333]'>
						{magicLink}
					</code>
					<Text className='my-4 font-sans text-[12px] leading-tight text-[#ababab]'>
						If you didn&apos;t try to login, you can safely ignore
						this email.
					</Text>
					<Img
						src={`${baseUrl}/static/logo.png`}
						height='40'
						alt="Aurelius' Logo"
					/>
					<Text className='mt-3 mb-6 font-sans text-[12px] leading-tight text-[#898989]'>
						<Link
							className='mb-4 inline font-sans text-[14px] text-[#898989] underline'
							href='https://aurelius.ink'
							target='_blank'
						>
							Aurelius.ink
						</Link>
						, the writing app for modern writers
					</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
)

export default AureliusMagicLinkEmail
