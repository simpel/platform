import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, PRImageBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockPRImageBlock({
	customComponent,
}: BlockProps<PRImageBlockProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		image: f.imageRefStandard('blockImage', 'altText'),
		noImageHeightConstraint: f.boolean('noImageHeightConstraint'),
	}

	return getComponent<PRImageBlockProps>(
		Block.PRImageBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
