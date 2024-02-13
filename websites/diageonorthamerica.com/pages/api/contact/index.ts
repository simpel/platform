import process from 'node:process'
import { type NextApiRequest, type NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { withSession } from 'lib/session/withSession/withSession'
import { decrypt } from 'utilities/encryption'
import l from 'utilities/l'
import { type TContactRequestValues } from './TContact'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
	const { fromEmail, toEmail, message, contactName, csrfToken, subject } =
		JSON.parse(request.body as string) as TContactRequestValues

	if (csrfToken !== request.session.csrfToken || !toEmail) {
		response.status(403).send('Bad Request')
		return
	}

	const transporter = nodemailer.createTransport({
		port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
		host: process.env.NEXT_PUBLIC_SMTP_HOST,
		auth: {
			user: process.env.NEXT_PUBLIC_SMTP_USER,
			pass: process.env.NEXT_PUBLIC_SMTP_PASS,
		},
		tls: {
			ciphers: 'SSLv3',
		},
	})

	if (fromEmail.includes('@diageo')) {
		response.status(400)
		response.send('Bad request')
		return
	}

	const decryptedToEmail = decrypt(toEmail)

	const mailData = {
		from: process.env.NEXT_PUBLIC_SMTP_SENDER,
		to: decryptedToEmail,
		subject: `Enquiry from website contact form: ${subject}`,
		text: `${message} | Sent by: ${contactName} | Sender email: ${fromEmail} `,
		html: `<div>${message}</div><p>Sent by: ${contactName}</p><p>Sender email: ${fromEmail}</p>`,
	}

	l('mailData', mailData)

	const mailResponse = await transporter
		.sendMail(mailData)
		.then((response) => {
			return response
		})
		.catch((error: Error) => {
			return error
		})

	if (mailResponse instanceof Error) {
		response.status(400)
		response.send("Couldn't send email")
	} else {
		response.send('Email sent successfully!')
		response.status(200)
	}
}

export default withSession(handler)
