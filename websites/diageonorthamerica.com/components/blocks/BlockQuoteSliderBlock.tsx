import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	QuoteSliderBlockProps,
	SimpleQuote,
} from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme, Image } from 'types'

export default function BlockQuoteSliderBlock({
	customComponent,
}: BlockProps<QuoteSliderBlockProps>) {
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

	const authorPhotoLayout = f.fields.find(
		(f) => f.alias === 'authorPhotoLayout',
	)?.boolean

	const getBlocks = f.blocks('blocks').map((block) => {
		let quoteText = '' //quoteText
		let authorName = '' //authorName
		let authorSubtitle = '' //authorSubtitle

		let blockImage = {} as Image //blockImage
		block.fields.map((el) => {
			switch (el.alias) {
				case 'authorName':
					authorName = el.text ? el.text : ''
					break
				case 'authorSubtitle':
					authorSubtitle = el.text ? el.text : ''
					break
				case 'quoteText':
					quoteText = el.html ? el.html : ''
					break

				case 'blockImage':
					if (el.mediaList && el.mediaList.length && pageMediaRef) {
						const mediaItem = el.mediaList[0]
						const elImage = pageMediaRef.filter(
							(refMedia) => refMedia._id === mediaItem._id,
						)[0]
						blockImage = {
							...elImage,
							alt: elImage && elImage.title ? elImage.title : '*',
						}
					}
					break
			}
		})
		return {
			richText: quoteText,
			author: authorName,
			author2: authorSubtitle,
			image: blockImage,
		} as SimpleQuote
	})

	const props = {
		items: getBlocks,
		flipped: f.boolean('imageOnRight'),
		blockTheme: tmpTheme as Theme,
		authorPhotoLayout: authorPhotoLayout,
	}

	// console.log('marshall', props)
	return getComponent<QuoteSliderBlockProps>(
		Block.QuoteSliderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
