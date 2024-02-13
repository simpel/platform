import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, NPIframeBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockNPIframeBlock({
	customComponent,
}: BlockProps<NPIframeBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		iframeTitle: f.text('iframeTitle'),
		iframeUrl: f.text('iframeUrl'),
		fullWidth: f.boolean('fullWidth'),
		frameHeight: f.text('frameHeight'),
	}

	return getComponent<NPIframeBlockProps>(
		Block.NPIframeBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
