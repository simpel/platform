import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, TitleAndRichTextProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockTitleAndRichText({
	customComponent,
}: BlockProps<TitleAndRichTextProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		heading: f.text('heading'),
		richText: f.html('richText'),
	}

	return getComponent<TitleAndRichTextProps>(
		Block.TitleAndRichText,
		props,
		componentIdentifier,
		customComponent,
	)
}
