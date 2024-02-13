import React, { ReactNode } from 'react'

import Container from './Container'

type Props = {
	children: ReactNode
}

function VideoEmbedContainer({ children }: Props) {
	return (
		<section className="block-video">
			<Container className="md:mb-24 md:container-padding">
				<div className="text-gray-600">{children}</div>
			</Container>
		</section>
	)
}

export default VideoEmbedContainer
