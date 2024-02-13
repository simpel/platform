import process from 'process'
import React from 'react'
import useSWR from 'swr'
import { LocaleProvider } from 'context/locale'
import { PagesProvider } from 'context/pages'
import { NavigationProvider } from 'context/navigation'
import PageWrapper from 'components/PageWrapper'
import LoadingPage from 'components/LoadingPage'
import Head from 'next/head'
import { PageNotFound } from 'components/pages/PageNotFound'
import l from 'utilities/l'
import { renderBlock } from 'components'
import { type TPageDataProps } from 'types'
import { DiageoDesignSystemProvider } from '@diageo/designsystem'

/**
 * We cannot use ISR for 404 pages - getStaticProps doesn't know the locale
 * and slug for the current path that throws the 404.
 * Because of that we need to parse the pathname clientside and then use
 * clientside rendering for the displaying the 404 page content from the CMS
 */

const fetcher = async (url: string) =>
	fetch(url).then(async (response) => response.json())

export default function Custom404() {
	if (typeof window === 'undefined') {
		return <h1>404 Error</h1>
	}

	return <ClientSide404 />
}

const ClientSide404 = () => {
	const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en'
	// Const [locale, setLocale] = useState('')
	const { data, error, isLoading } = useSWR([`/api/404`], fetcher)

	l('404', data, error, isLoading)

	// UseLayoutEffect(() => {
	//   setLocale(window.location.pathname.split('/')[1])
	// }, [])

	if (isLoading) return <LoadingPage />

	if (error) return <PageNotFound />

	const { locale, localePage, currentPage, navpages } = data as TPageDataProps
	const localeProviderProps = { locale, localePage }
	const pagesProviderProps = { page: currentPage, locale }
	const navigationProviderProps = { navpages }

	return (
		<DiageoDesignSystemProvider>
			<LocaleProvider {...localeProviderProps}>
				<PagesProvider {...pagesProviderProps}>
					<NavigationProvider {...navigationProviderProps}>
						<Head>
							<title>{currentPage.title}</title>
							<script
								key="agegate-404"
								dangerouslySetInnerHTML={{
									__html: `
                        window.dataLayer = window.dataLayer || []
                        window.dataLayer.push({
                        'event': '404',
                        'pagePath': '/404' + window.location.pathname + window.location.search,
                        'is404': 'true'
                      })`,
								}}
								type="text/javascript"
							/>
						</Head>
						<PageWrapper>{renderBlock(currentPage)}</PageWrapper>
					</NavigationProvider>
				</PagesProvider>
			</LocaleProvider>
		</DiageoDesignSystemProvider>
	)

	// Const { locale, projectPage, localePage, pages, currentPage, dictionary, allLocalePages } = data
	// const project = process.env.NEXT_PUBLIC_PROJECT || ''

	// const projectProviderProps = { projectPage }
	// const localeProviderProps = { locale, localePage, allLocalePages }
	// const pagesProviderProps = { page: currentPage, pages, locale }
	// const navigationProviderProps = {}
	// const dictionaryProviderProps = { dictionary, project }
	// return (
	//   <ProjectProvider {...projectProviderProps}>
	//     <LocaleProvider {...localeProviderProps}>
	//       <PagesProvider {...pagesProviderProps}>
	//         <NavigationProvider {...navigationProviderProps}>
	//           <DictionaryProvider {...dictionaryProviderProps}>
	//             <Head>
	//               <script
	//                 key="agegate-404"
	//                 type="text/javascript"
	//                 dangerouslySetInnerHTML={{
	//                   __html: `
	//                     window.dataLayer = window.dataLayer || []
	//                     window.dataLayer.push({
	//                     'event': '404',
	//                     'pagePath': '/404' + window.location.pathname + window.location.search,
	//                     'is404': 'true'
	//                   })`,
	//                 }}
	//               />
	//             </Head>
	//             <PageWrapper>{renderBlock(currentPage)}</PageWrapper>
	//           </DictionaryProvider>
	//         </NavigationProvider>
	//       </PagesProvider>
	//     </LocaleProvider>
	//   </ProjectProvider>
	// )
}
