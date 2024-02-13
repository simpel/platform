import ContentBounds from 'components/styled-components/Common/ContentBounds'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import LinkHelper from 'components/theme/plain/custom/LinkHelper'
import { FixMediaPathsInHtml as fixMediaPathsInHtml } from 'utilities/functions'
import MediaOption from 'components/styled-components/Common/MediaOption'
import { type CmsLink } from 'types'
import { useMediaQuery } from 'react-responsive'
import * as C from '../../Common/Layout/Layout.styles'
import * as S from './MediaWithTextBlock.styles'

export type TSimpleImg = {
	mediaSrc: string
	mediaSrcAlt: string
}

export type TMediaWithTextBlockProps = {
	mediaSrc?: string
	mediaSrcAlt: string
	pageTitle: string
	title: string
	text: string
	blockLink?: CmsLink
	gradient: string
	isInverted?: boolean
	// IsMediaVisible?: boolean
	mediaType: 'video' | 'image' | 'carousel' | 'inset-image'
	secondaryMediaSrc?: string
	secondaryMediaSrcAlt?: string
	videoUrl: string
	options?: TSimpleImg[]
}

function MediaWithTextBlock({
	mediaSrc,
	mediaSrcAlt,
	pageTitle,
	title,
	text,
	blockLink,
	gradient,
	isInverted,
	mediaType,
	secondaryMediaSrc,
	secondaryMediaSrcAlt,
	options,
	videoUrl,
}: TMediaWithTextBlockProps) {
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	return (
		<LayoutV2
			background={{
				gradient,
			}}
		>
			<ContentBounds>
				<S.Wrapper
					isInverted={isInverted}
					isSecondaryImage={mediaType === 'inset-image' && isTablet}
				>
					<C.Column size={7}>
						<MediaOption
							mediaType={mediaType}
							height="430"
							heightMobilePortrait="220"
							maxWidth="840"
							isInverted={isInverted}
							src={mediaSrc}
							srcAlt={mediaSrcAlt}
							secondaryMediaSrc={secondaryMediaSrc}
							secondaryMediaSrcAlt={secondaryMediaSrcAlt}
							options={options}
							videoUrl={videoUrl}
						/>
					</C.Column>
					<C.Column size={1} />
					<C.Column size={4}>
						<S.ContentContainer>
							<S.PageTitleContainer>
								<S.PageTitle
									dangerouslySetInnerHTML={{
										__html: fixMediaPathsInHtml(pageTitle),
									}}
								/>
							</S.PageTitleContainer>
							<S.TitleContainer>
								<S.Title
									dangerouslySetInnerHTML={{
										__html: fixMediaPathsInHtml(title),
									}}
								/>
							</S.TitleContainer>
							<S.TextContainer>
								<S.Text
									dangerouslySetInnerHTML={{
										__html: fixMediaPathsInHtml(text),
									}}
								/>
							</S.TextContainer>
							{blockLink && (
								<S.LinkHelperContainer style={{ marginBottom: '8px' }}>
									<LinkHelper
										skipMargin
										name={blockLink.name}
										url={blockLink.url}
										contentId={blockLink.contentId}
										mediaId={blockLink.mediaId}
										target={blockLink.target}
									/>
								</S.LinkHelperContainer>
							)}
						</S.ContentContainer>
					</C.Column>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default MediaWithTextBlock

/* 'https://d1gdpwj97lps0w.cloudfront.net/PR1346a/aws/media/okqhhir0/annualreportbannervideo.mp4' */
