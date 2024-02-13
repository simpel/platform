import { useEffect, useState } from 'react'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	type BlockProps,
	type LatestStoriesBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { type PartialPage, type Theme, type UrlsGqlResponse } from 'types'
import { fetchPageDataByDocType } from 'lib/cms/api'

export default function BlockLatestStoriesBlockNAM({
	customComponent,
}: BlockProps<LatestStoriesBlockProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const [{ page }] = usePages()
	const [pageList, setPageList] = useState({} as UrlsGqlResponse)

	const isHomePage =
		page.contentType === process.env.NEXT_PUBLIC_HOMEPAGE_CONTENTYPE

	useEffect(() => {
		const categories = [] as string[]
		const regions = f.list('regions')

		if (regions) {
			regions.map((x) => {
				categories.push(x._id)
				return null
			})
		}

		fetchPageDataByDocType(
			'featurePage',
			3,
			true,
			0,
			categories,
			false,
			isHomePage,
			true,
			'published',
			true,
		)
			.then((response: UrlsGqlResponse) => {
				setPageList(response)
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error(error)
			})
	}, [])

	let items = [] as PartialPage[]

	if (pageList?.contents) {
		items = pageList.contents.map((contentItem) => ({
			...contentItem,

			url: `${process.env.NEXT_PUBLIC_CORP_URL ?? 'http://www.diageo.com'}${
				contentItem.url
			}`,
		}))
	}

	const props = {
		title: f.html('richTextTitle'),
		viewMoreLink: f.link2('viewMoreLink'),
		viewMoreLinkText: f.text('viewMoreLinkText'),
		blockTheme: '' as Theme,
		items,
		careersarticles: false,
	}

	return getComponent<LatestStoriesBlockProps>(
		Block.LatestStoriesBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
