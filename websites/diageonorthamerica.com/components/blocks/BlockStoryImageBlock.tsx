import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, StoryImageBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockStoryImageBlock({
	customComponent,
}: BlockProps<StoryImageBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		blockImage: f.imageRefStandard('blockImage'),
		altText: f.text('altText'),
		largeSizeImage: f.boolean('largeSizeImage'),
		noImageHeightConstraint: f.boolean('noImageHeightConstraint'),
	}

	return getComponent<StoryImageBlockProps>(
		Block.StoryImageBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
