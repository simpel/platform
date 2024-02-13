import React from 'react'

import DContainer from '../Diageo/DContainer'
import DBrandCard from '../Diageo/cards/DBrandCard'

import { baseSliderSetting } from '../../../shared/sliderSetting'
import { BrandCardType } from '../../../enums'
import { BlockBrandSliderProps } from '../../propTypes'

import DSlider from '../Diageo/DSlider'

export default function BrandSliderBlock({ items }: BlockBrandSliderProps) {
	return (
		<section className="block-brand-slider block-brand-slider--brand">
			{/* {bgTheme && <div className={`block-brand-slider__common-bg-mobile ${getBgThemedTheme(bgTheme)}`}></div>} */}

			<div className="block-brand-slider__slider-wrapper">
				<DContainer>
					{items && (
						<DSlider settings={baseSliderSetting} alignProgressSlides="left">
							{items.map((card, index) => (
								<DBrandCard
									key={index}
									{...card}
									typeCard={BrandCardType.brand}
								/>
							))}
						</DSlider>
					)}
				</DContainer>
				{/* {bgTheme && <div className={`block-brand-slider__decor-bg-desktop ${getBgThemedTheme(bgTheme)}`}></div>} */}
			</div>
		</section>
	)
}
