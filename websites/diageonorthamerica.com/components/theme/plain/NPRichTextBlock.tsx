import React from 'react'
import { FixMediaPathsInHtml } from 'utilities/functions'
import { NPRichTextBlockProps } from '../../../components/propTypes'

export default function NPRichTextBlock({
	richText,
	fullWidth,
	blockTheme,
}: NPRichTextBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	let sectionClass = 'flex-col-md-8 '
	if (fullWidth) {
		sectionClass = 'flex-col-md-12 '
	}
	// no theme no padding p--l
	let sectionClassColour = 'rich-text-editor rte-themed p--l ' + cleanTheme

	if (cleanTheme === '' || cleanTheme === 'theme-white') {
		sectionClassColour = 'rich-text-editor ' + cleanTheme
	}
	return (
		<section className="flex-container-wrapper -mb-5">
			<div className="flex-row">
				<div className={sectionClass}>
					<div
						className={sectionClassColour}
						dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(richText) }}
					></div>
				</div>
			</div>
		</section>
	)
}
