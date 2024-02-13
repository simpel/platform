import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	HistorySliderBlockProps,
	BaseCardProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { Theme, CmsLink, Image } from 'types'

export default function BlockHistorySliderBlock({
	customComponent,
}: BlockProps<HistorySliderBlockProps>) {
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
		let upperTitle = ''
		let mainTitle = ''
		let text = ''
		let link = {} as CmsLink | ''
		let image = {} as Image

		block.fields.map((el) => {
			switch (el.alias) {
				case 'upperTitle':
					upperTitle = el.text ? el.text : ''
					break
				case 'mainTitle':
					mainTitle = el.text ? el.text : ''
					break
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
				case 'link':
					link = el.link ? el.link : ''
					break
			}
		})
		return {
			date: upperTitle,
			title: mainTitle,
			text: text,
			linkCta: link,
			image: image,
		} as BaseCardProps
	})

	const props = {
		blockTitle: f.text('blockTitle'),
		richText: f.html('richText'),
		alignCentre: f.boolean('alignCentre'),
		blocks: getBlocks || [],
		// blockTheme: tmpTheme as Theme,
		blockTheme: 'theme-amber' as Theme,
	}

	return getComponent<HistorySliderBlockProps>(
		Block.HistorySliderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
