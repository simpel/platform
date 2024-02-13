import { useFields } from 'context/fields'
import { BlockProps, TextProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'

function BlockText({ customComponent }: BlockProps<TextProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		id: componentIdentifier,
		style: f.text('componentClassNames'),
		text: f.html('text'),
	}

	return getComponent<TextProps>(
		Block.Text,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockText
