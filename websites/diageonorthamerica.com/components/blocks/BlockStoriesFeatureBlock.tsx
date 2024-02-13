import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	BlockWithStoriesProps,
	CardProps,
} from 'components/propTypes'
import { Block, HeadingLevel } from 'enums'
import { Image, PartialPage, UrlsGqlResponse } from 'types'
import { useEffect, useState } from 'react'
import { fetchPressReleasesFeatures } from 'lib/cms/api'

export default function BlockStoriesFeatureBlock({
	customComponent,
}: BlockProps<BlockWithStoriesProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	let itemz = {} as CardProps[]
	let items2 = [] as PartialPage[]
	// const features = pages
	//   .filter((o) => o.contentType === 'featurePage')
	//   .sort((a, b) => (a.articleDate > b.articleDate ? 1 : -1))
	//   .slice(0, 6)

	const [features, setFeatures] = useState({} as UrlsGqlResponse)

	useEffect(() => {
		fetchPressReleasesFeatures(true, 10, false, false, 0).then(
			(res: UrlsGqlResponse) => {
				setFeatures(res)
			},
		)
	}, [])

	if (features && features.contents) {
		items2 = features.contents
			.filter((o) => o.pageListingImage != null)
			.slice(0, 6)
	}

	if (items2 && items2.length) {
		itemz = items2.map((eetem, index) => {
			let uuurl = ''
			if (
				eetem.pageListingImage != null &&
				eetem.pageListingImage.url != null
			) {
				uuurl = eetem.pageListingImage.url
			}
			return {
				_id: eetem._id,
				image: { _id: 'k_' + index, url: uuurl, alt: eetem.title } as Image,
				title: eetem.title ? eetem.title : '',
				text: '',
				linkCta: {
					name: '---',
					url: '',
				},
				linkUrl: eetem.url,
				date: eetem.articleDate,
				typeCard: 'Story',
				tags: eetem.categoryPages,
				headingLevel: HeadingLevel.H3,
				linkCtaSize: 'large',
				bgColor: false,
				direction: true,
			} as CardProps
		})
	}

	// text: eetem.metaDescription ? eetem.metaDescription : '',
	//console.log(itemz)
	//console.log('=================================')
	const props = {
		heading: f.text('title'),
		items: itemz,
		linkCta: f.link2('viewMoreLink'),
	}

	return getComponent<BlockWithStoriesProps>(
		Block.StoriesFeatureBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
