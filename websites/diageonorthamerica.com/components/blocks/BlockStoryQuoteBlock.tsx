import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, StoryQuoteBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme } from 'types'

export default function BlockStoryQuoteBlock({
	customComponent,
}: BlockProps<StoryQuoteBlockProps>) {
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
		blockImage: f.imageRefStandard('blockImage'),
		blockRichText: f.html('blockRichText'),
		quoteName: f.text('quoteName'),
		quoteJob: f.text('quoteJob'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<StoryQuoteBlockProps>(
		Block.StoryQuoteBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
