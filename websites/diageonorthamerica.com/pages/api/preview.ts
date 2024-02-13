import { NextApiRequest, NextApiResponse } from 'next'

import { fetchSinglePagePreview } from 'lib/cms/api'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		// Check the secret and next parameters
		// This secret should only be known to this API route and the CMS
		if (!req.query.path || Array.isArray(req.query.path)) {
			return res.status(401).json({ message: 'Invalid path' })
		}
		const currentPage = await fetchSinglePagePreview(req.query.path)
		if (!currentPage) {
			return res.status(401).json({ message: 'Invalid page URL' })
		}
		// Enable Preview Mode by setting the cookies
		res.setPreviewData({})

		// Redirect to the path from the fetched post
		// We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
		res.redirect(currentPage.url)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: err.message })
	}
}
