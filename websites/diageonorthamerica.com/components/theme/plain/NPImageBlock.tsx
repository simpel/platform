import React from 'react'
import { NPImageBlockProps } from '../../../components/propTypes'
import ImageBlock from './Image'

export default function NPImageBlock({
	blockImage,
	fullWidth,
}: NPImageBlockProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 600,
		heightDesk: 450,
		pureimage: true,
	}

	let sectionClass = 'flex-col-md-8 '
	if (fullWidth) {
		sectionClass = 'flex-col-md-12 '
		dimensions.widthDesk = 1000
		dimensions.heightDesk = 750
	}
	return (
		<section className="flex-container-wrapper -mb-5">
			<div className="flex-row">
				<div className={sectionClass}>
					{blockImage && (
						<ImageBlock image={blockImage} dimensions={dimensions} />
					)}
				</div>
			</div>
		</section>
	)
}
