import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, NPInsetBoxBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme } from 'types'

export default function BlockNPInsetBoxBlock({
	customComponent,
}: BlockProps<NPInsetBoxBlockProps>) {
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

	const props = {
		leftTitle: f.text('leftTitle'),
		leftRichText: f.html('leftRichText'),
		rightTitle: f.text('rightTitle'),
		rightRichText: f.html('rightRichText'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<NPInsetBoxBlockProps>(
		Block.NPInsetBoxBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
