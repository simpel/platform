import {
	RichTextTitle,
	RichTextBody,
	GraphicCardsV2,
	type TGraphicCardsV2TileItem,
} from '@diageo/designsystem'
import Image from 'next/image'
import { type TGraphicCardsV2Block } from './TGraphicCardsV2Block'

const GraphicCardsV2Block = ({
	bottomImage,
	caption,
	title,
	lineBackground,
	items,
}: TGraphicCardsV2Block) => {
	const list = items.map((item) => {
		const getBlockItem = () => {
			if (!item.tileItem) return

			const tileItem: TGraphicCardsV2TileItem = {
				card: {
					...item.tileItem.card,
					theme: 'purple',
					variant: 'small',
					headline: item.tileItem.card.headline,
					description: <RichTextBody html={item.tileItem.card.description} />,
					stat: item.tileItem.card.stat
						? {
								...item.tileItem.card.stat,
								size: 'xl',
						  }
						: undefined,
				},
				image: (
					<Image
						src={item.tileItem.image.src}
						alt={item.tileItem.image.alt}
						width={480}
						height={540}
					/>
				),
				invert: item.tileItem.invert,
			}

			return tileItem
		}

		const getLineBackground = (hex: string) => {
			switch (hex) {
				case 'd9112e': {
					return 'linear-gradient(90deg, #D9112E 0.06%, #B4031D 0.07%, #FF6727 99.94%)'
				}

				default: {
					return 'linear-gradient(90deg, #0057FF 0%, #A6DFFF 100%)'
				}
			}
		}

		const textItem = {
			topText: item.textItem.topText && (
				<RichTextBody html={item.textItem.topText} />
			),
			bottomText: item.textItem.bottomText && (
				<RichTextBody html={item.textItem.bottomText} />
			),
			lineBackground: getLineBackground(lineBackground),
		}

		const tileItem = getBlockItem()

		const card = {
			textItem,
			tileItem,
		}
		return card
	})

	return (
		<GraphicCardsV2
			caption={caption}
			heading={<RichTextTitle html={title ?? ''} />}
			list={list}
			bottomImage={bottomImage.map((image, index) => (
				<Image
					key={index}
					src={image?.src}
					alt={image?.alt}
					width={780}
					height={480}
				/>
			))}
		/>
	)
}

export default GraphicCardsV2Block
