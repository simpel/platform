/* eslint-disable @typescript-eslint/promise-function-async */
import { Block } from 'enums'
import dynamic from 'next/dynamic'
import { type RegistryItem } from 'types'
import Accordions from 'components/styled-components/Careers/Accordions/Accordions'
import SimpleContentBlock from './SimpleContentBlock'
import Milestones from './MilestonesBlock'
import { Tabs as TabContent } from '@diageo/designsystem'


const Spinner = dynamic(() => import('./Spinner'))
const MapWithStates = dynamic(() => import('./MapWithStates/MapWithStates'))
const MapWithPoi = dynamic(() => import('./MapWithPoi/MapWithPoi'))
const Button = dynamic(() => import('./Button'))
const ButtonOverlay = dynamic(() => import('./ButtonOverlay'))
const Heading = dynamic(() => import('./Heading'))
const HtmlText = dynamic(() => import('./HtmlText'))
const ImageBlock = dynamic(() => import('./Image'))
const KeyValuePair = dynamic(() => import('./KeyValuePair'))
const KeyValuePairList = dynamic(() => import('./KeyValuePairList'))
const NavMenuItem = dynamic(() => import('./dNavigationMenuItem'))
const NavigationPromoBox = dynamic(() => import('./NavigationPromoBox'))
const Tabs = dynamic(() => import('./Tabs'))
const PrimaryNavigationItem = dynamic(() => import('./PrimaryNavigationItem'))
const Video = dynamic(() => import('./Video'))
const ElementInstagram = dynamic(() => import('./custom/ElementInstagram'))
const ElementFacebook = dynamic(() => import('./custom/ElementFacebook'))
const MediaWithTextBlock = dynamic(() => import('./MediaWithTextBlock'))
const PressReleasePageContentRow = dynamic(
	() => import('./PressReleasePageContentRow'),
)
const TitleAndRichText = dynamic(() => import('./TitleAndRichText'))
const PRRichTextBlock = dynamic(() => import('./PRRichTextBlock'))
const PRImageBlock = dynamic(() => import('./PRImageBlock'))
const PageHeaderBlock = dynamic(() => import('./PageHeaderBlock'))
const SimpleTextBlock = dynamic(() => import('./SimpleTextBlock'))
const DoubleFigureItems = dynamic(() => import('./DoubleFigureItems'))
const FeaturePageHeaderBlock = dynamic(() => import('./FeaturePageHeaderBlock'))
const QuoteBlock = dynamic(() => import('./QuoteBlock'))
const StoriesFeatureBlock = dynamic(() => import('./StoriesFeatureBlock'))
const FeaturedContentBlock = dynamic(() => import('./FeaturedContentBlock'))
const StoriesSliderBlock = dynamic(() => import('./StoriesSliderBlock'))
const MediaLandingHeaderBlock = dynamic(
	() => import('./MediaLandingHeaderBlock'),
)
const DoubleCardBlock = dynamic(() => import('./DoubleCardBlock'))
const LatestPressReleasesBlock = dynamic(
	() => import('./LatestPressReleasesBlock'),
)
const CareersLandingPageHeaderBlock = dynamic(
	() => import('./CareersLandingPageHeaderBlock'),
)
const PRVideoBlock = dynamic(() => import('./PRVideoBlock'))
const StandardTextBlock = dynamic(() => import('./StandardTextBlock'))
const SimpleDoubleCardBlock = dynamic(() => import('./SimpleDoubleCardBlock'))
const StoryImageBlock = dynamic(() => import('./StoryImageBlock'))
const StoryVideoBlock = dynamic(() => import('./StoryVideoBlock'))
const StoryVideoWithBackground = dynamic(() => import('./StoryVideoWithBackground'))
const StoryRichTextBlock = dynamic(() => import('./StoryRichTextBlock'))
const StoryQuoteBlock = dynamic(() => import('./StoryQuoteBlock'))
const StatsBlock = dynamic(() => import('./StatsBlock'))
const BrandSliderBlock = dynamic(() => import('./BrandSliderBlock'))
const BrandPageHeaderBlock = dynamic(() => import('./BrandPageHeaderBlock'))
const SocietyCardsBlock = dynamic(() => import('./SocietyCardsBlock'))
const HistorySliderBlock = dynamic(() => import('./HistorySliderBlock'))
const ProductSliderBlock = dynamic(() => import('./ProductSliderBlock'))
const SmallImageSliderBlock = dynamic(() => import('./SmallImageSliderBlock'))
const VideoSliderBlock = dynamic(() => import('./VideoSliderBlock'))
const TabBlock = dynamic(() => import('./TabBlock'))
const MultiImageHeaderBlock = dynamic(() => import('./MultiImageHeaderBlock'))
const ColumnContentBlock = dynamic(() => import('./ColumnContentBlock'))
const HomePageHeaderBlock = dynamic(() => import('./HomePageHeaderBlock'))
const IframeBlock = dynamic(() => import('./IframeBlock'))
const SharePriceBlock = dynamic(() => import('./SharePriceBlock'))
const UpcomingEventsBlock = dynamic(() => import('./UpcomingEventsBlock'))
const NPIframeBlock = dynamic(() => import('./NPIframeBlock'))
const NPImageBlock = dynamic(() => import('./NPImageBlock'))
const NPInsetBoxBlock = dynamic(() => import('./NPInsetBoxBlock'))
const NPRichTextBlock = dynamic(() => import('./NPRichTextBlock'))
const HomePageFeatureBlock = dynamic(() => import('./HomePageFeatureBlock'))
const LiquidMagicHeaderBlock = dynamic(() => import('./LiquidMagicHeaderBlock'))
const NPAccordianBlock = dynamic(() => import('./NPAccordionBlock'))
const AccordianBlock = dynamic(() => import('./AccordianBlock'))
const JobVacanciesBlock = dynamic(() => import('./JobVacanciesBlock'))
const QuoteSliderBlock = dynamic(() => import('./QuoteSliderBlock'))
const LatestStoriesBlock = dynamic(() => import('./LatestStoriesBlock'))
const LargeHeadingBlock = dynamic(() => import('./LargeHeadingBlock'))
const MultiLinkBlock = dynamic(() => import('./MultiLinkBlock'))
const LargeTabBlock = dynamic(() => import('./LargeTabBlock'))


