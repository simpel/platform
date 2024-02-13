/* eslint-disable check-file/no-index */
import process from 'process'
import React, { ComponentType } from 'react'
import { FieldsProvider } from 'context/fields'
import {
	type ContentBlock,
	type Page,
	type RegistryItem,
	type RenderSettings,
} from 'types'
import { Block } from 'enums'
import PageGeneral from './pages/PageGeneral'
import PageStyleGuide from './pages/PageStyleGuide'
import PageStyleGuide2 from './pages/PageStyleGuide2'
import PagePressRelease from './pages/PagePressRelease'
import PageCareers from './pages/PageCareers'
import PageCareersJob from './pages/PageCareersJob'
import PageCareersResults from './pages/PageCareersResults'
import PagePressReleaseLanding from './pages/PagePressReleaseLanding'
import PageInvestorReleaseLanding from './pages/PageInvestorReleaseLanding'
import PageFeatureLanding from './pages/PageFeatureLanding'
import PageDocumentsListing from './pages/PageDocumentsListing'
import BlockHeading from './blocks/BlockHeading'
import BlockText from './blocks/BlockText'
import BlockGeneralContainer from './blocks/BlockContainer'
import BlockButton from './blocks/BlockButton'
import PrimaryNavigationItem from './blocks/BlockPrimaryNavigationItem'
import BlockCallToActions from './blocks/BlockCallToActions'
import BlockFooterNavigation from './blocks/BlockFooterNavigation'
import BlockFooterNavigationItem from './blocks/BlockFooterNavigationItem'
import BlockVideo from './blocks/BlockVideo'
// Import BlockMap from './blocks/BlockMap'
// import BlockVipWhereToBuy from './blocks/BlockVipWhereToBuy'
import BlockKeyValuePairList from './blocks/BlockKeyValuePairList'
import BlockKeyValuePair from './blocks/BlockKeyValuePair'
import BlockNavigationItem from './blocks/BlockNavigationItem'
import BlockTabs from './blocks/BlockTabs'
import BlockImage from './blocks/BlockImage'
import BlockBreadcrumbs from './blocks/BlockBreadcrumbs'
import BlockMediaWithTextBlock from './blocks/BlockMediaWithTextBlock'
import BlockPressReleasePageContentRow from './blocks/BlockPressReleasePageContentRow'
import BlockTitleAndRichText from './blocks/BlockTitleAndRichText'
import BlockPRRichTextBlock from './blocks/BlockPRRichTextBlock'
import BlockPRImageBlock from './blocks/BlockPRImageBlock'
import BlockPageHeaderBlock from './blocks/BlockPageHeaderBlock'
import BlockSimpleTextBlock from './blocks/BlockSimpleTextBlock'
import BlockDoubleFigureItems from './blocks/BlockDoubleFigureItems'
import BlockFeaturePageHeaderBlock from './blocks/BlockFeaturePageHeaderBlock'
import BlockQuoteBlock from './blocks/BlockQuoteBlock'
import BlockStoriesFeatureBlock from './blocks/BlockStoriesFeatureBlock'
import BlockFeaturedContentBlock from './blocks/BlockFeaturedContentBlock'
import BlockStoriesSliderBlock from './blocks/BlockStoriesSliderBlock'
import BlockMediaLandingHeaderBlock from './blocks/BlockMediaLandingHeaderBlock'
import BlockDoubleCardBlock from './blocks/BlockDoubleCardBlock'
import BlockLatestPressReleasesBlock from './blocks/BlockLatestPressReleasesBlock'
import BlockCareersLandingPageHeaderBlock from './blocks/BlockCareersLandingPageHeaderBlock'
import BlockPRVideoBlock from './blocks/BlockPRVideoBlock'
import BlockStandardTextBlock from './blocks/BlockStandardTextBlock'
import BlockSimpleDoubleCardBlock from './blocks/BlockSimpleDoubleCardBlock'
import BlockStoryImageBlock from './blocks/BlockStoryImageBlock'
import BlockStoryVideoBlock from './blocks/BlockStoryVideoBlock'
import BlockStoryRichTextBlock from './blocks/BlockStoryRichTextBlock'
import BlockStoryQuoteBlock from './blocks/BlockStoryQuoteBlock'
import BlockBrandSliderBlock from './blocks/BlockBrandSliderBlock'
import BlockExplorerSlider from './blocks/BlockExplorerSlider'
import BlockHistoryTimelineSlider from './blocks/BlockHistoryTimelineSlider'
import BlockStatsBlock from './blocks/BlockStatsBlock'
import BlockBrandPageHeaderBlock from './blocks/BlockBrandPageHeaderBlock'
import BlockSocietyCardsBlock from './blocks/BlockSocietyCardsBlock'
import BlockAccordionNavLinks from './blocks/BlockAccordionNavLinks'
import BlockHistorySliderBlock from './blocks/BlockHistorySliderBlock'
import BlockProductSliderBlock from './blocks/BlockProductSliderBlock'
import BlockSmallImageSliderBlock from './blocks/BlockSmallImageSliderBlock'
import BlockVideoSliderBlock from './blocks/BlockVideoSliderBlock'
import BlockTabBlock from './blocks/BlockTabBlock'
import BlockMultiImageHeaderBlock from './blocks/BlockMultiImageHeaderBlock'
import BlockColumnContentBlock from './blocks/BlockColumnContentBlock'
import BlockHomePageHeaderBlock from './blocks/BlockHomePageHeaderBlock'
import BlockIframeBlock from './blocks/BlockIframeBlock'
import BlockSharePriceBlock from './blocks/BlockSharePriceBlock'
import BlockUpcomingEventsBlock from './blocks/BlockUpcomingEventsBlock'
import BlockNPIframeBlock from './blocks/BlockNPIframeBlock'
import BlockNPImageBlock from './blocks/BlockNPImageBlock'
import BlockNPInsetBoxBlock from './blocks/BlockNPInsetBoxBlock'
import BlockNPRichTextBlock from './blocks/BlockNPRichTextBlock'
import BlockHomePageFeatureBlock from './blocks/BlockHomePageFeatureBlock'
import BlockLiquidMagicHeaderBlock from './blocks/BlockLiquidMagicHeaderBlock'
import BlockNPAccordianBlock from './blocks/BlockNPAccordianBlock'
import BlockAccordianBlock from './blocks/BlockAccordianBlock'
import BlockThreeColumnBlock from './blocks/BlockThreeColumnBlock'
import BlockSimpleContentBlock from './blocks/BlockSimpleContentBlock'
import BlockCareerCarouselBlock from './blocks/BlockCareersCarouselBlock'
import BlockMilestonesBlock from './blocks/BlockMilestonesBlock'
import BlockCareersAccordianBlock from './blocks/BlockCareersAccordianBlock'
import plainThemeComponents from './theme/plain'
import BlockCallToActionImage from './blocks/BlockCallToActionImage'
// Import BlockGeocoder from './blocks/BlockGeocoder'
import PageBrand from './pages/PageBrand'
import PageFeature from './pages/PageFeature'
import PageSearch from './pages/PageSearch'
import PageDemo from './pages/PageDemo'
import PageBrandLanding from './pages/PageBrandLanding'
import PageBoardMembers from './pages/PageBoardMembers'
import PageBoardMember from './pages/PageBoardMember'
import PageRegion from './pages/PageRegion'
import PageCountry from './pages/PageCountry'
import PageLocations from './pages/PageLocations'
import PageSocietyLanding from './pages/PageSocietyLanding'
import PageSociety from './pages/PageSociety'
import PageResultsPresentations from './pages/PageResultsPresentations'
import PageLeftNav from './pages/PageLeftNav'
import PageFinancialCalendar from './pages/PageFinancialCalendar'
import PageCareersArticleLanding from './pages/PageCareersArticleLanding'
import PageVideo from './pages/PageVideo'
import PageVideoLanding from './pages/PageVideoLanding'
import PageCareersArticle from './pages/PageCareersArticle'
import PageContent from './pages/PageContent'
import PageContentTab from './pages/PageContentTab'
import Page404 from './pages/Page404'
import PageMediaGallery from './pages/PageMediaGallery/PageMediaGallery'
import BlockContactFormBlock from './blocks/BlockContactFormBlock'
import BlockJobVacanciesBlock from './blocks/BlockJobVacanciesBlock'
import BlockQuoteSliderBlock from './blocks/BlockQuoteSliderBlock'
import BlockLatestStoriesBlock from './blocks/BlockLatestStoriesBlock'
import BlockLargeHeadingBlock from './blocks/BlockLargeHeadingBlock'
import BlockMultiLinkBlock from './blocks/BlockMultiLinkBlock'
import BlockLargeTabBlock from './blocks/BlockLargeTabBlock'
import BlockLogoBlock from './blocks/BlockLogoBlock'
import BlockBusinessCardBlock from './blocks/BlockBusinessCardBlock'
import BlockSitemapBlock from './blocks/BlockSitemapBlock'
import BlockDownloadListBlock from './blocks/BlockDownloadListBlock'
import BlockAnchorLinkBlock from './blocks/BlockAnchorLinkBlock'
import BlockAnchorTargetBlock from './blocks/BlockAnchorTargetBlock'
import BlockCareersSearchBlock from './blocks/BlockCareersSearchBlock'
import BlockTextCarouselBlock from './blocks/BlockTextCarouselBlock'
import BlockLocationsLandingBlock from './blocks/BlockLocationsLandingBlock'
import BlockStoryQuestionBlock from './blocks/BlockStoryQuestionBlock'
import BlockDoubleCarouselBlock from './blocks/BlockDoubleCarouselBlock'
import BlockCarouselBlock from './blocks/BlockCarouselBlock'
import BlockHeadlineBlock from './blocks/BlockHeadlineBlock'
import BlockMapWithPoi from './blocks/BlockMapWithPoi'
import BlockMapWithStates from './blocks/BlockMapWithStates'
import BlockTabbedBlock from './blocks/BlockTabbedBlock'
import BlockGraphicCardsBlock from './blocks/BlockGraphicCardsBlock'
import BlockSectionHeadingBlock from "./blocks/BlockSectionHeading"
import BlockHero from './blocks/BlockHero'
import BlockInfoList from './blocks/BlockInfoList'
import BlockCardList from 'components/blocks/BlockCardList'
import BlockOpaqueImage from './blocks/BlockOpaqueImage'
import BlockImageList from './blocks/BlockImageList'
import BlockImageInfoList from './blocks/BlockImageInfoList'
import BlockSeparator from './blocks/BlockSeparator'
import BlockRowHero from 'components/blocks/BlockRowHero'
import BlockMediaBlockWithGraphics from './blocks/BlockMediaBlockWithGraphics'
import BlockImageSlider from 'components/blocks/BlockImageSlider'
import BlockFigures from './blocks/BlockFigures'
import BlockTilesList from 'components/blocks/BlockTilesList'
import BlockColumnSection from 'components/blocks/BlockColumnSection'
import BlockGraphicCardsV2 from 'components/blocks/BlockGraphicCardsV2'
import BlockGraphicCardsV3 from './blocks/BlockGraphicCardsV3'
import BlockPageNavigation from 'components/blocks/BlockPageNavigation'
import BlockCorporateStories from 'components/blocks/BlockCorporateStories'
import BlockStoryVideoWithBackground from './blocks/BlockStoryVideoWithBackground'
import BlockSplitCard from 'components/blocks/BlockSplitCard'
/**
 * TODO: add comments / documentation
 */
