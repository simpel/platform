/* eslint-disable new-cap */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import { type JV2, type RenderSettings } from 'types'
import { getDateAgoFormatting } from 'utilities/dateFormatting'
import Layout from 'components/Layout'

import { fetchSearchResultsVacancies } from 'lib/cms/api/graphql/queries'

import {
	ContentListItem,
	type FilterGroup,
	withFullBleedContainer,
	type StoredFilters,
} from 'components/theme/Diageo/DContentWithFilters'
import { useRouter } from 'next/router'
import { usePages } from 'context/pages'
import Filters from 'components/theme/Diageo/DContentWithFilters/Filters'
import SelectedFilterBadges from 'components/theme/Diageo/DContentWithFilters/SelectedFilterBadges'
import { PaginationProvider } from 'components/theme/Diageo/DContentWithFilters/pagination-provider'
import Results from 'components/theme/Diageo/DContentWithFilters/Results'
import {
	prepareUrlParams,
	readUrlParams,
} from 'components/theme/Diageo/DContentWithFilters/utils'
import SearchInput from 'components/theme/plain/SearchInput'
import uniqBy from 'lodash/uniqBy'
import { createVacanciesFilter } from 'lib/cms/filters/createVacanciesFilter'
import PageCareersJob from '../PageCareersJob'
import { type TFilterParameters } from './TPageCareersResults'

function GetLocationsString(locations) {
	const outy = [] as string[]
	if (locations) {
		locations &&
			locations[0].locations.length > 0 &&
			locations.map((cntry) =>
				cntry.locations.map((loc) => outy.push(loc + ', ' + cntry.country)),
			)
	}

	if (outy.length === 0) {
		return ''
	}

	if (outy.length > 1) {
		return outy.join(' or ')
	}

	return outy[0]
}

const setSelectedCategoriesBasedOnUrlParameters = (filters: FilterGroup[]) => {
	const parameters = readUrlParams()
	const newFilters = filters.map((f) => ({
		...f,
		options: f.options.map((o) => ({
			...o,
			isSelected:
				parameters[f.dataKey] && parameters[f.dataKey].includes(o.value),
		})),
	}))
	return newFilters
}

export type PageCareersResultsPageData = {
	initialVacancies: JV2[]
	initialFilters: FilterGroup[]
}

