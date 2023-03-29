import type { SendEmailFunction } from 'remix-auth-email-link'
import { render } from '@react-email/render'
import { Sender, Recipient, MailerSend, EmailParams } from 'mailersend'
import { AureliusMagicLinkEmail } from '@aurelius/emails'
// import nodemailer from 'nodemailer'
// import sgMail from '@sendgrid/mail'

const MAILERSEND_API_TOKEN = process.env.MAILERSEND_API_TOKEN

if (!MAILERSEND_API_TOKEN)
	throw new Error('Missing MAILERSEND_API_TOKEN environment variable')

// const SENDGRID_API_TOKEN = process.env.SG_EMAIL_API_KEY

// if (!SENDGRID_API_TOKEN)
// 	throw new Error('Missing SENDGRID_API_TOKEN environment variable')

// sgMail.setApiKey(SENDGRID_API_TOKEN)

export const sendMagicLinkEmail: SendEmailFunction<any> = async (options) => {
	const emailHtml = render(
		<AureliusMagicLinkEmail magicLink={options.magicLink} />
	)

	// const message = {
	// 	to: options.emailAddress,
	// 	from: process.env.EMAIL_FROM_ADDRESS,
	// 	templateId: 'd-e1094cb8f4a9495db9bb8b82c8cf8f47',
	// 	dynamicTemplateData: {
	// 		subject: 'Your Aurelius login link',
	// 		verify_url: options.magicLink,
	// 		app_url: 'http://localhost:3000',
	// 	},
	// 	// html: emailHtml,
	// }

	// @ts-ignore
	// const res = await sgMail.send(message)
	// const data = await res.json()

	// const transporter = nodemailer.createTransport({
	// 	host: 'smtp.mailersend.net',
	// 	port: 587,
	// 	secure: false,
	// 	auth: {
	// 		user: process.env.MAILERSEND_SMTP_USER,
	// 		pass: process.env.MAILERSEND_SMTP_PASS,
	// 	},
	// })

	// const nodemailerOptions = {
	// 	from: process.env.MAILERSEND_FROM_ADDR,
	// 	to: options.emailAddress,
	// 	subject: 'Your Aurelius login link',
	// 	html: emailHtml,
	// }

	// console.log('sending email')
	// await transporter.sendMail(nodemailerOptions)
	// console.log('probably sent email')

	const mailersend = new MailerSend({
		apiKey: MAILERSEND_API_TOKEN,
	})
	const emailText = render(
		<AureliusMagicLinkEmail magicLink={options.magicLink} />,
		{ plainText: true }
	)
	const sentFrom = new Sender('hello@aurelius.ink', 'Ilango from Aurelius')
	const recipients = [new Recipient(options.emailAddress)]
	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setSubject('Your Aurelius login link')
		.setHtml(emailHtml)
		.setText(emailText)

	await mailersend.email.send(emailParams)
}
