import LinkHelper from 'components/theme/plain/custom/LinkHelper'
import LatestStoriesCarousel from 'components/styled-components/Common/LatestStoriesCarousel'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import { FixMediaPathsInHtml } from 'utilities/functions'
import ContentBounds from 'components/styled-components/Common/ContentBounds'
import { type StoriesSliderBlockProps } from 'components/propTypes'
import * as S from './LatestStories.styles'

const LatestStories = (props: StoriesSliderBlockProps) => {
	const { richTextHeading, viewMoreLink, viewMoreLinkText, slides } = props

	return (
		<LayoutV2>
			<ContentBounds>
				<S.Wrapper>
					<S.TitleContainer>
						<S.Title
							dangerouslySetInnerHTML={{
								__html: FixMediaPathsInHtml(richTextHeading ?? ''),
							}}
						/>
					</S.TitleContainer>
					<S.ButtonContainer>
						{viewMoreLink && (
							<LinkHelper
								skipMargin
								name={viewMoreLinkText ?? viewMoreLink.name}
								url={viewMoreLink.url}
								contentId={viewMoreLink.contentId}
								mediaId={viewMoreLink.mediaId}
								target={viewMoreLink.target}
							/>
						)}
					</S.ButtonContainer>
					<S.CarouselWrapper>
						<LatestStoriesCarousel {...props} />
					</S.CarouselWrapper>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default LatestStories
