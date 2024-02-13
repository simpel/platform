import React from 'react'
import { TextCarouselBlockProps } from '../../../components/propTypes'
import { FixMediaPathsInHtml } from 'utilities/functions'
import BusinessSubArea from 'components/styled-components/Careers/TextCarousel/TextCarousel'

export default function TextCarouselBlock(props: TextCarouselBlockProps) {
	//const cleanTheme = blockTheme ? blockTheme : ''
	return <BusinessSubArea {...props} />
}
