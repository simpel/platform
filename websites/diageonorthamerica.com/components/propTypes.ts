import { type RenderedBlocks } from 'components'
import { type Settings } from 'react-slick'
import { type Block, type HeadingLevel, type BrandCardType } from 'enums'
import {
	type CareersLandingVacancySelectOptions,
	type DoubleFigureItem,
	type NavPage,
	type SelectOption,
	type Theme,
	type TripleFigureItem,
	type PartialPage,
	type Image,
	type Tab,
	type Media,
	type ContentBlock,
	type Link,
	type BaseProps,
	type ImageDimProps,
	type FinCalItem,
	type CmsLink,
	type CategoryLite,
	type MicroPage,
} from 'types'
import type React from 'react'
import type { ReactNode } from 'react'
import { type ActionMeta } from 'react-select'
import { type TStateId } from '@diageo/designsystem'
import { type Icons as EnumsIcon } from '../enumsIcon'
import { type TileProps } from './theme/Diageo/DTileListing'

type CardCategory = {
	_id: string
	title: string
	urlSegment: string
}

export type LayoutForSliders = {
	layout?: 'logo-right' | 'text-right' | string
}

export type BaseCardProps = {
	_id?: number | string
	image?: Image
	imageLogo?: Image
	dimensions?: ImageDimProps
	title?: string
	text?: string
	linkCta?: CmsLink
	linkUrl?: string
	date?: string
	typeCard?: BrandCardType | string
	tags?: CardCategory[]
	className?: string
	location?: string
	alternateUrl?: string
	itemIndex?: number
}

export type BrandCardProps = {
	_id?: number | string
	typeCard?: BrandCardType
	image?: Image
	imageLogo?: Image
	title?: string
	text?: string
	linkCta?: CmsLink
	linkUrl?: string
	className?: string
	location?: string
	date?: string
}

export type SelectProps = {
	options: SelectOption[]
	name: string
	id?: string
	placeholder?: string
	inputValue?: string
	value?: SelectOption | undefined
	/** The value of the select; reflected by the selected option */
	className?: string
	classNamePrefix?: string | undefined
	/* https://react-select.com/styles#style-object */
	isMulti?: boolean
	isSearchable?: boolean
	isLoading?: boolean
	isDisabled?: boolean
	isClearable?: boolean
	menuIsOpen?: boolean
	autoFocus?: boolean
	backspaceRemovesValue?: boolean
	loadingMessage?: () => string
	noOptionsMessage?: (object: { inputValue: string }) => ReactNode
	pageSize?: number
	width?: string | number
	maxMenuHeight?: number
	minMenuHeight?: number
	menuShouldBlockScroll?: boolean
	menuShouldScrollIntoView?: boolean
	menuPortalTarget?: HTMLElement | undefined
	tabIndex?: number
	components?: Record<string, unknown>
	/** Hide the selected option from the menu */
	hideSelectedOptions?: boolean
	captureMenuScroll?: boolean
	closeMenuOnSelect?: boolean
	closeMenuOnScroll?: boolean
	escapeClearsValue?: boolean
	/** Delimiter used to join multiple values into a single HTML Input value */
	delimiter?: string
	getOptionLabel?: (option: SelectOption) => string
	getOptionValue?: (option: SelectOption) => string
	isOptionDisabled?: (option: SelectOption) => boolean
	onChange: (
		selectedOption: SelectOption,
		select: ActionMeta<SelectOption>,
	) => void
	/** Handle change events on the select */
}

type EventInfo = {
	title?: string
	events: string[]
}

export type BlockProps<T> = {
	contentType: Block
	customComponent?: (props: T) => JSX.Element
}

export type IconComponentProps = {
	className?: string
	icon: EnumsIcon | undefined | string
	color?: string
	size?: 14 | 16 | 20 | 24 | 32 | 54 | 64
}

export type BaseComponentProps = {
	/**
	 * ComponentIdentifier field from CMS
	 */
	id?: string
	/**
	 * Styles / componentClassNames field from the CMS
	 */
	style?: string
}

export type GeneralContainerProps = {
	header: RenderedBlocks
	body: RenderedBlocks
	footer: RenderedBlocks
	bgImage: string
}

export type BreadcrumbsProps = {
	breadcrumbs: MicroPage[]
}

export type FooterNavigationProps = {
	footerNavigationItems: RenderedBlocks
}

