import { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream, EnumChangefreq } from 'sitemap'
import { createGzip } from 'zlib'

import { fetchPagesForSitemap } from 'lib/cms/api'
import { sitemap } from 'lib/cms/sitemap'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
	if (!res) return {}
	try {
		// Set response header
		res.setHeader('content-type', 'application/xml')
		res.setHeader('Content-Encoding', 'gzip')

		// A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
		// The readable stream it transforms must be in object mode.
		const smStream = new SitemapStream({
			hostname: process.env.NEXT_PUBLIC_SITEURL || 'https://www.diageonorthamerica.com',
		})

		const pipeline = smStream.pipe(createGzip())

		const pages = await fetchPagesForSitemap()
		sitemap(pages).map(({ url, lastmod, img }) =>
			smStream.write({
				url,
				lastmod,
				changefreq: EnumChangefreq.WEEKLY,
				img,
			}),
		)
		smStream.end()

		// stream the response
		pipeline.pipe(res).on('error', (e) => {
			throw e
		})
	} catch (e) {
		res.status(500).end()
	}
}
