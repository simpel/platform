import React from 'react'
import { CareersSearchBlockProps } from '../../../components/propTypes'
import ImageBlockWithLink from './custom/ImageBlockWithLink'
import DContainer from '../Diageo/DContainer'
import SearchWithSocialBar from 'components/styled-components/Careers/SearchWithSocialBar'

export default function CareersSearchBlock({
	blockTitle,
	buttonUrl,
	buttonText,
	hashTagText,
	hashtagLink,
	instagramLink,
	linkedinLink,
	gradient,
}: CareersSearchBlockProps) {
	return (
		<SearchWithSocialBar
			gradient={gradient}
			blockTitle={blockTitle}
			buttonUrl={buttonUrl}
			buttonText={buttonText}
			hashTagText={hashTagText}
			hashtagLink={hashtagLink}
			instagramLink={instagramLink}
			linkedinLink={linkedinLink}
		/>
	)
}
