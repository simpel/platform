import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, NPRichTextBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockNPRichTextBlock({
	customComponent,
}: BlockProps<NPRichTextBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		richText: f.html('richText'),
		fullWidth: f.boolean('fullWidth'),
	}

	return getComponent<NPRichTextBlockProps>(
		Block.NPRichTextBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
