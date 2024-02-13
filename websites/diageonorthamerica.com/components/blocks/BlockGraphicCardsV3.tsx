import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import {
	type TGraphicCardsV3Block,
	type TGraphicCardsV3ListItem,
} from 'components/theme/plain/GraphicCardsV3Block/TGraphicCardsV3Block'
import { usePages } from 'context/pages'
import { html, mediaList, text } from 'lib/cms/field-utils'

export default function BlockGraphicCardsV3({
	customComponent,
}: BlockProps<TGraphicCardsV3Block>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const pageMediaRef = page.referencedMedia
	const componentIdentifier = f.text('componentIdentifier')

	const caption = f.text('caption') ?? ''
	const title = f.html('title') ?? ''
	const lineBackground = f.text('separatorColor') ?? ''

	const items = f.blocks('body').map((item): TGraphicCardsV3ListItem => {
		switch (item.contentType) {
			case 'graphicCardV3TileBlock': {
				const align = text(item.fields)('align')

				const icon = pageMediaRef.find(
					(refMedia) => refMedia._id === mediaList(item.fields)('icon')[0]?._id,
				)

				const card = {
					badge: text(item.fields)('headline'),
					stat: {
						stat: text(item.fields)('stat'),
						suffix: text(item.fields)('suffix'),
						description: text(item.fields)('subtext'),
					},
					description: html(item.fields)('description'),
					icon: {
						src:
							// eslint-disable-next-line n/prefer-global/process
							`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${icon?.url}`,
						alt: icon?.title ?? '',
					},
					color: text(item.fields)('color'),
				}

				return {
					tileItem: { card, align },
				}
			}

			case 'graphicCardV3TextAndImage': {
				const bottomText = text(item.fields)('text')
				const imageAlign = text(item.fields)('imageAlign')

				const image = pageMediaRef.find(
					(refMedia) =>
						refMedia._id === mediaList(item.fields)('image')[0]?._id,
				)

				return {
					imageAndTextItem: {
						bottomText,
						imageAlign,
						image: image && {
							src:
								// eslint-disable-next-line n/prefer-global/process
								`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
							alt: image?.title ?? '',
						},
					},
				}
			}

			default: {
				return {}
			}
		}
	})

	const props = {
		caption,
		title,
		items,
		lineBackground,
	}

	return getComponent<TGraphicCardsV3Block>(
		Block.GraphicCardsV3,
		props,
		componentIdentifier,
		customComponent,
	)
}
