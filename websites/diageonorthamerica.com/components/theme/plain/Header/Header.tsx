import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import LinkBack from 'components/theme/plain/LinkBack'
import Icon from '../Icon'
import LogoIcon from '../custom/LogoIcon'
import styles from './Header.module.scss'
import MainMenu from './MainMenu/MainMenu'
import MobileMenu from './MobileMenu/MobileMenu'
import { type FooterLinkSectionProps } from './MobileMenu/MobileMenuFooter'

export type NavItemProps = {
	alternateurl: string
	children: NavItemProps[]
	contentType: string
	key: string
	naame: string
	pageId: number
	pageLevel: number
	showonnav: boolean
	showonsitemap: boolean
	title: string
	url: string
}

export type IPromoBox = {
	pageId: number
	promo1ImageId: string
	promo1ImageUrl: string
	promo1LinkId: string
	promo1LinkText: string
	promo1LinkType: number
	promo1LinkUrl: string
	promo1Text: string
	promo1Title: string
	promo2ImageId: string
	promo2ImageUrl: string
	promo2LinkId: string
	promo2LinkText: string
	promo2LinkType: number
	promo2LinkUrl: string
	promo2Text: string
	promo2Title: string
}

export type HeaderProps = {
	homeItem: NavItemProps
	navItems?: NavItemProps[]
	currentPageAncestors: string[]
	footerLinks?: FooterLinkSectionProps[]
	isMenuOpen: boolean
	setIsMenuOpen: (isOpen: boolean) => void
	isSearchOpen?: boolean
	setSearchOpen?: (isOpen: boolean) => void
	promos?: IPromoBox[]
	currentPageURL: string
}

function Header({
	homeItem,
	navItems = [],
	currentPageAncestors,
	footerLinks = [],
	isMenuOpen = false,
	setIsMenuOpen,
	isSearchOpen = false,
	setSearchOpen = (isOpen) => {
		console.log(isOpen)
	},
	promos,
	currentPageURL,
}: HeaderProps) {
	const [isHiddenByScrolling, setIsHiddenByScrolling] = useState<boolean>(false)

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}

		let previousScrollValue = window.scrollY

		function handleScroll() {
			window.requestAnimationFrame(() => {
				const currentScrollValue = window.scrollY
				setIsHiddenByScrolling(
					currentScrollValue > 0 && currentScrollValue > previousScrollValue,
				)
				previousScrollValue = currentScrollValue
			})
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [navItems])

	const onMenuClicked = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const headerClasses = classNames({
		[styles.mainHeader]: true,
		[styles.hidden]: isHiddenByScrolling,
		[styles.menuShowing]: isMenuOpen,
	})

	const hamburgerClasses = classNames({
		[styles.hamburger]: true,
		[styles.open]: isMenuOpen,
	})

	return (
		<>
			{process.env.NEXT_PUBLIC_PROJECT === 'PR1495' && <LinkBack />}

			<header className={headerClasses}>
				<nav className={styles.mainNav}>
					<button
						type="button"
						aria-label="Toggle menu"
						className={hamburgerClasses}
						onClick={onMenuClicked}
					>
						<span />
					</button>

					<Link
						href={homeItem.url}
						prefetch={false}
						className={styles.logo}
						title={homeItem.title}
						tabIndex={0}
					>
						<LogoIcon />
					</Link>

					<MainMenu
						items={navItems}
						isOpen={isMenuOpen}
						currentPageAncestors={currentPageAncestors}
						currentPageURL={currentPageURL}
						promos={promos}
						onMenuItemClicked={onMenuClicked}
					/>

					<button
						type="button"
						className={styles.searchButton}
						onClick={() => {
							setSearchOpen(!isSearchOpen)
						}}
					>
						<Icon
							name="icon_search"
							size="large"
							className={styles.searchButtonIcon}
						/>
						<span className={styles.searchLabel}>Search</span>
					</button>
				</nav>
			</header>
			<MobileMenu
				items={navItems}
				footerLinks={footerLinks}
				isOpen={isMenuOpen}
				currentPageAncestors={currentPageAncestors}
				currentPageURL={currentPageURL}
				onClickOutside={onMenuClicked}
			/>
		</>
	)
}

export default Header
