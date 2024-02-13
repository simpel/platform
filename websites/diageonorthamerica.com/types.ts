import { type IPromoBox } from 'components/theme/plain/Header/Header'
import { type Block } from 'enums'
import { type ReactNode } from 'react'

export type Theme =
	| 'theme-amber'
	| 'theme-red'
	| 'theme-brown'
	| 'theme-blue'
	| 'theme-purple'
	| 'theme-green'
	| 'theme-white'
	| 'EVP-Grad-01'
	| 'EVP-Grad-02'
	| 'EVP-Grad-03'
	| 'EVP-Grad-04'
	| 'EVP-Grad-05'
	| 'EVP-Grad-06'
	| 'EVP-Grad-07'
	| 'EVP-Grad-08'

export type typeLink = 'external' | 'internal'

export type TPageDataProps = {
	locale: string
	localePage: Page
	pages: PartialPage[]
	currentPage: Page
	breadcrumbs: MicroPage[]
	preview: boolean
	navpages: NavPage
	miscdata: PartialPage[]
}

export type Field = {
	alias: string
	editor?: string
	text?: string
	textList?: string[]
	html?: string
	number?: number
	decimal?: string
	boolean?: boolean
	date?: string
	blocks?: ContentBlock[]
	content?: Content
	media?: MediaRef
	mediaList?: MediaRef[]
	list?: Content[]
	link?: CmsLink
	map?: {
		mapConfig: {
			lat: string
			lng: string
			zoom: number
		}
	}
}

export type SelectOption = {
	value: undefined | string
	label: undefined | string
}

export type Content = {
	_id: string
	key: string
	contentType: string
}

export type CmsLink = {
	name: string
	url: string
	contentId?: string
	mediaId?: string
	target?: string
	extraclass?: string
	dimensions?: ImageDimProps
	isLegacy?: boolean
	skipMargin?: boolean
}

export type Link = {
	name: string
	url: string
	target?: string
}

export type Media = {
	_id: string
	contentType: string
	url: string
	title: string
	fields: Array<Pick<Field, 'alias' | 'number' | 'text'>>
}

export type MediaRef = Pick<Media, '_id' | 'contentType'>

export type MediaObject = Media & {
	title: string
	fields: Field[]
}

export type ImageDimProps = {
	styleDesk: string
	widthDesk: number
	heightDesk: number
	pureimage: boolean
	styleMob?: string
	widthMob?: number
	heightMob?: number
}

export type Image = Pick<Media, '_id' | 'url'> & {
	alt: string
}

export type ContentBlock = {
	_id: string
	key: string
	contentType: string // "headingBlock__shared"
	fields: Field[]
}

export type CategoryPage = Pick<
	PartialPage,
	'_id' | 'title' | 'parent' | 'urlSegment'
>

export type PartialPage = {
	_id: string // "b00089a01f5b79488fff936e"
	url: string // /en-gb/home/conditions-of-usage/,
	urlSegment: string // Conditions-of-usage,
	title: string // Conditions of usage,
	parent: {
		_id: string
		pageId: number
	}
	contentType: string
	articleDate: string
	metaDescription: string
	alternateUrl: string
	showOnSitemap: boolean
	sectionId: number
	ancestors?: string
	pageListingImage: {
		_id: string
		url: string
	}
	pageListingImage2: {
		_id: string
		url: string
	}
	categoryPages?: CategoryPage[]
	fields?: any[]
	videoUrl?: string
}

export type PartialPageLite = Pick<
	PartialPage,
	'_id' | 'title' | 'url' | 'contentType' | 'articleDate' | 'categoryPages'
>

export type Page = PartialPage &
	ContentBlock & {
		pageId: number // 1116,
		level: number // 4,
		sortOrder: number // 0,
		updateDate: string
		referencedContent: Page[]
		referencedMedia: Media[]
		articleDate: string
		miscdata: unknown
	}

export type PageWithoutFields = Omit<Page, 'fields'>

export type ContentGqlResponse = {
	contents: Page[]
}

export type UrlsGqlResponse = {
	contents: PartialPage[]
}

export type MicrosGqlResponse = {
	contents: MicroPage[]
}

export type PageDataGqlResponse = {
	projectPage: Page
	currentPage: Page
	settings: Page
	allLocalePages: PartialPage[]
	breadcrumbs: MicroPage[]
}

export type PageDataV2GqlResponse = {
	localePage: Page
	currentPage: Page
	navpages: NavPage
	httpStatus: number
}

export type PageReferencedContentGqlResponse = {
	content: {
		referencedContent: Page[]
	}
}

export type LocalePageGqlResponse = {
	localePage: Page
}

export type PagePreviewGqlResponse = {
	currentPage: PartialPage
}

export type PagesGqlResponse = {
	pages: Page[]
}

