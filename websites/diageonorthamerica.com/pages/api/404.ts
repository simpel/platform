import { NextApiRequest, NextApiResponse } from 'next'

import { fetchLocale, fetchNav } from 'lib/cms/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'
		const localeRes = await fetchLocale(locale, 'published')
		const navpages = await fetchNav('published')
		const localePage = localeRes?.localePage
		const currentPage = {
			_id: 'b00089a01f5b79488fff936e',
			url: '/' + locale + '/404',
			urlSegment: '404',
			title: '404 page',
			parent: { _id: '30c12c3c42f0ac49b8b4dda6', pageId: 1235 },
			contentType: 'Page404',
			articleDate: '2022-07-07T13:11:31.397+00:00',
			metaDescription: '404 page',
			alternateUrl: '',
			showOnSitemap: false,
			sectionId: 1580,
			ancestors: '-1,1144,1235',
			pageListingImage: null,
			pageListingImage2: null,
			categoryPages: [],
			fields: [],
			pageId: 100000,
			level: 1,
			sortOrder: 1,
			updateDate: '2022-07-07T13:11:31.397+00:00',
			referencedContent: null,
			referencedMedia: null,
			miscdata: null,
		}

		// const localeData = await fetchLocale(locale)
		// const lp = localeData?.localePage
		// if (!lp) throw new Error('Cannot find locale page')
		// const nfpC = content(lp.fields)('notFoundPage')
		// const nfp = lp.referencedContent.find((rc) => rc._id === nfpC?._id)

		// if (!nfp) throw new Error('notFoundPage not defined')

		// const pageData = await fetchPageData(nfp.url, locale)
		// if (!pageData) {
		//   throw new Error('Errow while fetching 404 content')
		// }
		// const { projectPage, localePage, currentPage, allLocalePages } = pageData
		// if (!projectPage || !localePage || !currentPage) {
		//   throw new Error('Errow while fetching 404 content')
		// }

		// let dictionary: DictionaryItem[] = []
		// try {
		//   const isoCode = locale.split('-')[0]
		//   dictionary = (await fetchDictionary(isoCode)) || []
		// } catch (err) {
		//   console.error('Cannot fetch dictionary', err.message)
		// }

		res.status(200).json({
			locale,
			localePage,
			currentPage,
			navpages,
		})

		// const locale = (req.query.locale as string) || process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en-gb'
		// const localeData = await fetchLocale(locale)
		// const lp = localeData?.localePage
		// if (!lp) throw new Error('Cannot find locale page')
		// const nfpC = content(lp.fields)('notFoundPage')
		// const nfp = lp.referencedContent.find((rc) => rc._id === nfpC?._id)

		// if (!nfp) throw new Error('notFoundPage not defined')

		// const pageData = await fetchPageData(nfp.url, locale)
		// if (!pageData) {
		//   throw new Error('Errow while fetching 404 content')
		// }
		// const { projectPage, localePage, currentPage, allLocalePages } = pageData
		// if (!projectPage || !localePage || !currentPage) {
		//   throw new Error('Errow while fetching 404 content')
		// }

		// let dictionary: DictionaryItem[] = []
		// try {
		//   const isoCode = locale.split('-')[0]
		//   dictionary = (await fetchDictionary(isoCode)) || []
		// } catch (err) {
		//   console.error('Cannot fetch dictionary', err.message)
		// }

		// res.status(200).json({
		//   locale,
		//   projectPage,
		//   localePage,
		//   currentPage,
		//   dictionary,
		//   allLocalePages,
		// })
	} catch (e) {
		res.status(500).end()
	}
}
