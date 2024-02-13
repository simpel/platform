import React from 'react'
import ImageBlock from './Image'
import { QuoteBlockProps } from '../../../components/propTypes'
import { FixMediaPathsInHtml } from 'utilities/functions'

export default function QuoteBlock({
	blockImage,
	richTextQuote,
	attrLine1,
	attrLine2,
	layout,
	flipped,
	blockTheme,
}: QuoteBlockProps) {
	const dimensions = {
		styleDesk: '',
		widthDesk: 700,
		heightDesk: 400,
		pureimage: false,
	}

	const cleanTheme = blockTheme ? blockTheme : ''
	let section1Class = 'content-block ' + cleanTheme
	let containerClass = 'container'
	if (flipped) {
		containerClass = 'container flipped'
	}

	richTextQuote = richTextQuote ? FixMediaPathsInHtml(richTextQuote) : ''

	if (layout === 'square-image') {
		section1Class = 'content-block ' + cleanTheme
		dimensions.styleDesk = 'fit-to-object'
		dimensions.widthDesk = 500
		dimensions.heightDesk = 500
		return (
			<section className={section1Class}>
				<div className="offset-bg--reset"></div>
				<div className="block-banner">
					<div className="container--profile-banner">
						<div className="content-blurb">
							<blockquote className="blockquote-b">
								<div
									className="rich-text-editor"
									dangerouslySetInnerHTML={{ __html: richTextQuote }}
								></div>
								{attrLine1 && <div className="quote-from">{attrLine1}</div>}
								{attrLine2 && <div className="quote-from">{attrLine2}</div>}
							</blockquote>
						</div>

						<div className="content-img">
							<div className="img-wrapper">
								{blockImage && (
									<ImageBlock image={blockImage} dimensions={dimensions} />
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	} else {
		section1Class = 'promo-content ' + cleanTheme
		// layout == 'small-image'
		return (
			<section className={section1Class}>
				<div className={containerClass}>
					<div className="content-img">
						{blockImage && (
							<ImageBlock
								image={blockImage}
								dimensions={dimensions}
								alignItems
							/>
						)}
					</div>

					<div className="content-blurb">
						<div className="content-centered text-body">
							<blockquote className="blockquote-b">
								<div
									className="rich-text-editor"
									dangerouslySetInnerHTML={{ __html: richTextQuote }}
								></div>
								{attrLine1 && <div className="quote-from">{attrLine1}</div>}
								{attrLine2 && <div className="quote-from">{attrLine2}</div>}
							</blockquote>
							{/* <p>
                <Icon name="icon_twitter" size="middle" className="link__icon" /> - Share
              </p> */}
						</div>
					</div>
				</div>
			</section>
		)
	}
}
