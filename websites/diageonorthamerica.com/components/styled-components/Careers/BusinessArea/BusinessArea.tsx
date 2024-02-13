import ContentBounds from 'components/styled-components/Common/ContentBounds'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import BusinessAreaCarousel from 'components/styled-components/Common/BusinessAreaCarousel'
import { type DoubleCarouselBlockProps } from 'components/propTypes'
import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'
import * as S from './BusinessArea.styles'

function BusinessArea(props: DoubleCarouselBlockProps) {
	const { gradient, richTextTitle, rightRichText, blockLink, blocks } = props
	return (
		<LayoutV2
			background={{
				gradient,
			}}
		>
			<ContentBounds>
				<S.Wrapper>
					<S.Header>
						<S.TitleWrapper>
							<S.Title dangerouslySetInnerHTML={{ __html: richTextTitle }} />
							<LinkHelper4 link={blockLink} linkText={blockLink?.name} />
						</S.TitleWrapper>
						<S.TextWrapper>
							<S.Text dangerouslySetInnerHTML={{ __html: rightRichText }} />
						</S.TextWrapper>
					</S.Header>
					<S.CarouselWrapper>
						<BusinessAreaCarousel blocks={blocks} />
					</S.CarouselWrapper>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default BusinessArea
