import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import { FixMediaPathsInHtml as fixMediaPathsInHtml } from 'utilities/functions'
import ContentBounds from 'components/styled-components/Common/ContentBounds'
import HeroBannerMediaOption, {
	type TMediaOption,
} from 'components/styled-components/Common/HeroBannerMediaOption'
import { type CmsLink, type Theme } from 'types'
import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'
import BreadcrumbsHelper from 'components/theme/plain/custom/BreadcrumbHelper'
import { useNavigation } from 'context/navigation'
import ApplyBlock from 'components/theme/plain/custom/ApplyBlock'
import { type TSimpleImg } from '../MediaWithTextBlock/MediaWithTextBlock'
import * as C from '../../Common/Layout/Layout.styles'
import * as S from './InternalPageHeroBanner.styles'

export type TInternalPageHeroBannerProps = {
	subTitle: string
	imageSrc: string
	imageAlt: string
	title: string
	description: string
	// ButtonHref?: string
	// buttonText?: string
	blockLink?: CmsLink
	gradient: Theme
	layout: string
	videoUrl: string
	secondaryMediaSrc: string
	secondaryMediaSrcAlt: string
	secondaryMediaSrc2: string
	secondaryMediaSrcAlt2: string
}
function InternalPageHeroBanner(props: TInternalPageHeroBannerProps) {
	const {
		subTitle,
		imageSrc,
		title,
		description,
		// ButtonHref,
		// buttonText,
		blockLink,
		gradient,
		imageAlt,
		layout,
		videoUrl,
		secondaryMediaSrc,
		secondaryMediaSrcAlt,
		secondaryMediaSrc2,
		secondaryMediaSrcAlt2,
	} = props
	const [{ breadcrumbs }] = useNavigation()

	const options: TSimpleImg[] = [
		{
			mediaSrc: imageSrc,
			mediaSrcAlt: imageAlt,
		},
		{
			mediaSrc: secondaryMediaSrc,
			mediaSrcAlt: secondaryMediaSrcAlt,
		},
		{
			mediaSrc: secondaryMediaSrc2,
			mediaSrcAlt: secondaryMediaSrcAlt2,
		},
	]

	const isEVP = gradient.includes('EVP')
	return (
		<>
			<ApplyBlock theme={gradient} applyUrl="" isEVP={isEVP} />
			<LayoutV2 background={{ gradient }}>
				<ContentBounds isHeader>
					<S.TopWrapper>
						<S.BreadcrumbsBox>
							<S.Breadcrumbs className="breadcrumbs">
								<ul className="breadcrumbs__list bare-list flex flex-wrap">
									<BreadcrumbsHelper breadcrumbs={breadcrumbs} />
								</ul>
							</S.Breadcrumbs>
						</S.BreadcrumbsBox>
						<S.Wrapper additionalPadding={layout === 'grad-inset-image'}>
							<C.Column size={1} />
							<C.Column size={4}>
								<S.UpperContainer>
									<S.SubTitleContainer>
										<S.SubTitle
											dangerouslySetInnerHTML={{
												__html: fixMediaPathsInHtml(subTitle),
											}}
										/>
									</S.SubTitleContainer>
									<S.TitleContainer>
										<S.Title
											dangerouslySetInnerHTML={{
												__html: fixMediaPathsInHtml(title),
											}}
										/>
									</S.TitleContainer>
									<S.DescriptionContainer>
										<S.Description
											dangerouslySetInnerHTML={{
												__html: fixMediaPathsInHtml(description),
											}}
										/>
									</S.DescriptionContainer>
									{blockLink && (
										<LinkHelper4 link={blockLink} linkText={blockLink?.name} />
									)}
									{/* <LinkHelper name={buttonText || 'Apply now'} url={buttonHref || ''} skipMargin /> */}
								</S.UpperContainer>
							</C.Column>
							<C.Column size={0.5} />
							<C.Column size={7}>
								<S.BottomContainer>
									<HeroBannerMediaOption
										mediaType={layout as TMediaOption['mediaType']}
										src={imageSrc}
										srcAlt={imageAlt}
										height="430"
										heightMobilePortrait="220"
										maxWidth="840"
										videoUrl={videoUrl}
										secondaryMediaSrc={secondaryMediaSrc}
										secondaryMediaSrcAlt={secondaryMediaSrcAlt}
										secondaryMediaSrc2={secondaryMediaSrc2}
										secondaryMediaSrcAlt2={secondaryMediaSrcAlt2}
										options={options}
									/>
								</S.BottomContainer>
							</C.Column>
						</S.Wrapper>
					</S.TopWrapper>
				</ContentBounds>
			</LayoutV2>
		</>
	)
}

export default InternalPageHeroBanner
