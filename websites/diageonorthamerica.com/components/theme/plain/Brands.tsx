import React from 'react'

import DContainer from '../Diageo/DContainer'
import DSlider from '../Diageo/DSlider'
import Image from './Image'
import { HeadingLevel } from '../../../enums'
import Heading from './Heading'
import { Link as LinkType, Image as ImageType } from 'types'

import { brandSliderSetting } from '../../../shared/sliderSetting'

type SlideType = {
	_id: number | string
	image: ImageType
	linkCta: LinkType
}

type BenefitsTypes = {
	heading?: string
	richText?: string
	items?: SlideType[]
}

function Brands({ heading, richText, items }: BenefitsTypes) {
	return (
		<section className="block-brands">
			<DContainer>
				<div className="block-brands__heading-holder">
					{heading && (
						<Heading
							heading={heading}
							className="block-brands__heading font-bold text-align--center"
							headingLevel={HeadingLevel.H3}
						/>
					)}
					{richText && (
						<p className="block-brands__text text-align--center">{richText}</p>
					)}
				</div>
				<div className="block-brands__list">
					{items && items.length && items && items.length && (
						<DSlider settings={brandSliderSetting} progressSlides={false}>
							{items.map((item, index) => (
								<div key={index} className="brand">
									<div className="brand__image">
										<Image image={item.image} />
									</div>
								</div>
							))}
						</DSlider>
					)}
				</div>
			</DContainer>
		</section>
	)
}

export default Brands
