import React, { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'

import { usePages } from 'context/pages'
import { useFields } from 'context/fields'

import ScrollToTop from 'components/theme/plain/ScrollToTop'
import Footer from './Footer'

import { Theme } from 'types'

// import Icon from 'components/theme/plain/Icon'
import NewNav from './NewNav'
import { checkCookies } from 'cookies-next'

type Props = {
	layoutClass?: string
	contentClass?: string
	themeClass?: Theme
	children: ReactNode
}

export default function Layout({
	themeClass,
	layoutClass,
	contentClass,
	children,
}: Props) {
	const [{ page }] = usePages()
	const [f] = useFields()

	let cmsThemeClass = ''
	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('pageTheme')?._id,
		)
		if (themeNode) {
			cmsThemeClass =
				'' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const [consent, setConsent] = useState(false)

	useEffect(() => {
		setConsent(checkCookies('localConsent'))
	}, [])

	const bannerPaddingClass =
		process.env.NEXT_PUBLIC_PROJECT === 'PR1495' && !consent
			? 'banner-padding'
			: undefined

	return (
		<>
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: `{
              '@context': 'https://schema.org',
              '@type': 'Brand',
              'name': 'Diageo.com',
              'logo': '/images/logo.svg'
            }`,
					}}
				/>

				<link href="/css/overrides.css" type="text/css" rel="stylesheet" />
			</Head>

			<div
				className={`${layoutClass ? layoutClass : ''} ${
					cmsThemeClass || themeClass
				}`}
			>
				<span className="overlay-gradient"></span>
				<div className={contentClass}>
					<ScrollToTop />{' '}
					{/* include component only on annual report page, not globally */}
					<NewNav />
					<main className={bannerPaddingClass}>{children}</main>
					<Footer />
				</div>
			</div>
		</>
	)
}
