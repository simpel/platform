import {
	InfoList,
	type TInfoListCard,
	RichTextTitle,
	RichTextBody,
} from '@diageo/designsystem'
import Image from 'next/image'
import { type TInfoListBlock } from './TInfoListBlock'

const InfoListBlock = ({ caption, title, items }: TInfoListBlock) => {
	const cards = items.map((item): TInfoListCard => {
		const card: TInfoListCard = {
			caption: item.title,
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
			description: item.description && <RichTextBody html={item.description} />,
		}
		return card
	})

	return (
		<InfoList
			caption={caption}
			title={<RichTextTitle html={title ?? ''} />}
			cards={cards}
		/>
	)
}

export default InfoListBlock
