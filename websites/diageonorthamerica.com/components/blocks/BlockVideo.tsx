import { useFields } from 'context/fields'
import { BlockProps, VideoProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'

function BlockVideo({ customComponent }: BlockProps<VideoProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		title: f.text('title'),
		ytId: f.youtubeId('video'),
		vimeoId: f.vimeoId('video'),
		cmsVideo: f.mediaRef('video'),
	}

	return getComponent<VideoProps>(
		Block.Video,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockVideo
