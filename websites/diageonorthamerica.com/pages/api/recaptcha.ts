import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function verify(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// TODO: get BrandID from CMS

	try {
		const params = `secret=${
			process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
		}&response=${JSON.parse(req.body).token}`
		const URL = `https://www.google.com/recaptcha/api/siteverify?${params}`

		return await fetch(URL, { method: 'POST' })
			.then((res) => res.json())
			.then((json) => res.send(json))
	} catch (err) {
		console.error('RECAPTCHA controller / Verify', err)
		return res.json({
			success: false,
		})
	}
}
