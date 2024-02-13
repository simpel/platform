import React from 'react'
import { stringify } from 'querystring'

type Props = {
	videoId: string
	loop?: boolean
	autoplay?: boolean
}

function VideoEmbedVimeo({ videoId, loop, autoplay }: Props) {
	if (!videoId) return null
	const params = {
		loop: loop ? 1 : 0,
		autoplay: autoplay ? 1 : 0,
		portrait: 0,
		title: 0,
		byline: 0,
		responsive: 1,
		controls: 1,
	}
	return (
		<div className="aspect-w-16 aspect-h-9">
			<iframe
				src={`https://player.vimeo.com/video/${videoId}?${stringify(params)}`}
				frameBorder="0"
				allowFullScreen
				allow="autoplay; fullscreen; picture-in-picture"
				title="video"
			></iframe>
		</div>
	)
}

export default VideoEmbedVimeo
