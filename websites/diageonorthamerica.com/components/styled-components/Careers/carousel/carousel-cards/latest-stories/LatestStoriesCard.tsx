import { type StoryCardProps } from 'components/propTypes'
import * as S from './LatestStoriesCard.styles'

function LatestStoriesCard(props: StoryCardProps) {
	const { image, articleDate = '', title, tags, link } = props
	const localisedDate = new Date(articleDate)
	const localisedDateString = localisedDate.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})

	return (
		<S.Wrapper>
			<S.MediaWrapper>
				<S.StyledLink href={link?.url ?? ''}>
					<S.Media
						fill
						src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`}
						alt={image?.alt}
					/>
				</S.StyledLink>
			</S.MediaWrapper>
			<S.DateContainer>
				<S.Date>{localisedDateString}</S.Date>
			</S.DateContainer>
			<S.TextContainer>
				<S.Text>
					<S.StyledLink href={link?.url ?? ''}>{title}</S.StyledLink>
				</S.Text>
			</S.TextContainer>
			<S.TagWrapper>
				{tags &&
					tags.length > 0 &&
					tags.map((t: string, index: number) => (
						// eslint-disable-next-line react/no-array-index-key
						<S.TagContainer key={index}>
							<S.Tag>{t}</S.Tag>
						</S.TagContainer>
					))}
			</S.TagWrapper>
		</S.Wrapper>
	)
}

export default LatestStoriesCard
