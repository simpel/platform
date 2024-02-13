import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { usePages } from 'context/pages'
import { useNavigation } from 'context/navigation'
import { renderBlocks } from 'components'
import { PartialPage, RenderSettings, UrlsGqlResponse } from 'types'
import Layout from 'components/Layout'
import TabsContext from 'context/tabs'
import LeftNavBlock from 'components/theme/plain/custom/LeftNavBlock'
import { GetSectionNav } from 'lib/utils'
import { fetchPressReleasesFeatures } from 'lib/cms/api'
import Tabs, { Tab } from '../theme/plain/Tabs'
import SocietyStoriesBlock from '../theme/plain/SocietyStoriesBlock/SocietyStoriesBlock'
import { SocietyStoriesCardProperties } from '../theme/plain/SocietyStoriesBlock/SocietyStoriesCard/SocietyStoriesCard'
import { getBaseDateFormat } from '../../utilities/dateFormatting'

export default function PageSociety() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [{ navPages }] = useNavigation()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const bodyBlocks = f.blocks('body')
	const body = renderBlocks(bodyBlocks)
	const auxBlocks = f.blocks('auxilaryContent')
	const auxContent = renderBlocks(auxBlocks)
	const [activeTabId, setActiveTabId] = useState<string>('')
	const lowerBlockTitle = f.text('lowerBlockTitle')

	let tabCount = 0

	let ShowInActionComponent = false

	if (process.env.NEXT_PUBLIC_PROJECT === 'PR1346a') {
		ShowInActionComponent = true
	}
	//et nav = null as unknown as NavPage
	let ancestorArray: number[] = []
	let targetAncestorId = '0'

	if (page.ancestors && page.ancestors.length) {
		ancestorArray = page.ancestors.split(',').map((element) => {
			return Number(element)
		})
		targetAncestorId = ancestorArray[ancestorArray.length - 1].toString()
	}

	const nav = GetSectionNav(navPages, ancestorArray, page.sectionId)

	const tabBlocksContentType = bodyBlocks.filter(
		(block) => block.contentType === 'tabBlock',
	)
	const tabLinks = tabBlocksContentType.map((link) => {
		const tabLink = link.fields.filter((el) => el.alias === 'tabTitle')[0]
		tabCount++
		return {
			id: tabLink.text?.split(' ').join('-').toLowerCase().toString() || '',
			text: tabLink.text,
		}
	})

	const getTabs = (tabsLinks): Tab[] => {
		return tabsLinks.map((tab) => {
			const { id, text } = tab
			return { id, text }
		})
	}

	useEffect(() => {
		if (tabLinks && tabLinks.length) {
			setActiveTabId(tabLinks[0].id)
		}
	}, [tabLinks.length])

	const [pageList, setPageList] = useState({} as PartialPage[])
	const cats = [] as string[]

	// heading, itemLarge, items, viewMoreLink, viewMoreLinkText
	let socHeading = 'Society 2030<br /><em>in action</em>'
	let socItemLarge = {} as SocietyStoriesCardProperties
	let socItems = [] as SocietyStoriesCardProperties[]

	if (lowerBlockTitle && lowerBlockTitle.length) {
		socHeading = lowerBlockTitle
	}

	const categories = f.list('society2030Categories')
	if (categories) {
		categories.map((obj) => {
			cats.push(obj._id)
		})
	}

	useEffect(() => {
		fetchPressReleasesFeatures(true, 5, false, false, 0, cats, false).then(
			(res: UrlsGqlResponse) => {
				setPageList(res.contents)
			},
		)
	}, [])

	if (pageList && pageList.length) {
		const { url, title, pageListingImage, articleDate, categoryPages } =
			pageList[0]

		socItemLarge = {
			heading: title,
			date: getBaseDateFormat(articleDate) || '',
			link: url,
			imageUrl: pageListingImage
				? `${process.env.NEXT_PUBLIC_MEDIACROP}/656x656/${process.env.NEXT_PUBLIC_MEDIAPREFIX}${pageListingImage.url}`
				: '',
			tags: categoryPages
				? categoryPages.map((category) => category.title)
				: [],
			isBig: true,
		}
		socItems = pageList.slice(1).map((page) => {
			const { url, title, pageListingImage, articleDate, categoryPages } = page
			return {
				heading: title,
				date: getBaseDateFormat(articleDate) || '',
				link: url,
				imageUrl: pageListingImage
					? `${process.env.NEXT_PUBLIC_MEDIACROP}/656x656/${process.env.NEXT_PUBLIC_MEDIAPREFIX}${pageListingImage.url}`
					: '',
				tags: categoryPages
					? categoryPages.map((category) => category.title)
					: [],
			}
		})
	}

	return (
		<Layout>
			{header}

			{/* this needs to be styled like the design with no top padding or margin. Also header needs no bottom margin */}
			{/* only show if more than 1 tab */}
			<TabsContext.Provider value={{ activeTabId: activeTabId }}>
				{tabCount > 1 && (
					<Tabs
						tabs={getTabs(tabLinks)}
						activeTab={activeTabId}
						setActiveTab={setActiveTabId}
					/>
				)}

				<section className="content-block p--l theme-white">
					<div className="offset-bg--reset"></div>
					<div className="block-banner">
						<div className="container--profile-banner-wide p--s flex-row">
							<div className="flex-col-md-12 flex-row">
								<div className="flex-col-md-3 text-body">
									{nav && (
										<LeftNavBlock
											section={nav}
											currentPageId={page.pageId}
											targetAncestorId={targetAncestorId}
										/>
									)}
								</div>
								<div className="flex-col-md-6 text-body">{body}</div>
							</div>
						</div>
					</div>
				</section>
			</TabsContext.Provider>

			{auxContent}
			{ShowInActionComponent && (
				<SocietyStoriesBlock
					heading={socHeading}
					largeItem={socItemLarge}
					items={socItems}
				/>
			)}
		</Layout>
	)
}
