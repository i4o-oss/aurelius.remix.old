import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import * as React from 'react'

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: ''

const AureliusWritingReminder = ({
	userFirstname,
}: {
	userFirstname: string
}) => (
	<Html>
		<Head />
		<Preview>Remainder to write today</Preview>
		<Tailwind>
			<Body className='mx-auto my-auto bg-white font-sans'>
				<Container className='mx-auto my-auto w-[465px] px-[12px]'>
					<Img
						className='mt-4 text-center'
						src={`${baseUrl}/static/logo.png`}
						height='64'
						alt="Aurelius' Logo"
					/>
					<Heading className='mx-0 my-[40px] p-0 font-sans text-[24px] font-bold text-[#333]'>
						It's time to write!
					</Heading>
					<Text className='text-base'>Hi {userFirstname},</Text>
					<Text className='text-base'>
						You asked us to remind you to write today. Reaching your
						writing goal for the day starts with a single click.
						<br />
					</Text>
					<Section className='text-center'>
						<Button
							className='flex items-center justify-center rounded-lg bg-[#2cb67d] px-3 py-3 text-center text-base font-semibold text-white'
							href='https://aurelius.ink'
						>
							Start Writing
						</Button>
					</Section>
				</Container>
			</Body>
		</Tailwind>
	</Html>
)

export default AureliusWritingReminder
