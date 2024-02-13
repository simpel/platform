import Image from 'next/image'
import {
	ImageInfoList,
	OverlinedContent,
	RichTextTitle,
	RichTextBody,
} from '@diageo/designsystem'
import { type TImageInfoListItem } from '@diageo/designsystem'
import { type TImageInfoListBlock } from './TImageInfoListBlock'

const ImageInfoListBlock = ({
	heading,
	quote,
	image,
	items,
}: TImageInfoListBlock) => {
	const cards = items.map((item): TImageInfoListItem => {
		const card: TImageInfoListItem = {
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
		<ImageInfoList
			heading={<RichTextTitle html={heading} />}
			quote={
				quote && (
					<OverlinedContent lineBackground="linear-gradient(90deg, #D9112E 0.06%, #B4031D 0.07%, #FF6727 99.94%)">
						<RichTextBody html={quote} />
					</OverlinedContent>
				)
			}
			cards={cards}
			background="linear-gradient(350deg, #FFF 39.56%, #FFF1CD 78.47%, #FDD498 95.77%)"
		>
			<Image
				src={image.url ?? ''}
				alt={image.alt ?? ''}
				width={580}
				height={400}
			/>
		</ImageInfoList>
	)
}

export default ImageInfoListBlock