export default function PageCareersResults() {
	const [f] = useFields()
	const [{ page }] = usePages()

	useEffect(() => {
		if (!page || !page.miscdata) {
			return
		}

		const pageData = page.miscdata as PageCareersResultsPageData
		const { initialVacancies = [], initialFilters = [] } = pageData
		setInitialData(initialVacancies)
		setData(initialVacancies)
		setFilters(initialFilters)
		setInitialFilters(initialFilters)
	}, [page.miscdata])

	// Const { initialVacancies, initialFilters } = page.miscdata as PageFeatureLandingProps
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const [filters, setFilters] = useState<FilterGroup[]>([])
	const [initialFilters, setInitialFilters] = useState<FilterGroup[]>([])
	const [initialData, setInitialData] = useState<JV2[]>([])
	const [data, setData] = useState([] as JV2[])
	const [previousJobId, setPreviousJobId] = useState<string | undefined>()
	const [jobId, setJobId] = useState<string | undefined>()
	const [scrollPosition, setScrollPosition] = useState<number>(0)
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		if (!router || !router.query) {
			return
		}

		const parameters = readUrlParams()

		let filteredOutData = [...initialData]
		filters.map((filter) => {
			switch (filter.name) {
				case 'country': {
					const selected = parameters.country // Filter.options.filter((o) => o.isSelected)
					if (selected && selected.some(Boolean)) {
						filteredOutData = selected.flatMap((s) =>
							filteredOutData.filter((d) =>
								d.locations.some((l) => l.country === s),
							),
						)
					}

					break
				}

				case 'city': {
					const selected = parameters.city // Filter.options.filter((o) => o.isSelected)
					if (selected && selected.some(Boolean)) {
						filteredOutData = selected.flatMap((s) =>
							filteredOutData.filter((d) =>
								d.locations.some((l) => l.locations.includes(s)),
							),
						)
					}

					break
				}

				case 'jobFamilyGroup': {
					const selected = parameters.jobFamilyGroup // Filter.options.filter((o) => o.isSelected)
					if (selected && selected.some(Boolean)) {
						filteredOutData = selected.flatMap((s) =>
							filteredOutData.filter((d) => d.jobFamilyGroup === s),
						)
					}

					break
				}

				case 'subWorkerType': {
					const selected = parameters.subWorkerType // Filter.options.filter((o) => o.isSelected)
					if (selected && selected.some(Boolean)) {
						filteredOutData = selected.flatMap((s) =>
							filteredOutData.filter((d) => d.subWorkerType === s),
						)
					}

					break
				}

				case 'timeType': {
					const selected = parameters.timeType // Filter.options.filter((o) => o.isSelected)
					if (selected && selected.some(Boolean)) {
						filteredOutData = selected.flatMap((s) =>
							filteredOutData.filter((d) => d.timeType === s),
						)
					}

					break
				}
				// No default
			}
		})

		const newFilters = createVacanciesFilter(filteredOutData)
		setFilters(setSelectedCategoriesBasedOnUrlParameters(newFilters))
		setData(filteredOutData)
	}, [router.query, initialData])

	function getJobIdFromUrl() {
		const urlParameters = new URLSearchParams(window.location.search)
		return urlParameters.get('jobid') ?? undefined
	}

	function getSearchTermFromUrl() {
		const urlParameters = new URLSearchParams(window.location.search)
		const term = urlParameters.get('search') || ''
		setSearchTerm(term)
		return term
	}

	// To take the user back to their scroll position
	useEffect(() => {
		if (!jobId) {
			window.scrollTo(0, scrollPosition)
		}
	}, [jobId])

	const handleSearchTermChange = async (query?: string) => {
		if (query) {
			const results = (await fetchSearchResultsVacancies(query)) || []
			let newFilters = createVacanciesFilter(results)
			newFilters = newFilters.map((f) => ({
				...f,
				options: f.options.map((opt) => ({
					...opt,
					isSelected: false,
				})),
			}))
			setData(results)
			setFilters(setSelectedCategoriesBasedOnUrlParameters(newFilters))
			return results
		}

		setFilters(initialFilters)
		setData(initialData)
	}

	useEffect(() => {
		if (!router.isReady) return
		handleSearchTermChange(searchTerm)
	}, [searchTerm])

	// When user uses browsers back button, track change
	useEffect(() => {
		if (!router.isReady) return

		function onBrowserBackButton() {
			setJobId(getJobIdFromUrl())
			setSearchTerm(getSearchTermFromUrl())
		}

		onBrowserBackButton() // Run on load to get job id from url

		window.addEventListener('popstate', onBrowserBackButton, false)
		return () => {
			window.removeEventListener('popstate', onBrowserBackButton)
		}
	}, [router.isReady])

	function onJobClick(event, id) {
		event.preventDefault()
		onJobIdChange(id)
	}

	function onJobIdChange(id) {
		const urlParameters = new URLSearchParams(window.location.search)

		if (id) {
			urlParameters.set('jobid', id)
		} else {
			urlParameters.delete('jobid')
		}

		if (window.history.pushState) {
			const newUrl = `${window.location.pathname}?${urlParameters.toString()}`
			window.history.pushState({ path: newUrl }, '', newUrl)
			const popStateEvent = new PopStateEvent('popstate', {
				state: { path: newUrl },
			})
			dispatchEvent(popStateEvent)
		}

		setJobId(id)

		if (id) {
			setPreviousJobId(id)
			setScrollPosition(window.scrollY)
		}
	}

	if (jobId) {
		return <PageCareersJob jobId={jobId} onJobIdChange={onJobIdChange} />
	}

	const withFullBleed = (BaseComponent, fullbleedContainerOnly = false) => {
		if (!fullbleedContainerOnly) {
			return BaseComponent
		}

		return <div className="pageblock--fullbleed">{BaseComponent}</div>
	}

	const noJobsFoundMessage =
		'There are currently no jobs available that match this criteria. Please try another search criteria.'

	const onFilterChange = (groupIndex, optionIndex, selectedFilter) => {
		const urlParameters: TFilterParameters = {}
		const updatedFilters = [...filters]
		const currentFilter = updatedFilters[groupIndex].options[optionIndex]
		currentFilter.isSelected = !selectedFilter.isSelected
		setFilters(updatedFilters)
		filters.map((filter) => {
			switch (filter.name) {
				case 'country': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.country = selectedOptions
					}

					break
				}

				case 'city': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.city = selectedOptions
					}

					break
				}

				case 'jobFamilyGroup': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.jobFamilyGroup = selectedOptions
					}

					break
				}

				case 'subWorkerType': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.subWorkerType = selectedOptions
					}

					break
				}

				case 'timeType': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.timeType = selectedOptions
					}

					break
				}
				// No default
			}
		})
		const path = prepareUrlParams(urlParameters as StoredFilters)
		const { asPath } = router
		const querylessPath =
			asPath && asPath.includes('?') ? asPath.split('?')[0] : asPath
		router.replace(`${querylessPath}?${path}`, undefined, { shallow: true })
	}

	const onClearAllFilters = () => {
		const { asPath } = router
		const querylessPath =
			asPath && asPath.includes('?') ? asPath.split('?')[0] : asPath
		router.replace(`${querylessPath}`, undefined, { shallow: true })
	}

	const onFilterExpandChange = (groupIndex) => {
		const updatedFilters = [...filters]
		const currentGroup = updatedFilters[groupIndex]
		currentGroup.isExpanded = !currentGroup.isExpanded
		setFilters(updatedFilters)
	}

	return (
		<Layout layoutClass="">
			{header}
			<div className="header" />

			<section className="content-block p--l theme-white">
				<span className="offset-bg--reset" />
				<div className="block-banner">
					<div className="pageblock--fullbleed">
						{/* remove distance,  */}
						{withFullBleedContainer(
							<SearchInput
								size="large"
								name="search"
								placeholder="Search by keyword or region"
								label="I'm interested in..."
								buttonOnClick={setSearchTerm}
								defaultValue={searchTerm}
								onChange={({ value }) => {
									handleSearchTermChange(value)
									// SetStoredFilters((prevState) => ({
									//   ...prevState,
									//   ['search']: [''],
									// }))
									// setSearchTerm(value || '')
								}}
							/>,
							false,
							{},
						)}
						{withFullBleed(
							<div className="careers-container theme-purple">
								<div className="career-results-grid">
									<Filters
										filters={filters}
										onChange={onFilterChange}
										onExpandChange={onFilterExpandChange}
										onClearAllFilters={onClearAllFilters}
									/>

									<div className="vacancies">
										<SelectedFilterBadges
											filters={filters}
											onChange={onFilterChange}
										/>
										{(!data || data.length === 0) && (
											<div>{noJobsFoundMessage}</div>
										)}
										<PaginationProvider data={uniqBy(data, 'key')}>
											<Results
												renderItem={(row: JV2) => (
													<ContentListItem
														key={row.key}
														url={page.url + `?jobid=${row.key}`}
														selected={previousJobId === row.key}
														title={row.jobPostingTitle}
														tags={[
															row.key,
															GetLocationsString(row.locations),
															'Posted ' +
																getDateAgoFormatting(row.jobPostingStartDate),
														]}
														onClick={(event) => {
															onJobClick(event, row.key)
														}}
													/>
												)}
											/>
										</PaginationProvider>
									</div>
								</div>
							</div>,
						)}
						{/* <ContentWithFilters
              isRefactored={true}
              onSearchTermChange={handleSearchTermChange}
              searchType="JOBS"
              data={data}
              directFilters={filters}
              filters={[]}
              renderContentItem={(row: JV2) => (
                <ContentListItem
                  key={row.key}
                  url={page.url + `?jobid=${row.key}`}
                  selected={previousJobId == row.key}
                  title={row.jobPostingTitle}
                  tags={[
                    row.key,
                    GetLocationsString(row.locations),
                    'Posted ' + getDateAgoFormatting(row.jobPostingStartDate),
                  ]}
                  onClick={(e) => onJobClick(e, row.key)}
                />
              )}
            /> */}
					</div>
				</div>
			</section>
		</Layout>
	)
}
