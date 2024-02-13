import React from 'react'

import DContainer from '../Diageo/DContainer'

import { simpleCenteredCarouselWithImages } from '../../../shared/sliderSetting'
import { SmallImageSliderBlockProps } from '../../../components/propTypes'

import DSlider from '../Diageo/DSlider'
import ImageComponent from '../plain/Image'
import { FixMediaPathsInHtml } from 'utilities/functions'

export default function SmallImageSliderBlock({
	blocks,
}: SmallImageSliderBlockProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 600,
		heightDesk: 500,
		pureimage: true,
	}
	return (
		<section className="block-small-image-slider">
			<div className="block-small-image-slider__slider-wrapper">
				<DContainer>
					{blocks && blocks.length ? (
						<DSlider
							settings={simpleCenteredCarouselWithImages}
							alignProgressSlides="right"
						>
							{blocks.map((card, index) => (
								<div key={index} className="small-image-card">
									<div className="small-image-card__image">
										<ImageComponent
											image={card.image}
											dimensions={dimensions}
											isLegacy={true}
										/>
									</div>
									<div
										className="small-image-card__body"
										dangerouslySetInnerHTML={{
											__html: FixMediaPathsInHtml(card.richText),
										}}
									></div>
								</div>
							))}
						</DSlider>
					) : null}
				</DContainer>
			</div>
		</section>
	)
}
