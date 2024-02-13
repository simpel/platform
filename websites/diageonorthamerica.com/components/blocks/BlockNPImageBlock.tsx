import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, NPImageBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockNPImageBlock({
	customComponent,
}: BlockProps<NPImageBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		caption: f.text('caption'),
		blockImage: f.imageRefStandard('blockImage'),
		fullWidth: f.boolean('fullWidth'),
	}

	return getComponent<NPImageBlockProps>(
		Block.NPImageBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
