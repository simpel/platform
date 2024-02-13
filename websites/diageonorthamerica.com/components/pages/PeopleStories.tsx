import React from 'react'

import DContainer from 'components/theme/Diageo/DContainer'

import { getBgThemedTheme } from 'utilities/themeColors'
import { baseSliderSetting } from 'shared/sliderSetting'

import { BrandCardType } from 'enums'

import { Image as ImageType } from 'types'
import DBrandCard from 'components/theme/Diageo/cards/DBrandCard'

import DHeadingSlider from 'components/theme/Diageo/DHeadingSlider'
import DSlider from 'components/theme/Diageo/DSlider'
import { BgThemedTheme } from 'enums'

type PersonStoryProps = {
	_id: number | string
	image: ImageType
	text: string
}

type PeopleStoriesProps = {
	heading?: string
	items?: PersonStoryProps[]
	bgTheme?: BgThemedTheme
}

function PeopleStories({ heading, items, bgTheme }: PeopleStoriesProps) {
	return (
		<section className="block-people-stories">
			{bgTheme && (
				<div
					className={`block-people-stories__common-bg-mobile ${getBgThemedTheme(
						bgTheme,
					)}`}
				></div>
			)}
			<DContainer>
				{heading && <DHeadingSlider heading={heading} headingSize="small" />}
			</DContainer>
			<div className="block-people-stories__slider-wrapper">
				<DContainer>
					{items && (
						<DSlider
							progressSlides={false}
							settings={baseSliderSetting}
							alignProgressSlides="right"
						>
							{items.map((card, index) => (
								<DBrandCard
									key={index}
									{...card}
									typeCard={BrandCardType.person}
								/>
							))}
						</DSlider>
					)}
				</DContainer>
				{bgTheme && (
					<div
						className={`block-people-stories__decor-bg-desktop ${getBgThemedTheme(
							bgTheme,
						)}`}
					></div>
				)}
			</div>
		</section>
	)
}

export default PeopleStories
