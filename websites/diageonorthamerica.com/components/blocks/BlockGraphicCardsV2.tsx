import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import {
	type TGraphicCardsV2Block,
	type TGraphicCardsV2ListItem,
	type TGraphicCardsV2TileItem,
} from 'components/theme/plain/GraphicCardsV2Block/TGraphicCardsV2Block'
import { blocks, boolean, html, mediaList, text } from 'lib/cms/field-utils'
import { usePages } from 'context/pages'

export default function BlockGraphicCardsV2({
	customComponent,
}: BlockProps<TGraphicCardsV2Block>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const pageMediaRef = page.referencedMedia
	const componentIdentifier = f.text('componentIdentifier')

	const caption = f.text('caption') ?? ''
	const title = f.html('title') ?? ''
	const lineBackground = f.text('separatorColor') ?? ''

	const bottomImage = mediaList(f.fields)('image').map((c) => {
		const mediaRef = page.referencedMedia?.find((m) => c && m._id === c._id)

		return {
			src:
				// eslint-disable-next-line n/prefer-global/process
				`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${mediaRef?.url}`,
			alt: mediaRef?.title ?? '',
		}
	})

	const items = f.blocks('list').map((item): TGraphicCardsV2ListItem => {
		const topText = html(item.fields)('text')
		const bottomText = html(item.fields)('bottomText')

		const getTileItem = (): TGraphicCardsV2TileItem | undefined => {
			const cardBlock = blocks(item.fields)('card')

			if (!cardBlock || cardBlock.length === 0) return

			const icon = pageMediaRef.find(
				(refMedia) =>
					refMedia._id === mediaList(cardBlock[0].fields)('icon')[0]._id,
			)

			const image = pageMediaRef.find(
				(refMedia) =>
					refMedia._id === mediaList(cardBlock[0].fields)('image')[0]._id,
			)

			const stat = text(cardBlock[0].fields)('stat')

			const tileItem = {
				card: {
					badge: text(cardBlock[0].fields)('headline'),
					stat: stat
						? {
								stat,
								suffix: text(cardBlock[0].fields)('suffix'),
								description: text(cardBlock[0].fields)('subtext'),
						  }
						: undefined,
					description: html(cardBlock[0].fields)('description'),
					headline: text(cardBlock[0].fields)('title'),
					icon: {
						src:
							// eslint-disable-next-line n/prefer-global/process
							`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${icon?.url}`,
						alt: icon?.title ?? '',
					},
				},
				image: {
					src:
						// eslint-disable-next-line n/prefer-global/process
						`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
					alt: image?.title ?? '',
				},
				invert: boolean(cardBlock[0].fields)('invert'),
			}

			return tileItem
		}

		const textItem = {
			topText,
			bottomText,
		}
		const tileItem = getTileItem()

		return {
			textItem,
			tileItem,
		}
	})

	const props = {
		caption,
		title,
		items,
		bottomImage,
		lineBackground,
	}

	return getComponent<TGraphicCardsV2Block>(
		Block.GraphicCardsV2,
		props,
		componentIdentifier,
		customComponent,
	)
}