export type ButtonStyle = 'primary' | 'tertiary' | 'ghost' | string

export type ButtonProps = {
	url?: string
	target?: string
	rel?: string
	text?: string
	title?: string
	otherButtonStyle?: ButtonStyle
	fullWidth?: boolean
	buttonStyle?: ButtonStyle
	disabled?: boolean
	className?: string
	iconName?: EnumsIcon
	iconNameRight?: EnumsIcon | undefined
	loading?: boolean
	round?: boolean
	download?: boolean
	size?: 'small' | 'medium' | 'large' | 'extra_large'
	children?: JSX.Element
	onClick?: (event?: React.MouseEvent<HTMLElement>) => void
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
	ariaLabel?: string
}

export type CallToActionImageProps = Omit<ButtonProps, 'text'> & {
	image?: Image
}

export type CallToActionsProps = {
	buttons: RenderedBlocks
}

export type FooterNavigationItemProps = {
	secondLevelItems: RenderedBlocks
	url: string
	text: string
	target?: string
}

export type HeadingProps = BaseComponentProps & {
	heading: string
	text?: string
	headingLevel?: HeadingLevel
	className?: string
}

export type CarouselProps = BaseProps &
	BaseComponentProps & {
		backgroundImage?: Image
	}

export type CarouselImageSlideProps = {
	headline: string
	detail: string
	backgroundImage?: string
	buttons: RenderedBlocks
}

export type CarouselVideoSlideProps = {
	headline: string
	detail: string
	video?: string
	ytId?: string
	buttons: RenderedBlocks
}

export type CarouselBasicSlideProps = {
	id?: string
	className?: string
	backgroundImage?: string
	style?: React.CSSProperties
	children: React.ReactNode
}

export type CarouselColumnBasedSlideProps = {
	id?: string
	headline: string
	detail: string
	backgroundImage?: string
	buttons: RenderedBlocks
	columns: RenderedBlocks
}

export type CarouselMixedContentSlideProps = {
	id?: string
	headline: string
	detail: string
	body: ContentBlock[]
	backgroundImage?: string
	buttons: RenderedBlocks
}

export type ImageProps = BaseComponentProps & {
	image?: Image
	centered?: boolean
	alignItems?: boolean
	dimensions?: ImageDimProps
	isResponsive?: boolean
	fixedSvg?: boolean
	isLegacy?: boolean
}

export type ImageWithLinkProps = ImageProps & {
	link?: CmsLink
	dimensions?: ImageDimProps
	isLegacy?: boolean
}

export type KeyValuePairProps = {
	kvpKey: string
	kvpValue: string
}

export type ChannelAdvisorProps = {
	parentId?: string
	product?: string
	local: boolean
}

/* Export type GeocoderProps = {
  link?: Link
  lookupLabel?: string
  lookupPlaceholder?: string
  lookupDescription?: string
  text?: string
  buttonStyle?: ButtonStyle
  otherButtonStyle?: string
} */

export type NavLinkProps = {
	active?: boolean
	text: string
	centered?: boolean
	target?: string
	hasChildren?: boolean
}

export type MenuItemProps = NavLinkProps & {
	url: string
}

export type NavMenuItemProps = MenuItemProps & {
	children?: JSX.Element
}

export type NavigationPromoBoxProps = {
	headline: string
	html: string
	image?: Image
	buttons: RenderedBlocks
	imageContent?: boolean
	hideDescription?: boolean
}

export type PromoBoxProps = {
	headline: string
	html: string
	image?: Image
	buttons: RenderedBlocks
	imageContent?: boolean
	hideDescription?: boolean
}

export type QuoteProps = {
	quote: string
	citation: string
}

export type ReusableComponentSelectionProps = unknown

export type ShareModuleProps = {
	title: string
	email: boolean
	emailSubject: string
	emailBody: string
	facebook: boolean
	twitter: boolean
	twitterMessage: string
}

export type ShopalystButtonProps = {
	placementId: string
	campaignId: string
	publisherId: string
	buttonText: string
	productId?: string
}

export type ChannelSightProps = ButtonProps & {
	assetId: string
	productSku?: string
	notes?: string
}

export type SocialPlatformItemProps = {
	channel: string
	channelName: string
	accountName: string
	includeInList: boolean
	url?: string
	name: string
	target?: string
}

