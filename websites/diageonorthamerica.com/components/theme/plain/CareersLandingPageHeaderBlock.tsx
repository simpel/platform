import React from 'react'
import { CareersLandingPageHeaderBlockProps } from '../../../components/propTypes'
import CareersLandingPageHeaderBlockV2 from 'components/styled-components/Careers/CareersLandingPageHeaderBlockV2'

export default function CareersLandingPageHeaderBlock({
	richTextTitle,
	richTextIntro,
	blockImage,
	countries,
	jobFamilyGroups,
	primaryJobPostingLocations,
	mp4VideoUrl,
	videoUrl,
}: CareersLandingPageHeaderBlockProps) {
	return (
		<>
			<CareersLandingPageHeaderBlockV2
				richTextTitle={richTextTitle}
				richTextIntro={richTextIntro}
				blockImage={blockImage}
				countries={countries}
				jobFamilyGroups={jobFamilyGroups}
				primaryJobPostingLocations={primaryJobPostingLocations}
				mp4VideoUrl={mp4VideoUrl}
				videoUrl={videoUrl}
			/>
		</>
	)
}
