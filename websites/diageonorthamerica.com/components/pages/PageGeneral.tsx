import React from 'react'

import { useFields } from 'context/fields'
import { renderBlocks, renderByContentType } from 'components'
import { RenderSettings } from 'types'
import { Block } from 'enums'
import Layout from 'components/Layout'

export default function PageGeneral() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const breadcrumbs = renderByContentType(Block.Breadcrumbs)

	return (
		<Layout>
			{header}
			{breadcrumbs}
			{body}
		</Layout>
	)
}