export type SocialPlatformListProps = {
	icons: SocialPlatformItemProps[]
	heading?: string
	headingLevel?: HeadingLevel
}

export type TabProps = {
	tabs: Tab[]
	bgImage?: Media
	tabContents?: ContentBlock[]
}

export type TextProps = BaseComponentProps & {
	text: string
}

export type PrimaryNavigationItemProps = {
	link: Link
	secondLevelItems: ContentBlock[]
	megaMenuContents: ContentBlock[]
	text: string
}

export type VideoProps = {
	title?: string
	ytId?: string
	vimeoId?: string
	cmsVideo?: Media
}

export type CidbFormProps = {
	blocks: ContentBlock[]
	submitText: string
	promoCode: string
	appId: string
	thankYouPageUrl?: string
}

export type ComplexElementProps = {
	header?: ContentBlock[]
	body?: ContentBlock[]
	footer?: ContentBlock[]
	backgroundImage?: string
	className?: string
}

export type FollowUsProps = {
	heading: string
	text: string
	platforms: RenderedBlocks
}

export type IconSizeProps = 'ex-small' | 'small' | 'middle' | 'large'

export type IconProps = {
	name: string
	stroke?: boolean
	color?: string
	className?: string
	size?: IconSizeProps
}

export type AudioProp = {
	title: string
	time: string
	info: string
	audioLink: string
}

export type AuthorProps = {
	image: Image
	button?: ButtonProps
	author: string
	title?: string
	description?: string
	className?: string
}

export type AuthorQuote = Pick<
	AuthorProps,
	'image' | 'author' | 'description' | 'className'
>

export type StoryCardProps = {
	_id?: number | string
	image: Image
	dimensions?: ImageDimProps
	title: string
	title2?: string
	videoUrl?: string
	text?: string
	playIcon?: boolean
	articleDate?: string
	link?: Link
	extImage?: boolean
	itemLink?: CmsLink
	tags?: string[]
	onImageClick?: (element: string) => void
}

export type CardProps = BaseCardProps & {
	headingLevel?: HeadingLevel.H3 | HeadingLevel.H4
	linkCtaSize?: 'large' | 'medium'
	bgColor?: boolean
	direction?: boolean
	videoUrl?: string
}

export type EventCardProps = BaseCardProps & {
	preTitle?: string
	eventInfo?: EventInfo
}

export type MediaWithTextBlockStyle =
	| '45-55'
	| '50-50'
	| '40-60'
	| '50-50-full-bleed'
	| 'short-50-50'
	| '50-50-black'

export type MediaWithTextBlockProps = BaseComponentProps & {
	heading?: string
	richTextHeading: string
	richTextHeadingSize?: HeadingLevel
	text: string
	additionalContentSlot?:
		| React.FC
		| JSX.Element
		| JSX.Element[]
		| React.ReactChild[]
	mediaBlockStyle: MediaWithTextBlockStyle
	blockTheme?: Theme
	imageAlign?: boolean
	video?: string
	image?: Image
	noImageHeightConstraint?: boolean
	link: CmsLink
	linkText?: string
	reversed?: boolean
	actualSizeImage: boolean
}

export type PressReleasePageContentRowProps = {
	mainContent?: ContentBlock[]
	asideContent?: ContentBlock[]
	theme?: Theme
}

export type TitleAndRichTextProps = {
	heading: string
	richText: string
}

export type AccordionProps = TitleAndRichTextProps & {
	letter?: string
	image?: Image
	className?: string
}

export type AccordionBlockProps = {
	items: AccordionProps[]
	blockTheme?: Theme
	wider: boolean
	fullWidthPage: boolean
}

export type PRRichTextBlockProps = {
	richText: string
	quoteAuthor: string
	layout: string
}

export type PRImageBlockProps = {
	image?: Image
	noImageHeightConstraint: boolean
}

export type PageHeaderBlockProps = {
	layout: string
	aboveTitle: string
	richTextTitle?: string
	textBody: string
	secondaryTextBody: string
	image?: Image
	optionalFigures?: DoubleFigureItem[]
	breadcrumbs?: MicroPage[]
	theme?: Theme
	useApplyLink: boolean
	applyUrl: string
}

export type DoubleFigureItemProps = {
	content: ContentBlock
}

export type DoubleFigureItemsProps = {
	figures?: DoubleFigureItem[]
}

