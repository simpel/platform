import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, AnchorTargetBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockAnchorTargetBlock({
	customComponent,
}: BlockProps<AnchorTargetBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	const props = {
		anchorID: f.text('anchorID'),
	}

	return getComponent<AnchorTargetBlockProps>(
		Block.AnchorTargetBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
