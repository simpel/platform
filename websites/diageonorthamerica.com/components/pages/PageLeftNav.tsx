import React from 'react'

import { useFields } from 'context/fields'
import { usePages } from 'context/pages'
import { useNavigation } from 'context/navigation'
import { renderBlocks } from 'components'
import { RenderSettings } from 'types'
import Layout from 'components/Layout'
import LeftNavBlock from 'components/theme/plain/custom/LeftNavBlock'
import { GetSectionNav } from 'lib/utils'

export default function PageSociety() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [{ navPages }] = useNavigation()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const bodyBlocks = f.blocks('body')
	const body = renderBlocks(bodyBlocks)

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

	// if (navPages && navPages.children) {
	//   const childNav = navPages.children[0].children.filter((item) => item.pageId === page.sectionId)[0].children
	//   childNav.map((itm) => {
	//     if (ancestorArray.includes(itm.pageId)) {
	//       nav = itm
	//     }
	//   })
	// }

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
}
