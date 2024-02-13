import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, PRVideoBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockPRVideoBlock({
	customComponent,
}: BlockProps<PRVideoBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		videoUrl: f.text('videoUrl'),
		description: f.text('description'),
		thumbnailImage: f.imageRefStandard('thumbnailImage'),
	}

	return getComponent<PRVideoBlockProps>(
		Block.PRVideoBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
