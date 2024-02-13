import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, LargeHeadingBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockLargeHeadingBlock({
	customComponent,
}: BlockProps<LargeHeadingBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		richTextHeading: f.html('richTextHeading'),
	}

	return getComponent<LargeHeadingBlockProps>(
		Block.LargeHeadingBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
