import React from 'react'
import { FixMediaPathsInHtml } from 'utilities/functions'
import { StoryRichTextBlockProps } from '../../../components/propTypes'

export default function StoryRichTextBlock({
	blockRichText,
	rightColumnText,
	blockTheme,
}: StoryRichTextBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	const sectionClass = 'content-blocks p--l ' + cleanTheme

	return (
		<section className={sectionClass}>
			<div className="block-banner">
				<div className="container--profile-banner-wide p--s flex-row">
					<div className="flex-col-md-12 flex-row">
						<div className="flex-col-md-3 text-body"></div>
						<div className="flex-col-md-6 text-body rich-text-editor">
							{blockRichText && (
								<div
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(blockRichText),
									}}
								></div>
							)}
						</div>
						<div className="flex-col-md-3 text-body rich-text-editor">
							{rightColumnText && (
								<div
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(rightColumnText),
									}}
								></div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
