import React from 'react'
import { IframeBlockProps } from '../../../components/propTypes'

export default function IframeBlock({
	iframeTitle,
	iframeUrl,
	fullWidth,
	frameHeight,
}: IframeBlockProps) {
	let iframeClass = 'flex-col-md-6 iframe ' + frameHeight

	if (fullWidth) {
		iframeClass = 'flex-col-md-6 iframe ' + frameHeight
		return (
			<section className="content-block">
				<div className="offset-bg"></div>
				<div className="block-banner">
					<div className="container--profile-banner-wide p--s flex-row">
						<iframe
							className={iframeClass}
							src={iframeUrl}
							title={iframeTitle}
						></iframe>
					</div>
				</div>
			</section>
		)
	} else {
		iframeClass = 'flex-col-md-8 iframe ' + frameHeight
		return (
			<section className="content-block">
				<div className="offset-bg"></div>
				<div className="block-banner">
					<div className="container--profile-banner-wide p--s flex-row flex-row--align-v-top flex-row--align-h-center">
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
}
