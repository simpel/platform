import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import { FixMediaPathsInHtml } from 'utilities/functions'
import * as S from './WhyJoinUsCard.styles'
import * as C from '../../../../Common/Layout/Layout.styles'
import { useMediaQuery } from 'react-responsive'
import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'
import { CmsLink } from 'types'

export interface IWhyJoinUsCardProps {
	gradient: string
	title: string
	text: string
	itemLink?: CmsLink
	imageSrc: string
	imageAlt: string
	quote?: string
	personName?: string
	personPosition?: string
	personSrc: string
	personSrcAlt: string
}

const WhyJoinUsCard = ({
	title,
	text,
	itemLink,
	gradient,
	imageSrc,
	quote,
	personName,
	personPosition,
	personSrc,
	imageAlt,
	personSrcAlt,
}: IWhyJoinUsCardProps) => {
	const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
	return (
		<S.Wrapper>
			<S.TopSpace />
			<S.Content>
				<S.LayoutWrapper>
					<LayoutV2
						background={{
							gradient,
						}}
					>
						<S.InnerBackground />
					</LayoutV2>
				</S.LayoutWrapper>
				<S.Columns>
					{isDesktop && (
						<C.Column size={5}>
							<S.LeftContentWrapper>
								<C.Column size={1} />
								<C.Column size={3.5}>
									<S.LeftContent>
										<S.MainTitle
											dangerouslySetInnerHTML={{
												__html: FixMediaPathsInHtml(title),
											}}
										/>
										<S.MainDescription
											dangerouslySetInnerHTML={{
												__html: FixMediaPathsInHtml(text),
											}}
										/>
										{itemLink && (
											<S.ButtonContainer>
												<LinkHelper4 link={itemLink} linkText={itemLink.name} />
											</S.ButtonContainer>
										)}
									</S.LeftContent>
								</C.Column>
								<C.Column size={1} />
							</S.LeftContentWrapper>
						</C.Column>
					)}
					<C.Column size={3.125}>
						<S.RightContent>
							<S.ImageWrapper>
								<S.MainImage src={imageSrc} layout="fill" alt={imageAlt} />
							</S.ImageWrapper>
							{!isDesktop && (
								<S.MobileLeftContentContainer>
									<S.MainTitle
										dangerouslySetInnerHTML={{
											__html: FixMediaPathsInHtml(title),
										}}
									/>
									<S.MainDescription
										dangerouslySetInnerHTML={{
											__html: FixMediaPathsInHtml(text),
										}}
									/>
									{itemLink && (
										<S.ButtonContainer>
											<LinkHelper4 link={itemLink} linkText={itemLink.name} />
										</S.ButtonContainer>
									)}
								</S.MobileLeftContentContainer>
							)}
							{quote && isDesktop && (
								<S.Text
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(quote),
									}}
								/>
							)}
							{personSrc && personName && personPosition && isDesktop && (
								<S.HumanContainer>
									<S.HumanAvatarContainer>
										<S.HumanAvatar
											src={personSrc}
											layout="fill"
											alt={personSrcAlt}
										/>
									</S.HumanAvatarContainer>
									<S.HumanDetailsContainer>
										<S.HumanNameContainer>
											<S.HumanName
												dangerouslySetInnerHTML={{
													__html: FixMediaPathsInHtml(personName),
												}}
											/>
										</S.HumanNameContainer>
										<S.HumanPositionContainer>
											<S.HumanPosition
												dangerouslySetInnerHTML={{
													__html: FixMediaPathsInHtml(personPosition),
												}}
											/>
										</S.HumanPositionContainer>
									</S.HumanDetailsContainer>
								</S.HumanContainer>
							)}
						</S.RightContent>
					</C.Column>
					<C.Column size={0.5} />
				</S.Columns>
			</S.Content>

			<S.BottomSpace />
		</S.Wrapper>
	)
}

export default WhyJoinUsCard
