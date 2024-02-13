import { type NextApiRequest, type NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_request: NextApiRequest, response: NextApiResponse) => {
	if (!response) return {}
	console.log('PR', process.env.NEXT_PUBLIC_BLOCK_ROBOTS)
	try {
		response.setHeader('Content-Type', 'text/plain')
		if (process.env.NEXT_PUBLIC_BLOCK_ROBOTS === 'true') {
			response.send(`User-agent: *\nDisallow: /`)
		} else {
			response.send(
				`Sitemap: ${process.env.NEXT_PUBLIC_SITEURL}api/sitemap.xml\n\nUser-agent: *\nAllow: /*\n\nDisallow: /api/*`,
			)
		}
	} catch {
		response.setHeader('Content-Type', 'text/plain')
		response.send(``)
		response.status(200).end()
	}
}
