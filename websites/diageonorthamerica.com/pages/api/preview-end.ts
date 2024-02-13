import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	res.clearPreviewData()
	if (req.query.redirect) {
		res.redirect(req.query.redirect as string)
	} else {
		res.redirect('/')
	}
}
