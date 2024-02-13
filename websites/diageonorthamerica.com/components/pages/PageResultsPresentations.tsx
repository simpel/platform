import React from 'react'

import { useFields } from 'context/fields'
import { usePages } from 'context/pages'
import { renderBlocks } from 'components'
import {
	FinContainer,
	RenderSettings,
	SelectOption,
	FinYear,
	CmsLink,
	FinGroup,
	Image,
} from 'types'
// import { BreadcrumbsProps } from '../propTypes'
import { HeadingLevel } from 'enums'
import Layout from 'components/Layout'
import AnnualReportBlock from '../theme/plain/AnnualReportBlock'
import Heading from '../theme/plain/Heading'

import { fetchFinData } from 'lib/cms/api/graphql/queries'
import { useEffect, useState } from 'react'
import { getYearsForSelect } from 'utilities/latestYears'
import AnnualReportAccordion from '../theme/plain/AnnualReportAccordion'
import { useNavigation } from 'context/navigation'

type StateType = {
	type?: SelectOption
	year?: SelectOption
	search: string
}

type typePresentation = 'result' | 'report' | 'presentation' | string

const typesOptions = [
	{
		value: 'result',
		label: 'Result',
	},
	{
		value: 'report',
		label: 'Report',
	},
	{
		value: 'presentation',
		label: 'Presentation',
	},
]

function filterData(array: FinYear[], data: StateType): FinYear[] {
	let filterdArray = array as FinYear[]
	for (const key in data) {
		const item = data[key]
		if (key === 'type' && item) {
			const data = filterByType(array, item.value)
			filterdArray = data
		}
		if (key === 'year' && item && item.value !== '') {
			const data = filterByYear(array, item.value)
			filterdArray = data
		}
	}
	return filterdArray
}

function getFilterDataBySearch(
	array: FinYear[],
	type: typePresentation,
): FinYear[] {
	return array.map((year) => {
		const groups = year.groups.filter((group) => {
			if (group.name.toLowerCase().includes(type.toLowerCase())) {
				return group
			}
			// filter by nested data
			// const items = group.items.filter((item) => {
			//   if (item.name.toLowerCase().includes(type.toLowerCase())) {
			//     return item
			//   }
			// })
			// return {
			//   ...group,
			//   items,
			// }
		})
		return {
			...year,
			groups,
		}
	})
}

function filterByType(array: FinYear[], type: typePresentation) {
	return array.map((year) => {
		const groups = year.groups.filter((group) => {
			if (group.groupType.toLowerCase() === type) {
				return group
			}
		})
		return {
			...year,
			groups,
		}
	})
}

function filterByYear(array: FinYear[], year: string) {
	let filredData = [] as FinYear[]
	if (year) {
		filredData = array.filter((item) => {
			if (year === item.name) {
				return item
			}
		})
	}
	return filredData
}