export const blockComponents = {
	// Page blocks
	textPage: PageContent,
	contentPage: PageContent,
	contentTabPage: PageContentTab,
	homePage: PageGeneral,
	homePage2: PageGeneral,
	landingPage: PageGeneral,
	mediaLandingPage: PageGeneral,
	yearPage: PageGeneral,
	styleGuidePage: PageStyleGuide,
	styleGuide2Page: PageStyleGuide2,
	pressReleasePage: PagePressRelease,
	brandPage: PageBrand,
	brandLandingPage: PageBrandLanding,
	featurePage: PageFeature,
	articleListingPage: PageGeneral,
	featureYearPage: PageGeneral,
	featuresLandingPage: PageFeatureLanding,
	investorReleaseLandingPage: PageInvestorReleaseLanding,
	pressReleaseLandingPage: PagePressReleaseLanding,
	pressReleaseYearPage: PageGeneral,
	searchPage: PageSearch,
	productListingPage: PageGeneral,
	demoPage: PageDemo,
	careersLandingPage: PageCareers,
	jobDetailsPage: PageCareersJob,
	careersSearchPage: PageCareersResults,
	boardMembersPage: PageBoardMembers,
	boardMemberPage: PageBoardMember,
	regionPage: PageRegion,
	countryPage: PageCountry,
	locationsPage: PageLocations,
	societyLandingPage: PageSocietyLanding,
	societyPage: PageSociety,
	resultsPresentationsPage: PageResultsPresentations,
	leftNavPage: PageLeftNav,
	financialCalendarPage: PageFinancialCalendar,
	careersArticleLandingPage: PageCareersArticleLanding,
	careersArticlePage: PageCareersArticle,
	careersArticleYearPage: PageGeneral,
	videoLandingPage: PageVideoLanding,
	videoPage: PageVideo,
	Page404,
	mediaGalleryPage: PageMediaGallery,
	documentsListingPage: PageDocumentsListing,

	// Component blocks
	[Block.MediaWithTextBlock]: BlockMediaWithTextBlock,
	[Block.PressReleasePageContentRow]: BlockPressReleasePageContentRow,
	[Block.TitleAndRichText]: BlockTitleAndRichText,
	[Block.PRRichTextBlock]: BlockPRRichTextBlock,
	[Block.PRImageBlock]: BlockPRImageBlock,
	[Block.PageHeaderBlock]: BlockPageHeaderBlock,
	[Block.SimpleTextBlock]: BlockSimpleTextBlock,
	[Block.DoubleFigureItems]: BlockDoubleFigureItems,
	[Block.FeaturePageHeaderBlock]: BlockFeaturePageHeaderBlock,
	[Block.QuoteBlock]: BlockQuoteBlock,
	[Block.Heading]: BlockHeading,
	[Block.FooterNavigationItem]: BlockFooterNavigationItem,
	[Block.Text]: BlockText,
	[Block.StoriesFeatureBlock]: BlockStoriesFeatureBlock,
	[Block.FeaturedContentBlock]: BlockFeaturedContentBlock,
	[Block.StoriesSliderBlock]: BlockStoriesSliderBlock,
	[Block.MediaLandingHeaderBlock]: BlockMediaLandingHeaderBlock,
	[Block.DoubleCardBlock]: BlockDoubleCardBlock,
	[Block.LatestPressReleasesBlock]: BlockLatestPressReleasesBlock,
	[Block.CareersLandingPageHeaderBlock]: BlockCareersLandingPageHeaderBlock,
	[Block.PRVideoBlock]: BlockPRVideoBlock,
	[Block.StandardTextBlock]: BlockStandardTextBlock,
	[Block.SimpleDoubleCardBlock]: BlockSimpleDoubleCardBlock,
	[Block.StoryImageBlock]: BlockStoryImageBlock,
	[Block.StoryVideoBlock]: BlockStoryVideoBlock,
	[Block.StoryRichTextBlock]: BlockStoryRichTextBlock,
	[Block.StoryQuoteBlock]: BlockStoryQuoteBlock,
	[Block.GeneralContainer]: BlockGeneralContainer,
	[Block.Button]: BlockButton,
	[Block.PrimaryNavigationItem]: PrimaryNavigationItem,
	[Block.NavMenuItem]: BlockNavigationItem,
	[Block.CallToActions]: BlockCallToActions,
	[Block.CallToActionImage]: BlockCallToActionImage,
	[Block.Video]: BlockVideo,
	[Block.BrandSliderBlock]: BlockBrandSliderBlock,
	[Block.BlockExplorerSlider]: BlockExplorerSlider,
	[Block.BlockHistoryTimelineSlider]: BlockHistoryTimelineSlider,
	[Block.StatsBlock]: BlockStatsBlock,
	[Block.BrandPageHeaderBlock]: BlockBrandPageHeaderBlock,
	// [Block.Map]: BlockMap,
	// [Block.Geocoder]: BlockGeocoder,
	[Block.KeyValuePairList]: BlockKeyValuePairList,
	[Block.KeyValuePair]: BlockKeyValuePair,
	// [Block.VipWhereToBuy]: BlockVipWhereToBuy,
	[Block.Tabs]: BlockTabs,
	[Block.Image]: BlockImage,
	[Block.SocietyCardsBlock]: BlockSocietyCardsBlock,
	[Block.AccordionNavLinksBlock]: BlockAccordionNavLinks,

	[Block.HistorySliderBlock]: BlockHistorySliderBlock,
	[Block.ProductSliderBlock]: BlockProductSliderBlock,
	[Block.SmallImageSliderBlock]: BlockSmallImageSliderBlock,
	[Block.VideoSliderBlock]: BlockVideoSliderBlock,
	[Block.TabBlock]: BlockTabBlock,
	[Block.MultiImageHeaderBlock]: BlockMultiImageHeaderBlock,
	[Block.ColumnContentBlock]: BlockColumnContentBlock,
	[Block.HomePageHeaderBlock]: BlockHomePageHeaderBlock,
	[Block.IframeBlock]: BlockIframeBlock,
	[Block.SharePriceBlock]: BlockSharePriceBlock,
	[Block.UpcomingEventsBlock]: BlockUpcomingEventsBlock,
	[Block.NPIframeBlock]: BlockNPIframeBlock,
	[Block.NPImageBlock]: BlockNPImageBlock,
	[Block.NPInsetBoxBlock]: BlockNPInsetBoxBlock,
	[Block.NPRichTextBlock]: BlockNPRichTextBlock,
	[Block.ContactFormBlock]: BlockContactFormBlock,
	[Block.HomePageFeatureBlock]: BlockHomePageFeatureBlock,
	[Block.LiquidMagicHeaderBlock]: BlockLiquidMagicHeaderBlock,
	[Block.NPAccordianBlock]: BlockNPAccordianBlock,
	[Block.AccordianBlock]: BlockAccordianBlock,
	[Block.JobVacanciesBlock]: BlockJobVacanciesBlock,
	[Block.QuoteSliderBlock]: BlockQuoteSliderBlock,
	[Block.LatestStoriesBlock]: BlockLatestStoriesBlock,
	[Block.LargeHeadingBlock]: BlockLargeHeadingBlock,
	[Block.MultiLinkBlock]: BlockMultiLinkBlock,
	[Block.LargeTabBlock]: BlockLargeTabBlock,
	[Block.LogoBlock]: BlockLogoBlock,
	[Block.BusinessCardBlock]: BlockBusinessCardBlock,
	[Block.SitemapBlock]: BlockSitemapBlock,
	[Block.DownloadListBlock]: BlockDownloadListBlock,
	[Block.AnchorLinkBlock]: BlockAnchorLinkBlock,
	[Block.AnchorTargetBlock]: BlockAnchorTargetBlock,
	[Block.ThreeColumnBlock]: BlockThreeColumnBlock,
	[Block.SimpleContentBlock]: BlockSimpleContentBlock,
	[Block.CareersCarouselBlock]: BlockCareerCarouselBlock,
	[Block.MilestonesBlock]: BlockMilestonesBlock,
	[Block.CareersAccordianBlock]: BlockCareersAccordianBlock,
	[Block.CareersSearchBlock]: BlockCareersSearchBlock,
	[Block.TextCarouselBlock]: BlockTextCarouselBlock,
	[Block.LocationsLandingBlock]: BlockLocationsLandingBlock,
	[Block.StoryQuestionBlock]: BlockStoryQuestionBlock,
	[Block.DoubleCarouselBlock]: BlockDoubleCarouselBlock,
	[Block.CarouselBlock]: BlockCarouselBlock,
	[Block.HeadlineBlock]: BlockHeadlineBlock,
	[Block.BlockMapWithPoi]: BlockMapWithPoi,
	[Block.BlockMapWithStates]: BlockMapWithStates,
	[Block.TabbedBlock]: BlockTabbedBlock,
	[Block.GraphicCardsBlock]: BlockGraphicCardsBlock,
	[Block.SectionHeadingBlock]: BlockSectionHeadingBlock,
	[Block.HeroBlock]: BlockHero,
	[Block.InfoList]: BlockInfoList,
	[Block.CardList]: BlockCardList,
	[Block.OpaqueImage]: BlockOpaqueImage,
	[Block.RowHero]: BlockRowHero,
	[Block.TilesList]: BlockTilesList,
	[Block.ImageList]: BlockImageList,
	[Block.ImageInfoList]: BlockImageInfoList,
	[Block.Separator]: BlockSeparator,
	[Block.MediaBlockWithGraphics]: BlockMediaBlockWithGraphics,
	[Block.ImageSlider]: BlockImageSlider,
	[Block.Figures]: BlockFigures,
	[Block.ColumnSection]: BlockColumnSection,
	[Block.GraphicCardsV2]: BlockGraphicCardsV2,
	[Block.GraphicCardsV3]: BlockGraphicCardsV3,
	[Block.PageNavigation]: BlockPageNavigation,
	[Block.CorporateStories]: BlockCorporateStories,
	[Block.StoryVideoWithBackground]: BlockStoryVideoWithBackground,
	[Block.SplitCard]: BlockSplitCard,

	// Global blocks
	[Block.Breadcrumbs]: BlockBreadcrumbs,
	[Block.FooterNavigation]: BlockFooterNavigation,
}

