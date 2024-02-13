import React, { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { usePages } from 'context/pages'
import { useLocale } from 'context/locale'
import { getCookie } from 'cookies-next'
import get from 'lodash/get'
type Props = {
	children: ReactNode
}
const removeTrailingSlash = (str: string) => str.replace(/\/+$/, '')

export default function PageWrapper({ children }: Props) {
	const [p] = usePages()

	// need to default with true so that horizon script doesn't start prematurely
	const [isGatewayPassed, setIsGatewayPassed] = useState(true)

	const title = p.page.title

	let pageImageUrl = ''
	const pageImage = p.page.pageListingImage
	if (pageImage) {
		pageImageUrl =
			process.env.NEXT_PUBLIC_MEDIACROP +
			`/1200x630` +
			process.env.NEXT_PUBLIC_MEDIAPREFIX +
			pageImage.url
	}

	const description = p.page.metaDescription // p.page.fields?.find((f) => f.alias === 'metaDescription')[0].text //fields.find.text('metaDescription')
	const ogTitle = title // p.text('openGraphTitle') || title
	const ogDescription = description //p.text('openGraphDescription') || description
	const canonical =
		removeTrailingSlash(process.env.NEXT_PUBLIC_SITEURL || '') +
		useRouter().asPath
	const renderLangs = `<link rel="alternate" hrefLang="${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}" href="${process.env.NEXT_PUBLIC_SITEURL}/en"/>`
	const diageoGatewayCookie = getCookie('diageo-gateway')?.toString()
	const siteName = process.env.NEXT_PUBLIC_PWA_SITE_NAME
	const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE

	useEffect(() => {
		if (diageoGatewayCookie) {
			const parsedCookie = JSON.parse(diageoGatewayCookie || '')
			setIsGatewayPassed(get(parsedCookie, 'pass', false))
		} else {
			setIsGatewayPassed(false)
		}
	}, [diageoGatewayCookie])

	const hideAgeGateway = isGatewayPassed || !p.showAgegate
	const parsedCookie = diageoGatewayCookie
		? JSON.parse(diageoGatewayCookie || '')
		: {}
	const isUserRemembered = get(parsedCookie, 'remembered', false)
	const isGatewayBypassEventActive = hideAgeGateway && !isUserRemembered
	const isGatewayCompletedEventActive = hideAgeGateway && isUserRemembered
	return (
		<>
			<Head>
				<link rel="canonical" href={canonical} />
				<meta name="description" content={description} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={ogTitle} />
				<meta property="og:url" content={canonical} />
				<meta property="og:image" content={pageImageUrl} />
				<meta property="og:site_name" content={siteName} />
				<meta property="og:description" content={ogDescription} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content={twitterHandle} />
				<meta name="twitter:title" content={ogTitle} />
				<meta name="twitter:description" content={ogDescription} />
				<meta name="twitter:image" content={pageImageUrl} />

				{/* <link rel="icon" href="/static/images/favicon.ico/" type="image/x-icon" /> */}

				{renderLangs}
				{hideAgeGateway && (
					<>
						<script
							key="agegate-config"
							type="text/javascript"
							dangerouslySetInnerHTML={{
								__html: `
                isDAGT = 'No';              
              `,
							}}
						/>
					</>
				)}
				{isGatewayBypassEventActive && (
					<script
						key="agegate-bypass-session"
						type="text/javascript"
						dangerouslySetInnerHTML={{
							__html: `
              window.dataLayer = window.dataLayer || []
              window.dataLayer.push({
                'bypassReason': 'session',
                'event': 'gatewayBypass',
                'gatewayAction': 'true',
                'gatewayVersion': 'v4',
                'pagePath': window.location.pathname
            })`,
						}}
					/>
				)}
				{isGatewayCompletedEventActive && (
					<script
						key="agegate-bypass-completed"
						type="text/javascript"
						dangerouslySetInnerHTML={{
							__html: `
              window.dataLayer = window.dataLayer || []
              window.dataLayer.push({
                'bypassReason': 'gatewayCompleted',
                'event': 'gatewayBypass',
                'gatewayAction': 'true',
                'gatewayVersion': 'v4',
                'languageLocation': 'en-CA',
                'locale': '',
                'pagePath': window.location.pathname
            })`,
						}}
					/>
				)}
			</Head>
			{children}
		</>
	)
}
