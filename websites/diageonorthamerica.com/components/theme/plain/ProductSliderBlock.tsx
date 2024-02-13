import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import DContainer from '../Diageo/DContainer'
import DBrandCard from '../Diageo/cards/DBrandCard'

import { getBgThemedTheme } from '../../../utilities/themeColors'
import { baseSliderSetting } from '../../../shared/sliderSetting'
import { BrandCardType, TypeLink } from '../../../enums'
import {
	BlockBrandSliderProps,
	ProductSliderBlockProps,
	LayoutForSliders,
} from '../../propTypes'

import DHeadingSlider from '../Diageo/DHeadingSlider'
import DSlider from '../Diageo/DSlider'
import { ImageDimProps } from 'types'
import Features from 'components/styled-components/Careers/Features/Features'

export default function ProductSliderBlock({
	layout,
	richTextTitle,
	richText,
	logoImage,
	link,
	blocks,
	blockTheme,
}: ProductSliderBlockProps) {
	const headingLogoDimentions = {
		styleDesk: 'fit-to-object',
		widthDesk: 216,
		heightDesk: 216,
		pureimage: true,
	}
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 380,
		heightDesk: 440,
		pureimage: true,
	}
	const [dimForImage, setDimForImage] = useState<ImageDimProps>(dimensions)

	const dimensionsForCardTextRight = {
		...dimensions,
	} as ImageDimProps
	const dimensionsForCardLogoRight = {
		styleDesk: 'fit-to-object',
		widthDesk: 380,
		heightDesk: 380,
		pureimage: true,
	} as ImageDimProps

	const layoutBlock = cn({
		'block-brand-slider--primary': layout === 'text-right',
		'block-brand-slider--secondary': layout === 'logo-right',
	})

	const getCardByLayout = (layout?: any) => {
		if (layout === 'text-right') {
			return BrandCardType.product
		}
		if (layout === 'logo-right') {
			return BrandCardType.productSecondary
		}
		return BrandCardType.product
	}

	useEffect(() => {
		if (layout === 'text-right') {
			setDimForImage(dimensionsForCardTextRight)
		}
		if (layout === 'logo-right') {
			setDimForImage(dimensionsForCardLogoRight)
		}
	}, [])

	return (
		<Features
			title={richTextTitle}
			text={richText}
			cards={
				blocks?.map((card, index) => ({
					key: index,
					imageSrc: `${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${card.image?.url}`,
					imageAlt: card.image?.alt || '',
					title: card.title || '',
					description: card.text || '',
					linkCta: card.linkCta,
				})) || []
			}
		/>
	)
}
