import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'
import { CmsLink } from 'types'
import * as S from './FeaturesCards.styles'

export interface IFeaturesCardProps {
	imageSrc: string
	imageAlt: string
	title: string
	description: string
	linkCta?: CmsLink
}

const FeaturesCard = (props: IFeaturesCardProps) => {
	const { imageSrc, title, description, imageAlt, linkCta } = props
	return (
		<S.Wrapper>
			<S.ImageWrapper>
				<S.StyledImage src={imageSrc} fill alt={imageAlt} />
			</S.ImageWrapper>
			<S.ContentWrapper>
				<S.TitleContainer>
					<S.Title>{title}</S.Title>
				</S.TitleContainer>
				<S.DescriptionContainer>
					<S.Description>{description}</S.Description>
				</S.DescriptionContainer>
				{linkCta && (
					<S.ButtonContainer>
						<LinkHelper4 link={linkCta} linkText={linkCta.name} />
					</S.ButtonContainer>
				)}
				{/* <S.ArrowIconContainer>
          <S.ArrowIcon src={'/images/arrow-icon-small.svg'} width={14} height={14} />
        </S.ArrowIconContainer> */}
			</S.ContentWrapper>
		</S.Wrapper>
	)
}

export default FeaturesCard
