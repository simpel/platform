import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import { FixMediaPathsInHtml } from 'utilities/functions'
import ContentBounds from 'components/styled-components/Common/ContentBounds'
import FeaturesCarousel from 'components/styled-components/Common/FeaturesCarousel'
import * as S from './Features.styles'
import * as C from '../../Common/Layout/Layout.styles'
import { IFeaturesCardProps } from '../carousel/carousel-cards/features/FeaturesCards'

interface IFeaturesProps {
	title: string
	text: string
	cards: IFeaturesCardProps[]
}

const Features = (props: IFeaturesProps) => {
	const { title, text, cards } = props
	return (
		<LayoutV2 background={{ gradient: 'EVP-Grad-06', viewHeight: 65 }}>
			<ContentBounds>
				<S.Wrapper>
					<S.UpperContainer>
						<C.Column size={4}>
							<S.TitleContainer>
								<S.Title
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(title),
									}}
								/>
							</S.TitleContainer>
						</C.Column>
						<C.Column size={1} />
						<C.Column size={5}>
							<S.TextContainer>
								<S.Text
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(text),
									}}
								/>
							</S.TextContainer>
						</C.Column>
						<C.Column size={1} />
					</S.UpperContainer>
					<S.BottomContainer>
						<FeaturesCarousel cards={cards} />
					</S.BottomContainer>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default Features
