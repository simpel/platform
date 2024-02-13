import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import {
	type CategoriesGqlResponse,
	type CategoryLite,
	type MiniPage,
	type PartialPage,
	type RenderSettings,
	type SelectOption,
	type UrlsGqlResponse,
} from 'types'
import { HeadingLevel } from 'enums'
import Layout from 'components/Layout'
import { fetchCategories, fetchPageDataByDocType } from 'lib/cms/api'
import { getLatestYearsForSelect } from 'utilities/latestYears'
import DContainer from 'components/theme/Diageo/DContainer'
import Select from 'components/theme/plain/Select'
import DCard from 'components/theme/Diageo/cards/DCard'
import { PaginationProvider } from 'components/theme/Diageo/DContentWithFilters/pagination-provider'
import Results from 'components/theme/Diageo/DContentWithFilters/Results'
import { type ActionMeta } from 'react-select'

type TStateType = {
	jobcategory?: SelectOption
	careertopic?: SelectOption
	country?: SelectOption
	region?: SelectOption
	date?: SelectOption
}

const initialState: TStateType = {
	jobcategory: {
		value: '',
		label: '',
	},
	careertopic: {
		value: '',
		label: '',
	},
	country: {
		value: '',
		label: '',
	},
	region: {
		value: '',
		label: '',
	},
	date: {
		value: '',
		label: '',
	},
}

const getStructureForStoriesSelect = (array: CategoryLite[]) => {
	return array.map((item) => {
		return {
			value: item._id,
			label: item.title,
		}
	})
}

export default function PageCareersArticleLanding() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))

	const COUNT_POSTS = 9

	const yearsOptions = getLatestYearsForSelect('decrease')
	const [state, setState] = useState<TStateType>(initialState)
	const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false)

	const [regionsList, setRegionsList] = useState([] as SelectOption[])
	const [jobCategoriesList, setJobCategoriesList] = useState(
		[] as SelectOption[],
	)
	const [careerTopicsList, setCareerTopicsList] = useState([] as SelectOption[])

	const [filteredArray, setFilteredArray] = useState<
		PartialPage[] | MiniPage[]
	>([])
	const [startLoadWith, setStartLoadWith] = useState<number>(0)

	useEffect(() => {
		setIsLoadingPosts(true)

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchPageDataByDocType('careersArticlePage', 999, true, 0, []).then(
			(response: UrlsGqlResponse) => {
				if (response.contents.length > 0) {
					setIsLoadingPosts(false)
				}

				setFilteredArray(response.contents)
			},
		)

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchCategories('regions').then((response: CategoriesGqlResponse) => {
			const array1 = response.contents.sort((a, b) =>
				a.title < b.title ? -1 : 1,
			)
			const data1 = getStructureForStoriesSelect(array1)
			setRegionsList(data1)
		})

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchCategories('job-categories').then(
			(response: CategoriesGqlResponse) => {
				const array2 = response.contents.sort((a, b) =>
					a.title < b.title ? -1 : 1,
				)
				const data2 = getStructureForStoriesSelect(array2)
				setJobCategoriesList(data2)
			},
		)

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchCategories('careers-categories').then(
			(response: CategoriesGqlResponse) => {
				const array3 = response.contents.sort((a, b) =>
					a.title < b.title ? -1 : 1,
				)
				const data3 = getStructureForStoriesSelect(array3)
				setCareerTopicsList(data3)
			},
		)
	}, [])

	function onSelectChange(
		selectedOption: SelectOption,
		select: ActionMeta<SelectOption>,
	) {
		setIsLoadingPosts(true)
		setStartLoadWith(0)

		const { name } = select

		if (name) {
			const baseState: TStateType = {
				...state,
				[name]: selectedOption,
			}

			setState(baseState)

			let year = ''
			let jobcategory = ''
			let region = ''
			let careertopic = ''
			const categories = [] as string[]

			if (baseState.date) year = baseState.date.value ?? ''
			if (baseState.jobcategory) jobcategory = baseState.jobcategory.value ?? ''
			if (baseState.region) region = baseState.region.value ?? ''
			if (baseState.careertopic) careertopic = baseState.careertopic.value ?? ''

			let yearNumber = 0
			yearNumber = year === '' ? 0 : Number(year)

			if (jobcategory !== '') categories.push(jobcategory)
			if (region !== '') categories.push(region)
			if (careertopic !== '') categories.push(careertopic)

			// FetchPressReleasesFeatures(true, 0, false, false, yearNumber, categories)
			fetchPageDataByDocType(
				'careersArticlePage',
				999,
				true,
				yearNumber,
				categories,
			)
				.then((response: UrlsGqlResponse) => {
					if (response.contents.length > 0) {
						if (response.contents.length > COUNT_POSTS) {
							setFilteredArray(
								response.contents.slice(startLoadWith, COUNT_POSTS),
							)
						}

						setFilteredArray(response.contents)
					}
				})
				.finally(() => {
					setIsLoadingPosts(false)
				})
		}
	}

	return (
		<Layout>
			{header}
			<section className="block-stories">
				<DContainer>
					<div
						className={`block-stories__form ${isLoadingPosts ? 'loading' : ''}`}
					>
						<div className="block-stories__search" />
						<div className="block-stories__filters">
							<div className="block-stories__form-field form-field">
								<Select
									isClearable
									name="careertopic"
									placeholder="By topic"
									options={careerTopicsList}
									value={state.careertopic}
									onChange={(selectedOption, select) => {
										onSelectChange(selectedOption, select)
									}}
								/>
							</div>
							<div className="block-stories__form-field form-field">
								<Select
									isClearable
									name="region"
									placeholder="By region"
									options={regionsList}
									value={state.region}
									onChange={(selectedOption, select) => {
										onSelectChange(selectedOption, select)
									}}
								/>
							</div>
							<div className="block-stories__form-field form-field">
								<Select
									isClearable
									name="jobcategory"
									placeholder="By business area"
									options={jobCategoriesList}
									value={state.jobcategory}
									onChange={(selectedOption, select) => {
										onSelectChange(selectedOption, select)
									}}
								/>
							</div>
							<div className="block-stories__form-field form-field">
								<Select
									isClearable
									name="date"
									placeholder="By year"
									options={yearsOptions}
									value={state.date}
									onChange={(selectedOption, select) => {
										onSelectChange(selectedOption, select)
									}}
								/>
							</div>
						</div>
					</div>
					<PaginationProvider isGrid data={filteredArray} pageSize={9}>
						<div className="block-stories__list-stories">
							<Results
								isGrid
								renderItem={(card: PartialPage) => (
									<div
										key={card._id}
										className="block-stories__list-stories-col"
									>
										<DCard
											_id={card._id}
											image={{
												_id: card._id,
												url: card?.pageListingImage?.url,
												alt: card?.metaDescription,
											}}
											linkUrl={card.url}
											title={card.title}
											headingLevel={HeadingLevel.H4}
											date={card?.articleDate}
											tags={card.categoryPages}
											className="card-latest-story"
											videoUrl={card?.videoUrl}
										/>
									</div>
								)}
							/>
						</div>
					</PaginationProvider>
				</DContainer>
			</section>
			{body}
		</Layout>
	)
}
