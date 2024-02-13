import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, PRRichTextBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockPRRichTextBlock({
	customComponent,
}: BlockProps<PRRichTextBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		quoteAuthor: f.text('quoteAuthor'),
		richText: f.html('richText'),
		layout: f.text('layout'),
	}

	return getComponent<PRRichTextBlockProps>(
		Block.PRRichTextBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
