import ContentBounds from 'components/styled-components/Common/ContentBounds'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import LinkHelper from 'components/theme/plain/custom/LinkHelper'
import { type DoubleCarouselBlockProps } from 'components/propTypes'
import LinkHelper4 from 'components/theme/plain/custom/LinkHelper4'
import BusinessArea from '../BusinessArea/BusinessArea'
import * as S from './BusinessAreaCards.styles'

function BusinessAreaCards(props: DoubleCarouselBlockProps) {
	const {
		gradient,
		richTextTitle,
		rightRichText,
		blockLink,
		blocks,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		useCarousel,
	} = props

	if (useCarousel) {
		const blocksCarousel = blocks.map((block) => ({
			itemImage: block.image,
			itemLink: block.itemLink,
			isCarousel: block.isCarousel,
			itemText: block.itemText,
		}))

		return (
			<BusinessArea
				gradient={gradient}
				richTextTitle={richTextTitle}
				rightRichText={rightRichText}
				blockLink={blockLink}
				blocks={blocksCarousel}
			/>
		)
	}

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
					<S.BodyContent>
						<S.CardsList>
							{blocks.map(({ pageLink, itemText, image, title }, index) => (
								// eslint-disable-next-line react/no-array-index-key
								<S.Card key={index}>
									<S.CardImageContainer>
										<S.CardImage
											fill
											src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`}
											alt={image?.alt}
										/>
									</S.CardImageContainer>
									<S.CardContent>
										{pageLink && (
											<LinkHelper
												skipMargin
												url={pageLink}
												name={title ?? ''}
											/>
										)}
										<S.CardText
											dangerouslySetInnerHTML={{ __html: itemText }}
										/>
									</S.CardContent>
								</S.Card>
							))}
						</S.CardsList>
					</S.BodyContent>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default BusinessAreaCards
