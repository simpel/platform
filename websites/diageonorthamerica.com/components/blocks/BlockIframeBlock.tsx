import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, IframeBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockIframeBlock({
	customComponent,
}: BlockProps<IframeBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		iframeTitle: f.text('iframeTitle'),
		iframeUrl: f.text('iframeUrl'),
		fullWidth: f.boolean('fullWidth'),
		frameHeight: f.text('frameHeight'),
	}

	return getComponent<IframeBlockProps>(
		Block.IframeBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
