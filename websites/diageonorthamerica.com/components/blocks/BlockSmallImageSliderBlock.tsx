import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	SmallImageSliderBlockProps,
	SmallImageProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { Image as ImageType } from 'types'

export default function BlockSmallImageSliderBlock({
	customComponent,
}: BlockProps<SmallImageSliderBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const pageMediaRef = page.referencedMedia
	const componentIdentifier = f.text('componentIdentifier')

	//   let tmpTheme = ''

	//   if (page.referencedContent) {
	//     const themeNode = page.referencedContent.find((m) => m._id === f.content('blockTheme')?._id)
	//     if (themeNode) {
	//       tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
	//     }
	//   }

	const getBlocks = f.blocks('blocks').map((block) => {
		let image = {} as ImageType
		let text = ''

		block.fields.map((el) => {
			switch (el.alias) {
				case 'richText':
					text = el.html ? el.html : ''
					break
				case 'image':
					if (el.mediaList && el.mediaList.length && pageMediaRef) {
						const mediaItem = el.mediaList[0]
						const elImage = pageMediaRef.filter(
							(refMedia) => refMedia._id === mediaItem._id,
						)[0]
						image = {
							...elImage,
							alt: elImage && elImage.title ? elImage.title : '*',
						}
					}
					break
			}
		})
		return {
			image: image,
			richText: text,
		} as SmallImageProps
	})

	const props = {
		blocks: getBlocks || [],
	}

	return getComponent<SmallImageSliderBlockProps>(
		Block.SmallImageSliderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
