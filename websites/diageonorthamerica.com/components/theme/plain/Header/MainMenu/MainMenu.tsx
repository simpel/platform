import React, { useState, useCallback, useEffect } from 'react'
import { type IPromoBox, type NavItemProps } from '../Header'
import styles from './MainMenu.module.scss'
import SubMenu from './SubMenu/SubMenu'
import MainMenuItem from './MainMenuItem'

const MainMenu = ({
	items,
	currentPageAncestors = [],
	isOpen = false,
	onMenuItemClicked,
	promos,
	currentPageURL,
}: {
	readonly items: NavItemProps[]
	readonly currentPageAncestors: string[]
	readonly isOpen: boolean
	readonly onMenuItemClicked: () => void
	readonly promos?: IPromoBox[]
	readonly currentPageURL: string
}) => {
	const [activeMenuItem, setActiveMenuItem] = useState<
		NavItemProps | undefined
	>(undefined)

	useEffect(() => {
		if (!isOpen) {
			setActiveMenuItem(undefined)
		}
	}, [isOpen])

	const handleMenuItemClick = useCallback(
		(item: NavItemProps) => {
			const { key } = item

			setActiveMenuItem((previousActiveItem) =>
				key === previousActiveItem?.key ? undefined : item,
			)

			if (key === activeMenuItem?.key || activeMenuItem === undefined) {
				onMenuItemClicked()
			}
		},
		[onMenuItemClicked, activeMenuItem],
	)

	const getSubMenuItems = useCallback(() => {
		return (
			items.find(
				({ key, showonnav }) => showonnav && key === activeMenuItem?.key,
			)?.children ?? []
		)
	}, [items, activeMenuItem])

	return (
		<>
			<ul className={styles.mainMenu}>
				{items
					.filter((item) => item.showonnav)
					.map((item) => {
						const {
							key,
							title,
							pageId,
							pageLevel,
							showonnav: showOnNav,
							children,
							url,
						} = item

						return (
							<MainMenuItem
								key={key}
								url={
									pageLevel === 2 && showOnNav && children.length === 0
										? url
										: undefined
								}
								isActive={
									currentPageAncestors.includes(pageId.toString()) ||
									activeMenuItem?.key === key
								}
								onClick={() => {
									handleMenuItemClick(item)
								}}
							>
								{title}
							</MainMenuItem>
						)
					})}
			</ul>
			<SubMenu
				isOpen={isOpen}
				parentItem={activeMenuItem}
				subMenuItems={getSubMenuItems()}
				ancestors={currentPageAncestors}
				allPromos={promos}
				currentPageURL={currentPageURL}
				onCloseClicked={onMenuItemClicked}
			/>
		</>
	)
}

export default MainMenu
