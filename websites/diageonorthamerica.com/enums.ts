/**
 * These are all the available blocks in the CMS.
 * The key is the block's contentType property.
 * There are also blocks that are not coming from the CMS, but using
 * certain sections of it (like Breadcrumbs).
 */
export enum Block {
	FollowUs = 'followUs',
	ComplexElement = 'complexElement',
	GeneralContainer = 'container',
	Breadcrumbs = 'breadcrumbs',
	FooterNavigation = 'footerNavigation',
	FooterNavigationItem = 'footerNavigationItem',
	Button = 'button',
	CallToActions = 'callToActions',
	CallToActionImage = 'callToActionImage',
	Heading = 'heading',
	Carousel = 'carousel',
	CarouselColumnBasedSlide = 'columnBasedSlide',
	CarouselMixedContentSlide = 'mixedContentSlide',
	ChannelSight = 'callToActionChannelSight',
	SlideColumn = 'slideColumn',
	CarouselImageSlide = 'carouselImageSlide',
	CarouselVideoSlide = 'carouselVideoSlide',
	ChannelAdvisor = 'callToActionChannelAdvisor',
	Geocoder = 'geocoder',
	Image = 'imageBlock',
	KeyValuePair = 'keyValuePair',
	KeyValuePairList = 'keyValuePairList',
	Map = 'map',
	NavMenuItem = 'navigationItem',
	NavigationPromoBox = 'navigationPromoBox',
	ProductListing = 'productListing',
	RelatedContent = 'relatedContent',
	ReusableComponentSelection = 'reusableComponentSelection',
	ShareModule = 'shareModule',
	Tabs = 'tabs',
	Text = 'text',
	PrimaryNavigationItem = 'primaryNavigationItem',
	Video = 'video',
	ProductDescription = 'productDescription',
	ProductHero = 'productHero',
	ProductReviews = 'productReviews',
	ShopalystButton = 'shopalystButton',
	Spinner = 'spinner',
	TitleAndRichText = 'titleAndRichText',
	PressReleasePageContentRow = 'pressReleasePageContentRow',
	PRRichTextBlock = 'pRRichTextBlock',
	PRImageBlock = 'pRBlockImageBlock',
	MediaWithTextBlock = 'mediaWithTextBlock',
	PageHeaderBlock = 'pageHeaderBlock',
	SimpleTextBlock = 'simpleTextBlock',
	DoubleFigureItems = 'doubleFigureItems',
	FeaturePageHeaderBlock = 'featurePageHeaderBlock',
	QuoteBlock = 'quoteBlock',
	StoriesFeatureBlock = 'storiesFeatureBlock',
	FeaturedContentBlock = 'featuredContentBlock',
	StoriesSliderBlock = 'storiesSliderBlock',
	BrandSliderBlock = 'brandSliderBlock',
	BlockExplorerSlider = 'BlockExplorerSlider',
	BlockHistorySlider = 'BlockHistorySlider',
	BlockHistoryTimelineSlider = 'BlockHistoryTimelineSlider',
	MediaLandingHeaderBlock = 'mediaLandingHeaderBlock',
	DoubleCardBlock = 'doubleCardBlock',
	LatestPressReleasesBlock = 'latestPressReleasesBlock',
	CareersLandingPageHeaderBlock = 'careersLandingPageHeaderBlock',
	PRVideoBlock = 'pRVideoBlock',
	StandardTextBlock = 'standardTextBlock',
	SimpleDoubleCardBlock = 'simpleDoubleCardBlock',
	StoryImageBlock = 'storyImageBlock',
	StoryVideoBlock = 'storyVideoBlock',
	StoryRichTextBlock = 'storyRichTextBlock',
	StoryQuoteBlock = 'storyQuoteBlock',
	StatsBlock = 'statsBlock',
	BrandSlider = 'brandSliderBlock',
	BrandPageHeaderBlock = 'brandPageHeaderBlock',
	SocietyCardsBlock = 'societyCardsBlock',
	HistorySliderBlock = 'historySliderBlock',
	ProductSliderBlock = 'productSliderBlock',
	SmallImageSliderBlock = 'smallImageSliderBlock',
	VideoSliderBlock = 'videoSliderBlock',
	TabBlock = 'tabBlock',
	AccordionNavLinksBlock = 'accordionNavLinksBlock',
	BlockAccordionNavLinks = 'blockAccordionNavLinks',
	MultiImageHeaderBlock = 'multiImageHeaderBlock',
	ColumnContentBlock = 'columnContentBlock',
	HomePageHeaderBlock = 'homePageHeaderBlock',
	IframeBlock = 'iframeBlock',
	SharePriceBlock = 'sharePriceBlock',
	UpcomingEventsBlock = 'upcomingEventsBlock',
	NPIframeBlock = 'nPIframeBlock',
	NPImageBlock = 'nPImageBlock',
	NPInsetBoxBlock = 'nPInsetBoxBlock',
	NPRichTextBlock = 'nPRichTextBlock',
	ContactFormBlock = 'contactFormBlock',
	HomePageFeatureBlock = 'homePageFeatureBlock',
	LiquidMagicHeaderBlock = 'liquidMagicHeaderBlock',
	NPAccordianBlock = 'nPAccordianBlock',
	AccordianBlock = 'accordianBlock',
	JobVacanciesBlock = 'jobVacanciesBlock',
	QuoteSliderBlock = 'quoteSliderBlock',
	LatestStoriesBlock = 'latestStoriesBlock',
	LargeHeadingBlock = 'largeHeadingBlock',
	MultiLinkBlock = 'multiLinkBlock',
	LargeTabBlock = 'largeTabBlock',
	LogoBlock = 'logoBlock',
	BusinessCardBlock = 'businessCardBlock',
	SitemapBlock = 'sitemapBlock',
	DownloadListBlock = 'downloadListBlock',
	AnchorLinkBlock = 'anchorLinkBlock',
	AnchorTargetBlock = 'anchorTargetBlock',
	ThreeColumnBlock = 'threeColumnBlock',
	SimpleContentBlock = 'simpleContentBlock',
	CareersCarouselBlock = 'careersCarouselBlock',
	MilestonesBlock = 'milestonesBlock',
	CareersAccordianBlock = 'careersAccordianBlock',
	CareersSearchBlock = 'careersSearchBlock',
	TextCarouselBlock = 'textCarouselBlock',
	LocationsLandingBlock = 'locationsLandingBlock',
	StoryQuestionBlock = 'storyQuestionBlock',
	DoubleCarouselBlock = 'doubleCarouselBlock',
	CarouselBlock = 'carouselBlock',
	HeadlineBlock = 'headlineBlock',
	BlockMapWithPoi = 'mapWithPoI',
	BlockMapWithStates = 'mapWithStates',
	TabbedBlock = 'tabbedBlock',
	GraphicCardsBlock = 'graphicCards',
	SectionHeadingBlock = 'sectionHeading',
	HeroBlock = 'heroBlock',
	InfoList = 'infoList',
	CardList = 'cardList',
	OpaqueImage = 'opaqueImageBlock',
	ImageList = 'imageList',
	ImageInfoList = 'imageInfoList',
	ImageSlider = 'imageSlider',
	Separator = 'separator',
	RowHero = 'rowHero',
	MediaBlockWithGraphics = 'mediaBlockWithGraphics',
	Figures = 'figures',
	TilesList = 'tileList',
	ColumnSection = 'columnSection',
	GraphicCardsV2 = 'graphicCardV2',
	GraphicCardsV3 = 'graphicCardV3',
	PageNavigation = 'pageNavigationBlock',
	CorporateStories = 'corporateStories',
	StoryVideoWithBackground = 'storyVideoBlockWithBackground',
	SplitCard = 'splitCard',
}

export enum HeadingLevel {
	H1 = 'h1',
	H2 = 'h2',
	H3 = 'h3',
	H4 = 'h4',
	H5 = 'h5',
}

export enum BrandCardType {
	brand = 'brand',
	brandExplorer = 'brand-explorer',
	product = 'product',
	productSecondary = 'product-secondary',
	explorer = 'explorer',
	historyTimeLine = 'history-timeline',
	history = 'history',
	benefit = 'benefit',
	person = 'person',
}

export enum TypeLink {
	internal = 'internal',
	external = 'external',
}

export enum BgThemedTheme {
	Brown = 'brown',
	Red = 'red',
	Amber = 'amber',
	Blue = 'blue',
	Purple = 'purple',
	Green = 'green',
}