export type MediaGqlResponse = {
	media: Media[]
}

export type DictionaryGqlResponse = {
	dictionaryItems: DictionaryItem[]
}

export type NavGqlResponse = {
	nav: NavPage
}

export type DictionaryItem = {
	_id: string
	ItemKey: string /// "PR1234.ReadMore"
	IsoCode: string // "en"
	Value: string // "Read more"
}

export type RenderSettings = {
	/**
	 *  CMS ID for the parent container, eg. 'Products Container'
	 *  Helps to apply page / section specific styling
	 */
	container?: string
	/**
	 * Additional theming or custom colors, eg. 'blue'
	 */
	theme?: string
	/**
	 * Component type, eg. 'primary' for buttons
	 */
	type?: string // 'primary'
	location?: 'header' | 'body' | 'footer'
}

export type BaseProps = {
	children: ReactNode
}

export type Step = {
	_id: string
	text: string
}

export type GalleryItem = {
	_id: string
	shortTitle: string
	longTitle: string
	description: string
	displayImage: Image
	downloadImage: Image
	downloadZip: string
	pubDate: string
	topics: Step[]
	brands: Step[]
	downloadSize: number
	pubYear: number
	humanReadableSize: string
}

export type CmsEnv = 'published' | 'preview'

export type PageProps = {
	metaTitle: string
	metaDescription: string
	openGraphTitle: string
	openGraphDescription: string
	enableAgegate: boolean
	showBreadcrumbs?: boolean
}

export type Tab = {
	_id: string
	key: string
	tabText: string
	tabContents?: ContentBlock[]
}

export type FormNamePair = {
	name: string
	field: string
	type: string
	value?: string
	extras?: FieldSource[]
}

export type FieldSource = {
	name: string
	label?: string
	placeholder?: string
	required?: boolean
	maxLength?: number | undefined
	max?: string | undefined
	type: string
	value?: string
	accept?: string | undefined
	awsAccessKeyId?: string | undefined
	awsSecretAccessKey?: string | undefined
	s3BucketName?: string | undefined
	s3Path?: string | undefined
	options?: Array<{ label: string; value: string }>
}

export type RegistryItem = {
	contentType: Block

	component: any
	componentIdentifier?: string
}

export type NavPage = {
	contentType: string
	key: string
	naame: string
	pageId: number
	title: string
	url: string
	children: [NavPage]
	showonnav: boolean
	showonsitemap: boolean
	alternateurl: string
	pageLevel: number
	isExpanded?: boolean
	promos: IPromoBox[]
}

export type JobVacancyFull = {
	key: string
	country: string
	externalPosting: string
	externalPostingURL: string
	jobDescription: string
	jobFamily: string
	jobFamilyGroup: string
	jobCategory: string
	jobPostingTitle: string
	jobPostingStartDate: string
	jobPostingEndDate: string
	jobRequisitionStatus: string
	insertDate: string
	managementLevel: string
	primaryJobPostingLocation: string
	recruitingStartDate: string
	recruitingEndDate: string
	subWorkerType: string
	timeType: string
	workerType: string
	additionalJobPostingLocations: string
}

export type JobVacancy = {
	key: string
	country: string
	externalPosting: string
	externalPostingURL: string
	jobFamily: string
	jobFamilyGroup: string
	jobCategory: string
	jobPostingTitle: string
	jobPostingStartDate: string
	jobPostingEndDate: string
	jobRequisitionStatus: string
	insertDate: string
	managementLevel: string
	primaryJobPostingLocation: string
	recruitingStartDate: string
	recruitingEndDate: string
	subWorkerType: string
	timeType: string
	workerType: string
	additionalJobPostingLocations: string
}

export type JobVacancyLite = {
	key: string
	country: string
	externalPostingURL: string
	jobFamily: string
	jobFamilyGroup: string
	jobPostingTitle: string
	primaryJobPostingLocation: string
	jobPostingStartDate: string
	additionalJobPostingLocations: string
}
export type VacancyFullGqlResponse = {
	vacancies: JobVacancyFull[]
}

export type VacanciesGqlResponse = {
	vacancies: JobVacancy[]
}

export type VacanciesLiteGqlResponse = {
	vacancies: JobVacancyLite[]
}

export type RelatedVacanciesGqlResponse = {
	vacancies: JobVacancyLite[]
}

export type MicroPage = {
	_id: string // "b00089a01f5b79488fff936e"
	url: string // /en-gb/home/conditions-of-usage/,
	title: string // Conditions of usage,
}

export type MiniPage = {
	_id: string // "b00089a01f5b79488fff936e"
	url: string // /en-gb/home/conditions-of-usage/,
	title: string // Conditions of usage,
	metaDescription: string // Blah bla blah
	categories?: string[] // "d6c2fc812929a149b1d47b03",  "c9cdbee464e2ec4b821302bd",  "6e74e4f094310c44b3c8f760",  "b94ebfe39fbb76449f2ac73b",  "94ac7676a353284785f82c96"
	pageListingImage?: {
		_id: string
		url: string
	}
	articleDate: string
	contentType: string
}

