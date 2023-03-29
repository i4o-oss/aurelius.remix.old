import type { SendEmailFunction } from 'remix-auth-email-link'
import { render } from '@react-email/render'
import { Sender, Recipient, MailerSend, EmailParams } from 'mailersend'
import { AureliusMagicLinkEmail } from '@aurelius/emails'

const MAILERSEND_API_TOKEN = process.env.MAILERSEND_API_TOKEN

if (!MAILERSEND_API_TOKEN)
	throw new Error('Missing MAILERSEND_API_TOKEN environment variable')

export const sendMagicLinkEmail: SendEmailFunction<any> = async (options) => {
	const emailHtml = render(
		<AureliusMagicLinkEmail magicLink={options.magicLink} />
	)

	const mailerSend = new MailerSend({
		apiKey: MAILERSEND_API_TOKEN,
	})
	const emailText = render(
		<AureliusMagicLinkEmail magicLink={options.magicLink} />,
		{ plainText: true }
	)
	const sentFrom = new Sender(
		'hello@email.aurelius.ink',
		'Ilango from Aurelius'
	)
	const recipients = [new Recipient(options.emailAddress)]
	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setSubject('Your Aurelius login link')
		.setHtml(emailHtml)
		.setText(emailText)

	await mailerSend.email.send(emailParams)
}
