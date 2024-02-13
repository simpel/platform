import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { fetchAutoComplete } from 'lib/cms/api'
import router from 'next/router'
import debounce from 'lodash/debounce'
import { usePages } from '../context/pages'
import { type ContentBlock, type MicroPage } from '../types'
import { useLocale } from '../context/locale'
import { useNavigation } from '../context/navigation'
import Icon from './theme/plain/Icon'
import {
	type FooterLinkProps,
	type FooterLinkSectionProps,
} from './theme/plain/Header/MobileMenu/MobileMenuFooter'
import Header, { type NavItemProps } from './theme/plain/Header/Header'

export function parseRawFooterLinkData(
	fromData: ContentBlock[],
): FooterLinkSectionProps[] {
	if (!fromData || fromData.length === 0) {
		return []
	}

	const sections = fromData.map(({ fields }) => {
		const { text } = fields[0]
		const { blocks } = fields[1]

		return {
			heading: text ?? '',
			links: extractLinks(blocks ?? []),
		}
	})

	return sections
}

export function extractLinks(fromBlocks: ContentBlock[]): FooterLinkProps[] {
	return fromBlocks.map(({ fields }) => {
		const { text } = fields[0]
		const { link } = fields[1]

		return {
			label: text ?? '',
			target: link?.target ?? '',
			url: link?.url ?? '',
		}
	})
}

function NewNav() {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const [{ navPages, menuOpen, searchOpen }, { setMenuOpen, setSearchOpen }] =
		useNavigation()
	const [{ blocks }] = useLocale()
	const [searchTerm, setSearchTerm] = useState('')
	const [autoComplete, setAutoComplete] = useState<MicroPage[]>([])

	const [pages] = usePages()
	const executeDebouncedAutoComplete = useCallback(
		debounce(async (query: string) => {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			fetchAutoComplete(query).then((ressy) => {
				setAutoComplete(ressy)
			})
		}, 500),
		[],
	)

	useEffect(() => {
		if (searchTerm.length > 0) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				executeDebouncedAutoComplete(searchTerm)
			} catch (error: unknown) {
				console.error(error)
			}
		} else {
			setAutoComplete([])
		}
	}, [searchTerm])

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		router.push('/en/search/?q=' + searchTerm)
	}

	// TODO: Reimplement this.
	const renderSearch = () => {
		const searchClasses = classNames({
			'search-bar': true,
			active: searchOpen,
		})

		return (
			<div className={searchClasses}>
				<div className="search-wrapper container">
					<button
						type="button"
						className="link link__text close-search"
						onClick={() => {
							setSearchOpen(false)
						}}
					>
						<Icon name="icon_close" size="middle" className="link__icon" />
						<span>Close search</span>
					</button>

					<div className="search-block">
						{/* <i className="s-interested"></i> */}

						<div className="s-wrapper">
							<div className="s-input">
								<form role="search" onSubmit={handleSubmit}>
									<div className="s-form">
										<label className="s-interested" htmlFor="search-input-nav">
											I&apos;m interested in...
										</label>
										<input
											id="search-input-nav"
											type="text"
											name="q"
											placeholder="Search Diageo"
											className="s-keyword"
											aria-label="Search through site content"
											value={searchTerm}
											onChange={(event) => {
												setSearchTerm(event.target.value)
											}}
										/>
									</div>
									<div className="s-submit">
										<button type="submit" aria-label="Search">
											<Icon
												name="icon_search"
												size="large"
												className="link__icon"
											/>
										</button>
									</div>
								</form>
							</div>
							{autoComplete.length > 0 && (
								<div className="s-hint-container">
									<ul className="s-hint">
										{autoComplete.map((item) => {
											return (
												<li key={item._id}>
													<Link href={item.url}>{item.title}</Link>
												</li>
											)
										})}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (navPages?.children && navPages.children.length > 0) {
		return (
			<>
				<Header
					homeItem={navPages.children[0]}
					currentPageAncestors={pages.page.ancestors?.split(',') ?? []}
					currentPageURL={pages.page.url}
					navItems={navPages.children[0].children as NavItemProps[]}
					footerLinks={parseRawFooterLinkData(blocks('footerNav'))}
					isMenuOpen={menuOpen}
					setIsMenuOpen={setMenuOpen}
					isSearchOpen={searchOpen}
					setSearchOpen={setSearchOpen}
					promos={navPages.promos}
				/>

				{renderSearch()}
			</>
		)
	}

	return <div />
}

export default NewNav
