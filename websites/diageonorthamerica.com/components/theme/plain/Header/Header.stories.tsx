import React, { useState } from 'react'
import HeaderComponent, { NavItemProps } from './Header'
import { navData, footerLinks } from './story-assets/navData'

export default {
	title: 'Components/Header',
	component: HeaderComponent,
}

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	return (
		<HeaderComponent
			homeItem={navData.children[0] as NavItemProps}
			navItems={navData.children[0].children as NavItemProps[]}
			footerLinks={footerLinks}
			isMenuOpen={isMenuOpen}
			setIsMenuOpen={setIsMenuOpen}
			currentPageAncestors={['']}
			currentPageURL=""
		/>
	)
}

Header.parameters = {
	backgrounds: { default: 'light' },
}
