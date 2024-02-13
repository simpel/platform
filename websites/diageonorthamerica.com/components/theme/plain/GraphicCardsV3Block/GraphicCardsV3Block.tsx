import {
	RichTextTitle,
	GraphicCardsV3,
	type TGraphicCardsV3ListItem,
	type TGraphicCardTheme,
	RichTextBody,
} from '@diageo/designsystem'
import Image from 'next/image'
import { type TGraphicCardsV3Block } from './TGraphicCardsV3Block'

const GraphicCardsV3Block = ({
	caption,
	title,
	lineBackground,
	items,
}: TGraphicCardsV3Block) => {
	const list = items.map((item): TGraphicCardsV3ListItem => {
		if (item.tileItem) {
			const getCardTheme = (): TGraphicCardTheme => {
				switch (item.tileItem?.card.color) {
					case 'daeed6': {
						return 'green'
					}

					case 'f0dff6': {
						return 'purple'
					}

					default: {
						return 'purple'
					}
				}
			}

			return {
				tileItem: {
					card: {
						...item.tileItem.card,
						theme: getCardTheme(),
						variant: 'small',
						description: <RichTextBody html={item.tileItem.card.description} />,
						stat: { ...item.tileItem.card.stat, size: 'xl' },
					},
					align: item.tileItem.align.toLowerCase() as 'left' | 'right',
				},
			}
		}

		const getLineBackground = (hex: string) => {
			switch (hex) {
				// TODO - implement the rest of the colors

				default: {
					return 'linear-gradient(270deg, #92C37D 15.24%, #449436 75.13%)'
				}
			}
		}

		if (item.imageAndTextItem) {
			return {
				imageAndTextItem: {
					topText: item.imageAndTextItem.topText && (
						<RichTextBody html={item.imageAndTextItem.topText} />
					),
					bottomText: item.imageAndTextItem.bottomText && (
						<RichTextBody html={item.imageAndTextItem.bottomText} />
					),
					lineBackground: getLineBackground(lineBackground),
					imageAlign: item.imageAndTextItem.imageAlign as 'left' | 'right',
					image: item.imageAndTextItem.image && (
						<Image
							src={item.imageAndTextItem.image?.src ?? ''}
							alt={item.imageAndTextItem.image?.alt ?? ''}
							width={330}
							height={480}
						/>
					),
				},
			}
		}

		return {}
	})

	return (
		<GraphicCardsV3
			caption={caption}
			heading={<RichTextTitle html={title ?? ''} />}
			list={list}
		/>
	)
}

export default GraphicCardsV3Block
