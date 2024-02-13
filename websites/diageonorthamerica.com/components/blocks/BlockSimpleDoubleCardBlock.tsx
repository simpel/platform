import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, SimpleDoubleCardBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme } from 'types'

export default function BlockSimpleDoubleCardBlock({
	customComponent,
}: BlockProps<SimpleDoubleCardBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const [{ page }] = usePages()

	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const props = {
		leftImage: f.imageRefStandard('leftImage'),
		leftTitle: f.text('leftTitle'),
		leftRichText: f.html('leftRichText'),
		leftLinkText: f.text('leftLinkText'),
		leftLink: f.link2('leftLink'),
		rightImage: f.imageRefStandard('rightImage'),
		rightTitle: f.text('rightTitle'),
		rightRichText: f.html('rightRichText'),
		rightLinkText: f.text('rightLinkText'),
		rightLink: f.link2('rightLink'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<SimpleDoubleCardBlockProps>(
		Block.SimpleDoubleCardBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
