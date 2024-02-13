import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, LatestPressReleasesBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { useEffect, useState } from 'react'
import { PartialPage, Theme, UrlsGqlResponse } from 'types'
import { fetchPageDataByDocType, fetchPressReleasesFeatures } from 'lib/cms/api'

export default function BlockLatestPressReleasesBlock({
	customComponent,
}: BlockProps<LatestPressReleasesBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	const [pageList, setPageList] = useState({} as UrlsGqlResponse)

	const investorNews = f.boolean('investorNews')

	const categories = [] as string[]
	const catfields = f.list('brands')
	const allMatch = f.boolean('allCategoriesMatch')

	if (catfields) {
		catfields.map((x) => {
			categories.push(x._id)
		})
	}

	const IsHomePage =
		page.contentType === process.env.NEXT_PUBLIC_HOMEPAGE_CONTENTYPE

	useEffect(() => {
		fetchPressReleasesFeatures(
			false,
			3,
			investorNews,
			IsHomePage,
			0,
			categories,
			allMatch,
		).then((res: UrlsGqlResponse) => {
			setPageList(res)
		})
	}, [])

	let items2 = [] as PartialPage[]

	if (pageList && pageList.contents) {
		items2 = pageList.contents
	}

	// console.log('marshall', categories)
	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const props = {
		title: f.text('title'),
		viewMoreLink: f.link2('viewMoreLink'),
		viewMoreLinkText: f.text('viewMoreLinkText'),
		investorNews: f.boolean('investorNews'),
		investorNewsLayout: f.boolean('investorNewsLayout'),
		blockTheme: tmpTheme as Theme,
		items: items2,
	}

	return getComponent<LatestPressReleasesBlockProps>(
		Block.LatestPressReleasesBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
