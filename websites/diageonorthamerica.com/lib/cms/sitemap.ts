import { Media, Page } from 'types'

export function sitemap(pages: Page[]) {
	const homePageContentType =
		process.env.NEXT_PUBLIC_HOMEPAGE_CONTENTYPE || 'homePage'
	return pages
		.filter((p) => p) // filter undefined
		.filter(({ contentType }) =>
			[
				'boardMemberPage',
				'boardMembersPage',
				'brandLandingPage',
				'brandPage',
				'careersLandingPage',
				'careersSearchPage',
				'textPage',
				'countryPage',
				'featurePage',
				'featureYearPage',
				'featuresLandingPage',
				'financialCalendarPage',
				'homePage',
				'jobDetailsPage',
				'landingPage',
				'leftNavPage',
				'locationsPage',
				'mediaLandingPage',
				'pressReleaseLandingPage',
				'pressReleasePage',
				'pressReleaseYearPage',
				'regionPage',
				'resultsPresentationsPage',
				'searchPage',
				'societyLandingPage',
				'societyPage',
			].includes(contentType),
		)
		.map((page) => {
			let { url } = page
			if (page.contentType === homePageContentType) {
				url = url.split('/').slice(0, -1).join('/')
			}
			const lastmod = page.updateDate
			const img: Partial<Media>[] = []
			const video: Partial<Media>[] = []
			const videoExtensions = ['mp4', 'mov']
			page.referencedMedia &&
				page.referencedMedia.map(({ url, title }) => {
					/*
					 * TODO: video must include thumbnail and description
					 * https://github.com/ekalinin/sitemap.js/blob/HEAD/api.md#videoitem
					 */
					const obj = { url, title }
					let isVideo = false
					for (const ext of videoExtensions) {
						if (url.includes(ext)) {
							isVideo = true
						}
					}
					if (isVideo) {
						video.push(obj)
					} else {
						img.push(obj)
					}
				})

			return {
				url,
				lastmod,
				img,
				video,
			}
		})
}
