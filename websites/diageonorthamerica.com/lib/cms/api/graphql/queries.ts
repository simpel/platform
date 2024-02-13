import gql from 'graphql-tag'
import { join } from 'path'

import {
	CmsEnv,
	LocalePageGqlResponse,
	PageDataGqlResponse,
	PagePreviewGqlResponse,
	PageReferencedContentGqlResponse,
	PagesGqlResponse,
	UrlsGqlResponse,
	NavGqlResponse,
	VacanciesGqlResponse,
	VacanciesLiteGqlResponse,
	VacancyFullGqlResponse,
	SearchResultsGqlResponse,
	MediaGqlResponse,
	AutoCompleteResultsGqlResponse,
	FinDataGqlResponse,
	SharePriceGqlResponse,
	CategoriesGqlResponse,
	RelatedVacanciesGqlResponse,
	MicrosGqlResponse,
	SearchResultsGqlResponse2,
	JV2LiteGqlResponse,
	JV2FullGqlResponse,
	JV2LiteGqlVacancySearchResponse,
	PageDataV2GqlResponse,
} from 'types'
import request, { requestCorp } from '../client'
import {
	contentFieldsFragment,
	mediaFieldsFragment,
	miniPageFragment,
	pageFieldsFragment,
} from './fragments'

/**
 * Fetch all data for pages' getStaticProps function in one query
 */

