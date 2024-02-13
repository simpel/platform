import { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	CareersLandingPageHeaderBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'

import { fetchVacanciesLite } from 'lib/cms/api/graphql/queries'
import { JobVacancyLite, Image } from 'types'

// for Marhsall to do on the backend
function getVacancyStructure(vacancies: JobVacancyLite[]) {
	const array = [] as string[]
	const data = {
		country: [],
		jobFamilyGroup: [],
		primaryJobPostingLocation: [],
	}
	for (let index = 0; index < vacancies.length; index++) {
		const vacancy = vacancies[index]
		const { country, jobFamilyGroup, primaryJobPostingLocation } = vacancy

		for (const key in data) {
			const options = data[key]
			const value = vacancy[key]

			if (!array.includes(value) && value !== '') {
				options.push({
					label: value,
					value: value,
					country,
					jobFamilyGroup,
					primaryJobPostingLocation,
				})
			}

			array.push(value)
		}
	}

	for (const key in data) {
		const options = data[key]

		options.sort((a, b) => {
			return a.label > b.label ? 1 : -1
		})
	}

	return {
		countries: data.country,
		jobFamilyGroups: data.jobFamilyGroup,
		primaryJobPostingLocations: data.primaryJobPostingLocation,
	}
}

export default function BlockCareersLandingPageHeaderBlock({
	customComponent,
}: BlockProps<CareersLandingPageHeaderBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const blockImage = f.imageRef('blockImage')
	let blkImage = {} as Image

	if (blockImage) {
		blkImage = { _id: blockImage?._id, url: blockImage?.url, alt: '*' }
		const var1 = f.blocks('blockImage')[0]

		if (var1) {
			if (var1.fields[1] && var1.fields[1].text) {
				blkImage = {
					_id: blockImage?._id,
					url: blockImage?.url,
					alt: var1.fields[1].text,
				}
			}
		}
	}

	const [selectOptions, setSelectOptions] = useState({
		countries: [],
		jobFamilyGroups: [],
		primaryJobPostingLocations: [],
	})

	let mp4VideoUrl = ''
	const vidd = f.imageRefStandard('videoPicker')
	if (vidd) {
		mp4VideoUrl = vidd?.url
			? `${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${vidd?.url}`
			: ''
	}

	const props = {
		richTextTitle: f.html('richTextTitle'),
		richTextIntro: f.html('richTextIntro'),
		videoUrl: f.text('videoUrl'),
		mp4VideoUrl: mp4VideoUrl,
		blockImage: blkImage,
		...selectOptions,
	}

	useEffect(() => {
		fetchVacanciesLite(5000).then((res: JobVacancyLite[]) => {
			const data = getVacancyStructure(res)
			setSelectOptions(data)
		})
	}, [])

	return getComponent<CareersLandingPageHeaderBlockProps>(
		Block.CareersLandingPageHeaderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
