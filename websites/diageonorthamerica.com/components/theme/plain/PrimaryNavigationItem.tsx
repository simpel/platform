import React, { useState } from 'react'

import NavigationMenuItem from './dNavigationMenuItem'
import { useNavigation } from 'context/navigation'
import { renderBlocks } from 'components'
import NavigationSubmenu from './NavigationSubmenu'
import NavigationMegaMenu from './NavigationMegaMenu'
import { PrimaryNavigationItemProps } from 'components/propTypes'

export default function PrimaryNavigationItem({
	link,
	text,
	secondLevelItems,
	megaMenuContents,
}: PrimaryNavigationItemProps) {
	const [submenuVisible] = useState(false)

	const [{ currentNavigationItem }] = useNavigation()
	const { url, target } = link
	const active = currentNavigationItem === url

	return (
		<>
			<NavigationMenuItem {...{ url, target, active, text, centered: true }}>
				{secondLevelItems && !!secondLevelItems.length ? (
					<NavigationSubmenu visible={submenuVisible}>
						{renderBlocks(secondLevelItems, { container: 'secondLevelNav' })}
					</NavigationSubmenu>
				) : undefined}
			</NavigationMenuItem>
			{megaMenuContents && !!megaMenuContents.length && (
				<NavigationMegaMenu
					blocks={megaMenuContents}
					visible={submenuVisible}
				/>
			)}
		</>
	)
}
