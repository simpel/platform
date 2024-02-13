import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { type TSectionHeadingBlock } from 'components/theme/plain/SectionHeadingBlock/TSectionHeadingBlock'

export default function BlockInfoList({
	customComponent,
}: BlockProps<TSectionHeadingBlock>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')

	const props = {
		caption: f.text('caption'),
		title: f.html('title'),
		body: f.html('body'),
		hex: f.text('backgroundColor'),
	}

	return getComponent<TSectionHeadingBlock>(
		Block.SectionHeadingBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