export type SimpleTextBlockProps = {
	layout: string
	richTextTitle: string
	richTextBody: string
	image?: Image
	linkText: string
	link: CmsLink
	reducedPadding: boolean
	optionalFigures?: DoubleFigureItem[]
	theme?: Theme
}

export type HeadingStoriesProps = {
	heading?: string
	linkCta?: CmsLink
}

export type HeadingSliderProps = HeadingStoriesProps & {
	headingSize?: 'small' | 'medium' | 'large' | 'extraLarge'
	text?: string
	textSize?: 'small' | 'medium'
	alignCentre?: boolean
	logoImage?: Image
	logoImageDimensions?: ImageDimProps
	layout?: any
}

export type BlockWithStoriesProps = HeadingStoriesProps & {
	items: CardProps[]
}

export type FeaturePageHeaderBlockProps = {
	richTextTitle: string
	associatedFile?: Media
	introRichText: string
	blockImage?: Image
	articleDate?: string
	tags?: string[]
	breadcrumbs: MicroPage[]
	blockTheme?: Theme
	isAlternate: boolean
}

export type QuoteBlockProps = {
	blockImage?: Image
	richTextQuote: string
	attrLine1: string
	attrLine2: string
	layout: string
	flipped: boolean
	blockTheme?: Theme
}

export type SimpleQuote = {
	image: Image
	richText: string
	author: string
	author2: string
}

export type QuoteSliderBlockProps = {
	items: SimpleQuote[]
	blockTheme?: Theme
	flipped: boolean
	authorPhotoLayout?: boolean
}

export type FeaturedContentBlockProps = {
	richTextHeading: string
	blockRichText: string
	blockImage?: Image
	optionalFigures?: DoubleFigureItem[]
	linkText: string
	link: CmsLink
	imageAlign: boolean
	blockTheme?: Theme
	popupUsePopup: boolean
	popupLinkText: string
	popupContentTitle: string
	popupContentText: string
	popupButtonText: string
	popupTargetUrl: string
}

export type StoriesSliderBlockProps = {
	richTextHeading?: string
	viewMoreLink?: CmsLink
	viewMoreLinkText?: string
	blockTheme?: Theme
	slides: StoryCardProps[]
}

export type MediaLandingHeaderBlockProps = {
	smallTopTitle: string
	title: string
	introRichText: string
	blockImage?: Image
	breadcrumbs: MicroPage[]
	featuredArticle: PartialPage
	link1?: CmsLink
	link2?: CmsLink
	theme?: Theme | undefined
	tags?: string[]
}

export type DoubleCardBlockProps = {
	title: string
	viewMoreLink: CmsLink
	viewMoreLinkText: string
	card1: PartialPage
	card1ImageOverride?: Image
	card1video: string
	card2: PartialPage
	card2ImageOverride?: Image
	card2video: string
	blockTheme?: Theme
}

export type LatestPressReleasesBlockProps = {
	title: string
	viewMoreLink: CmsLink
	viewMoreLinkText: string
	investorNews: boolean
	investorNewsLayout: boolean
	blockTheme?: Theme
	items: PartialPage[]
}

export type CareersLandingPageHeaderBlockProps = {
	richTextTitle: string
	richTextIntro: string
	blockImage?: Image
	countries: CareersLandingVacancySelectOptions[]
	jobFamilyGroups: CareersLandingVacancySelectOptions[]
	primaryJobPostingLocations: CareersLandingVacancySelectOptions[]
	videoUrl?: string
	mp4VideoUrl?: string
}

export type BlockBrandSliderProps = HeadingSliderProps & {
	blockTheme?: string
	items: BrandCardProps[]
}

export type LinkUnderlineProps = {
	link: Link
	icon?: IconComponentProps
	className?: string
	size?: 'medium' | 'large'
	onClick?: (event: any) => void
}

export type DSliderType = {
	children: JSX.Element[]
	settings?: Settings
	progressSlides?: boolean
	alignProgressSlides?: 'center' | 'right' | 'left'
	className?: string
}

export type PRVideoBlockProps = {
	videoUrl: string
	description: string
	thumbnailImage: Image
}

export type StandardTextBlockProps = {
	richText: string
	blockTheme?: Theme
}