/**
 * Render an array of content blocks, which are individually wrappep with the Fields context
 * @param blocks ContentBlocks from CMS
 * @param settings Settings object that is passsed to all the rendered components
 * @param customContentType The blockComponents mapping can be overriden by passing a different contentType
 * @param customPage Page that is passed to the Fields context - by default it's the current page, but for some elements a different page can be used, eg. for navigation the Locale page can be passed
 */
export function renderBlocks(
	blocks: ContentBlock[] = [],
	settings: RenderSettings = {},
	customContentType?: string,
	customPage?: Page,
) {
	return blocks.map((blockContent, index) =>
		renderBlock(
			blockContent,
			settings,
			customContentType,
			undefined,
			customPage,
			index,
		),
	)
}

/**
 * Render a content block, which is wrappep with the Fields context
 * @param blocks ContentBlock from CMS
 * @param settings Settings object that is passsed to all the rendered components
 * @param customContentType The blockComponents mapping can be overriden by passing a different contentType
 * @param customComponent Custom block component can be passed for customizing the resolver
 * @param customPage Page that is passed to the Fields context - by default it's the current page, but for some elements a different page can be used, eg. for navigation the Locale page can be passed
 * @param index If the component is an array member, its index can be passed to the Fields context
 */
export function renderBlock<T>(
	blockContent: ContentBlock,
	settings: RenderSettings = {},
	customContentType?: string,
	customComponent?: (props: T) => JSX.Element,
	customPage?: Page,
	index?: number,
) {
	const contentType = customContentType ?? blockContent.contentType

	const Component = blockContent ? blockComponents[contentType] : undefined

	if (!Component) {
		return undefined
	}
	
	return (
		<FieldsProvider
			key={blockContent.key}
			fields={blockContent.fields}
			settings={settings}
			page={customPage}
			index={index}
		>
			<Component contentType={contentType} customComponent={customComponent} />
		</FieldsProvider>
	)
}

