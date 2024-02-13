import 'swiper/css'
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/prefer-dom-node-remove */
/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable react/no-danger */
import process from 'process'
import React, { useEffect, useRef } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { withAuth } from 'auth/withAuth'
import { useRouter } from 'next/router'
// Import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import '../assets/styles/main.scss'
import getInternetExplorerVersion from '../lib/detectIE'
// Register Swiper custom elements
register()

// Don't automatically add FontAwesome CSS
// config.autoAddCss = false

type TWindow = {
	$?: any
} & Window

const MyApp = ({ Component, pageProps }: AppProps) => {
	const development_env = process.env.NEXT_PUBLIC_DEVELOPMENT_ENV ?? ''
	const router = useRouter()
	let metaTitleValue = ''

	try {
		metaTitleValue = pageProps?.currentPage?.fields?.find(
			(f: { alias: string }) => f.alias === 'metaTitle',
		).text
		if (metaTitleValue && metaTitleValue.length > 0) {
		} else {
			metaTitleValue = pageProps?.currentPage?.title
		}
	} catch {}

	useEffect(() => {
		if (getInternetExplorerVersion() === 11) {
			const script = document.createElement('script')
			script.setAttribute(
				'src',
				'https://cdn.jsdelivr.net/npm/es6-shim@0.35.5/es6-shim.min.js',
			)
			document.head.append(script)
		}
	}, [])

	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (development_env !== 'production') {
			return
		}

		const script = document.createElement('script')
		script.src = '//footer.diageohorizon.com/dfs/master.js'
		script.defer = true
		script.type = 'text/javascript'

		let interval: ReturnType<typeof setInterval>
		const intervalDuration = 500
		const maxIntervalTicks = 10
		let intervalTicksCount = 0

		const resetInterval = () => {
			clearInterval(interval)
			intervalTicksCount = 0
		}

		const addScriptTag = () => {
			const isJQueryLoaded = (window as TWindow).$ !== undefined

			if (isJQueryLoaded && ref.current) {
				ref.current.append(script)
				if (interval) resetInterval()
			} else if (!interval) {
				interval = setInterval(() => {
					addScriptTag()
					intervalTicksCount++
					if (intervalTicksCount === maxIntervalTicks) resetInterval()
				}, intervalDuration)
			}
		}

		addScriptTag()

		return () => {
			if (interval) resetInterval()
			// eslint-disable-next-line react-hooks/exhaustive-deps
			ref.current?.hasChildNodes() ? ref.current.removeChild(script) : {}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref, router.asPath])

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>{metaTitleValue}</title>
				{/* <link
          href="https://cdn.fonts.net/kit/bfdb5b00-7ebf-11ec-9ce3-0220834439f4/bfdb5b00-7ebf-11ec-9ce3-0220834439f4.css"
          rel="stylesheet"
        /> */}
				<meta
					name="viewport"
					content="width=device-width, height=device-height, initial-scale=1.0, shrink-to-fit=no"
				/>

				{process.env.NEXT_PUBLIC_BLOCK_ROBOTS === 'true' && (
					<meta name="robots" content="noindex,nofollow" />
				)}
				{/**
				 * FontAwesome fix
				 * https://github.com/FortAwesome/react-fontawesome/issues/284#issuecomment-691707228
				 */}
				<style>{dom.css()}</style>
				{/* Slick carousel */}
				{/* <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.css"
        /> */}
				{/* Horizon Gold */}
				<script src="/static/jquery-3.7.1.min.js" type="text/javascript" />
				<script
					dangerouslySetInnerHTML={{
						__html:
							`
            jQuery.fn.load = function (callback) { jQuery(window).trigger("load", callback); };
            jQuery.fn.bind = function (callback) { jQuery(window).trigger("on", callback); };
            jQuery.fn.unbind = function (callback) { jQuery(window).trigger("off", callback); };
            dg_locale = '` +
							process.env.NEXT_PUBLIC_DEFAULT_LOCALE_LONG +
							`';
          `,
					}}
					type="text/javascript"
				/>
				<script
					key="agegate-config"
					dangerouslySetInnerHTML={{
						__html: `
              isDAGT = 'Yes';
            `,
					}}
					type="text/javascript"
				/>
				{/* <!-- PWA --> */}
				<link rel="manifest" href="/manifest.json" />
				{/* <!-- Favicons --> */}
				<meta
					name="application-name"
					content={process.env.NEXT_PUBLIC_PWA_SITE_NAME}
				/>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta
					name="apple-mobile-web-app-title"
					content={process.env.NEXT_PUBLIC_PWA_SITE_NAME}
				/>
				<meta name="mobile-web-app-capable" content="yes" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/icons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/icons/favicon-16x16.png"
				/>
				<link rel="manifest" href="/icons/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/icons/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<link rel="shortcut icon" href="/icons/favicon.ico" />
				<meta name="msapplication-TileColor" content="#2d89ef" />
				<meta name="msapplication-config" content="/icons/browserconfig.xml" />
				<meta name="theme-color" content="#ffffff" />
			</Head>

			<div ref={ref} />
			<Component {...pageProps} />
		</>
	)
}

export default withAuth(MyApp)
