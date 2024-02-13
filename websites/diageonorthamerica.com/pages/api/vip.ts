import { NextApiRequest, NextApiResponse } from 'next'

import { getVariants, searchVariant } from 'lib/vip'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method === 'GET') {
			const data = await getVariants()
			res.status(200).json(data)
		} else if (req.method === 'POST') {
			const data = await searchVariant(JSON.parse(req.body))
			res.status(200).json(data)
		} else {
			res.status(400).end()
		}
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