export function renderBlockByField<T>(
	blocks: ContentBlock[] | undefined,
	query: string[],
	customComponent?: (props: T) => JSX.Element,
) {
	if (!query || query.length < 2 || !blocks) return null
	const [alias, value] = query
	const blockContent = blocks.find((block) => {
		const field = block.fields.find((f) => f.alias === alias)
		if (!field) return false
		return field.text === value
	})
	if (!blockContent) return null
	return renderBlock(blockContent, {}, '', customComponent)
}

export function renderBlockByContentType<T>(
	blocks: ContentBlock[] | undefined,
	contentType: string | Block,
	customComponent?: (props: T) => JSX.Element,
	componentIdentifier?: string,
) {
	if (!blocks) return null
	let blockContent: ContentBlock | undefined
	if (componentIdentifier) {
		blockContent = blocks
			.filter((block) => block.contentType === contentType)
			.find(({ fields }) => {
				const cId = fields.find((f) => f.alias === 'componentIdentifier')
				return cId?.text === componentIdentifier
			})
	} else {
		blockContent = blocks.find((block) => block.contentType === contentType)
	}

	if (!blockContent) return null
	return renderBlock(blockContent, {}, '', customComponent)
}

export type RenderedBlocks = ReturnType<typeof renderBlocks>

const registeredComponents: Record<string, RegistryItem[]> = {
	plain: plainThemeComponents,
}

