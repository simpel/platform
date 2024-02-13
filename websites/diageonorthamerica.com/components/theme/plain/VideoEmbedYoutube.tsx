import { stringify } from 'querystring'
import React from 'react'

type Props = {
	readonly videoId: string
	readonly loop?: boolean
	readonly autoplay?: boolean
}

const VideoEmbedYoutube = ({ videoId, loop, autoplay }: Props) => {
	if (!videoId) return null
	const parameters = {
		modestbranding: 1,
		loop: loop ? 1 : 0,
		autoplay: autoplay ? 1 : 0,
		rel: 0,
		enablejsapi: 1,
	}
	return (
		<div className="aspect-w-16 aspect-h-9">
			{/* eslint-disable-next-line react/iframe-missing-sandbox */}
			<iframe
				allowFullScreen
				src={`https://www.youtube.com/embed/${videoId}?${stringify(
					parameters,
				)}`}
				title="video"
			/>
		</div>
	)
}

export default VideoEmbedYoutube
