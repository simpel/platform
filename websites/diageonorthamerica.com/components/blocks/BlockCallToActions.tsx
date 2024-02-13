import { useFields } from 'context/fields'
import { getComponent, renderBlocks } from 'components'
import { BlockProps, CallToActionsProps } from 'components/propTypes'
import { Block } from 'enums'

function BlockCallToActions({
	customComponent,
}: BlockProps<CallToActionsProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const buttons = renderBlocks(f.blocks('buttons'))
	const props = { buttons }

	return getComponent<CallToActionsProps>(
		Block.CallToActions,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockCallToActions
