import React, { type ReactChild, useEffect, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { type NavItemProps } from '../Header'
import Icon from '../../Icon'
import styles from './MobileMenu.module.scss'
import MobileMenuFooter, {
	type FooterLinkSectionProps,
	renderFooterLinks,
} from './MobileMenuFooter'

type TSubMenu = {
	title: string
	titleUrl: string
	backTitle: string
	items: NavItemProps[]
}

function MobileMenu({
	isOpen = false,
	items = [],
	footerLinks = [],
	onClickOutside,
	currentPageAncestors,
	currentPageURL,
}: {
	isOpen: boolean
	items?: NavItemProps[]
	footerLinks?: FooterLinkSectionProps[]
	onClickOutside: () => void
	currentPageAncestors: string[]
	currentPageURL: string
}) {
	const [currentNavDepth, setCurrentNavDepth] = useState(0)
	const [subMenus, setSubMenus] = useState<TSubMenu[]>([])
	const [areFooterLinksVisible, setAreFooterLinksVisible] = useState(false)

	const initializeSubMenus = (items: NavItemProps[]) => {
		const subMenus: TSubMenu[] = []
		subMenus.push({ title: 'menu', titleUrl: '', backTitle: 'menu', items })

		const addSubMenu = (items: NavItemProps[]) => {
			for (const ancestor of currentPageAncestors) {
				const pageItem = items.find(
					(item) => ancestor === item.pageId.toString(),
				)

				if (pageItem && pageItem.children?.length > 0) {
					const hasVisibleChildren = pageItem.children.some(
						(child) => child.showonnav,
					)

					if (hasVisibleChildren) {
						subMenus.push({
							title: pageItem.title,
							titleUrl: pageItem.url,
							backTitle: subMenus[subMenus.length - 1].title,
							items: pageItem.children,
						})

						addSubMenu(pageItem.children)
					}
				}
			}
		}

		if (items?.length > 0) addSubMenu(items)

		return subMenus
	}

	useEffect(() => {
		const initialSubMenus = initializeSubMenus(items)
		setSubMenus(initialSubMenus)
		setCurrentNavDepth(initialSubMenus.length - 1)
	}, [items])

	const createSubMenu = ({
		fromItems,
		withTitle,
		titleUrl,
		andBackTitle,
		index,
	}: {
		fromItems: NavItemProps[]
		withTitle: string
		titleUrl: string
		andBackTitle: string
		index: number
	}): ReactChild => {
		const menuClasses = classNames({
			[styles.menu]: true,
			[styles.firstTier]: index === 0,
		})

		return (
			<ul key={index} className={menuClasses}>
				{index > 0 && renderMenuHeader({ withTitle, titleUrl, andBackTitle })}

				{fromItems
					.filter((item) => item.showonnav)
					.map(({ key, url, title, children, pageId }) => {
						const filteredChildren = children?.filter(
							({ showonnav }) => showonnav,
						)

						return filteredChildren && filteredChildren.length > 0
							? renderItemWithSubMenu({ key, title, children, url, pageId })
							: renderPlainItem({ key, title, url, pageId })
					})}
				{index === 0 && (
					<MobileMenuFooter
						onFooterLinkClick={() => {
							setAreFooterLinksVisible(true)
							incrementNavDepth()
						}}
					/>
				)}
			</ul>
		)
	}

	const renderMenuHeader = ({
		withTitle,
		titleUrl,
		andBackTitle,
	}: {
		withTitle: string
		titleUrl: string | undefined
		andBackTitle: string
	}) => {
		const backLinkClasses = classNames({
			[styles.menuItem]: true,
			[styles.backToPrevious]: true,
		})

		const headingClasses = classNames({
			[styles.menuItem]: true,
			[styles['menuItem--active']]: currentPageURL + '/' === titleUrl,
		})

		return (
			<>
				<li className={backLinkClasses} onClick={decreaseNavDepth}>
					<Icon
						name="icon_arrow_left"
						size="middle"
						className={styles.menuItemBackArrow}
					/>
					<span>Back to {andBackTitle}</span>
				</li>
				<li className={styles.subMenuTitle}>{withTitle}</li>
				<li className={headingClasses}>
					{titleUrl ? (
						<Link href={titleUrl} prefetch={false}>
							{withTitle} overview
						</Link>
					) : (
						<span>{withTitle}</span>
					)}
				</li>
			</>
		)
	}

	const renderItemWithSubMenu = ({
		key,
		title,
		children,
		url,
		pageId,
	}: {
		key: string
		title: string
		children: NavItemProps[]
		url: string
		pageId: number
	}) => (
		<li
			key={key}
			className={classNames({
				[styles.menuItem]: true,
				[styles['menuItem--active']]: currentPageAncestors.includes(
					pageId.toString(),
				),
			})}
			onClick={() => {
				setAreFooterLinksVisible(false)
				setSubMenus((previousState) => {
					previousState[currentNavDepth + 1] = {
						title,
						titleUrl: url,
						backTitle: previousState[currentNavDepth].title,
						items: children,
					}

					return previousState
				})
				incrementNavDepth()
			}}
		>
			<span>{title}</span>
			<Icon
				name="icon_angle_right"
				size="middle"
				className={styles.menuItemForwardArrow}
			/>
		</li>
	)

	const renderPlainItem = ({
		key,
		title,
		url,
		pageId,
	}: {
		key: string
		title: string
		url: string
		pageId: number
	}) => (
		<li
			key={key}
			className={classNames({
				[styles.menuItem]: true,
				[styles['menuItem--active']]: currentPageAncestors.includes(
					pageId.toString(),
				),
			})}
		>
			<Link href={url}>{title}</Link>
		</li>
	)

	const mobileMenuClasses = classNames({
		[styles.mobileMenu]: true,
		[styles.open]: isOpen,
	})

	const incrementNavDepth = () => {
		setCurrentNavDepth((previousState) => previousState + 1)
	}

	const decreaseNavDepth = () => {
		setCurrentNavDepth((previousState) => Math.max(previousState - 1, 0))
	}

	return (
		<div className={mobileMenuClasses}>
			<div className={styles.shadedBackground} onClick={onClickOutside} />

			<div className={styles.menuContainer} role="navigation">
				<div
					className={styles.innerWrapper}
					style={{
						transform: `translateX(calc(calc(100% + 32px) * -${currentNavDepth}))`,
					}}
				>
					{areFooterLinksVisible ? (
						<>
							{
								subMenus.map(({ title, titleUrl, backTitle, items }, index) =>
									createSubMenu({
										fromItems: items,
										withTitle: title,
										titleUrl,
										andBackTitle: backTitle,
										index,
									}),
								)[0]
							}
							{renderFooterLinks(footerLinks, decreaseNavDepth)}
						</>
					) : (
						subMenus.map(({ title, titleUrl, backTitle, items }, index) =>
							createSubMenu({
								fromItems: items,
								withTitle: title,
								titleUrl,
								andBackTitle: backTitle,
								index,
							}),
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default MobileMenu