/**
 * Render a components based on the block alias and componentIdentifier
 * @param contentType Block's contentType, eg. 'container' or 'promoBox'
 * @param props Props object passed to the rendered React component
 * @param componentIdentifier optional component identifier, as set in the CMS
 * @param customComponent override which component is returned
 */
export function getComponent<T>(
	contentType: Block,
	props: T,
	componentIdentifier = '',
	customComponent?: (props: T) => JSX.Element,
) {
	let Component: ComponentType | undefined
	
	if (customComponent) {
		Component = customComponent as ComponentType
		// @ts-ignore
		return <Component {...props} />
	}

	const theme = process.env.NEXT_PUBLIC_THEME ?? 'plain'
	const byContentType = registeredComponents[theme]?.filter(
		(c) => c.contentType === contentType,
	)
	const noId = byContentType.find((c) => !c.componentIdentifier)
	if (!componentIdentifier) {
		Component = noId ? noId.component : byContentType[0]?.component ?? undefined
	}	

	const byId = byContentType.find(
		(c) => c.componentIdentifier === componentIdentifier,
	)
	Component = byId
		? byId.component
		: noId?.component ?? byContentType[0]?.component ?? undefined

	if (!Component) {
		console.log('No component found for', contentType)
		return undefined
	}
	// @ts-ignore
	return <Component {...props} />
}

/**
 * Render block outside the content block structure coming from the CMS
 * There are components, like Breadcrumbs or FooterNavigation, which are not
 * part of the content block hiearchy, this function can render them properly
 */
export function renderByContentType(
	contentType: Block,
	customComponent?: () => JSX.Element,
) {
	const Component = customComponent ?? blockComponents[contentType]
	if (!Component) return undefined
	return <Component contentType={contentType} />
}
