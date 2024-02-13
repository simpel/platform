import React from 'react'

import { useFields } from 'context/fields'
import { renderBlocks, renderByContentType } from 'components'
import { RenderSettings } from 'types'
import { Block } from 'enums'
import Layout from 'components/Layout'

export default function PageJobDetails() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const breadcrumbs = renderByContentType(Block.Breadcrumbs)

	// THIS IS SUPERFLUOUS NOW

	return (
		<Layout>
			{header}
			{breadcrumbs}
			{body}
		</Layout>
	)
}
