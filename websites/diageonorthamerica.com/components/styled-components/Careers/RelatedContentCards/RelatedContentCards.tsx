import ContentBounds from 'components/styled-components/Common/ContentBounds'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import { FixMediaPathsInHtml } from 'utilities/functions'
import LinkHelper from 'components/theme/plain/custom/LinkHelper'
import * as S from './RelatedContentCards.styles'
import * as C from '../../Common/Layout/Layout.styles'
import { getGradient } from 'components/styled-components/utils'
import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'

export interface IRelatedContentSingleCard {
	itemLink: any
	description: string
	imageSrc: string
	imageAlt: string
	title: string
}

export interface IRelatedContentCards {
	title: string
	gradient: string
	cards: IRelatedContentSingleCard[]
}

const RelatedContentCards = (props: IRelatedContentCards) => {
	const { title, cards = [], gradient } = props

	const visibleCards = cards.slice(0, 3)
	const usedGradient = getGradient(gradient)
	return (
		<LayoutV2>
			<ContentBounds>
				<S.Wrapper>
					<C.Column size={1}>
						<S.TitleContainer>
							<S.Title
								dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(title) }}
							/>
						</S.TitleContainer>
					</C.Column>
					<C.Column size={3}>
						<S.CardsContainer>
							{visibleCards.map(
								(
									{ itemLink, description, imageSrc, title, imageAlt },
									index,
								) => (
									<S.Card key={index}>
										<S.CardImageContainer>
											<S.CardImage src={imageSrc} fill alt={imageAlt} />
										</S.CardImageContainer>
										<S.CardContent gradient={usedGradient}>
											<S.CardTitleContainer>
												<S.CardTitle
													dangerouslySetInnerHTML={{
														__html: FixMediaPathsInHtml(title),
													}}
												/>
											</S.CardTitleContainer>
											<S.CardDescriptionContainer>
												<S.CardDescription
													dangerouslySetInnerHTML={{
														__html: FixMediaPathsInHtml(description),
													}}
												/>
											</S.CardDescriptionContainer>
											{itemLink && (
												<LinkHelper4 link={itemLink} linkText={itemLink.name} />
											)}
										</S.CardContent>
									</S.Card>
								),
							)}
						</S.CardsContainer>
					</C.Column>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default RelatedContentCards
