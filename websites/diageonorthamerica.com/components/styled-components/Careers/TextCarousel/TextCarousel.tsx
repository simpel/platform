import { type TextCarouselBlockProps } from 'components/propTypes'
import BusinessSubAreaCarousel from 'components/styled-components/Common/BusinessSubAreaCarousel'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import { FixMediaPathsInHtml as fixMediaPathsInHtml } from 'utilities/functions'
import * as S from './TextCarousel.styles'
// TODO: rename to text carousel

function TextCarousel(props: TextCarouselBlockProps) {
	const { richTextTitle } = props
	return (
		<LayoutV2
			background={{
				gradient: 'EVP-Grad-04',
			}}
		>
			<S.Wrapper>
				<S.TitleContainer>
					<S.Title
						dangerouslySetInnerHTML={{
							__html: fixMediaPathsInHtml(richTextTitle),
						}}
					/>
				</S.TitleContainer>
				<S.CarouselContainer>
					<BusinessSubAreaCarousel {...props} />
				</S.CarouselContainer>
			</S.Wrapper>
		</LayoutV2>
	)
}

export default TextCarousel
