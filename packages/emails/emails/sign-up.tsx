import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Text,
	Section,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import * as React from 'react'

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: ''

const AureliusSignUpEmail = ({ userFirstname }) => (
	<Html>
		<Head />
		<Preview>Sign up to Aurelius</Preview>
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
						Sign Up
					</Heading>
					<Text className='text-base'>Hi {userFirstname},</Text>
					<Text className='text-base'>
						Welcome to Aurelius, the writing app for modern writers.
						Please confirm your email address by clicking the button
						below.
						<br />
					</Text>
					<Section className='text-center'>
						<Button
							className='flex items-center justify-center rounded-lg bg-[#2cb67d] px-3 py-3 text-center text-base font-semibold text-white'
							href='https://getkoala.com'
						>
							Confirm Email Address
						</Button>
					</Section>
					<Text className='text-base'>
						Best,
						<br />
						Ilango
					</Text>
					<Hr className='my-5 border-[#ccc]' />
					<Text className='text-xs text-[#8889aa]'>
						Bengaluru 560017, Karnataka, India
					</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
)

export default AureliusSignUpEmail
