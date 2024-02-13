import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { usePages } from 'context/pages'
import { useNavigation } from 'context/navigation'
import { useLocale } from 'context/locale'
import NavItemRend from './blocks/NavItemRend'

import Icon from 'components/theme/plain/Icon'
import { MicroPage } from 'types'
import { fetchAutoComplete } from 'lib/cms/api/graphql/queries'
import LogoIcon from './theme/plain/custom/LogoIcon'

export default function Header() {
	const [, setScrolled] = useState(false)
	const [{ page }] = usePages()
	const [{ text }] = useLocale()

	// @ts-ignore
	const [{ menuOpen }, { setMenuOpen, setCurrentNavigationItem }] =
		useNavigation()
	const [{ navPages }] = useNavigation()
	const [searchTerm, setSearchTerm] = useState('')
	const [autoComplete, setAutoComplete] = useState<MicroPage[]>([])

	const { query } = useRouter()

	// makes scripts tag not working on page change
	// useEffect(() => {
	//   'use strict'
	//   Router.events.on('routeChangeComplete', (path) => {
	//     console.log(`Route change complete.`)
	//     setTimeout(() => {
	//       //Write the JS code here
	//     }, 0)
	//   })

	//   return () => {
	//     Router.events.off('routeChangeComplete', 0)
	//   }
	// }, [Router])

	useEffect(() => {
		// console.log(navPages)

		setCurrentNavigationItem(page.url.replace('/home', ''))
	}, [])

	useEffect(() => {
		const handleScroll = () =>
			window.requestAnimationFrame(() => {
				setScrolled(window.scrollY > 0)
			})
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	useEffect(() => {
		if (searchTerm.length) {
			try {
				fetchAutoComplete(searchTerm).then((ressy) => {
					setAutoComplete(ressy as MicroPage[])
				})
			} catch (error) {
				console.error(error)
			}
		} else {
			setAutoComplete([])
		}
	}, [searchTerm])

	const handleSubmit = (e) => {
		e.preventDefault()
		setSearchTerm('')
		// router.push({
		//   pathname: `/search/${searchTerm}`,
		// })
	}

	return (
		<nav aria-label="Navigation">
			<Link href={`/${query.locale}`} className="nav-home">
				<LogoIcon altText={text('headerTitle')} />
			</Link>

			<div className="nav-main">
				<div className="header-bar">
					<div className="toggle-menu">
						<div className="one"></div>
						<div className="two"></div>
						<div className="three"></div>
					</div>

					<div className="mobile-logo">
						<LogoIcon altText={text('headerTitle')} />
					</div>

					<div className="mobile-search">
						<Icon name="icon_search" size="middle" className="link__icon" />
					</div>
				</div>

				<div className="menu-wrapper">
					<div className="list-wrapper">
						<ul
							id="menubar1"
							className="menu level-1"
							role="menubar"
							aria-label="mainmenu"
						>
							{navPages.children[0].children.map((itm) => {
								if (itm.showonnav) {
									// console.log(itm)

									return (
										<NavItemRend navitem={itm} key={itm.pageId}></NavItemRend>
									)
								}
							})}
						</ul>
						<div className="mobile-nav-footer">
							<a href="" className="link link__text">
								View all Diageo websites{' '}
								<Icon
									name="icon_angle_right"
									size="middle"
									className="link__icon"
								/>
							</a>
							<ul className="social__media__links">
								<li>
									<a href="" className="icon__facebook">
										facebook
									</a>
								</li>
								<li>
									<a href="" className="icon__twitter">
										twitter
									</a>
								</li>
								<li>
									<a href="" className="icon__linkedin">
										linkedin
									</a>
								</li>
								<li>
									<a href="" className="icon__youtube">
										youtube
									</a>
								</li>
								<li>
									<a href="" className="icon__instagram">
										instagram
									</a>
								</li>
							</ul>

							{/* <SocialList heading="Follow us" headingLevel={HeadingLevel.H5} icons={socialList} /> */}
						</div>
					</div>
					<div className="list-wrapper">
						<span className="back-one-level">
							<Icon
								name="icon_arrow_left"
								size="middle"
								className="link__icon"
							/>
							back to menu
						</span>
						<div className="sub-menu-wrapper"></div>
					</div>
					<div className="list-wrapper">
						<span className="back-one-level">
							<Icon
								name="icon_arrow_left"
								size="middle"
								className="link__icon"
							/>
							back to menu
						</span>
						<div className="sub-menu-wrapper"></div>
					</div>
					<div className="list-wrapper">
						<span className="back-one-level">
							<Icon
								name="icon_arrow_left"
								size="middle"
								className="link__icon"
							/>
							back to menu
						</span>
						<div className="sub-menu-wrapper"></div>
					</div>
				</div>
			</div>

			{/* <ul className="main-nav">{renderBlocks(navigation, undefined, undefined, localePage)}</ul> */}

			<div className="nav-search">
				<span className="search search-toggle">
					<Icon name="icon_search" size="middle" className="link__icon" />
					<span>Search</span>
				</span>
			</div>

			{/* Search bar component */}
			<div className="search-bar">
				<div className="search-wrapper container">
					<a href="" className="link link__text close-search">
						<Icon name="icon_close" size="middle" className="link__icon" />
						<span>Close search</span>
					</a>

					<div className="search-block">
						{/* <i className="s-interested"></i> */}

						<div className="s-wrapper">
							<div className="s-input">
								<form role="search" onSubmit={handleSubmit}>
									<div className="s-form">
										<label className="s-interested">I'm interested in...</label>
										<input
											id="search-input"
											type="text"
											name="q"
											placeholder="Search Diageo"
											className="s-keyword"
											aria-label="Search through site content"
											onChange={(e) => setSearchTerm(e.target.value)}
											value={searchTerm}
										></input>
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
								<ul className="s-hint">
									{autoComplete.map((item) => {
										return (
											<li key={item._id}>
												<Link href={item.url}>{item.title}</Link>
											</li>
										)
									})}
								</ul>
							)}
						</div>

						<div className="s-suggestion">
							<div className="s-recent">
								<h6>Recent search</h6>
								<ul>
									<li>
										<a href="" className="link link__text">
											Society 2030
										</a>
									</li>
								</ul>
							</div>
							<div className="s-popular">
								<h6>Popular search</h6>
								<ul>
									<li>
										<a href="" className="link link__text">
											Brands
										</a>
									</li>
									<li>
										<a href="" className="link link__text">
											Positve Drinking
										</a>
									</li>
									<li>
										<a href="" className="link link__text">
											Jobs
										</a>
									</li>
									<li>
										<a href="" className="link link__text">
											Reports and Presentations
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
