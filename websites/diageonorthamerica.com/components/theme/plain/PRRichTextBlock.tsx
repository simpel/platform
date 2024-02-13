import React from 'react'
import { PRRichTextBlockProps } from '../../../components/propTypes'
import { FixMediaPathsInHtml } from 'utilities/functions'

// function MediaWithTextBlock({ title, heading, text, linktext, video, image, align }: MediaWithTextBlockProps) {
export default function PRRichTextBlock({
	layout,
	richText,
	quoteAuthor,
}: PRRichTextBlockProps) {
	richText = richText ? FixMediaPathsInHtml(richText) : ''

	switch (layout) {
		case 'pink-box':
			return (
				<div
					className="theme-highlight rich-text-editor"
					dangerouslySetInnerHTML={{ __html: richText }}
				></div>
			)
		case 'quote':
			return (
				<blockquote className="blockquote-a">
					<span className="theme-vibrant-h"></span>
					<div
						className="rich-text-editor"
						dangerouslySetInnerHTML={{ __html: richText }}
					></div>
					<div className="quote-from">{quoteAuthor}</div>
				</blockquote>
			)
		default:
		case 'plain-text':
			return (
				<div
					className="rich-text-editor"
					dangerouslySetInnerHTML={{ __html: richText }}
				></div>
			)
		case 'stand-first': // TODO need larger text here
			return (
				<div
					className="rich-text-editor"
					dangerouslySetInnerHTML={{ __html: richText }}
				></div>
			)
	}
}
