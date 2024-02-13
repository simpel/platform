import React, { useEffect, useRef } from 'react'
import DContainer from '../Diageo/DContainer'
import DBrandCard from '../Diageo/cards/DBrandCard'
import { baseSliderSetting } from '../../../shared/sliderSetting'
import { BrandCardType } from '../../../enums'
import { type BlockBrandSliderProps } from '../../propTypes'
import DHeadingSlider from '../Diageo/DHeadingSlider'
import DSlider from '../Diageo/DSlider'

const BrandSliderBlock = ({
	heading,
	text,
	items,
	linkCta,
	blockTheme,
}: BlockBrandSliderProps) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const sectionClass = `block-brand-slider block-brand-slider--brand ${
		blockTheme ?? ''
	}`
	const sectionMobClass1 = `block-brand-slider__common-bg-mobile ${
		blockTheme ?? ''
	}`
	const sectionMobClass2 = `block-brand-slider__decor-bg-desktop ${
		blockTheme ?? ''
	}`

	const onAfterChange = () => {
		const setTabIndex = (elements?: NodeListOf<Element>, tabIndex = 0) => {
			if (elements) {
				for (const element of elements) {
					for (const a of element.querySelectorAll('a')) {
						a.setAttribute('tabindex', tabIndex.toString())
					}
				}
			}
		}

		setTabIndex(ref.current?.querySelectorAll('[aria-hidden="true"]'), -1)
		setTabIndex(ref.current?.querySelectorAll('[aria-hidden="false"]'), 0)
	}

	useEffect(() => {
		onAfterChange()
	}, [])

	return (
		<section className={sectionClass}>
			<div className={sectionMobClass1} />
			<DContainer>
				<DHeadingSlider
					heading={heading}
					linkCta={linkCta}
					text={text}
					headingSize="medium"
				/>
			</DContainer>
			<div ref={ref} className="block-brand-slider__slider-wrapper">
				<DContainer>
					{items && (
						<DSlider
							settings={{
								...baseSliderSetting,
								afterChange: onAfterChange,
							}}
							alignProgressSlides="right"
						>
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
				<div className={sectionMobClass2} />
			</div>
		</section>
	)
}

export default BrandSliderBlock
