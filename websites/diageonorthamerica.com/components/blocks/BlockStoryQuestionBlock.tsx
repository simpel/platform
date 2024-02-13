import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	type BlockProps,
	type StoryQuestionBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'

export default function BlockStoryQuestionBlock({
	customComponent,
}: BlockProps<StoryQuestionBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')

	let theme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			theme = String(themeNode?.fields.find((m) => m.alias === 'value')?.text)
		}
	}

	const props = {
		questionRichText: f.html('questionRichText'),
		gradient: theme,
	}

	return getComponent<StoryQuestionBlockProps>(
		Block.StoryQuestionBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
