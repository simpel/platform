import React from 'react'

import { useFields } from 'context/fields'
import { getComponent, renderBlocks } from 'components'
import { BlockProps, FooterNavigationItemProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockFooterNavigationItem({
	customComponent,
}: BlockProps<FooterNavigationItemProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const secondLevelItems = renderBlocks(f.blocks('secondLevelItems'))
	const text = f.text('text')
	const url = f.link('link').url
	const props = { secondLevelItems, url, text }

	return getComponent<FooterNavigationItemProps>(
		Block.FooterNavigationItem,
		props,
		componentIdentifier,
		customComponent,
	)
}
