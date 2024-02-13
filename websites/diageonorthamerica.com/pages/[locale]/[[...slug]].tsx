import { join } from 'path'
import process from 'process'
import React from 'react'
import { type GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { type MicroPage } from 'types'
import {
	// FetchPageData,
	fetchUrls,
	fetchPagesMicro,
	fetchPageDataV2,
} from 'lib/cms/api'
import { renderBlock } from 'components'
import { PagesProvider } from 'context/pages'
import { NavigationProvider } from 'context/navigation'
import { LocaleProvider } from 'context/locale'
import LoadingPage from 'components/LoadingPage'
import PageWrapper from 'components/PageWrapper'
import { getRevalidateInterval } from 'lib/pages/rollout'
import { type TDynamicPage } from 'pagesTypes/TPageTypes'
import { EPageTypes } from 'lib/pages/pageTypes/EPageTypes'
import { PageTypes } from 'lib/pages/pageTypes/PageTypes'
import { boardMembersPage } from 'lib/pages/miscData/boardMembersPage/boardMembersPage'
import { boardMemberPage } from 'lib/pages/miscData/boardMemberPage/boardMemberPage'
import { brandLandingPage } from 'lib/pages/miscData/brandLandingPage/brandLandingPage'
import { careersSearchPage } from 'lib/pages/miscData/careersSearchPage/careersSearchPage'
import { videoLandingPage } from 'lib/pages/miscData/videoLandingPage/videoLandingPage'
import { mediaGalleryPage } from 'lib/pages/miscData/mediaGalleryPage/mediaGalleryPage'
import { featuresLandingPage } from 'lib/pages/miscData/featuresLandingPage/featuresLandingPage'
import { DiageoDesignSystemProvider } from '@diageo/designsystem'

/**
 * Generate a list of paths from the sitemap. This function gets called at build time
 * See: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 * Note: we're filtering out non-page content, the project root ('/') and the homepage ('/[locale]/home'). We already have an entry for '/[locale]/home' and will rewrite the URL of the homepage later.
 */
export async function getStaticPaths() {
	try {
		const pages = await fetchUrls()

		const paths = pages
			?.filter((p) => p) // Filter undefined
			.filter(
				// For generating the path list, only include certain contentTypes. Please note, that 'homePage' has the
				// URL '/[locale]/home', so we're including the 'locale' contentType instead, which has the URL '/[locale]'
				({ contentType }) => PageTypes.includes(contentType),
			)
			.map((page) => {
				const [locale, ...slugArray] = page.url.split('/').slice(1)
				if (!locale) return
				const slug = slugArray.filter((s) => s && s !== 'home')
				// Const pageSpecificData = getPageSpecificData(page.contentType)
				return {
					params: { locale, slug },
				}
			})
			.filter(Boolean) // Filter undefined
			.filter((p, i, a) => a.indexOf(p) === i) // Make it unique

		return {
			paths,
			fallback: true,
		}
	} catch {
		// Console.error(err)
		return {
			paths: [],
			// Enable statically generating additional pages
			fallback: 'blocking',
		}
	}
}

/**
 * SSR and Incremental Static Regeneration
 */
// eslint-disable-next-line complexity
export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
	/*
	 * Build current URL
	 */
	let breadcrumbs: MicroPage[] = []
	let breadCrumbIds = [] as string[]
	const locale =
		(params?.locale as string | undefined) ??
		process.env.NEXT_PUBLIC_DEFAULT_LOCALE!
	let slug = params?.slug ?? '/'
	if (!Array.isArray(slug)) {
		slug = [slug]
	}

	const url = join('/', locale, ...slug)

	const pageData = await fetchPageDataV2(
		url,
		locale,
		preview ? 'preview' : 'published',
	)

	if (pageData && pageData.httpStatus !== 200) {
		throw new Error(
			`The GQL endpoint returned ${pageData.httpStatus} - serving previous page version`,
		)
	}

	if (pageData) {
		const { localePage, currentPage, navpages } = pageData

		if (navpages && localePage && currentPage && currentPage.pageId > 0) {
			switch (currentPage.contentType) {
				case EPageTypes.MEDIAGALLERYPAGE: {
					currentPage.miscdata = await mediaGalleryPage(currentPage)
					break
				}

				case EPageTypes.BRANDLANDINGPAGE: {
					currentPage.miscdata = await brandLandingPage(currentPage)
					break
				}

				case EPageTypes.BOARDMEMBERSPAGE: {
					currentPage.miscdata = await boardMembersPage(currentPage)
					break
				}

				case EPageTypes.BOARDMEMBERPAGE: {
					currentPage.miscdata = await boardMemberPage(currentPage)
					break
				}

				case EPageTypes.VIDEOLANDINGPAGE: {
					currentPage.miscdata = await videoLandingPage(currentPage)
					break
				}

				case EPageTypes.FEATURESLANDINGPAGE: {
					currentPage.miscdata = await featuresLandingPage()
					break
				}

				case EPageTypes.CAREERSSEARCHPAGE: {
					currentPage.miscdata = await careersSearchPage()
					break
				}

				default: {
					break
				}
			}

			if (currentPage.ancestors) {
				breadCrumbIds = currentPage.ancestors.split(',').slice(3)
			}

			const bcNew = await fetchPagesMicro(
				breadCrumbIds,
				preview ? 'preview' : 'published',
			)
			if (bcNew) {
				breadcrumbs = bcNew
			}

			const props = {
				locale,
				localePage,
				currentPage,
				breadcrumbs,
				preview: Boolean(preview),
				navpages,
			}
			return {
				props,
				// Next.js will attempt to re-generate the page:
				// - When a request comes in
				// - At most once every 5 second
				revalidate: getRevalidateInterval(currentPage.contentType),
			}
		}

		return {
			notFound: true,
			revalidate: 60,
		}
	}

	return {
		notFound: true,
		revalidate: 60,
	}
}

const DynamicPage = ({
	locale,
	localePage,
	currentPage,
	breadcrumbs,
	isPreview,
	navpages,
	miscdata,
}: TDynamicPage) => {
	const router = useRouter()

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if (router.isFallback) {
		return <LoadingPage />
	}

	// Pass the current page to Pages context without the fields
	// const project = process.env.NEXT_PUBLIC_PROJECT ?? ''

	const localeProviderProps = { locale, localePage }
	const pagesProviderProps = { page: currentPage, locale, preview: isPreview }
	const navigationProviderProps = { breadcrumbs, navpages, miscdata }

	return (
		<DiageoDesignSystemProvider>
			<LocaleProvider {...localeProviderProps}>
				<PagesProvider {...pagesProviderProps}>
					<NavigationProvider {...navigationProviderProps}>
						{/* <DictionaryProvider {...dictionaryProviderProps}> */}
						<PageWrapper>{renderBlock(currentPage)}</PageWrapper>
						{/* </DictionaryProvider> */}
					</NavigationProvider>
				</PagesProvider>
			</LocaleProvider>
		</DiageoDesignSystemProvider>
	)
}

export default DynamicPage
