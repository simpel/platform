import ContentBounds from 'components/styled-components/Common/ContentBounds'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import LinkHelper from 'components/theme/plain/custom/LinkHelper'
import * as S from './LandingBlocks.styles'
import * as C from '../../Common/Layout/Layout.styles'
import { LocationsLandingBlockProps } from 'components/propTypes'
import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'
import { CmsLink } from 'types'

// interface ILocation {
//   itemLink: CmsLink
// }

// export interface LandingBlockProps {
//   name: string
//   description: string
//   imageSrc: string
//   imageAlt: string
//   locations: ILocation[]
// }

const LandingBlocks = (props: LocationsLandingBlockProps) => {
	const { blockTitle, blockRichText, blockImage, linksTitle, blockLinks } =
		props

	// console.log('mhp', { blockLinks })

	return (
		<LayoutV2>
			<ContentBounds>
				<S.Wrapper>
					{/* <C.Column size={1} /> */}
					<C.Column size={5}>
						<S.TitleContainer>
							<S.Title>{blockTitle}</S.Title>
						</S.TitleContainer>
						<S.DescriptionContainer>
							<S.Description
								dangerouslySetInnerHTML={{ __html: blockRichText }}
							></S.Description>
						</S.DescriptionContainer>
						<S.LocationsWrapper>
							<S.LocationTitleContainer>
								<S.LocationText>{linksTitle}</S.LocationText>
							</S.LocationTitleContainer>
							<S.LocationsContainer>
								{blockLinks &&
									blockLinks.length > 0 &&
									blockLinks.map((l, index: number) => (
										<S.SingleLocationContainer key={index}>
											<LinkHelper4
												link={l.itemLink}
												linkText={l.itemLink.name}
											/>
										</S.SingleLocationContainer>
									))}
							</S.LocationsContainer>
						</S.LocationsWrapper>
					</C.Column>
					<C.Column size={1} />
					<C.Column size={5}>
						<S.ImageWrapper>
							<S.StyledImage
								src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${blockImage?.url}`}
								fill
								alt={blockImage?.alt}
							/>
						</S.ImageWrapper>
					</C.Column>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default LandingBlocks