export type AutoCompleteResultsGqlResponse = {
	autoCompleteContent: MicroPage[]
}

export type SearchResultsGqlResponse = {
	contentTypeSearchResolver: MiniPage[]
}
export type SearchResultsGqlResponse2 = {
	standardSearchResolver: MiniPage[]
}

export type DoubleFigureItem = {
	symbol?: string
	upperText: string
	upperTextSuffix: string
	lowerText: string
}

export type TripleFigureItem = {
	symbol?: string
	upperText: string
	upperSuffix: string
	lowerText: string
	classy: string
	textSize: string
}

export type ComplexSearchParameters = {
	query: string
	docType: string
	categories: string[]
}

export type CareersLandingVacancySelectOptions = SelectOption & {
	country: string
	jobFamily: string
	primaryJobPostingLocation: string
}

export type FinDataGqlResponse = {
	finance: FinContainer
}

export type FinContainer = {
	_id: string
	key: string
	pageId: number
	years: FinYear[]
	eventItems: FinCalItem[]
}

export type FinCalItem = {
	eventDate: string
	endDate: string
	name: string
	year: number
	kkey: number
	keyData: boolean
}

export type FinYear = {
	docType: string
	name: string
	year: number
	groups: FinGroup[]
}

export type FinGroup = {
	index?: number
	docType: string
	name: string
	year: number
	items: FinItem[]
	fileSize: string
	fileUrl: string
	groupType: string
}

export type FinItem = {
	articleDate: string
	docType: string
	fileName: string
	fileSize: string
	fileUrl: string
	itemType: string
	name: string
	summary: string
	videoUrl: string
	year: number
	pressReleaseLink: string
	videoPageLink: string
	kkey: number
}

export type SharePriceGqlResponse = {
	sharefeed: SharePrices
}
export type SharePrices = {
	_id: string
	data: ShareDatum[]
}

export type ShareDatum = {
	ask: number
	bid: number
	change: number
	changePercent: number
	closeDate: Date
	currency: string
	exchangeName: string
	high: number
	high52Week: number
	high52WeekDate: Date
	highYear: number
	instrumentID: number
	instrumentType: string
	last: number
	lastTradePrice: number
	low: number
	low52Week: number
	low52WeekDate: Date
	lowYear: number
	marketCap: number
	mid: number
	name: string
	open: number
	prevClose: number
	ranking: number
	shareMillions: number
	symbol: string
	timestamp: Date
	tradeCount: number
	tradeTimestamp: Date
	volume: number
	vwap: number
}

export type CategoriesGqlResponse = {
	contents: CategoryLite[]
}

export type CategoryLite = {
	_id: string
	title: string
	sortOrder: number
	parent: {
		_id: string
	}
}

export type PageBrandLandingProps = {
	brandPages: PartialPage[]
	categories: CategoryLite[]
}

export type PageContactUsProps = {
	csrfToken: string
}

export type MediaGalleryPageProps = {
	galleryItems: GalleryItem[]
	filters: any[]
	// GalleryItems2: any[]
}

export type PageBoardMembersProps = {
	membersPages: Page[]
}

export type PageBoardMemberProps = {
	memberPages: Page[]
	media: Media[]
}

export type PageVideoLandingProps = {
	videoPages: PartialPage[]
}

export type PageFeatureLandingProps = {
	allPressReleases: PartialPage[]
	regions: SelectOption[]
	topics: SelectOption[]
	drinkCategories: SelectOption[]
}

export type SearchType = 'JOBS' | 'CONTENT'

export type JV2 = {
	key: string
	externalPostingURL: string
	jobFamily: string
	jobFamilyGroup: string
	jobPostingTitle: string
	jobPostingStartDate: string
	subWorkerType: string
	timeType: string
	locations: JV2Location[]
	primaryJobPostingLocation: string
}

export type JV2Location = {
	country: string
	locations: string[]
}

export type JV2Full = JV2 & {
	externalPosting: string
	insertDate: string
	jobCategory: string
	jobDescription: string
	jobPostingEndDate: string
	jobRequisitionStatus: string
	managementLevel: string
	minimumSalary: number
	maximumSalary: number
	recruitingStartDate: string
	recruitingEndDate: string
	workerType: string
	compFrequency: string
}

export type JV2FullGqlResponse = {
	vacancies: JV2Full[]
}

export type JV2LiteGqlResponse = {
	vacancies: JV2[]
}

export type JV2LiteGqlVacancySearchResponse = {
	vacancySearchResolver: JV2[]
}