export type SimpleDoubleCardBlockProps = {
	leftImage: Image
	leftTitle: string
	leftRichText: string
	leftLinkText: string
	leftLink: CmsLink
	rightImage: Image
	rightTitle: string
	rightRichText: string
	rightLinkText: string
	rightLink: CmsLink
	blockTheme?: Theme
}

export type StoryImageBlockProps = {
	blockImage: Image
	altText: string
	largeSizeImage: boolean
	noImageHeightConstraint: boolean
}

export type StoryVideoBlockProps = {
	videoUrl: string
	description: string
	thumbnailImage: Image
}

export type StoryRichTextBlockProps = {
	blockRichText: string
	rightColumnText: string
	layout: string
	blockTheme?: Theme
}

export type StoryQuoteBlockProps = {
	blockImage: Image
	blockRichText: string
	quoteName: string
	quoteJob: string
	blockTheme?: Theme
}

export type StatsBlockProps = {
	heading: string
	richTextHeading: string
	useRichTextHeading: boolean
	footnote?: string
	stats: TripleFigureItem[]
	blockTheme?: Theme
	useFourColumns: boolean
}

export type BrandPageHeaderBlockProps = {
	mainImage?: Image
	insetImage?: Image
	richTextTitle: string
	blockTheme?: Theme
}

export type Filter = {
	value: string
}

export type CheckboxProps = {
	_id: string
	name: string
	checked?: string
}

export type CategoriesSearchFilterProps = {
	className?: string
	categories: PartialPage[]
}

export type BaseCategoriesFilterProps = {
	heading?: string
	className?: string
	categories: CategoryLite[]
	handleChooseFilter?: <T>(categories: T) => void
}

export type CategoriesFilterSimple = BaseCategoriesFilterProps & {
	allCategories?: boolean
}

export type CategoriesFilterMultiple = BaseCategoriesFilterProps & {
	results?: number
	closeFilterAfterSearch?: boolean
}

export type SocietyCardsProps = {
	heading: string
	itemLarge?: PartialPage
	items?: PartialPage[]
	viewMoreLink: CmsLink
	viewMoreLinkText: string
}

export type NavBlockProps = {
	section: NavPage
	currentPageId: number
	targetAncestorId?: string
}
export type AccordionNavLinksBlockProps = {
	links: NavPage[]
}

export type HistorySliderBlockProps = {
	blockTitle: string
	richText: string
	alignCentre: boolean
	blocks?: BaseCardProps[]
	blockTheme?: Theme
}

export type ProductSliderBlockProps = {
	layout?: any // LayoutForSliders
	richTextTitle: string
	richText: string
	logoImage?: Image
	dimensions?: ImageDimProps
	link?: CmsLink
	blocks?: BaseCardProps[]
	blockTheme?: Theme
}

export type SmallImageProps = {
	image: Image
	richText: string
}

export type SmallImageSliderBlockProps = {
	blocks: SmallImageProps[]
}

export type VideoSliderBlockProps = {
	richTextTitle: string
	richText: string
	link: CmsLink
	blocks: StoryCardProps[]
	blockTheme: Theme
}

export enum TabBlockItemType {
	TextItem,
	HeadingItem,
	ImageItem,
	LinkItem,
	OnTrackItem,
}

export type TabBlockItemProps = {
	itemType: TabBlockItemType
	itemText?: string
	image?: Image
	itemLink?: CmsLink
	itemOption?: boolean
}

export type TabBlockProps = {
	id: string
	tabTitle: string
	blocks: TabBlockItemProps[]
}

export type MultiImageHeaderBlockProps = {
	richTextTitle: string
	richText: string
	layout: string
	mainImage: Image
	subImage1: Image
	subImage2: Image
	blockTheme: Theme
	breadcrumbs: MicroPage[]
	useApplyLink: boolean
	applyUrl: string
	upperTitle: string
	blockLink: CmsLink
	videoUrl: string
}

export type ColumnContentItemProps = {
	smallUpperTitle?: string
	richTextTitle?: string
	richTextIntro?: string
	itemImage?: Image
	itemLink?: CmsLink
	itemLink2?: CmsLink
}

export type ColumnContentBlockProps = {
	richTextTitle: string
	richTextIntro: string
	link?: CmsLink
	blocks: ColumnContentItemProps[]
	layout?: string
	blockTheme: string
	topMargin: boolean
	bottomMargin: boolean
}

