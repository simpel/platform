import { NavPage } from 'types'

export function isClient() {
	return typeof window !== 'undefined'
}

export function throttle(
	func: (...params: unknown[]) => unknown,
	timeFrame: number,
) {
	let lastTime = 0
	return function (...args: unknown[]) {
		const now = new Date()
		if (now.valueOf() - lastTime >= timeFrame) {
			func(...args)
			lastTime = now.valueOf()
		}
	}
}

export function formatPhoneNo(text: string, noSpace?: boolean): string {
	if (text === 'NOT_DEFINED') {
		return ''
	}
	if (noSpace) {
		return text ? text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : ''
	}
	return text ? text.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : ''
}

export function hash(str: string, seed = 0) {
	let h1 = 0xdeadbeef ^ seed,
		h2 = 0x41c6ce57 ^ seed
	for (let i = 0, ch: number; i < str.length; i++) {
		ch = str.charCodeAt(i)
		h1 = Math.imul(h1 ^ ch, 2654435761)
		h2 = Math.imul(h2 ^ ch, 1597334677)
	}
	h1 =
		Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
		Math.imul(h2 ^ (h2 >>> 13), 3266489909)
	h2 =
		Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
		Math.imul(h1 ^ (h1 >>> 13), 3266489909)
	return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

export function GetSectionNav(
	navPages: NavPage,
	ancestorArray: number[],
	sectionid: number,
): NavPage {
	let nav = null as unknown as NavPage
	if (navPages && navPages.children) {
		if (navPages.children[0].children) {
			const CHH = navPages.children[0].children
			if (CHH) {
				const ABC = CHH.filter((item) => item.pageId === sectionid)
				if (ABC && ABC.length > 0) {
					const childNav = ABC[0].children
					if (childNav) {
						childNav.map((itm) => {
							if (ancestorArray.includes(itm.pageId)) {
								nav = itm
							}
						})
					}
				}
			}
		}
	}
	return nav
}

export function GetFriendlyDocTypeName(doctype: string): string {
	const PageTypes = {
		boardMemberPage: 'Board Member',
		boardMembersPage: '',
		brandLandingPage: '',
		brandPage: 'Brand page',
		careersLandingPage: '',
		careersSearchPage: '',
		textPage: 'Content page',
		contentTabPage: 'Content page',
		countryPage: 'Country page',
		featurePage: 'Story',
		featureYearPage: '',
		featuresLandingPage: '',
		financialCalendarPage: 'Financial Calendar',
		homePage: 'Home page',
		jobDetailsPage: '',
		landingPage: '',
		leftNavPage: 'Content page',
		locationsPage: 'Location',
		mediaLandingPage: '',
		investorReleaseLandingPage: '',
		pressReleaseLandingPage: '',
		pressReleasePage: 'Press Release',
		pressReleaseYearPage: '',
		regionPage: 'Region',
		resultsPresentationsPage: 'Results & Presentations',
		searchPage: 'Search',
		societyLandingPage: '',
		societyPage: 'Society 2030',
		careersArticleLandingPage: '',
		careersArticlePage: 'Content Page',
		careersArticleYearPage: '',
		videoLandingPage: '',
		videoPage: 'Video',
	}

	return PageTypes[doctype]
}
