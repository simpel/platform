import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import {
	EBlockContentType,
	EBlockType,
	type TContentTile,
	type TBlockTile,
	type TTilesListBlock,
	EImageAlign,
} from 'components/theme/plain/TilesListBlock/TTilesListBlock'
import { type Field } from 'types'
import { usePages } from 'context/pages'

export default function BlockTilesList({
	customComponent,
}: BlockProps<TTilesListBlock>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const pageMediaRef = page.referencedMedia
	const componentIdentifier = f.text('componentIdentifier')

	const pageImage = (field?: Field) => {
		if (field?.mediaList && field.mediaList.length > 0 && pageMediaRef) {
			const mediaItem = field.mediaList[0]
			const image = pageMediaRef.find(
				(refMedia) => refMedia._id === mediaItem._id,
			)

			return {
				// eslint-disable-next-line n/prefer-global/process
				src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
				alt: image?.title ?? '',
			}
		}
	}

	const items = f.blocks('body').map((item): TBlockTile | TContentTile => {
		const field = (alias: string, f?: Field): Field | undefined => {
			if (f) {
				return f.blocks
					?.find((m) => m.fields.find((a) => a.alias === alias))
					?.fields.find((m) => m.alias === alias)
			}

			return item.fields.find((m) => m.alias === alias)
		}

		if (item.contentType === 'tileListTileBlock') {
			return {
				type: EBlockType.BlockTile,
				headline: field('headline')?.text,
				amount: field('stat')?.text,
				unit: field('suffix')?.text,
				subText: field('subtext')?.text,
				description: field('description')?.html,
				icon: pageImage(field('icon')),
				image: pageImage(field('image')),
				color: field('color')?.text,
			}
		}

		return {
			type: EBlockType.ContentTile,
			image: pageImage(field('image')),
			items: field('text')?.blocks?.map((textItem) => {
				if (textItem.contentType === 'tileText') {
					return {
						type: EBlockContentType.Text,
						topText: textItem.fields.find((m) => m.alias === 'topText')?.html,
						bottomText: textItem.fields.find((m) => m.alias === 'bottomText')
							?.html,
					}
				}

				return {
					type: EBlockContentType.Quote,
					quote: textItem.fields.find((m) => m.alias === 'topText')?.html,
					author: textItem.fields.find((m) => m.alias === 'author')?.html,
					topic: textItem.fields.find((m) => m.alias === 'topic')?.text,
				}
			}),
		}
	})

	const props = {
		caption: f.text('caption') ?? '',
		title: f.html('title') ?? '',
		imageAlign:
			f.text('imageAlign').toLowerCase() === 'right'
				? EImageAlign.Right
				: EImageAlign.Left,
		splitterColor: f.text('splitterColor') ?? '',
		backgroundColor: f.text('backgroundColor') ?? '',
		bottomColor: f.text('bottomColor') ?? '',
		items,
	}

	return getComponent<TTilesListBlock>(
		Block.TilesList,
		props,
		componentIdentifier,
		customComponent,
	)
}
