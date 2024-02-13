import React, { type ReactChild, useCallback, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { type IPromoBox, type NavItemProps } from '../../Header'
import HeaderPromoBox from '../../HeaderPromoBox/HeaderPromoBox'
import styles from './Submenu.module.scss'
import SubMenuItem from './SubMenuItem'

type TSubMenuDictionary = Record<
	string,
	{
		index: number
		items: NavItemProps[]
		parent: NavItemProps
	}
>

const SubMenu = ({
	parentItem,
	subMenuItems = [],
	ancestors = [],
	isOpen = false,
	onCloseClicked,
	allPromos,
	currentPageURL,
}: {
	readonly parentItem: NavItemProps | undefined
	readonly subMenuItems: NavItemProps[]
	readonly ancestors: string[]
	readonly isOpen: boolean
	readonly onCloseClicked: () => void
	readonly allPromos?: IPromoBox[]
	readonly currentPageURL: string
}) => {
	const [activeMenuItemKeys, setActiveMenuItemKeys] = useState<string[]>([])
	const [subMenuDictionary, setSubMenuDictionary] = useState<
		TSubMenuDictionary | Record<string, unknown>
	>({})

	useEffect(() => {
		setSubMenuDictionary(createSubMenyDictionary(subMenuItems, 0))
		if (!isOpen) setActiveMenuItemKeys([])
	}, [subMenuItems, isOpen])

	useEffect(() => {
		if (isOpen) {
			const foundIds: string[] = []

			const foundPage = subMenuItems.filter((item) =>
				ancestors.includes(item.pageId.toString()),
			)
			if (foundPage.length > 0) {
				foundIds.push(foundPage[0].key)
				const foundSubPage = foundPage[0].children.filter((item) =>
					ancestors.includes(item.pageId.toString()),
				)
				if (foundSubPage.length > 0) {
					foundIds.push(foundSubPage[0].key)

					const foundSubSubPage = foundSubPage[0].children.filter((item) =>
						ancestors.includes(item.pageId.toString()),
					)

					if (foundSubSubPage.length > 0) {
						foundIds.push(foundSubSubPage[0].key)
					}
				}
			}

			setActiveMenuItemKeys(foundIds)
		}
	}, [subMenuItems, isOpen])

	const createSubMenyDictionary = (
		fromItems: NavItemProps[],
		atMenuTierIndex: number,
	): TSubMenuDictionary => {
		return fromItems
			.filter(
				({ showonnav, children }) =>
					showonnav && children && children.some(({ showonnav }) => showonnav),
			)
			.reduce((previousValue, currentValue) => {
				if (!previousValue[currentValue.key]) {
					previousValue[currentValue.key] = {
						index: atMenuTierIndex,
						items: currentValue.children,
						parent: currentValue,
					}
					return {
						...previousValue,
						...createSubMenyDictionary(
							currentValue.children,
							atMenuTierIndex + 1,
						),
					}
				}

				return previousValue
			}, {})
	}

	const handleSubmenuClick = useCallback(
		(key: string) => {
			setActiveMenuItemKeys((previousState) => {
				const newKeys = [...previousState]
				const index = (subMenuDictionary as TSubMenuDictionary)[key].index

				newKeys[index] = key
				newKeys.splice(index + 1)

				return newKeys
			})
		},
		[subMenuDictionary],
	)

	const createParentMenuItem = (fromNavItem: NavItemProps) => {
		const { key, url, title, pageId } = fromNavItem

		const isExactUrl = currentPageURL + '/' === url

		return (
			<SubMenuItem
				key={key}
				isParent
				url={url}
				hasSubMenu={false}
				label={title}
				isActive={ancestors.includes(pageId.toString()) && isExactUrl}
				onClick={() => {
					handleSubmenuClick(key)
				}}
			/>
		)
	}

	const createMenu = (
		fromItems: NavItemProps[],
		withParentItem: NavItemProps | undefined,
		key: string,
	): ReactChild => {
		const { title } = withParentItem ?? { title: '' }

		return (
			<>
				{title && title.length > 0 && (
					<ul key={key} className={styles.subMenu}>
						<li>
							<div className={styles.menuTitle}>{title}</div>
						</li>

						{withParentItem && createParentMenuItem(withParentItem)}

						{fromItems &&
							fromItems.length > 0 &&
							fromItems
								.filter((item) => item.showonnav)
								.map(({ key, title, children, url, pageId }) => {
									const hasSubMenu = children?.some(
										({ showonnav }) => showonnav,
									)

									return (
										<SubMenuItem
											key={key}
											url={url}
											hasSubMenu={hasSubMenu}
											label={title}
											isActive={
												ancestors.includes(pageId.toString()) ||
												activeMenuItemKeys.includes(key)
											}
											onClick={() => {
												handleSubmenuClick(key)
											}}
										/>
									)
								})}
					</ul>
				)}
			</>
		)
	}

	const renderMenus = useCallback(() => {
		return (
			<>
				{createMenu(subMenuItems, parentItem, 'firstTierSubMenu')}
				{activeMenuItemKeys &&
					activeMenuItemKeys.length > 0 &&
					activeMenuItemKeys.map(
						(key) =>
							(subMenuDictionary as TSubMenuDictionary)[key] &&
							createMenu(
								(subMenuDictionary as TSubMenuDictionary)[key].items,
								(subMenuDictionary as TSubMenuDictionary)[key].parent,
								key,
							),
					)}
			</>
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subMenuItems, activeMenuItemKeys, subMenuDictionary])

	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const isDesktop = useMediaQuery({ query: '(min-width: 1180px)' })

	const currentPageid = parentItem?.pageId

	const promos =
		currentPageid &&
		allPromos?.find((promo) => {
			return promo.pageId?.toString() === currentPageid.toString()
		})

	const isSubmenuOpen = isOpen && activeMenuItemKeys.length > 0

	return (
		<>
			<div
				className={`${styles.shadedBackdrop} ${isOpen ? styles.open : ''}`}
				onClick={onCloseClicked}
			/>
			<div className={`${styles.subMenuBackdrop} ${isOpen ? styles.open : ''}`}>
				<div className={styles.subMenuContainer}>
					<div className={styles.subMenuInnerContainer}>
						{renderMenus()}
						{!isSubmenuOpen && promos && (
							<>
								{isTablet && (
									<HeaderPromoBox
										title={promos.promo1Title}
										text={promos.promo1Text}
										link={promos.promo1LinkText}
										href={promos.promo1LinkUrl}
										image={promos.promo1ImageUrl}
									/>
								)}
								{isDesktop && (
									<HeaderPromoBox
										title={promos.promo2Title}
										text={promos.promo2Text}
										link={promos.promo2LinkText}
										href={promos.promo2LinkUrl}
										image={promos.promo2ImageUrl}
									/>
								)}
							</>
						)}
					</div>
					<button
						type="button"
						className={styles.closeButton}
						onClick={onCloseClicked}
					>
						Close
					</button>
				</div>
			</div>
		</>
	)
}

export default SubMenu
