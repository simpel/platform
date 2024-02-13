import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	ProductSliderBlockProps,
	BaseCardProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { Theme, CmsLink, Image } from 'types'
import { LayoutForSliders } from '../propTypes'

export default function BlockProductSliderBlock({
	customComponent,
}: BlockProps<ProductSliderBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const pageMediaRef = page.referencedMedia
	const getBlocks = f.blocks('blocks').map((block) => {
		let title = ''
		let smallText = ''
		let link = {} as CmsLink | ''
		let image = {} as Image

		block.fields.map((el) => {
			switch (el.alias) {
				case 'title':
					title = el.text ? el.text : ''
					break
				case 'smallText':
					smallText = el.text ? el.text : ''
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
				case 'link':
					link = el.link ? el.link : ''
					break
			}
		})
		return {
			title: title,
			text: smallText,
			linkCta: link,
			image: image,
		} as BaseCardProps
	})

	const props = {
		layout: f.text('layout') as LayoutForSliders,
		richTextTitle: f.html('richTextTitle'),
		richText: f.html('richText'),
		logoImage: f.imageRefStandard('logoImage'),
		link: f.link2('link'),
		blocks: getBlocks,
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<ProductSliderBlockProps>(
		Block.ProductSliderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
