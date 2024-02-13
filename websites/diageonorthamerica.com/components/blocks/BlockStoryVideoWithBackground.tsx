import { getComponent } from 'components'
import { Block } from 'enums'
import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { type TStoryVideoWithBackground } from 'components/theme/plain/StoryVideoWithBackground'

export default function BlockStoryVideoWithBackground({
	customComponent,
}: BlockProps<TStoryVideoWithBackground>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	const props: TStoryVideoWithBackground = {
		videoUrl: f.text('videoUrl'),
		caption: f.text('caption'),
		background: f.text('background'),
		title: f.html('title'),
		image: f.imageRefStandard('thumbnailImage'),
	}

	return getComponent(
		Block.StoryVideoWithBackground,
		props,
		componentIdentifier,
		customComponent,
	)
}