export default function PageResultsPresentations() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [{ breadcrumbs }] = useNavigation()
	let annualReportBlockImage: Image = {
		_id: '',
		alt: '',
		url: '',
	}
	const fieldImage = f.fields.filter((item) => item.alias === 'panelImage')
	let annualReportBlockImageId = ''
	if (fieldImage.length && fieldImage[0].mediaList?.length) {
		if (fieldImage[0].mediaList?.length)
			annualReportBlockImageId = fieldImage[0].mediaList[0]._id
	}

	if (page.referencedMedia) {
		const annualReportMedia = page.referencedMedia.filter(
			(item) => item._id === annualReportBlockImageId,
		)
		if (annualReportMedia.length) {
			annualReportBlockImage = {
				...annualReportMedia[0],
				alt: annualReportMedia[0].title,
			}
		}
	}
	const annualReportBlockTitie = f.html('panelRichTextTitle')
	const annualReportBlockSubTitie = f.text('panelTextSubtitle')
	let annualReportBlockLink: CmsLink | null
	const dataPanelLinkArr = f.fields.filter((item) => item.alias === 'panelLink')
	if (dataPanelLinkArr.length) {
		annualReportBlockLink = dataPanelLinkArr[0].link || null
	} else {
		annualReportBlockLink = null
	}

	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const [yearsOptions, setYearsOptions] = useState<SelectOption[]>([])
	const [dataYearsResult, setDataYearsResult] = useState<FinYear[]>([])
	const [filteredData, setFilteredData] = useState<FinYear[]>([])
	const [data, setData] = useState({} as FinContainer)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isFilted, setIsFiltered] = useState<boolean>(false)

	const filterBySearch = (search: string) => {
		const data = getFilterDataBySearch(dataYearsResult, search)
		setFilteredData(data)
	}

	const handleAnnualReport = (data: StateType) => {
		if (
			data.year?.value === '' &&
			data.type?.value === '' &&
			data.search === ''
		) {
			setFilteredData(dataYearsResult)
			setIsFiltered(false)
			return
		}

		setIsFiltered(true)
		if (data.year?.value || data.type?.value) {
			setFilteredData(filterData(dataYearsResult, data))
		}

		if (data.search) {
			filterBySearch(data.search)
			return
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchFinData().then((res: FinContainer) => {
			setData(res)
			if (res && res.years.length > 0) {
				const years = res.years.map((item) => item.year)
				const yearsFormat = getYearsForSelect(years)
				setYearsOptions(yearsFormat)
				setDataYearsResult(res.years)
				setFilteredData(res.years)
				setIsLoading(false)
			}
		})
	}, [])

	const checkDeepDate = (groups: FinGroup[]): boolean => {
		const isAllEmpty = false
		for (let i = 0; i <= groups.length - 1; i++) {
			const item = groups[i]
			if (item.items.length) {
				return true
			}
		}
		return isAllEmpty
	}

	const getFirstGroup = (index, subIndex) => {
		if (index === 1 && subIndex === 1) {
			return true
		}
		return false
	}

	return (
		<Layout>
			{header}
			<AnnualReportBlock
				years={yearsOptions}
				types={typesOptions}
				image={annualReportBlockImage}
				title="Results, reports and presentations"
				titleSecondary={annualReportBlockTitie}
				subtitle={annualReportBlockSubTitie}
				link={annualReportBlockLink}
				breadcrumbs={breadcrumbs}
				onChange={handleAnnualReport}
			/>

			<section className="content-block p--l m--0 theme-white">
				<div className="offset-bg--reset"></div>
				<div className="block-banner">
					{!isLoading ? (
						<>
							{filteredData && filteredData.length !== 0 && (
								<>
									{filteredData.map((item, index) => {
										if (item.groups.length && checkDeepDate(item.groups)) {
											return (
												<div
													key={item.year}
													className="flex-col-md-12 flex-row annual-report-block"
												>
													<div className="flex-col-md-3 text-body">
														<h3 className="year-title">{item.year}</h3>
													</div>
													<div className="flex-col-md-7 text-body">
														{item.groups && item.groups.length !== 0 && (
															<>
																{item.groups.map((groupItem, subIndex) => (
																	<>
																		{groupItem.items.length !== 0 ? (
																			<AnnualReportAccordion
																				index={
																					!isFilted &&
																					getFirstGroup(index + 1, subIndex + 1)
																						? 1
																						: 0
																				}
																				key={groupItem.name}
																				{...groupItem}
																				fileSize={groupItem.fileSize}
																				fileUrl={groupItem.fileUrl}
																			/>
																		) : null}
																	</>
																))}
															</>
														)}
													</div>
												</div>
											)
										}
									})}
								</>
							)}
						</>
					) : (
						<div className="text-align--center">
							<Heading heading={'Loading...'} headingLevel={HeadingLevel.H3} />
						</div>
					)}
				</div>
			</section>
			{body}
		</Layout>
	)
}