const BusinessCardBlock = dynamic(() => import('./BusinessCardBlock'))
const SitemapBlock = dynamic(() => import('./SitemapBlock'))
const DownloadListBlock = dynamic(() => import('./DownloadListBlock'))
const AnchorLinkBlock = dynamic(() => import('./AnchorLinkBlock'))
const AnchorTargetBlock = dynamic(() => import('./AnchorTargetBlock'))
const ThreeColumnBlock = dynamic(() => import('./ThreeColumnBlock'))
const ContactFormBlock = dynamic(
	() => import('./ContactFormBlock/ContactFormBlock'),
)
const Breadcrumbs = dynamic(() => import('../Diageo/DBreadcrumbs'))

const SearchWithSocialBar = dynamic(
	() => import('components/styled-components/Careers/SearchWithSocialBar'),
)
const TextCarouselBlock = dynamic(() => import('./TextCarouselBlock'))
const CareersCarouselBlock = dynamic(() => import('./CareersCarouselBlock'))
const LocationsLandingBlock = dynamic(() => import('./LocationsLandingBlock'))
const StoryQuestionBlock = dynamic(() => import('./StoryQuestionBlock'))
const DoubleCarouselBlock = dynamic(() => import('./DoubleCarouselBlock'))
const Carousel = dynamic(() => import("./Carousel/Carousel"))
const HeadlineBlock = dynamic(() => import("./HeadlineBlock/HeadlineBlock"))
const GraphicCards = dynamic(() => import("./GraphicCards/GraphicCards"))
const SectionHeadingBlock = dynamic(() => import("./SectionHeadingBlock/SectionHeadingBlock"))
const LogoBlock = dynamic(() => import("./LogoBlock/LogoBlock"))
const HeroWithGraphs = dynamic(() => import("./HeroWithGraphs/HeroWithGraphs"))
const InfoList = dynamic(() => import('./InfoListBlock/InfoListBlock'))
const CardList = dynamic(() => import('./CardListBlock/CardListBlock'))
const OpaqueImage = dynamic(() => import('./OpaqueImageBlock/OpaqueImageBlock'))
const ImageList = dynamic(() => import('./ImageListBlock/ImageListBlock'))
const ImageInfoList = dynamic(() => import('./ImageInfoListBlock/ImageInfoListBlock'))
const Separator = dynamic(() => import('./SeparatorBlock/SeparatorBlock'))
const RowHeroBlock = dynamic(() => import('./RowHeroBlock/RowHeroBlock'))
const MediaBlockWithGraphics = dynamic(() => import('./MediaBlockWithGraphics/MediaBlockWithGraphics'))
const ImageSlider = dynamic(() => import('./ImageSliderBlock/ImageSliderBlock'))
const Figures = dynamic(() => import('./FiguresBlock/FiguresBlock'))
const TilesList = dynamic(() => import('./TilesListBlock/TilesListBlock'))
const GraphicCardsV2 = dynamic(() => import('./GraphicCardsV2Block/GraphicCardsV2Block'))
const ColumnSectionBlock = dynamic(() => import('./ColumnSectionBlock/ColumnSectionBlock'))
const GraphicCardsV3 = dynamic(() => import('./GraphicCardsV3Block/GraphicCardsV3Block'))
const PageNavigationBlock = dynamic(() => import('./PageNavigationBlock/PageNavigationBlock'))
const CorporateStoriesBlock = dynamic(() => import('./CorporateStoriesBlock/CorporateStoriesBlock'))
const SplitCardBlock = dynamic(() => import('./SplitCardBlock/SplitCardBlock'))


