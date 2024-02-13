import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, StoryVideoBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockStoryVideoBlock({
	customComponent,
}: BlockProps<StoryVideoBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		videoUrl: f.text('videoUrl'),
		description: f.text('description'),
		thumbnailImage: f.imageRefStandard('thumbnailImage'),
	}

	return getComponent<StoryVideoBlockProps>(
		Block.StoryVideoBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
