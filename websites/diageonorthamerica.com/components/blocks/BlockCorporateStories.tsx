import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import {
	type TItem,
	type TCorporateStoriesBlock,
} from 'components/theme/plain/CorporateStoriesBlock/TCorporateStoriesBlock'
import { usePages } from 'context/pages'
import { useEffect, useMemo, useState } from 'react'
import { fetchPageDataByDocType } from 'lib/cms/api'
import { type UrlsGqlResponse } from 'types'

export default function BlockCorporateStories({
	customComponent,
}: BlockProps<TCorporateStoriesBlock>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')
	const [pageList, setPageList] = useState({} as UrlsGqlResponse)
	const isHomePage =
		// eslint-disable-next-line n/prefer-global/process
		page.contentType === process.env.NEXT_PUBLIC_HOMEPAGE_CONTENTYPE
	const regions = f.list('region')
	const tags = f.list('category')

	useEffect(() => {
		const categories = [] as string[]

		if (regions) {
			for (const x of regions) {
				categories.push(x._id)
			}
		}

		if (tags) {
			for (const x of tags) {
				categories.push(x._id)
			}
		}

		fetchPageDataByDocType(
			'featurePage',
			tags.length > 0 ? 3 : 18,
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

	const items = useMemo(() => {
		return (
			pageList.contents?.map(
				(contentItem): TItem => ({
					title: contentItem.title,
					link: {
						href: `${
							// eslint-disable-next-line n/prefer-global/process
							process.env.NEXT_PUBLIC_CORP_URL ?? 'http://www.diageo.com'
						}${contentItem.url}`,
					},
					image: {
						// eslint-disable-next-line n/prefer-global/process
						src: `${process.env.NEXT_PUBLIC_MEDIAHOST}/corp${contentItem.pageListingImage.url}`,
						alt: '',
					},
					time: new Date(contentItem.articleDate),
					tags: contentItem.categoryPages?.map((page) => page.title ?? ''),
					categories: ['Story'],
				}),
			) ?? []
		)
	}, [pageList])

	const icon = f.imageRefStandard('icon')
	const props = {
		title: f.html('title'),
		viewAllLink: f.link('link'),
		paginationLabel: f.text('pageLabel'),
		icon: icon && {
			// eslint-disable-next-line n/prefer-global/process
			src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${icon?.url}`,
			alt: icon.alt,
		},
		items,
		slider: tags.length === 0,
	}

	return getComponent<TCorporateStoriesBlock>(
		Block.CorporateStories,
		props,
		componentIdentifier,
		customComponent,
	)
}
