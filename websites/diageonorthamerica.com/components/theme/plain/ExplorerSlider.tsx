import React from 'react'

import DContainer from '../Diageo/DContainer'
import DBrandCard from '../Diageo/cards/DBrandCard'

import { explorerSliderSetting } from '../../../shared/sliderSetting'
import { BrandCardType } from '../../../enums'
import { BlockBrandSliderProps } from '../../propTypes'

import DSlider from '../Diageo/DSlider'

function ExplorerSlider({ items, blockTheme }: BlockBrandSliderProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	const sectionMobClass1 = 'block-brand-slider__common-bg-mobile ' + cleanTheme
	const sectionMobClass2 = 'block-brand-slider__decor-bg-desktop ' + cleanTheme

	return (
		<section className="block-brand-slider block-brand-slider--explorer">
			<div className={sectionMobClass1}></div>
			<div className="block-brand-slider__slider-wrapper">
				<DContainer>
					{items && (
						<DSlider
							settings={explorerSliderSetting}
							alignProgressSlides="right"
						>
							{items.map((card, index) => (
								<DBrandCard
									key={index}
									{...card}
									typeCard={BrandCardType.explorer}
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

export default ExplorerSlider
