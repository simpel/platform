import { TextCarouselItem } from 'components/propTypes'
import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'
import * as S from './BusinessSubAreaCard.styles'

// export interface IBusinessSubAreaCard {
//   title: string
//   description: string
// }

const BusinessSubAreaCard = (props: TextCarouselItem) => {
	const { itemTitle, itemRichText, itemLink } = props
	return (
		<S.Wrapper>
			<S.TitleContainer>
				<S.Title>{itemTitle}</S.Title>
			</S.TitleContainer>
			<S.DescriptionContainer>
				<S.Description
					dangerouslySetInnerHTML={{ __html: itemRichText }}
				></S.Description>
				<LinkHelper4 link={itemLink} linkText={itemLink.name} />
			</S.DescriptionContainer>
		</S.Wrapper>
	)
}

export default BusinessSubAreaCard
