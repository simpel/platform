import React from 'react'
import { StoryQuoteBlockProps } from '../../../components/propTypes'
import { FixMediaPathsInHtml } from 'utilities/functions'
import DAuthorQuote from '../Diageo/DAuthorQuote'

export default function StoryQuoteBlock({
	blockImage,
	blockRichText,
	quoteName,
	quoteJob,
	blockTheme,
}: StoryQuoteBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	// const sectionClass = 'pageblock ' + cleanTheme
	const sectionClass = 'pageblock  -pt-1 -pb-1 ml--m mr--m story-quote-block ' + cleanTheme
	// const dimensions = { styleDesk: 'fit-to-object', widthDesk: 100, heightDesk: 100, pureimage: true }
	return (
		<>
			<section className={sectionClass}>
				
				<div className="pageblock--textarea">
					<div className="pageblock--textarea-sm text-body">
						<blockquote className="blockquote-a">
							<span></span>
							<div
								className="rich-text-editor"
								dangerouslySetInnerHTML={{
									__html: FixMediaPathsInHtml(blockRichText),
								}}
							></div>
							<div className="quote-from">
								{blockImage && (
									<DAuthorQuote
										image={blockImage}
										author={quoteName}
										description={quoteJob}
									/>
								)}
								{!blockImage && (
									<>
										{' '}
										{quoteName}, {quoteJob}
									</>
								)}
							</div>
						</blockquote>
					</div>
				</div>
				
			</section>
		</>
	)
}
