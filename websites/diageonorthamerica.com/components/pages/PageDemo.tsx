import React, { useEffect, useState } from 'react'
import { usePages } from 'context/pages'
import { useNavigation } from 'context/navigation'
import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import { CategoriesGqlResponse, RenderSettings } from 'types'
import Layout from 'components/Layout'
import { fetchCategories } from 'lib/cms/api'
import LeftNavBlock from 'components/theme/plain/custom/LeftNavBlock'
import { GetSectionNav } from 'lib/utils'
import TabbedLayout from 'components/theme/plain/TabbedLayout/TabbedLayout'

export default function PageDemo() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [{ navPages }] = useNavigation()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))

	const leftNav = f.boolean('leftNavPage')

	//let nav = null as unknown as NavPage
	let ancestorArray: number[] = []
	let targetAncestorId = '0'

	if (page.ancestors && page.ancestors.length) {
		ancestorArray = page.ancestors.split(',').map((element) => {
			return Number(element)
		})
		targetAncestorId = ancestorArray[ancestorArray.length - 1].toString()
	}

	const nav = GetSectionNav(navPages, ancestorArray, page.sectionId)

	const [pageList, setPageList] = useState({} as CategoriesGqlResponse)

	useEffect(() => {
		fetchCategories('investor-categories').then(
			(res: CategoriesGqlResponse) => {
				setPageList(res)
			},
		)
	}, [])

	const useTabs = f.boolean('useTabs')
	const leftBarText = f.text('leftBarText')
	const tab1Title = f.text('tab1Title')
	const tab2Title = f.text('tab2Title')
	const Tab1 = f.blocks('tab1BlockList')
	const Tab2 = f.blocks('tab2BlockList')
	const Tab1Render = renderBlocks(Tab1)
	const Tab2Render = renderBlocks(Tab2)
	const categories = f.content('careerCategories')
	const tabs = [{ title: 'Overview', body }]

	const tabsTheme = 'theme-amber'

	if (Tab1Render && tab1Title.length > 0) {
		tabs.push({
			title: tab1Title,
			body: Tab1Render,
		})
	}

	if (Tab2Render && tab2Title.length > 0) {
		tabs.push({
			title: tab2Title,
			body: Tab2Render,
		})
	}

	if (categories) {
		tabs.push({
			title: 'careers',
			body: [],
		})
	}

	const tabbedNavProps = {
		leftBarText,
		tabs,
		tabsTheme,
		// careers: {
		//   // TBD
		//   content: categories,
		// },
	}

	// console.log('marshall', Tab1)

	if (tabs.length > 1) {
		return (
			<Layout>
				{header}
				<TabbedLayout {...tabbedNavProps} />
			</Layout>
		)
	} else if (leftNav) {
		return (
			<Layout>
				{header}
				<section className="content-block p--l">
					<div className="offset-bg--reset"></div>
					<div className="block-banner">
						<div className="container--profile-banner-wide p--s flex-row">
							<div className="flex-col-md-3 left__navigation">
								{nav && (
									<LeftNavBlock
										section={nav}
										currentPageId={page.pageId}
										targetAncestorId={targetAncestorId}
									/>
								)}
							</div>
							<div className="flex-col-md-9">{body}</div>
						</div>
					</div>
				</section>
			</Layout>
		)
	} else {
		return (
			<Layout>
				{header}
				{body}
			</Layout>
		)
	}
}
