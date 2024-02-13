import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, SocietyCardsProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { PartialPage, UrlsGqlResponse } from 'types'
import { fetchPageDataByDocType } from 'lib/cms/api'

export default function BlockSocietyCardsBlock({
	customComponent,
}: BlockProps<SocietyCardsProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')
	let items2 = [] as PartialPage[]
	// MARSHALL - need to remove this filter for only pages with images
	// const items = pages
	//   .filter((o) => o.contentType === 'featurePage')
	//   .filter((o) => o.pageListingImage != null)
	//   .sort((a, b) => (a.articleDate < b.articleDate ? 1 : -1))
	//   .slice(0, 5)

	const [pageList, setPageList] = useState({} as UrlsGqlResponse)

	// useEffect(() => {
	//   fetchPageDataByDocType('featurePage', 20, true, 0).then((res: UrlsGqlResponse) => {
	//     setPageList(res)
	//   })
	// }, [])

	// if (pageList && pageList.contents) {
	//   items2 = pageList.contents
	//     .filter((o) => o.pageListingImage != null)
	//     .sort((a, b) => (a.articleDate < b.articleDate ? 1 : -1))
	//     .slice(0, 5)
	// }
	const isHomePage = false
	const withImages = true

	useEffect(() => {
		fetchPageDataByDocType(
			'featurePage',
			5,
			true,
			0,
			[],
			false,
			isHomePage,
			withImages,
		).then((res: UrlsGqlResponse) => {
			setPageList(res)
		})
	}, [])

	if (pageList && pageList.contents) {
		items2 = pageList.contents
	}

	const props = {
		heading: f.html('richTextTitle'),
		itemLarge: items2[0],
		items: items2.slice(1),
		viewMoreLink: f.link2('viewMoreLink'),
		viewMoreLinkText: f.text('viewMoreLinkText'),
	}

	return getComponent<SocietyCardsProps>(
		Block.SocietyCardsBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