export type HomePageHeaderBlockProps = {
	richTextTitle?: string
	richTextIntro?: string
	mainImage?: Image
	videoUrl?: string
	newsItems?: PartialPage[]
}

export type IframeBlockProps = {
	iframeTitle: string
	iframeUrl: string
	fullWidth: boolean
	frameHeight: string
}

export type SharePriceBlockProps = {
	title: string
	link?: CmsLink
	blockTheme: string
	figures: SharePriceFigures
}

export type SharePriceFigures = {
	nyFigure: number
	nyPercent: number
	nyDirection: number
	lsFigure: number
	lsPercent: number
	lsDirection: number
}

export type UpcomingEventsBlockProps = {
	title: string
	link?: CmsLink
	blockTheme: string
	events: FinCalItem[]
}

export type NPIframeBlockProps = {
	iframeTitle: string
	iframeUrl: string
	fullWidth: boolean
	frameHeight: string
}

export type NPImageBlockProps = {
	blockImage: Image
	caption: string
	fullWidth: boolean
}

export type NPInsetBoxBlockProps = {
	leftTitle: string
	leftRichText: string
	rightTitle?: string
	rightRichText?: string
	blockTheme?: string
}

export type NPRichTextBlockProps = {
	richText: string
	fullWidth: boolean
	blockTheme?: string
}

export type ContactFormTargetItem = {
	option: string
	emailTargets: string
}

export type ContactFormBlockProps = {
	introText: string
	completedText: string
	targets: ContactFormTargetItem[]
}

export type HomePageFeatureBlockProps = {
	mainImage: Image
	secondaryImage: Image
	smallTitle: string
	richTextTitle: string
	richTextIntro: string
	link?: CmsLink
	figuresTitle: string
	noTopWhitespace: boolean
	optionalFigures?: DoubleFigureItem[]
	blockTheme?: Theme
	insetImageLayout: boolean
	figuresSubText: string
}

export type LiquidMagicHeaderBlockProps = {
	smallTitle: string
	richTextTitle: string
	richTextIntro: string
	mainImage: Image
	link?: CmsLink
	link2?: CmsLink
	link3?: CmsLink
	blockTheme?: Theme
	useLiquidMagic: boolean
	imageLeft: boolean
	secondaryImage: Image
	breadcrumbs: MicroPage[]
	showBreadcrumbs: boolean
	videoUrl?: string
	videoAspectSquare: boolean
	fullVideoUrl?: string
	lowerMargin?: boolean
}

export type JobVacanciesBlockProps = {
	topTitle: string
	richTextTitle: string
	items: TileProps[]
	blockTheme?: Theme
	viewAllUrl: string
}

export type LatestStoriesBlockProps = {
	title: string
	viewMoreLink: CmsLink
	viewMoreLinkText: string
	blockTheme?: Theme
	items: PartialPage[]
	careersarticles: boolean
}

export type LargeHeadingBlockProps = {
	richTextHeading: string
}

export type MultiLinkBlockProps = {
	heading: string
	pageLinks: CmsLink[]
	blockTheme?: Theme
}

export type LargeTabBlockProps = {
	blockTitle: string
	blocks: LargeTabBlockItem[]
	blockTheme?: Theme
}

export type LargeTabBlockItem = {
	tabTitle: string
	richTextTitle: string
	richTextIntro: string
	tabMainLink: CmsLink
	stat1Prefix: string
	stat1Large: string
	stat1Suffix: string
	stat1Small: string
	stat2Prefix: string
	stat2Large: string
	stat2Suffix: string
	stat2Small: string
	tabImage: Image
	tabLinks?: CmsLink[]
}

export type ImageAndLinkItem = {
	image: Image
	link: CmsLink
	caption: string
}

export type BusinessCardBlockProps = {
	blockRichTextTitle: string
	blockRichTextIntro: string
	blockLink: CmsLink
	useCarousel: boolean
	blocks: BusinessCardItemProps[]
	blockTheme?: Theme
}

export type BusinessCardItemProps = {
	pageLink: string
	title: string
	itemText: string
	videoUrl: string
	image: Image
}

export type ApplyBlockProps = {
	theme?: Theme
	applyUrl: string
	isEVP?: boolean
}

export type SitemapBlockProps = {
	id?: number
	title: string
	pages: SitemapBlockItem[]
}

export type SitemapBlockItem = {
	id?: number
	letter: string
	title: string
	url: string
	linktext: string
}

