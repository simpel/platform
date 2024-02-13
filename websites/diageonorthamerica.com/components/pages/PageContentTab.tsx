import React from 'react'
import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import { type RenderSettings } from 'types'
import Layout from 'components/Layout'
import TabbedLayout, {
	type TTabData,
	type TTabbedLayout,
} from 'components/theme/plain/TabbedLayout/TabbedLayout'

export default function PageContentTab() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	// Const breadcrumbs = renderByContentType(Block.Breadcrumbs)

	const useTabs = f.boolean('useTabs')
	const leftBarText = f.text('leftBarText')
	const tab1Title = f.text('tab1Title')
	const tab2Title = f.text('tab2Title')
	const Tab1 = f.blocks('tab1BlockList')
	const Tab2 = f.blocks('tab2BlockList')
	const Tab1Render = renderBlocks(Tab1)
	const Tab2Render = renderBlocks(Tab2)
	const categories = f.content('careerCategories')
	const tabs: TTabData[] = [{ title: 'Overview', body }]
	const tabsTheme = 'theme-amber'

	if (Tab1Render) {
		tabs.push({
			title: tab1Title,
			body: Tab1Render,
		})
	}

	if (Tab2Render) {
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

	const tabbedNavProps: TTabbedLayout = {
		leftBarText,
		tabs,
		tabsTheme,
		// Careers: {
		//   // TBD
		//   content: categories,
		// },
	}

	// Console.log('Marshall', body)
	return (
		<Layout>
			{header}
			{useTabs && <TabbedLayout {...tabbedNavProps} />}
			{!useTabs && body}
		</Layout>
	)
}
