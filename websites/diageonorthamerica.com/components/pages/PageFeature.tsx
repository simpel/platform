import React from 'react'

import { useFields } from 'context/fields'
import { renderBlocks, renderByContentType } from 'components'
import { PartialPage, RenderSettings } from 'types'
import { Block } from 'enums'
import Layout from 'components/Layout'
import StoriesSliderBlock from 'components/theme/plain/StoriesSliderBlock'
import { StoryCardProps } from 'components/propTypes'
import { Image, UrlsGqlResponse } from 'types'
import { useEffect, useState } from 'react'
import { fetchPressReleasesFeatures } from 'lib/cms/api'

export default function PageFeature() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const breadcrumbs = renderByContentType(Block.Breadcrumbs)
	const [features, setFeatures] = useState({} as UrlsGqlResponse)
	const cats = [] as string[]
	let itemz = {} as StoryCardProps[]
	let items2 = [] as PartialPage[]

	// To remove category filter/restriction, comment out the next block
	// if (page.categoryPages) {
	//   page.categoryPages.map((x) => {
	//     cats.push(x._id)
	//   })
	// }

	useEffect(() => {
		fetchPressReleasesFeatures(true, 8, false, false, 0, cats, false).then(
			(res: UrlsGqlResponse) => {
				setFeatures(res)
			},
		)
	}, [])

	if (features && features.contents) {
		items2 = features.contents
			.filter((o) => o.pageListingImage != null)
			.slice(0, 3)
	}

	if (items2 && items2) {
		itemz = items2.map((eetem, index) => {
			let uuurl = ''
			if (
				eetem.pageListingImage != null &&
				eetem.pageListingImage.url != null
			) {
				uuurl = eetem.pageListingImage.url
			}
			return {
				title: eetem.title ? eetem.title : '',
				link: {
					name: 'View all Stories',
					url: eetem.url,
				},
				image: { _id: 'k_' + index, url: uuurl, alt: eetem.title } as Image,
				withIconPlay: false,
				articleDate: eetem.articleDate,
			} as StoryCardProps
		})
	}

	return (
		<Layout>
			{header}
			{breadcrumbs}
			{body}

			<StoriesSliderBlock
				richTextHeading={'<p><em>Discover <br />more</em> stories</p>'}
				slides={itemz}
				blockTheme={'theme-amber'}
			></StoriesSliderBlock>
		</Layout>
	)
}
