import { useFields } from 'context/fields'
import { BlockProps, HomePageHeaderBlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { useEffect, useState } from 'react'
import { fetchPageDataByDocType } from 'lib/cms/api'
import { PartialPage, UrlsGqlResponse } from 'types'

export default function BlockHomePageHeaderBlock({
	customComponent,
}: BlockProps<HomePageHeaderBlockProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')

	const [pageList, setPageList] = useState({} as UrlsGqlResponse)

	let relatednews = [] as PartialPage[]

	// TODO need to filter these out by the categories set on this press release
	// useEffect(() => {
	//   fetchPageDataByDocType('featurePage', 20, true, 0, []).then((res: UrlsGqlResponse) => {
	//     setPageList(res)
	//   })
	// }, [])

	// if (pageList && pageList.contents) {
	//   relatednews = pageList.contents
	//     .filter((o) => o.pageListingImage != null)
	//     .sort((a, b) => (a.articleDate < b.articleDate ? 1 : -1))
	//     .slice(0, 3)
	// }

	useEffect(() => {
		fetchPageDataByDocType(
			'featurePage',
			3,
			true,
			0,
			[],
			false,
			true,
			true,
		).then((res: UrlsGqlResponse) => {
			setPageList(res)
		})
	}, [])

	if (pageList && pageList.contents) {
		relatednews = pageList.contents
	}

	const props = {
		richTextTitle: f.html('richTextTitle'),
		richTextIntro: f.html('richTextIntro'),
		mainImage: f.imageRefStandard('mainImage'),
		videoUrl: f.text('videoUrl'),
		newsItems: relatednews,
	}

	return getComponent<HomePageHeaderBlockProps>(
		Block.HomePageHeaderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
