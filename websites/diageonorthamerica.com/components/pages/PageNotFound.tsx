import React from 'react'
import Head from 'next/head'
import styles from 'components/theme/plain/Header/Header.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchInput from 'components/theme/plain/SearchInput'
import LogoIcon from 'components/theme/plain/custom/LogoIcon'

export const PageNotFound = () => {
	const router = useRouter()
	const locale = '/en'
	const handleSearchInput = (value: string) => {
		if (value.length) {
			router.push(`${locale}/search?q=${value}&search=Search`)
		}
	}

	return (
		<>
			<Head>
				<script
					key="agegate-404"
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
            'event': '404',
            'pagePath': '/404' + window.location.pathname + window.location.search,
            'is404': 'true'
          })`,
					}}
				/>
				<title>404 Page Not Found</title>
			</Head>
			<div className="pagenotfound">
				<div className="pagenotfound__header">
					<nav className="pagenotfound__header__nav">
						<Link href="/" className={styles.logo} title="Diageo">
							<LogoIcon />
						</Link>
					</nav>
				</div>
				<main className="pagenotfound__container">
					<h3>404 Page Not Found</h3>
					<p>Sorry, the page you're looking for cannot be found.</p>
					<p>Please use one of the following options to get back on track</p>
					<ul className="pagenotfound__container__list">
						<li>
							<a
								className="pagenotfound__container__list__anchor"
								onClick={() => router.back()}
							>
								Go back
							</a>
						</li>
						<li>
							<Link
								href={`${locale}/sitemap`}
								className="pagenotfound__container__list__anchor"
							>
								Use our sitemap to find the right page
							</Link>
						</li>
						<li>
							<Link href="/" className="pagenotfound__container__list__anchor">
								Go to our homepage
							</Link>
						</li>
					</ul>
					<div className="pagenotfound__container__search">
						<SearchInput
							name="search"
							size="middle"
							placeholder="Please enter keyword(s)"
							buttonType="submit"
							label="Search our site"
							buttonOnClick={handleSearchInput}
						/>
					</div>
				</main>
			</div>
		</>
	)
}
