import React from 'react'

import { useFields } from 'context/fields'
import { useNavigation } from 'context/navigation'
import { BlockProps, NavMenuItemProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'

export default function BlockNavigationItem({
	customComponent,
}: BlockProps<NavMenuItemProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const [{ currentNavigationItem }] = useNavigation()
	const url = f.link('link').url || '/'
	const active = currentNavigationItem === url
	const text = f.text('text')
	const props = { url, active, text }

	return getComponent<NavMenuItemProps>(
		Block.NavMenuItem,
		props,
		componentIdentifier,
		customComponent,
	)
}
