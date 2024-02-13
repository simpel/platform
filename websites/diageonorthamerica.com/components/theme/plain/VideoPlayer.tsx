import React from 'react'

type Props = {
	src?: string
	controls?: boolean
	loop?: boolean
	muted?: boolean
	autoPlay?: boolean
	vidSize?: string
	style?: any
}

function VideoPlayer({
	src,
	controls,
	loop,
	muted,
	autoPlay,
	vidSize,
	style,
}: Props) {
	return (
		<video
			className={vidSize}
			src={src}
			controls={controls}
			loop={loop}
			muted={muted}
			autoPlay={autoPlay}
			playsInline
			style={style}
			aria-hidden="true"
		/>
	)
}

export default VideoPlayer
