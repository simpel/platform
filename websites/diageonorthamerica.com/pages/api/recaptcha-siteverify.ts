import fetch from 'node-fetch'

export default async function handler(req, res) {
	const { body } = req
	const { token } = JSON.parse(body)
	try {
		const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`
		const response = await fetch(VERIFY_URL, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			},
			method: 'POST',
		})
		const captchaValidation = await response.json()
		if (captchaValidation.success) {
			return res.status(200).send('OK')
		}

		return res.status(422).json({
			message: 'Unproccesable request, Invalid captcha code',
		})
	} catch (error) {
		// console.log(error)
		return res.status(422).json({ message: 'Something went wrong' })
	}
}