const components: RegistryItem[] = [
	{
		contentType: Block.ThreeColumnBlock,
		component: ThreeColumnBlock,
	},
	{
		contentType: Block.AnchorTargetBlock,
		component: AnchorTargetBlock,
	},
	{
		contentType: Block.AnchorLinkBlock,
		component: AnchorLinkBlock,
	},
	{
		contentType: Block.DownloadListBlock,
		component: DownloadListBlock,
	},
	{
		contentType: Block.SitemapBlock,
		component: SitemapBlock,
	},
	{
		contentType: Block.BusinessCardBlock,
		component: BusinessCardBlock,
	},
	{
		contentType: Block.LogoBlock,
		component: LogoBlock,
	},
	{
		contentType: Block.LargeTabBlock,
		component: LargeTabBlock,
	},
	{
		contentType: Block.MultiLinkBlock,
		component: MultiLinkBlock,
	},
	{
		contentType: Block.LargeHeadingBlock,
		component: LargeHeadingBlock,
	},
	{
		contentType: Block.LatestStoriesBlock,
		component: LatestStoriesBlock,
	},
	{
		contentType: Block.QuoteSliderBlock,
		component: QuoteSliderBlock,
	},
	{
		contentType: Block.JobVacanciesBlock,
		component: JobVacanciesBlock,
	},
	{
		contentType: Block.AccordianBlock,
		component: AccordianBlock,
	},
	{
		contentType: Block.NPAccordianBlock,
		component: NPAccordianBlock,
	},
	{
		contentType: Block.LiquidMagicHeaderBlock,
		component: LiquidMagicHeaderBlock,
	},
	{
		contentType: Block.HomePageFeatureBlock,
		component: HomePageFeatureBlock,
	},
	{
		contentType: Block.ContactFormBlock,
		component: ContactFormBlock,
	},
	{
		contentType: Block.NPRichTextBlock,
		component: NPRichTextBlock,
	},
	{
		contentType: Block.NPInsetBoxBlock,
		component: NPInsetBoxBlock,
	},
	{
		contentType: Block.NPImageBlock,
		component: NPImageBlock,
	},
	{
		contentType: Block.NPIframeBlock,
		component: NPIframeBlock,
	},
	{
		contentType: Block.UpcomingEventsBlock,
		component: UpcomingEventsBlock,
	},
	{
		contentType: Block.SharePriceBlock,
		component: SharePriceBlock,
	},
	{
		contentType: Block.IframeBlock,
		component: IframeBlock,
	},
	{
		contentType: Block.HomePageHeaderBlock,
		component: HomePageHeaderBlock,
	},
	{
		contentType: Block.ColumnContentBlock,
		component: ColumnContentBlock,
	},
	{
		contentType: Block.MultiImageHeaderBlock,
		component: MultiImageHeaderBlock,
	},
	{
		contentType: Block.TabBlock,
		component: TabBlock,
	},
	{
		contentType: Block.VideoSliderBlock,
		component: VideoSliderBlock,
	},
	{
		contentType: Block.SmallImageSliderBlock,
		component: SmallImageSliderBlock,
	},
	{
		contentType: Block.ProductSliderBlock,
		component: ProductSliderBlock,
	},
	{
		contentType: Block.HistorySliderBlock,
		component: HistorySliderBlock,
	},
	{
		contentType: Block.SocietyCardsBlock,
		component: SocietyCardsBlock,
	},
	{
		contentType: Block.BrandPageHeaderBlock,
		component: BrandPageHeaderBlock,
	},
	{
		contentType: Block.BrandSliderBlock,
		component: BrandSliderBlock,
	},
	{
		contentType: Block.StatsBlock,
		component: StatsBlock,
	},
	{
		contentType: Block.StoryQuoteBlock,
		component: StoryQuoteBlock,
	},
	{
		contentType: Block.StoryRichTextBlock,
		component: StoryRichTextBlock,
	},
	{
		contentType: Block.StoryVideoBlock,
		component: StoryVideoBlock,
	},

	{
		contentType: Block.StoryImageBlock,
		component: StoryImageBlock,
	},
	{
		contentType: Block.SimpleDoubleCardBlock,
		component: SimpleDoubleCardBlock,
	},
	{
		contentType: Block.StandardTextBlock,
		component: StandardTextBlock,
	},
	{
		contentType: Block.PRVideoBlock,
		component: PRVideoBlock,
	},
	{
		contentType: Block.CareersLandingPageHeaderBlock,
		component: CareersLandingPageHeaderBlock,
	},
	{
		contentType: Block.LatestPressReleasesBlock,
		component: LatestPressReleasesBlock,
	},
	{
		contentType: Block.DoubleCardBlock,
		component: DoubleCardBlock,
	},
	{
		contentType: Block.MediaLandingHeaderBlock,
		component: MediaLandingHeaderBlock,
	},
	{
		contentType: Block.StoriesSliderBlock,
		component: StoriesSliderBlock,
	},
	{
		contentType: Block.FeaturedContentBlock,
		component: FeaturedContentBlock,
	},
	{
		contentType: Block.StoriesFeatureBlock,
		component: StoriesFeatureBlock,
	},
	{
		contentType: Block.QuoteBlock,
		component: QuoteBlock,
	},
	{
		contentType: Block.FeaturePageHeaderBlock,
		component: FeaturePageHeaderBlock,
	},
	{
		contentType: Block.DoubleFigureItems,
		component: DoubleFigureItems,
	},
	{
		contentType: Block.SimpleTextBlock,
		component: SimpleTextBlock,
	},
	{
		contentType: Block.PageHeaderBlock,
		component: PageHeaderBlock,
	},
	{
		contentType: Block.PRImageBlock,
		component: PRImageBlock,
	},
	{
		contentType: Block.PRRichTextBlock,
		component: PRRichTextBlock,
	},
	{
		contentType: Block.TitleAndRichText,
		component: TitleAndRichText,
	},
	{
		contentType: Block.PressReleasePageContentRow,
		component: PressReleasePageContentRow,
	},
	{
		contentType: Block.MediaWithTextBlock,
		component: MediaWithTextBlock,
	},
	{
		contentType: Block.Breadcrumbs,
		component: Breadcrumbs,
	},
	{
		contentType: Block.Button,
		component: Button,
	},
	{
		contentType: Block.Button,
		component: ButtonOverlay,
		componentIdentifier: 'overlay',
	},
	{
		contentType: Block.Heading,
		component: Heading,
	},
	{
		contentType: Block.Image,
		component: ImageBlock,
	},
	{
		contentType: Block.KeyValuePair,
		component: KeyValuePair,
	},
	{
		contentType: Block.KeyValuePairList,
		component: KeyValuePairList,
	},
	{
		contentType: Block.NavMenuItem,
		component: NavMenuItem,
	},
	{
		contentType: Block.NavigationPromoBox,
		component: NavigationPromoBox,
	},
	// {
	//   contentType: Block.Quote,
	//   component: Quote,
	// },
	{
		contentType: Block.Tabs,
		component: Tabs,
	},
	{
		contentType: Block.Text,
		component: HtmlText,
	},
	{
		contentType: Block.PrimaryNavigationItem,
		component: PrimaryNavigationItem,
	},
	{
		contentType: Block.MilestonesBlock,
		component: Milestones,
	},
	{
		contentType: Block.CareersAccordianBlock,
		component: Accordions,
	},
	{
		contentType: Block.MilestonesBlock,
		component: Milestones,
	},
	{
		contentType: Block.CareersSearchBlock,
		component: SearchWithSocialBar,
	},
	{
		contentType: Block.SimpleContentBlock,
		component: SimpleContentBlock,
	},
	{
		contentType: Block.TextCarouselBlock,
		component: TextCarouselBlock,
	},
	{
		contentType: Block.CareersCarouselBlock,
		component: CareersCarouselBlock,
	},
	{
		contentType: Block.LocationsLandingBlock,
		component: LocationsLandingBlock,
	},
	{
		contentType: Block.StoryQuestionBlock,
		component: StoryQuestionBlock,
	},
	{
		contentType: Block.DoubleCarouselBlock,
		component: DoubleCarouselBlock,
	},
	{
		contentType: Block.Video,
		component: Video,
	},
	{

		contentType: Block.PageNavigation,
		component: PageNavigationBlock,	
	},
	/* {
    contentType: Block.VipWhereToBuy,
    component: VipWhereToBuyWrapper,
  },
  */
	{
		contentType: Block.Spinner,
		component: Spinner,
	},
	// {
	//   contentType: Block.FollowUs,
	//   component: FollowUs,
	// },
	{
		contentType: Block.ComplexElement,
		component: ElementInstagram,
		componentIdentifier: 'ElementInstagram',
	},
	{
		contentType: Block.ComplexElement,
		component: ElementFacebook,
		componentIdentifier: 'ElementFacebook',
	},
	{
		contentType: Block.CarouselBlock,
		component: Carousel,
	},
	{
		contentType: Block.HeadlineBlock,
		component: HeadlineBlock,
	},
	{
		contentType: Block.BlockMapWithPoi,
		component: MapWithPoi,
	},
	{
		contentType: Block.BlockMapWithStates,
		component: MapWithStates,
	},
	{
		contentType: Block.TabbedBlock,
		component: TabContent,
	},
	{
		contentType: Block.GraphicCardsBlock,
		component: GraphicCards,
	},
	{
		contentType: Block.SectionHeadingBlock,
		component: SectionHeadingBlock,
	},
	{
		contentType: Block.HeroBlock,
		component: HeroWithGraphs
	},
	{
		contentType: Block.InfoList,
		component: InfoList,
	},
	{
		contentType: Block.CardList,
		component: CardList,
	},
	{
		contentType: Block.OpaqueImage,
		component: OpaqueImage,
	},
	{
		contentType: Block.ImageList,
		component: ImageList,
	},
	{
		contentType: Block.ImageInfoList,
		component: ImageInfoList,
	},
	{
		contentType: Block.Separator,
		component: Separator,
	},
	{
		contentType: Block.RowHero,
		component: RowHeroBlock,
	},
	{
		contentType: Block.MediaBlockWithGraphics,
		component: MediaBlockWithGraphics
	},
	{
		contentType: Block.ImageSlider,
		component: ImageSlider,
	},
	{
		contentType: Block.Figures,
		component: Figures,
	},
	{
		contentType: Block.TilesList,
		component: TilesList,
	},
	{
		contentType: Block.ColumnSection,
		component: ColumnSectionBlock,
	},
	{
		contentType: Block.CorporateStories,
		component: CorporateStoriesBlock,
	},
	{
		contentType: Block.GraphicCardsV2,
		component: GraphicCardsV2,
	},
	{
		contentType: Block.GraphicCardsV3,
		component: GraphicCardsV3,
	},
	{
		contentType: Block.StoryVideoWithBackground,
		component: StoryVideoWithBackground
	},
		{
		contentType: Block.SplitCard,
		component: SplitCardBlock,
	},
]

export default components
