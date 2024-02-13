import React from 'react'
import { HistorySliderBlockProps } from '../../../components/propTypes'

import DContainer from '../Diageo/DContainer'
import DBrandCard from '../Diageo/cards/DBrandCard'

import { baseSliderSetting } from '../../../shared/sliderSetting'

import { BrandCardType } from '../../../enums'
import DHeadingSlider from '../Diageo/DHeadingSlider'
import DSlider from '../Diageo/DSlider'

export default function HistorySliderBlock({
	blockTitle,
	richText,
	alignCentre,
	blocks,
	blockTheme,
}: HistorySliderBlockProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 380,
		heightDesk: 420,
		pureimage: true,
	}

	return (
		<section className="block-brand-slider block-brand-slider--history">
			{blockTheme && (
				<div
					className={`block-brand-slider__common-bg-mobile  ${
						blockTheme ? blockTheme : ''
					}`}
				></div>
			)}
			<DContainer>
				<DHeadingSlider
					heading={blockTitle}
					text={richText}
					textSize="medium"
					headingSize="extraLarge"
					alignCentre={alignCentre}
				/>
			</DContainer>
			<div className="block-brand-slider__slider-wrapper">
				<DContainer>
					{blocks && blocks.length ? (
						<DSlider settings={baseSliderSetting} alignProgressSlides="right">
							{blocks.map((card, index) => (
								<DBrandCard
									key={index}
									{...card}
									dimensions={dimensions}
									typeCard={BrandCardType.historyTimeLine}
								/>
							))}
						</DSlider>
					) : null}
				</DContainer>
			</div>
			{blockTheme && (
				<div
					className={`block-brand-slider__decor-bg-desktop ${
						blockTheme ? blockTheme : ''
					}`}
				></div>
			)}
		</section>
	)
}
