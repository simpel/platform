import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	type BlockProps,
	type BlockBrandSliderProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { getPostsByFields } from 'utilities/functions'
import { type Theme } from 'types'

export default function BlockBrandSliderBlock({
	customComponent,
}: BlockProps<BlockBrandSliderProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const theLink = f.link2('link')
	const theLinkText = f.text('linkText')

	if (
		theLinkText !== null &&
		theLinkText.length > 0 &&
		theLink?.url !== null &&
		theLink.url.length > 0
	) {
		theLink.name = theLinkText
	}

	// Console.log('----------- BlockBrandSlider -----------')
	const componentIdentifier = f.text('componentIdentifier')

	let temporaryTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			temporaryTheme = String(
				themeNode?.fields.find((m) => m.alias === 'value')?.text,
			)
		}
	}

	const posts = getPostsByFields(f.blocks('items'), page)

	const props: BlockBrandSliderProps = {
		blockTheme: temporaryTheme as Theme,
		heading: f.text('heading'),
		text: f.html('introText'),
		linkCta: theLink,
		items: posts,
	}

	return getComponent<BlockBrandSliderProps>(
		Block.BrandSliderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
