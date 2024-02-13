import React from 'react'
import { Image as ImageType } from '../../../types'

import Image from '../plain/Image'

type ImageGridGalleryProps = {
	images: ImageType[]
}

function DImageGridGallery({ images }: ImageGridGalleryProps) {
	return (
		<div className="grid-image-gallery">
			{images &&
				images.map((image, key) => (
					<div key={key} className="grid-image-gallery__item">
						<Image image={image} />
					</div>
				))}
		</div>
	)
}

export default DImageGridGallery
