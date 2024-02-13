import React from 'react'
import { FixMediaPathsInHtml } from 'utilities/functions'
import { StandardTextBlockProps } from '../../../components/propTypes'

export default function StandardTextBlock({
	richText,
	blockTheme,
}: StandardTextBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	const sectionClass =
		'-pt-5 bg_colour_default flex-row flex-row--align-v-top flex-row--align-h-center ' +
		cleanTheme
	// sd-width= 672px WIDTH
	return (
		<section className="flex-container-wrapper sd-width">
			<div className={sectionClass}>
				<div className="flex-col-md-7">
					<div
						className="rich-text-editor"
						dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(richText) }}
					></div>
				</div>
			</div>
		</section>
	)
}
