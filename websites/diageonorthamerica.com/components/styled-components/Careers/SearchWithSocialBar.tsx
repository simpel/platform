import { FixMediaPathsInHtml } from 'utilities/functions'
import ContentBounds from '../Common/ContentBounds'
import { getGradient } from '../utils'
import HomepageSearchBar from './HomepageSearchBar'
import * as S from './SearchWithSocialBar.styles'
import * as C from '../Common/Layout/Layout.styles'
import { CareersSearchBlockProps } from 'components/propTypes'
import { useState } from 'react'
// interface ISearchWithSocialBar {
//   gradient: string
//   hashtag: string
//   instagramLink: string
//   linkedlnLink: string
// }

const SearchWithSocialBar = ({
	blockTitle,
	buttonUrl,
	buttonText,
	hashTagText,
	hashtagLink,
	instagramLink,
	linkedinLink,
	gradient,
}: CareersSearchBlockProps) => {
	const [isButtonHovered, setIsButtonHovered] = useState(false)
	const usedGradient = getGradient(gradient)
	return (
		<S.Wrapper gradient={usedGradient}>
			<ContentBounds>
				<C.Column size={1} />
				<C.Column size={10}>
					<S.InnerWrapper>
						<S.SectionTitleContainer>
							<S.SectionTitle>{blockTitle}</S.SectionTitle>
						</S.SectionTitleContainer>
						<S.SearchBarContainer>
							<HomepageSearchBar gradient={gradient} />
						</S.SearchBarContainer>
						<S.BottomContainer>
							<C.Column size={7}>
								<S.IconsContainer>
									<S.TextHashContainer>
										<S.TextHash>{hashTagText}</S.TextHash>
									</S.TextHashContainer>
									<S.TextWithLogoContainer href={instagramLink}>
										<S.Logo
											src={'/images/instagram-logo.svg'}
											width={24}
											height={24}
											alt="instagram logo"
										/>
										<S.LogoText>
											Follow us on{' '}
											<S.BoldedLogoText>Instagram</S.BoldedLogoText>
										</S.LogoText>
									</S.TextWithLogoContainer>
									<S.TextWithLogoContainer href={linkedinLink}>
										<S.Logo
											src={'/images/facebook.svg'}
											width={24}
											height={24}
											alt="facebook logo"
										/>
										<S.LogoText>
											Follow us on <S.BoldedLogoText>Linkedln</S.BoldedLogoText>
										</S.LogoText>
									</S.TextWithLogoContainer>
								</S.IconsContainer>
							</C.Column>
							<C.Column size={1} />
							<C.Column size={2}>
								<S.ButtonContainer
									onMouseOver={() => setIsButtonHovered(true)}
									onMouseLeave={() => setIsButtonHovered(false)}
									gradient={usedGradient}
								>
									<S.StyledAnchor
										target="_blank"
										rel="noopener noreferrer"
										href="https://diageo.wd3.myworkdayjobs.com/en-US/Diageo_Careers/jobAlerts"
										isColoured={isButtonHovered}
									>
										{buttonText}
									</S.StyledAnchor>
								</S.ButtonContainer>
							</C.Column>
						</S.BottomContainer>
					</S.InnerWrapper>
				</C.Column>
				<C.Column size={1} />
			</ContentBounds>
		</S.Wrapper>
	)
}

export default SearchWithSocialBar
