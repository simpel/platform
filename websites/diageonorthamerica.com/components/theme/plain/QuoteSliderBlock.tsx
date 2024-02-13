import React from 'react'
import ImageBlock from './Image'
import DContainer from '../Diageo/DContainer'
import {
	QuoteSliderBlockProps,
	SimpleQuote,
} from '../../../components/propTypes'
import DSlider from '../Diageo/DSlider'
import { quoteSlider } from '../../../shared/sliderSetting'
import DAuthorQuote from '../Diageo/DAuthorQuote'
import { FixMediaPathsInHtml } from 'utilities/functions'

export default function QuoteSliderBlock({
	blockTheme,
	items,
	flipped,
	authorPhotoLayout,
}: QuoteSliderBlockProps) {
	const dimensions = {
		styleDesk: '',
		widthDesk: 700,
		heightDesk: 400,
		pureimage: true,
	} //vertical-align-center
	let ShowArrows = false
	if (items) {
		if (items.length > 1) {
			ShowArrows = true
		}
	}
	const primaryView = (index: number, item: SimpleQuote) => {
		return (
			<section
				key={index}
				className={`blockquote-primary in-slider promo-content content-block ${
					blockTheme ? blockTheme : ''
				} ${flipped ? 'blockquote-primary--flipped' : ''} `}
			>
				<div>
					<DContainer className={`${flipped ? 'flipped' : ''}`}>
						<div className="content-img">
							{item.image && (
								<ImageBlock
									image={item.image}
									dimensions={dimensions}
									isLegacy={false}
								/>
							)}
						</div>

						<div className="content-blurb">
							<div className="content-centered text-body">
								<blockquote className="blockquote-b no-vertical-margin">
									<div
										className="rich-text-editor"
										dangerouslySetInnerHTML={{
											__html: FixMediaPathsInHtml(item.richText),
										}}
									></div>
									{item.author && (
										<div className="quote-from">{item.author}</div>
									)}
									{item.author2 && (
										<div className="quote-from">{item.author2}</div>
									)}
								</blockquote>
							</div>
						</div>
					</DContainer>
				</div>
			</section>
		)
	}

	const secondaryView = (index: number, item: SimpleQuote) => {
		return (
			<section
				key={index}
				className={`blockquote-secondary ${
					flipped ? 'flipped-blockquote' : ''
				}  ${blockTheme ? blockTheme : ''}`}
			>
				<DContainer
					className={`${flipped ? 'blockquote-secondary--flipped' : ''}`}
				>
					<blockquote className="blockquote-a -pt-3">
						<span></span>
						<div
							dangerouslySetInnerHTML={{
								__html: FixMediaPathsInHtml(item.richText),
							}}
						/>
						<DAuthorQuote
							image={item.image}
							author={item.author}
							description={item.author2}
						/>
					</blockquote>
				</DContainer>
			</section>
		)
	}

	return (
		<DSlider
			className={`block-quote-slider ${
				flipped ? 'block-quote-slider--flipped' : ''
			}`}
			settings={quoteSlider}
			progressSlides={ShowArrows}
		>
			{items.map((item, index) => (
				<>
					{authorPhotoLayout
						? secondaryView(index, item)
						: primaryView(index, item)}
				</>
			))}
		</DSlider>
	)
}
