import { type Page, type PartialPage, type NavPage } from 'types'

export type TDynamicPage = {
	locale: string
	localePage: Page
	pages: PartialPage[]
	currentPage: Page
	breadcrumbs: PartialPage[]
	isPreview: boolean
	navpages: NavPage
	miscdata: PartialPage[]
}
