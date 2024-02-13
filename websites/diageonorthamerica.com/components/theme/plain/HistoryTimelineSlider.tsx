import React from 'react'

import DContainer from '../Diageo/DContainer'
import DBrandCard from '../Diageo/cards/DBrandCard'

import { baseSliderSetting } from '../../../shared/sliderSetting'
import { BrandCardType } from '../../../enums'
import { BlockBrandSliderProps } from '../../propTypes'

import DHeadingSlider from '../Diageo/DHeadingSlider'
import DSlider from '../Diageo/DSlider'

function HistoryTimelineSlider({
	heading,
	text,
	items,
	blockTheme,
}: BlockBrandSliderProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	const sectionMobClass1 = 'block-brand-slider__common-bg-mobile ' + cleanTheme
	const sectionMobClass2 = 'block-brand-slider__decor-bg-desktop ' + cleanTheme
	return (
		<section className="block-brand-slider block-brand-slider--history-timeline">
			<div className={sectionMobClass1}></div>
			<DContainer>
				<DHeadingSlider
					heading={heading}
					text={text}
					headingSize="extraLarge"
					textSize="medium"
				/>
			</DContainer>
			<div className="block-brand-slider__slider-wrapper">
				<DContainer>
					{items && (
						<DSlider settings={baseSliderSetting} alignProgressSlides="right">
							{items.map((card, index) => (
								<DBrandCard
									key={index}
									{...card}
									typeCard={BrandCardType.historyTimeLine}
								/>
							))}
						</DSlider>
					)}
				</DContainer>
				<div className={sectionMobClass2}></div>
			</div>
		</section>
	)
}

export default HistoryTimelineSlider
