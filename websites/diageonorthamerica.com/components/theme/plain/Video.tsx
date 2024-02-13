import React from 'react'
import { type VideoProps } from 'components/propTypes'
import VideoEmbedContainer from './VideoEmbedContainer'
import VideoEmbedYoutube from './VideoEmbedYoutube'
import VideoEmbedVimeo from './VideoEmbedVimeo'
import VideoPlayer from './VideoPlayer'
import Heading from './Heading'

const Video = ({ title, ytId, cmsVideo, vimeoId }: VideoProps) => {
	return (
		<>
			{title && <Heading heading={title} />}
			<VideoEmbedContainer>
				{ytId && <VideoEmbedYoutube loop videoId={ytId} />}
				{vimeoId && <VideoEmbedVimeo loop videoId={vimeoId} />}
				{cmsVideo && <VideoPlayer src={cmsVideo.url} />}
			</VideoEmbedContainer>
		</>
	)
}

export default Video
