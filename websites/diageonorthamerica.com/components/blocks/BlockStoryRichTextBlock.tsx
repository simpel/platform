import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, StoryRichTextBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme } from 'types'

export default function BlockStoryRichTextBlock({
	customComponent,
}: BlockProps<StoryRichTextBlockProps>) {
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
		blockRichText: f.html('blockRichText'),
		rightColumnText: f.html('rightColumnText'),
		layout: f.text('layout'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<StoryRichTextBlockProps>(
		Block.StoryRichTextBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
