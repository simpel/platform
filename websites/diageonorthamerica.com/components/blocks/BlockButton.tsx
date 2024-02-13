import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, ButtonProps, ButtonStyle } from 'components/propTypes'
import { Block } from 'enums'

function BlockButton({ customComponent }: BlockProps<ButtonProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const style = f.text('componentClassNames')
	const props: ButtonProps = {
		url: f.link('link').url,
		title: f.link('link').name,
		text: f.text('text'),
		target: f.link('link').target,
		buttonStyle: f.text('buttonStyle') as ButtonStyle,
		otherButtonStyle: f.text('otherButtonStyle') as ButtonStyle,
		fullWidth: style?.includes('fullWidth'),
	}

	return getComponent<ButtonProps>(
		Block.Button,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockButton
