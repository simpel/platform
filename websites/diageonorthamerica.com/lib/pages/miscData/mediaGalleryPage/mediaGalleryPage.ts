import { fetchCategories, fetchFullPagesByDoctype } from 'lib/cms/api'
import { createMediaGalleryFilter } from 'lib/cms/filters/createMediaGalleryFilter'
import {
	type GalleryItem,
	type MediaGalleryPageProps,
	type Step,
	type Page,
} from 'types'
import { humanFileSize } from 'utilities/humanFileSize'

export const mediaGalleryPage = async (currentPage: Page) => {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	const passedObject6 = {} as MediaGalleryPageProps
	// eslint-disable-next-line unicorn/prevent-abbreviations
	const fetchRes6 = await fetchFullPagesByDoctype(
		'mediaGalleryItem',
		0,
		true,
		0,
		[],
		false,
		false,
		false,
		'published',
	)
	const allTopics = await fetchCategories('gallery-topics')
	const allBrands = await fetchCategories('brands')
	let filters: any[] = []
	// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
	if (fetchRes6 && fetchRes6.pages && fetchRes6.pages.length > 0) {
		const baseFields = new Set(['shortTitle', 'longTitle', 'description'])
		const mediaFields = new Set([
			'displayImage',
			'downloadImage',
			'downloadZip',
		])
		const arrayFields = new Set(['topics', 'brand'])
		const itemYears: number[] = []

		const galleryItems = fetchRes6.pages.map(
			({ fields, referencedMedia, _id }) => {
				// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
				const gallItem = { _id } as GalleryItem
				gallItem.topics = [] as Step[]
				gallItem.brands = [] as Step[]
				// eslint-disable-next-line array-callback-return
				fields.map(({ mediaList, alias, list, text, date: itemDate }) => {
					if (baseFields.has(alias)) {
						gallItem[alias] = text
					}

					if (alias === 'pubDate') {
						const date = itemDate ?? ''
						const itemYear = new Date(date).getFullYear()
						gallItem.pubYear = itemYear
						gallItem.pubDate = date
						if (!itemYears.includes(itemYear)) {
							itemYears.push(itemYear)
						}
					}

					if (mediaList && mediaList.length > 0 && mediaFields.has(alias)) {
						// eslint-disable-next-line unicorn/prefer-logical-operator-over-ternary
						const dlid = mediaList[0]._id ? mediaList[0]._id : ''
						if (dlid.length > 0) {
							const dlObject2 = referencedMedia?.find((m) => m._id === dlid)
							if (dlObject2) {
								const imageMeta = {
									_id: dlObject2._id,
									url: dlObject2.url,
									alt: dlObject2.title,
								}
								const imageSize =
									dlObject2.fields.find((m) => m.alias === 'umbracoBytes')
										?.number ?? 0

								// eslint-disable-next-line no-constant-binary-expression
								if (alias === 'displayImage' || alias === 'downloadImage') {
									gallItem[alias] = imageMeta
								}

								// eslint-disable-next-line no-constant-binary-expression
								if (alias === 'downloadZip' || alias === 'downloadImage') {
									gallItem.downloadSize = imageSize
									gallItem.humanReadableSize = humanFileSize(imageSize, true)
									if (alias === 'downloadZip') {
										gallItem.downloadZip = dlObject2.url
									}
								}
							}
						}
					}

					if (arrayFields.has(alias) && list && list.length > 0) {
						// eslint-disable-next-line array-callback-return
						list.map((lst) => {
							const lookupList = alias === 'brand' ? allBrands : allTopics
							const dlObject2 = lookupList.contents.find(
								(m) => m._id === lst._id,
							)
							if (dlObject2) {
								if (alias === 'brand') {
									gallItem.brands.push({
										_id: dlObject2._id,
										text: dlObject2.title,
									})
								} else {
									// eslint-disable-next-line @typescript-eslint/no-unsafe-call
									gallItem[alias].push({
										_id: dlObject2._id,
										text: dlObject2.title,
									})
								}
							}
						})
					}
				})
				return gallItem
			},
		)
		filters = createMediaGalleryFilter(galleryItems)
		passedObject6.galleryItems = galleryItems
		currentPage.miscdata = {
			...passedObject6,
			filters,
		}
	}

	const miscData: MediaGalleryPageProps = {
		galleryItems: passedObject6.galleryItems,
		filters,
	}

	return miscData
}
