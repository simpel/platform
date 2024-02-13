import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	DoubleCarouselBlockProps,
	DoubleCarouselItem,
} from 'components/propTypes'
import { Block } from 'enums'
import { Theme, CmsLink, Image } from 'types'
import { usePages } from 'context/pages'

export default function BlockDoubleCarouselBlock({
	customComponent,
}: BlockProps<DoubleCarouselBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	// todo: handle gradients and themes
	let tmpTheme = 'EVP-Grad-06'

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	let image = {} as Image
	let llink = {} as CmsLink

	const pageMediaRef = page.referencedMedia

	const getBlocks = f.blocks('blocks').map((fig) => {
		fig.fields.map((el) => {
			switch (el.alias) {
				case 'itemImage':
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
				case 'itemLink':
					if (el.link) {
						llink = el.link
					}
					break
			}
		})
		return {
			itemImage: image,
			itemLink: llink,
		} as DoubleCarouselItem
	})

	const props = {
		blocks: getBlocks,
		blockLink: f.link2('blockLink'),
		richTextTitle: f.html('richTextTitle'),
		rightRichText: f.html('rightRichText'),
		gradient: tmpTheme,
	}

	return getComponent<DoubleCarouselBlockProps>(
		Block.DoubleCarouselBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
