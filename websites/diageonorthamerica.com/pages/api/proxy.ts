import fetch from 'cross-fetch'
import stream from 'stream'

import { promisify } from 'util'

const pipeline = promisify(stream.pipeline)

const isAllowedOrigin = (url: string) => {
	const mediaHost = process.env.NEXT_PUBLIC_MEDIAHOST

	if (!mediaHost) {
		return false
	}

	const domainFromUrl = new URL(url).origin

	const allowedDomains = [
		process.env.NEXT_PUBLIC_MEDIAHOST,
		process.env.NEXT_PUBLIC_MEDIAPREFIX,
		`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}`,
		'https://d1gdpwj97lps0w.cloudfront.net',
		'https://media-diageocms.diageoplatform.com',
		'https://media-diageo.diageoplatform.com',
		'https://d15c6fxii2og45.cloudfront.net',
		'https://d9a4h9mezti1o.cloudfront.net',
		'https://media.diageoplatform.com',
		'https://media.diageo.com',
	]
	const urlIsAllowed = allowedDomains.includes(domainFromUrl)

	return urlIsAllowed
}

export default async (req, res) => {
	const filePath = req.query.filename
	const urlIsAllowed = isAllowedOrigin(filePath)
	if (!urlIsAllowed) {
		res.status(404).send('Not found')
		return
	}
	const response = await fetch(filePath)
	try {
		const filename = filePath.split('/').pop()
		const extension = filename.split('.').pop()
		if (extension === 'zip') {
			res.setHeader('Content-Type', 'application/zip')
		} else {
			res.setHeader('Content-Type', 'image/jpg')
		}
		res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
	} catch (e) {
		console.log({ e })
		return
	}
	if (!response.ok) {
		return
	}

	//@ts-ignore
	await pipeline(response.body, res)
}
