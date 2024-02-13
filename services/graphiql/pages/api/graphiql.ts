import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'cross-fetch'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (!process.env.API_URL || !process.env.API_KEY) {
		console.error(
			'API_URL or API_KEY are missing from .env file. Please add them.',
		)
		res.status(400).send(null)
		return
	}
	try {
		const { body } = req
		const stringifiedBody = JSON.stringify(body)
		const gqlRes = await fetch(process.env.API_URL || '', {
			method: 'POST',
			headers: {
				apiKey: process.env.API_KEY || '',
			},
			body: stringifiedBody,
		})
		const data = await gqlRes.json()

		res.status(200).json(data)
	} catch (err) {
		console.error(err)
		res.status(400).send(null)
	}
}
