import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'
import * as S from './BusinessAreaCard.styles'

const BusinessAreaCard = (props: any) => {
	const { itemLink, itemImage } = props
	return (
		<S.Wrapper>
			<S.ImageWrapper>
				<S.StyledImage
					src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${itemImage?.url}`}
					fill
					alt={itemImage?.alt}
				/>
			</S.ImageWrapper>
			<S.ButtonWrapper>
				{itemLink && <LinkHelper4 link={itemLink} linkText={itemLink.name} />}
			</S.ButtonWrapper>
		</S.Wrapper>
	)
}

export default BusinessAreaCard
