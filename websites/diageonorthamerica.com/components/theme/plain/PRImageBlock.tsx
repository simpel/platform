import React from 'react'
import ImageBlock from './Image'
import { PRImageBlockProps } from '../../../components/propTypes'

// function MediaWithTextBlock({ title, heading, text, linktext, video, image, align }: PRImageBlockProps) {
export default function PRImageBlock({
	image,
	noImageHeightConstraint,
}: PRImageBlockProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 750,
		heightDesk: 450,
		pureimage: true,
	}
	if (noImageHeightConstraint) {
		dimensions.heightDesk = 0
	}
	const img_block_class = 'img_block_press_release'
	return (
		<>
			<div className={img_block_class}>
				<ImageBlock image={image} dimensions={dimensions} />
			</div>
		</>
	)
}
