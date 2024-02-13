import React from 'react'
import { FixMediaPathsInHtml } from 'utilities/functions'
import { TitleAndRichTextProps } from '../../../components/propTypes'

// function MediaWithTextBlock({ title, heading, text, linktext, video, image, align }: MediaWithTextBlockProps) {
function TitleAndRichText({ heading, richText }: TitleAndRichTextProps) {
	return (
		<div>
			<h6 className="aside-heading">{heading}</h6>
			<div
				dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(richText) }}
				className="relations-list rich-text-editor"
			></div>
		</div>
	)
}

export default TitleAndRichText