export type CareerVideoProps = {
	videoUrl: string
	videoImageUrl: string
}

export type DownloadListBlockProps = {
	title: string
	date: string
	hideBlockDate?: boolean
	zippedLink?: CmsLink
	zippedLinkSize?: string
	downloads?: DownloadListBlockItem[]
	showDocumentDate?: boolean
}

export type DownloadListBlockItem = {
	title: string
	download?: CmsLink
	filesize: string
	itemDate?: string
}

export type LinkHelper3Props = {
	link: CmsLink
	linkClass: string
	showicon: boolean
	isDownload?: boolean
	linkText: string
	isMediaLibrary?: boolean
}

export type LinkHelper4Props = {
	link: CmsLink
	linkText: string
}

export type AnchorLinkBlockProps = {
	heading: string
	blocks: AnchorLinkItem[]
}

export type AnchorLinkItem = {
	title: string
	anchorID: string
}

export type AnchorTargetBlockProps = {
	anchorID: string
}

export type ThreeColumnBlockProps = {
	blockHeading: string
	blockItems?: ThreeColumnBlockItem[]
	footerText?: string
	blockTheme?: string
	layout?: string
}

export type ThreeColumnBlockItem = {
	leftColumnText: string
	middleColumnImage: Image
	rightColumnLargeTextPrefix: string
	rightColumnLargeText: string
	rightColumnLargeTextSuffix: string
	rightColumnSmallText: string
}

// Export type SimpleContentBlockProps = {
//   layout: string
//   upperTitle: string
//   richTextTitle: string
//   richText: string
//   mainImage: Image
//   secondImage: Image
//   thirdImage: Image
//   blockLink: CmsLink
//   videoUrl: string
//   blockTheme: string
// }

export type CareersCarouselBlockProps = {
	layout: string
	blockRichTextTitle: string
	blockTheme: string
	items?: CareersCarouselBlockItem[]
}

export type CareersCarouselBlockItem = {
	richTextTitle: string
	richTextBody: string
	itemLink: CmsLink
	itemImage: Image
	quoteText: string
	authorSubtext: string
	authorImage: Image
	authorName: string
}

export type MilestonesBlockProps = {
	blockItems?: MilestonesItem[]
	blockTheme: string
}

export type MilestonesItem = {
	itemTitle: string
	richTextBody: string
	itemImage: Image
	videoUrl: string
	quoteText: string
	authorSubtext: string
	authorImage: Image
	itemImageCaption: string
	authorName: string
}

export type CareersAccordianBlockProps = {
	blockTitle: string
	blockItems?: CareersAccordianItem[]
	blockTheme: string
}

export type CareersAccordianItem = {
	itemTitle: string
	location: string
	greenDot: boolean
	dotText: string
	itemImage: Image
	imageRichText: string
	jobId: string
	richTextBody: string
}

export type CareersSearchBlockProps = {
	blockTitle: string
	buttonUrl: string
	buttonText: string
	hashTagText: string
	hashtagLink: string
	instagramLink: string
	linkedinLink: string
	gradient: string
}

export type TextCarouselBlockProps = {
	richTextTitle: string
	blocks: TextCarouselItem[]
	blockTheme: string
}

export type TextCarouselItem = {
	itemTitle: string
	itemRichText: string
	itemLink: CmsLink
}

export type LocationsLandingBlockProps = {
	blockTitle: string
	blockRichText: string
	blockImage?: Image
	linksTitle: string
	blockLinks: locationsLandingLinkItem[]
}

export type locationsLandingLinkItem = {
	itemLink: CmsLink
}

export type StoryQuestionBlockProps = {
	questionRichText: string
	gradient: string
}

export type DoubleCarouselBlockItem = Partial<{
	image: Image
	itemImage: Image
	itemLink: Link
	itemText: string
	pageLink: string
	title: string
	videoUrl: string
	isCarousel: boolean
}>

export type DoubleCarouselBlockProps = {
	richTextTitle: string
	rightRichText: string
	blockLink: CmsLink
	blocks: DoubleCarouselBlockItem[]
	gradient: string
	useCarousel?: boolean
}

export type DoubleCarouselItem = {
	itemLink?: CmsLink
	itemImage?: Image
}

export type TMapSupplyPlantPayLoad = {
	stateId: TStateId
	supplyPlantName: string
}
