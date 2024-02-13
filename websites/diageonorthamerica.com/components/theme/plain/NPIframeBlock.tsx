import React from 'react'
import { NPIframeBlockProps } from '../../../components/propTypes'

export default function NPIframeBlock({
	iframeTitle,
	iframeUrl,
	fullWidth,
	frameHeight,
}: NPIframeBlockProps) {
	let sectionClass = 'flex-col-md-8 '
	const iframeClass = 'iframe ' + frameHeight

	if (fullWidth) {
		sectionClass = 'flex-col-md-12 '
	}

	return (
		<section className="flex-container-wrapper -mb-5">
			<div className="flex-row">
				<div className={sectionClass}>
					<iframe
						className={iframeClass}
						src={iframeUrl}
						title={iframeTitle}
					></iframe>
				</div>
			</div>
		</section>
	)
}