function Sanitize(param: string) {
	const invalid = /[(){}´`':]/g
	let outy = ''
	if (param && param.length) {
		outy = param.replace(invalid, '')
	}
	if (outy.length) {
		outy = outy.replace(/"/g, "'")
	}
	return outy
}

export async function fetchPageDataV2(
	url: string,
	locale: string,
	cmsEnv: CmsEnv = 'published',
) {
	const localUrl = '/' + locale
	let pageUrl = url.replace(/\\/g, '/')
	if (pageUrl.endsWith('/')) {
		pageUrl = pageUrl.substring(0, url.length - 1)
	}
	// if (pageUrl === '/en') {
	//   pageUrl = '/en/home'
	// }
	if (pageUrl === localUrl) {
		pageUrl = localUrl + '/home'
	}

	pageUrl = Sanitize(pageUrl)

	//console.log('fetchPageData', 'url:[' + url + '] locale:[' + locale + '] pageUrl:[' + pageUrl + ']')
	const urlQuery1 = `url: "${localUrl}"`
	const urlQuery2 = `url: "${pageUrl}"`
	const gqlRes: PageDataV2GqlResponse = await request(
		gql`
        query PAGE_DATA {
          localePage: content(query: { ${urlQuery1}  }) {
            ...PAGE_FIELDS
            ...CONTENT_FIELDS
            referencedContent {
              ...PAGE_FIELDS
              ...CONTENT_FIELDS
              referencedMedia {
                ...MEDIA_FIELDS
              }
            }
            referencedMedia {
              ...MEDIA_FIELDS
            }
          }
          currentPage: content(query: { ${urlQuery2} }) {
            ...PAGE_FIELDS
            ...CONTENT_FIELDS
            referencedContent {
              ...PAGE_FIELDS
              ...CONTENT_FIELDS
              referencedMedia {
                ...MEDIA_FIELDS
              }
            }
            referencedMedia {
              ...MEDIA_FIELDS
            }
          }
          navpages: nav {
            _id
            key
            pageId
            promos{
              pageId
              promo1Title
              promo1Text
              promo1LinkText
              promo1LinkUrl
              promo1LinkType
              promo1LinkId
              promo1ImageId
              promo1ImageUrl
              promo2Title
              promo2Text
              promo2LinkText
              promo2LinkUrl
              promo2LinkType
              promo2LinkId
              promo2ImageId
              promo2ImageUrl
            }
            children {
              alternateurl
              contentType
              key
              naame
              pageId
              pageLevel
              showonnav
              showonsitemap
              title
              url
              children {
                alternateurl
                contentType
                key
                naame
                pageId
                pageLevel
                showonnav
                showonsitemap
                title
                url
                children {
                  alternateurl
                  contentType
                  key
                  naame
                  pageId
                  pageLevel
                  showonnav
                  showonsitemap
                  title
                  url
                  children {
                    alternateurl
                    contentType
                    key
                    naame
                    pageId
                    pageLevel
                    showonnav
                    showonsitemap
                    title
                    url
                    children {
                      alternateurl
                      contentType
                      key
                      naame
                      pageId
                      pageLevel
                      showonnav
                      showonsitemap
                      title
                      url
                    }
                  }
                }
              }
            }
          }
        }
        ${pageFieldsFragment}
        ${contentFieldsFragment}
        ${mediaFieldsFragment}
      `,
		cmsEnv,
	)
	// if (!gqlRes || !gqlRes.currentPage) {
	//   throw new Error('Error in GraphQL response for fetchPageDataV2 call for this url[' + url + ']')
	// }

	return { ...gqlRes }
}

/**
 * Fetch all data for pages' getStaticProps function in one query
 */
export async function fetchPageData(
	url: string,
	locale: string,
	cmsEnv: CmsEnv = 'published',
) {
	const localeUrl = join('/', locale)
	const isHomepage = url === join(localeUrl, '/')
	const homePageContentType =
		process.env.NEXT_PUBLIC_HOMEPAGE_CONTENTYPE || 'homePage'

	const localeRes = await fetchLocale(locale, cmsEnv)

	if (!localeRes?.localePage) throw new Error('Cannot fetch locale page')

	const urlQuery = isHomepage
		? `contentType: "${homePageContentType}", parent: { _id: "${localeRes.localePage._id}" }`
		: `url: "${url.replace(/\\/g, '/')}"`

	const gqlRes: PageDataGqlResponse = await request(
		gql`
        query PAGE_DATA {
          currentPage: content(query: { ${urlQuery} }) {
            ...PAGE_FIELDS
            ...CONTENT_FIELDS
            referencedContent {
              ...PAGE_FIELDS
              ...CONTENT_FIELDS
              referencedMedia {
                ...MEDIA_FIELDS
              }
            }
            referencedMedia {
              ...MEDIA_FIELDS
            }
          }
        }
        ${pageFieldsFragment}
        ${contentFieldsFragment}
        ${mediaFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes.currentPage) {
		throw new Error(
			`Error in GraphQL response for fetchPageData call. GraphQL Response: ${gqlRes}`,
		)
	}
	return { ...gqlRes, ...localeRes }
}

/**
 * Fetch all the referencedContent for the given page
 */
export const PAGE_REFERENCED_CONTENT = gql`
	query PAGE_REFERENCED_CONTENT($contentType: String!) {
		content(query: { contentType: $contentType }) {
			referencedContent {
				...PAGE_FIELDS
				...CONTENT_FIELDS
				referencedMedia {
					...MEDIA_FIELDS
				}
			}
		}
	}
	${pageFieldsFragment}
	${contentFieldsFragment}
	${mediaFieldsFragment}
`

export async function fetchPageReferencedContent(
	contentType: string,
	cmsEnv: CmsEnv = 'published',
) {
	const gqlRes: PageReferencedContentGqlResponse = await request(
		PAGE_REFERENCED_CONTENT,
		cmsEnv,
		{
			contentType,
		},
	)
	if (!gqlRes || !gqlRes.content) {
		console.error('API fetchPageData response: ', gqlRes)
		throw new Error(
			'Error in GraphQL response for fetchPageReferencedContent call',
		)
	}
	return gqlRes.content
}

/**
 * Fetch a single locale
 */
export async function fetchLocale(
	locale: string,
	cmsEnv: CmsEnv = 'published',
) {
	console.error('locale: ', locale)
	locale = Sanitize(locale)
	const url = `/${locale}`
	console.error('url: ', url)
	const gqlRes: LocalePageGqlResponse = await request(
		gql`
        query LOCALE_PAGE {
          localePage: content(query: { url: "${url}" }) {
            ...PAGE_FIELDS
            ...CONTENT_FIELDS
            referencedContent {
              ...PAGE_FIELDS
              ...CONTENT_FIELDS
              referencedMedia {
                ...MEDIA_FIELDS
              }
            }
            referencedMedia {
              ...MEDIA_FIELDS
            }
          }
        }
        ${pageFieldsFragment}
        ${contentFieldsFragment}
        ${mediaFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.localePage) {
		console.error('API fetchLocale response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchLocale call')
	}
	return gqlRes
}

// /**
//  * Fetch a single page by URL, with all fields and related content and media
//  */
// export async function fetchSinglePage(url: string, cmsEnv: CmsEnv = 'published') {
//   try {
//     const gqlRes: PagePreviewGqlResponse = await request(
//       gql`
//         query PAGE_PREVIEW($url: String!) {
//           currentPage: content(query: { url: "${url}" }) {
//             ...PAGE_FIELDS
//             ...CONTENT_FIELDS
//             referencedContent {
//               ...PAGE_FIELDS
//               ...CONTENT_FIELDS
//               referencedMedia {
//                 ...MEDIA_FIELDS
//               }
//             }
//             referencedMedia {
//               ...MEDIA_FIELDS
//             }
//           }
//         }
//         ${pageFieldsFragment}
//         ${contentFieldsFragment}
//         ${mediaFieldsFragment}
//       `,
//       cmsEnv,
//       { url },
//     )
//     if (!gqlRes || !gqlRes || !gqlRes.currentPage) {
//       console.error('API fetchSinglePage response: ', gqlRes)
//       throw new Error('Error in GraphQL response for fetchSinglePage call')
//     }
//     return gqlRes
//   } catch (err) {
//     console.error('API fetchSinglePage error', err.message)
//   }
// }

/**
 * Fetch a single page by URL, with all fields, without related content and media
 */
export async function fetchSinglePagePreview(
	url: string,
	cmsEnv: CmsEnv = 'published',
) {
	url = Sanitize(url)
	const gqlRes: PagePreviewGqlResponse = await request(
		gql`
        query SINGLE_PAGE_PREVIEW {
          currentPage: content(query: { url: "${url}" }) {
            ...PAGE_FIELDS
          }
        }
        ${pageFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.currentPage) {
		console.error('API fetchSinglePagePreview response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchSinglePagePreview call')
	}
	return gqlRes.currentPage
}

/**
 * Fetch all pages, with all fields and related content and media
 */
export async function fetchPages(
	pageIds: string[],
	cmsEnv: CmsEnv = 'published',
) {
	const gqlRes: PagesGqlResponse = await request(
		gql`
        query PAGES_IN {
          pages: contents(query: {
            _id_in: [${pageIds.map((id) => `"${id}"`).join(', ')}]
          }) {
            ...PAGE_FIELDS
            ...CONTENT_FIELDS
            referencedContent {
              ...PAGE_FIELDS
              ...CONTENT_FIELDS
            }
            referencedMedia {
              ...MEDIA_FIELDS
            }
          }
        }
        ${pageFieldsFragment}
        ${contentFieldsFragment}
        ${mediaFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.pages) {
		console.error('API fetchPages response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchPages call')
	}
	return gqlRes.pages
}

/**
 * Get all content for building sitemap.xml
 */
export async function fetchPagesForSitemap(cmsEnv: CmsEnv = 'published') {
	const gqlRes: PagesGqlResponse = await request(
		gql`
			query SITEMAP {
				pages: contents(limit: 5000, query: { showOnSitemap: true }) {
					...PAGE_FIELDS
					referencedMedia {
						...MEDIA_FIELDS
					}
				}
			}
			${pageFieldsFragment}
			${mediaFieldsFragment}
		`,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.pages) {
		console.error('API fetchPagesForSitemap response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchPagesForSitemap call')
	}
	return gqlRes.pages
}

/**
 * Fetch all content for generatic static paths array
 */
export async function fetchUrls(cmsEnv: CmsEnv = 'published') {
	const gqlRes: UrlsGqlResponse = await request(
		gql`
			query URLS {
				contents(
					limit: 2500
					query: {
						contentType_nin: [
							"workdayCategoryGroup"
							"workdayCategoryContainer"
							"workdayCategoryItem"
							"financialDataContainer"
							"financialCalendarItems"
							"financialCalendarItem"
							"financialDataYear"
							"financialDataGroup"
							"financialDataItem"
							"categoryGroupContainer"
							"categoryGroup"
							"categoryItem"
							"taxonomyGroup"
							"taxonomyParent"
							"taxonomyItem"
							"mediaGalleryItem"
							"mediaGalleryContainer"
						]
					}
					sortBy: URL_ASC
				) {
					_id
					contentType
					title
					url
					urlSegment
				}
			}
		`,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.contents) {
		console.error('API fetchUrls response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchUrls call')
	}
	return gqlRes.contents
}

/**
 * Fetch dictionary for translations
 */
// export async function fetchDictionary(isoCode: string, cmsEnv: CmsEnv = 'published') {
//   try {
//     const gqlRes: DictionaryGqlResponse = await request(
//       gql`
//         query DICTIONARY($isoCode: String!) {
//           dictionaryItems(query: { IsoCode: $isoCode }) {
//             _id
//             IsoCode
//             ItemKey
//             Value
//           }
//         }
//       `,
//       cmsEnv,
//       { isoCode },
//     )
//     if (!gqlRes || !gqlRes || !gqlRes.dictionaryItems) {
//       console.error('API fetchDictionary response: ', gqlRes)
//       throw new Error('Error in GraphQL response for fetchDictionary call')
//     }
//     return gqlRes.dictionaryItems
//   } catch (err) {
//     console.error('API fetchDictionary error', err.message)
//   }
// }

export const PAGES_BY_CONTENT_TYPE = gql`
	query PAGES_BY_CONTENT_TYPE($contentType: String!, $parentId: ObjectId) {
		pages: contents(
			query: { contentType: $contentType, parent: { _id: $parentId } }
		) {
			...PAGE_FIELDS
			...CONTENT_FIELDS
			referencedContent {
				...PAGE_FIELDS
				...CONTENT_FIELDS
			}
			referencedMedia {
				...MEDIA_FIELDS
			}
		}
	}
	${pageFieldsFragment}
	${contentFieldsFragment}
	${mediaFieldsFragment}
`
export async function fetchNav(cmsEnv: CmsEnv = 'published') {
	// later on when we need to add another site we need to pass in the rootnode (Project page - content type: "diageoProject__PR1346A") as a parameter and change the query like so:
	// nav ( query: {pageId: 1144}  ) {
	// update: 2022-11-03 Actually we dont - it works fine as it is
	const gqlRes: NavGqlResponse = await request(
		gql`
			query {
				nav {
					_id
					key
					pageId
					children {
						alternateurl
						contentType
						key
						naame
						pageId
						pageLevel
						showonnav
						showonsitemap
						title
						url
						children {
							alternateurl
							contentType
							key
							naame
							pageId
							pageLevel
							showonnav
							showonsitemap
							title
							url
							children {
								alternateurl
								contentType
								key
								naame
								pageId
								pageLevel
								showonnav
								showonsitemap
								title
								url
								children {
									alternateurl
									contentType
									key
									naame
									pageId
									pageLevel
									showonnav
									showonsitemap
									title
									url
									children {
										alternateurl
										contentType
										key
										naame
										pageId
										pageLevel
										showonnav
										showonsitemap
										title
										url
									}
								}
							}
						}
					}
				}
			}
		`,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.nav) {
		//console.error('API fetchNav response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchNav call')
	}
	//console.error('API fetchNav response is: ', gqlRes)
	return gqlRes.nav
}

export async function fetchAutoComplete(
	searchTerm: string,
	cmsEnv: CmsEnv = 'published',
) {
	searchTerm = Sanitize(searchTerm)
	const searchTermy = `"${searchTerm}"`
	const gqlRes: AutoCompleteResultsGqlResponse = await request(
		gql`
        query {
          autoCompleteContent(input: ${searchTermy}) {
            _id
            title  
            url
          }
        }
    `,
		cmsEnv,
	)

	if (!gqlRes || !gqlRes.autoCompleteContent) {
		throw new Error('Error in GraphQL response for fetchAutoComplete call')
	}
	return gqlRes.autoCompleteContent
}
export async function fetchVacancies() {
	const gqlRes: VacanciesGqlResponse = await requestCorp(gql`
		query {
			vacancies(limit: 5000) {
				key
				country
				externalPosting
				externalPostingURL
				jobFamily
				jobCategory
				jobPostingTitle
				jobPostingStartDate
				jobPostingEndDate
				jobRequisitionStatus
				insertDate
				managementLevel
				primaryJobPostingLocation
				recruitingStartDate
				recruitingEndDate
				subWorkerType
				timeType
				workerType
			}
		}
	`)
	if (!gqlRes || !gqlRes || !gqlRes.vacancies) {
		//console.error('API fetchVacancies response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchVacancies call')
	}
	//console.error('API fetchVacancies response is: ', gqlRes)
	return gqlRes.vacancies
}

export async function fetchVacanciesCareersResults() {
	const gqlRes: VacanciesLiteGqlResponse = await requestCorp(gql`
		query {
			vacancies(limit: 5000, sortBy: JOBPOSTINGSTARTDATE_DESC) {
				key
				country
				jobFamily
				jobFamilyGroup
				subWorkerType
				timeType
				primaryJobPostingLocation
				jobPostingTitle
				insertDate
				externalPostingURL
				jobPostingStartDate
				additionalJobPostingLocations
			}
		}
	`)
	if (!gqlRes || !gqlRes || !gqlRes.vacancies) {
		//console.error('API fetchVacanciesLite response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchVacanciesLite call')
	}
	//console.error('API fetchVacanciesLite response is: ', gqlRes)
	return gqlRes.vacancies
}

export async function fetchVacanciesLite(
	count: number,
	jfgList: string[] = [],
	countryList: string[] = [],
	subWorkerList: string[] = [],
) {
	// const example = 'limit: 5000, query: {country_in: ["Ireland","Italy"], jobFamilyGroup_in: ["Sales"]}, sortBy: RECRUITINGENDDATE_DESC'
	let theQuery = ''
	let thecount = 6
	const IsJfg = jfgList && jfgList.length > 0
	const IsCountry = countryList && countryList.length > 0
	const IsSubWorker = subWorkerList && subWorkerList.length > 0
	const queryList = [] as string[]

	if (count && count > 0) {
		thecount = count
	}
	if (IsJfg) {
		queryList.push(
			`jobFamilyGroup_in: [` + jfgList.map((id) => `"${id}"`).join(', ') + `]`,
		)
	}
	if (IsCountry) {
		queryList.push(
			`country_in: [` + countryList.map((id) => `"${id}"`).join(', ') + `]`,
		)
	}
	if (IsSubWorker) {
		queryList.push(
			`subWorkerType_in: [` +
				subWorkerList.map((id) => `"${id}"`).join(', ') +
				`]`,
		)
	}

	theQuery = queryList.join(', ')

	const gqlRes: VacanciesLiteGqlResponse = await requestCorp(
		gql`
        query {
          vacancies(
            limit: ${thecount}
            query: { ${theQuery}}
            sortBy: JOBPOSTINGSTARTDATE_DESC
          ) {
            key
            country
            externalPostingURL
            jobFamily
            jobFamilyGroup
            jobPostingTitle
            primaryJobPostingLocation
          }
        }
      `,
	)
	if (!gqlRes || !gqlRes || !gqlRes.vacancies) {
		console.error('API fetchVacanciesLite response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchVacanciesLite call')
	}
	//console.error('API fetchVacanciesLite response is: ', gqlRes)
	return gqlRes.vacancies
}

export async function fetchVacancy(jobref: string) {
	jobref = Sanitize(jobref)
	const searchTermy = `"${jobref}"`
	const gqlRes: VacancyFullGqlResponse = await requestCorp(
		gql`
        query {
          vacancies(query: { key: ${searchTermy}}) {
            key
            country
            externalPosting
            externalPostingURL
            jobDescription
            jobFamily
            jobFamilyGroup
            jobCategory
            jobPostingTitle
            jobPostingStartDate
            jobPostingEndDate
            jobRequisitionStatus
            insertDate
            managementLevel
            primaryJobPostingLocation
            recruitingStartDate
            recruitingEndDate
            subWorkerType
            timeType
            workerType
            additionalJobPostingLocations            
          }
        }
      `,
	)
	if (!gqlRes || !gqlRes || !gqlRes.vacancies) {
		//console.error('API fetchVacancy response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchVacancy call')
	}
	//console.error('API fetchVacancy response is: ', gqlRes)
	return gqlRes.vacancies[0]
}

export async function fetchMedia(
	mediaIds: string[],
	cmsEnv: CmsEnv = 'published',
) {
	const gqlRes: MediaGqlResponse = await request(
		gql`
        query PAGES_IN {
          media: media(query: {
            _id_in: [${mediaIds.map((id) => `"${id}"`).join(', ')}]
          }) {
            ...MEDIA_FIELDS
          }
        }
        ${mediaFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.media) {
		console.error('API fetchMedia response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchMedia call')
	}
	return gqlRes.media
}

export async function fetchFinData() {
	const gqlRes: FinDataGqlResponse = await request(gql`
		query {
			finance {
				_id
				key
				pageId
				eventItems {
					endDate
					eventDate
					name
					year
					kkey
					keyData
				}
				years {
					docType
					name
					year
					groups {
						docType
						name
						year
						fileName
						fileSize
						fileUrl
						groupType
						items {
							articleDate
							docType
							fileName
							fileSize
							fileUrl
							itemType
							name
							summary
							videoUrl
							year
							pressReleaseLink
							videoPageLink
							kkey
						}
					}
				}
			}
		}
	`)

	// console.log(gqlRes.finance)
	if (!gqlRes || !gqlRes || !gqlRes.finance) {
		//console.error('API fetchFinData response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchFinData call')
	}
	//console.error('API fetchFinData response is: ', gqlRes)
	return gqlRes.finance
}

export async function fetchShareData() {
	const gqlRes: SharePriceGqlResponse = await requestCorp(gql`
		query {
			sharefeed {
				_id
				data {
					ask
					bid
					change
					changePercent
					closeDate
					currency
					exchangeName
					high
					high52Week
					high52WeekDate
					highYear
					instrumentID
					instrumentType
					last
					lastTradePrice
					low
					low52Week
					low52WeekDate
					lowYear
					marketCap
					mid
					name
					open
					prevClose
					ranking
					shareMillions
					symbol
					timestamp
					tradeCount
					tradeTimestamp
					volume
					vwap
				}
			}
		}
	`)

	// console.log(gqlRes.finance)
	if (!gqlRes || !gqlRes || !gqlRes.sharefeed) {
		//console.error('API fetchShareData response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchShareData call')
	}
	//console.error('API fetchShareData response is: ', gqlRes)
	return gqlRes.sharefeed
}

export async function fetchFullPagesByDoctype(
	contentType: string,
	count = 50,
	datedesc = true,
	year: number,
	categories?: string[],
	andcategories?: boolean,
	hideFromHomePage?: boolean,
	withImagesOnly?: boolean,
	cmsEnv: CmsEnv = 'published',
) {
	let searchTermy = `"${contentType}"`
	const sorty = datedesc
		? `, sortBy: ARTICLEDATE_DESC`
		: `, sortBy: SORTORDER_ASC`

	if (year > 0) {
		searchTermy +=
			`, articleDate_gt: "` +
			(year - 1) +
			`-12-31T23:59:01.001+00:00",  articleDate_lt: "` +
			(year + 1) +
			`-01-01T00:00:00.000+00:00" `
	}

	if (categories?.length) {
		if (andcategories) {
			searchTermy += `, AND: [ ${categories
				.map((id) => `{categories_in: "${id}"}`)
				.join(', ')}] `
		} else {
			searchTermy += `, categories_in: [${categories
				.map((id) => `"${id}"`)
				.join(', ')}] `
		}
	}

	if (hideFromHomePage) {
		searchTermy += `, opt2: false `
	}

	if (withImagesOnly) {
		searchTermy += `, pageListingImage_exists: true `
	}
	const gqlRes: PagesGqlResponse = await request(
		gql`
        query FULLPAGES {
          pages: contents( limit: ${count}, query: { contentType: ${searchTermy}}${sorty}) {
            ...PAGE_FIELDS
            ...CONTENT_FIELDS
            referencedContent {
              ...PAGE_FIELDS
              ...CONTENT_FIELDS
            }
            referencedMedia {
              ...MEDIA_FIELDS
            }
          }
        }
        ${pageFieldsFragment}
        ${contentFieldsFragment}
        ${mediaFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes.pages) {
		console.error('API fetchFullPagesByDoctype response: ', gqlRes)
		throw new Error(
			'Error in GraphQL response for fetchFullPagesByDoctype call',
		)
	}
	return { ...gqlRes }
}

export async function fetchPageDataByDocType(
	contentType: string,
	count = 50,
	datedesc = true,
	year: number,
	categories?: string[],
	andcategories?: boolean,
	hideFromHomePage?: boolean,
	withImagesOnly?: boolean,
	cmsEnv: CmsEnv = 'published',
	fromCorp = false,
) {
	let searchTermy = `"${contentType}"`

	const isCareersArticleListingPage = contentType === 'careersArticlePage'
	const sorty = datedesc
		? `, sortBy: ARTICLEDATE_DESC`
		: `, sortBy: SORTORDER_ASC`

	if (year > 0) {
		searchTermy +=
			`, articleDate_gt: "` +
			(year - 1) +
			`-12-31T23:59:01.001+00:00",  articleDate_lt: "` +
			(year + 1) +
			`-01-01T00:00:00.000+00:00" `
	}

	if (categories?.length) {
		if (andcategories) {
			// AND: [ {categories_in: "b94ebfe39fbb76449f2ac73b"}, {categories_in: "94ac7676a353284785f82c96"}]

			searchTermy += `, AND: [ ${categories
				.map((id) => `{categories_in: "${id}"}`)
				.join(', ')}] `
		} else {
			searchTermy += `, categories_in: [${categories
				.map((id) => `"${id}"`)
				.join(', ')}] `
		}
	}

	if (hideFromHomePage) {
		searchTermy += `, opt2: false `
	}

	if (withImagesOnly) {
		searchTermy += `, pageListingImage_exists: true `
	}

	const req = fromCorp ? requestCorp : request

	const gqlRes: UrlsGqlResponse = await req(
		gql`
        query URLS {
          contents(
            limit: ${count},
            query: { contentType: ${searchTermy}}${sorty} ) {
            ...PAGE_FIELDS ${
							isCareersArticleListingPage
								? `,
           fields {
              alias,
              text
            }`
								: ''
						}
          }
        }
        ${pageFieldsFragment}
      `,
		cmsEnv,
	)

	if (isCareersArticleListingPage) {
		gqlRes.contents.map((content) => {
			if (content.fields) {
				const video = content.fields.find(
					(field) => field.alias === 'pageVideo',
				)
				content.videoUrl = video?.text
			}
		})
	}

	if (!gqlRes || !gqlRes.contents) {
		console.error('API fetchPageDataByDocType response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchPageDataByDocType call')
	}
	return { ...gqlRes }
}

export async function fetchPressReleasesFeatures(
	features: boolean,
	count = 50,
	investorNewsOnly = true,
	homePageOnly = true,
	year: number,
	categories?: string[],
	andcategories?: boolean,
	cmsEnv: CmsEnv = 'published',
) {
	let searchTermy = ``
	if (features) {
		if (homePageOnly) {
			searchTermy = `"featurePage", opt2: false `
		} else {
			searchTermy = `"featurePage" `
		}
	} else {
		if (investorNewsOnly) {
			if (homePageOnly) {
				searchTermy = `"pressReleasePage", opt1: true, opt2: false `
			} else {
				searchTermy = `"pressReleasePage", opt1: true `
			}
		} else {
			if (homePageOnly) {
				searchTermy = `"pressReleasePage", opt2: false `
			} else {
				searchTermy = `"pressReleasePage" `
			}
		}
	}

	if (year > 0) {
		searchTermy +=
			`, articleDate_gt: "` +
			(year - 1) +
			`-12-31T23:59:01.001+00:00",  articleDate_lt: "` +
			(year + 1) +
			`-01-01T00:00:00.000+00:00" `
	}

	// if (categories?.length) searchTermy += `, categories_in: [${categories.map((id) => `"${id}"`).join(', ')}] `

	if (categories?.length) {
		if (andcategories) {
			searchTermy += `, AND: [ ${categories
				.map((id) => `{categories_in: "${id}"}`)
				.join(', ')}] `
		} else {
			searchTermy += `, categories_in: [${categories
				.map((id) => `"${id}"`)
				.join(', ')}] `
		}
	}

	const gqlRes: UrlsGqlResponse = await request(
		gql`
        query URLS {
          contents(
            limit: ${count},
            query: { contentType: ${searchTermy}}, sortBy: ARTICLEDATE_DESC ) {
            ...PAGE_FIELDS
          }
        }
        ${pageFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes.contents) {
		console.error('API fetchPageDataByDocType response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchPageDataByDocType call')
	}
	return { ...gqlRes }
}

export async function fetchCategories(
	categoryToken = '',
	cmsEnv: CmsEnv = 'published',
) {
	let groupie = ''
	if (categoryToken.length > 0) {
		groupie = `, alternateUrl: "${categoryToken}"`
	}

	const gqlRes: CategoriesGqlResponse = await request(
		gql`
        query CATEGORIES {
          contents(query: { contentType: "categoryItem" ${groupie} }) {
            _id
            title
            sortOrder
            parent {
              _id
            }
          }
        }
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes.contents) {
		console.error('API fetchCategories response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchCategories call')
	}
	return { ...gqlRes }
}

/**
 * Fetch all pages, with all fields and related content and media
 */
export async function fetchPagesLite(
	pageIds: string[],
	cmsEnv: CmsEnv = 'published',
) {
	const gqlRes: UrlsGqlResponse = await request(
		gql`
        query breadcrumbs {
          contents(query: {
            _id_in: [${pageIds.map((id) => `"${id}"`).join(', ')}]
          }, sortBy: LEVEL_ASC) {
            ...PAGE_FIELDS            
          }
        }
        ${pageFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.contents) {
		console.error('API fetchPagesLite ERROR: ')
		throw new Error('Error in GraphQL response for fetchPagesLite call')
	}
	return { ...gqlRes }
}

export async function fetchPagesMicro(
	pageIds: string[],
	cmsEnv: CmsEnv = 'published',
) {
	const gqlRes: MicrosGqlResponse = await request(
		gql`
        query micros {
          contents(query: {
            pageId_in: [${pageIds.map((id) => `${id}`).join(', ')}]
          }, sortBy: LEVEL_ASC) {
            _id
            url
            title    
          }
        }
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.contents) {
		console.error('API fetchPagesLite ERROR: ')
		throw new Error('Error in GraphQL response for fetchPagesLite call')
	}
	return gqlRes.contents
}

export async function fetchChildPages(
	contentType: string,
	parentId: string,
	dateOrder: boolean,
	cmsEnv: CmsEnv = 'published',
) {
	// pages: contents(
	// 	query: { parent: { _id: "feeb3f5bbe56e64bb71b2d92"}}
	// 	, sortBy: SORTORDER_ASC
	// ){

	let query = `{ parent: { _id: "${parentId}"} `
	if (contentType && contentType.length > 0) {
		query += `, contentType: "${contentType}" `
	}
	if (dateOrder) {
		query += `}, sortBy: ARTICLEDATE_DESC`
	} else {
		query += `}, sortBy: SORTORDER_ASC`
	}

	// console.log('query', query)
	const gqlRes: PagesGqlResponse = await request(
		gql`
        query CHILD_PAGES {
          pages: contents(query: ${query}) {
            ...PAGE_FIELDS
            ...CONTENT_FIELDS
            referencedContent {
              ...PAGE_FIELDS
              ...CONTENT_FIELDS
            }
            referencedMedia {
              ...MEDIA_FIELDS
            }
          }
        }
        ${pageFieldsFragment}
        ${contentFieldsFragment}
        ${mediaFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.pages) {
		console.error('API fetchPages response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchPages call')
	}
	return gqlRes.pages
}

export async function fetchRelatedVacancies(
	Job_Category: string,
	Job_Family_Group: string,
	Primary_Job_Posting_Location: string,
) {
	// const example = 'limit: 10, query: {jobCategory: "Job_Category", jobFamilyGroup: "jobFG", primaryJobPostingLocation: "jobLoc"}, sortBy: RECRUITINGENDDATE_DESC'
	const theQuery = `jobCategory: "${Job_Category}", jobFamilyGroup: "${Job_Family_Group}", primaryJobPostingLocation: "${Primary_Job_Posting_Location}"`
	// console.log('marshall ', theQuery)
	const gqlRes: RelatedVacanciesGqlResponse = await requestCorp(
		gql`
        query {
          vacancies(
            limit: 20
            query: { ${theQuery}}
            sortBy: JOBPOSTINGSTARTDATE_DESC
          ) {
            key
            country
            externalPostingURL
            jobPostingTitle
            primaryJobPostingLocation
			      jobPostingStartDate
          }
        }
      `,
	)
	if (!gqlRes || !gqlRes || !gqlRes.vacancies) {
		console.error('API fetchRelatedVacancies response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchRelatedVacancies call')
	}
	//console.error('API fetchRelatedVacancies response is: ', gqlRes)
	return gqlRes.vacancies
}

export async function fetchChildPagesLite(
	contentType: string,
	parentId: string,
	dateOrder: boolean,
	count: number,
	cmsEnv: CmsEnv = 'published',
) {
	// pages: contents(
	// 	query: { parent: { _id: "feeb3f5bbe56e64bb71b2d92"}}
	// 	, sortBy: SORTORDER_ASC
	// ){

	let limit = 5000
	if (count && count > 0) {
		limit = count
	}
	let query = `{ parent: { _id: "${parentId}"} `
	if (contentType && contentType.length > 0) {
		query += `, contentType: "${contentType}" `
	}
	if (dateOrder) {
		query += `}, sortBy: ARTICLEDATE_DESC`
	} else {
		query += `}, sortBy: SORTORDER_ASC`
	}

	// console.log('query', query)
	const gqlRes: UrlsGqlResponse = await request(
		gql`
        query CHILD_PAGES {
          contents(limit: ${limit}, query: ${query}) {
            ...PAGE_FIELDS            
          }
        }
        ${pageFieldsFragment}
      `,
		cmsEnv,
	)
	if (!gqlRes || !gqlRes || !gqlRes.contents) {
		console.error('API fetchPages response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchPages call')
	}
	return gqlRes.contents
}

export async function fetchSearchResultsDocType(
	contentType: string,
	searchTerm: string,
	limit: number,
	cmsEnv: CmsEnv = 'published',
) {
	searchTerm = Sanitize(searchTerm)
	let searchTermy = ''

	if (contentType && contentType.length) {
		searchTermy = `{query: "${searchTerm}", docType: "${contentType}", limit: ${limit}}`
		const gqlRes: SearchResultsGqlResponse = await request(
			gql`
        query {
          contentTypeSearchResolver(input: ${searchTermy}) {
            ...MINIPAGE_FIELDS
          }
        }
        ${miniPageFragment}       
    `,
			cmsEnv,
		)
		if (!gqlRes || !gqlRes.contentTypeSearchResolver) {
			console.error('Error  API fetchSearchResultsDocType response: ', gqlRes)
			throw new Error(
				'Error in GraphQL response for fetchSearchResultsDocType call',
			)
		}
		return gqlRes.contentTypeSearchResolver
	} else {
		searchTermy = `{query: "${searchTerm}", limit: ${limit}}`
		const gqlRes: SearchResultsGqlResponse2 = await request(
			gql`
        query {
          standardSearchResolver(input: ${searchTermy}) {
            ...MINIPAGE_FIELDS
          }
        }
        ${miniPageFragment}       
    `,
			cmsEnv,
		)
		if (!gqlRes || !gqlRes.standardSearchResolver) {
			console.error('Error  API fetchSearchResultsDocType response: ', gqlRes)
			throw new Error(
				'Error in GraphQL response for fetchSearchResultsDocType call',
			)
		}
		return gqlRes.standardSearchResolver
	}
}

export async function fetchJV2Lite(
	count: number,
	jfgList: string[] = [],
	countryList: string[] = [],
	subWorkerList: string[] = [],
	locationList: string[] = [],
	jobCategoryList: string[] = [],
) {
	// const example = 'limit: 5000, query: {country_in: ["Ireland","Italy"], jobFamilyGroup_in: ["Sales"]}, sortBy: RECRUITINGENDDATE_DESC'
	let theQuery = ''
	let thecount = 6
	const IsJfg = jfgList && jfgList.length > 0
	const IsCountry = countryList && countryList.length > 0
	const IsSubWorker = subWorkerList && subWorkerList.length > 0
	const IsLocation = locationList && locationList.length > 0
	const IsJobCategory = jobCategoryList && jobCategoryList.length > 0
	const queryList = [] as string[]

	if (count && count > 0) {
		thecount = count
	}
	if (IsJfg) {
		queryList.push(
			`jobFamilyGroup_in: [` + jfgList.map((id) => `"${id}"`).join(', ') + `]`,
		)
	}
	if (IsCountry) {
		queryList.push(
			`countrylist_in: [` + countryList.map((id) => `"${id}"`).join(', ') + `]`,
		)
	}
	if (IsSubWorker) {
		queryList.push(
			`subWorkerType_in: [` +
				subWorkerList.map((id) => `"${id}"`).join(', ') +
				`]`,
		)
	}
	if (IsLocation) {
		queryList.push(
			`placelist_in: [` + locationList.map((id) => `"${id}"`).join(', ') + `]`,
		)
	}
	if (IsJobCategory) {
		queryList.push(
			`jobCategory_in: [` +
				jobCategoryList.map((id) => `"${id}"`).join(', ') +
				`]`,
		)
	}
	theQuery = queryList.join(', ')

	const gqlRes: JV2LiteGqlResponse = await requestCorp(
		gql`
        query {
          vacancies(
            limit: ${thecount}
            query: { ${theQuery}}
            sortBy: JOBPOSTINGSTARTDATE_DESC
          ) {
            key
            externalPostingURL
            jobFamily
            jobFamilyGroup
            jobPostingTitle
            jobPostingStartDate
            subWorkerType
            timeType
            country
            primaryJobPostingLocation
            locations {
              country
              locations
            }
          }
        }
      `,
	)
	if (!gqlRes || !gqlRes || !gqlRes.vacancies) {
		console.error('API fetchJV2Lite response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchJV2Lite call')
	}
	gqlRes.vacancies = gqlRes.vacancies.map((v) => {
		return {
			...v,
			country: v.locations[0] ? v.locations[0].country : '',
			primaryJobPostingLocation: v.locations[0]
				? `${v.locations[0].locations[0]},${v.locations[0].country}`
				: '',
		}
	})
	return gqlRes.vacancies
}

export async function fetchJV2Full(jobref: string) {
	jobref = Sanitize(jobref)
	const searchTermy = `"${jobref}"`
	const gqlRes: JV2FullGqlResponse = await requestCorp(
		gql`
        query {
          vacancies(query: { key: ${searchTermy}}) {
            compFrequency
            key
            externalPosting
            externalPostingURL
            jobDescription
            jobFamily
            jobFamilyGroup
            jobCategory
            jobPostingTitle
            jobPostingStartDate
            jobPostingEndDate
            jobRequisitionStatus
            insertDate
            managementLevel
            minimumSalary
            maximumSalary            
            recruitingStartDate
            recruitingEndDate
            subWorkerType
            timeType
            workerType
            locations {
              country
              locations
            }
          }
        }
      `,
	)
	if (!gqlRes || !gqlRes || !gqlRes.vacancies) {
		//console.error('API fetchVacancy response: ', gqlRes)
		throw new Error('Error in GraphQL response for fetchVacancy call')
	}
	//console.error('API fetchVacancy response is: ', gqlRes)
	return gqlRes.vacancies[0]
}

export async function fetchSearchResultsVacancies(searchTerm: string) {
	searchTerm = Sanitize(searchTerm)
	const searchTermy = `"${searchTerm}"`
	const gqlRes: JV2LiteGqlVacancySearchResponse = await requestCorp(
		gql`
        query {
          vacancySearchResolver(input: ${searchTermy}) {
            key
            externalPostingURL
            jobFamily
            jobFamilyGroup
            jobPostingTitle
            jobPostingStartDate
            subWorkerType
            timeType
            locations {
              country
              locations
            }
          }
        }
      `,
	)
	if (!gqlRes || !gqlRes || !gqlRes.vacancySearchResolver) {
		console.error('API fetchSearchResultsVacancies response: ', gqlRes)
		throw new Error(
			'Error in GraphQL response for fetchSearchResultsVacancies call',
		)
	}
	//console.error('API fetchSearchResultsVacancies response is: ', gqlRes)
	gqlRes.vacancySearchResolver = gqlRes.vacancySearchResolver.map((v) => {
		return {
			...v,
			country: v.locations[0] ? v.locations[0].country : '',
			primaryJobPostingLocation: v.locations[0]
				? `${v.locations[0].locations[0]},${v.locations[0].country}`
				: '',
		}
	})
	return gqlRes.vacancySearchResolver
}
