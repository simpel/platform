import {
	type TCardListItem,
	RichTextTitle,
	RichTextBody,
	CardList,
} from '@diageo/designsystem'
import Image from 'next/image'
import { type TCardListBlock } from './TCardListBlock'

const CardListBlock = ({ title, body, items }: TCardListBlock) => {
	const cards = items.map((item): TCardListItem => {
		const card: TCardListItem = {
			heading: <RichTextTitle html={item.title ?? ''} />,
			description: item.body && <RichTextBody html={item.body} />,
			background: `linear-gradient(180deg, #${
				item.hex ?? 'black'
			} 0.3%, #FFF 94.83%)`,
			image: (
				<Image
					src={item.image?.src ?? ''}
					alt={item.image?.alt ?? ''}
					width={96}
					height={96}
					style={{
						objectFit: 'cover',
						width: '100%',
						height: '100%',
						objectPosition: 'center',
					}}
				/>
			),
		}
		return card
	})

	return (
		<CardList
			title={<RichTextTitle html={title ?? ''} />}
			body={body && <RichTextBody html={body} />}
			cards={cards}
		/>
	)
}

export default CardListBlock
