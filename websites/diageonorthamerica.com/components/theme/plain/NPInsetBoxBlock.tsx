import React from 'react'
import { FixMediaPathsInHtml } from 'utilities/functions'
import { NPInsetBoxBlockProps } from '../../../components/propTypes'

export default function NPInsetBoxBlock({
	leftTitle,
	leftRichText,
	rightTitle,
	rightRichText,
	blockTheme,
}: NPInsetBoxBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	let sectionClass =
		'rich-text-editor stay_aligned_card rte-themed p--l ' + cleanTheme

	leftRichText = FixMediaPathsInHtml(leftRichText ? leftRichText : '')
	rightRichText = FixMediaPathsInHtml(rightRichText ? rightRichText : '')

	if (cleanTheme === '' || cleanTheme === 'theme-white') {
		sectionClass = 'rich-text-editor ' + cleanTheme
	}
	if (rightTitle && rightTitle.length) {
		return (
			<section className="flex-container-wrapper -mb-5 ">
				<div className="flex-row">
					<div className="flex-col-md-4 stay_aligned_card_wrapper ">
						<div className={sectionClass}>
							{leftTitle && leftTitle.length > 0 && <h5>{leftTitle}</h5>}
							{/* Marsh can I remove leftTitle? it can be used within the RTE*/}
							<div dangerouslySetInnerHTML={{ __html: leftRichText }}></div>
						</div>
					</div>
					<div className="flex-col-md-4 stay_aligned_card_wrapper ">
						<div className={sectionClass}>
							{rightTitle && rightTitle.length > 0 && <h5>{rightTitle}</h5>}
							{/* Marsh can I remove rightTitle? it can be used within the RTE*/}
							<div dangerouslySetInnerHTML={{ __html: rightRichText }}></div>
						</div>
					</div>
				</div>
			</section>
		)
	} else {
		return (
			<section className="flex-container-wrapper -mb-5">
				<div className="flex-row">
					<div className="flex-col-md-8">
						<div className={sectionClass}>
							{leftTitle && leftTitle.length > 0 && <h5>{leftTitle}</h5>}
							{/* Marsh can I remove rightTitle? it can be used within the RTE*/}
							<div dangerouslySetInnerHTML={{ __html: leftRichText }}></div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}
