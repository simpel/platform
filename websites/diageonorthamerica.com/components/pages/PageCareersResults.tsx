import React, { type ReactNode, useEffect, useState, useCallback } from 'react'

import { type JV2Location, type JV2 } from 'types'
import { getDateAgoFormatting } from 'utilities/dateFormatting'
import Layout from 'components/Layout'

import { fetchSearchResultsVacancies } from 'lib/cms/api/graphql/queries'

import {
	ContentListItem,
	type FilterGroup,
} from 'components/theme/Diageo/DContentWithFilters'
import { useRouter } from 'next/router'
import { usePages } from 'context/pages'
import Filters from 'components/theme/Diageo/DContentWithFilters/Filters'
import SelectedFilterBadges from 'components/theme/Diageo/DContentWithFilters/SelectedFilterBadges'
import { PaginationProvider } from 'components/theme/Diageo/DContentWithFilters/pagination-provider'
import Results from 'components/theme/Diageo/DContentWithFilters/Results'
import { readUrlParams } from 'components/theme/Diageo/DContentWithFilters/utils'
import uniqBy from 'lodash/uniqBy'
import SimpleSearch from 'components/styled-components/Careers/SimpleSearch'
import { useNavigation } from 'context/navigation'
import { createVacanciesFilter } from 'lib/cms/filters/createVacanciesFilter'
import debounce from 'lodash/debounce'
import PageCareersJob from './PageCareersJob'
import { type PageCareersResultsPageData } from './PageCareersResults/PageCareersResults'

type TUrlParameters = {
	country: [string]
	city: [string]
	jobFamilyGroup: [string]
	subWorkerType: [string]
	timeType: [string]
}

function getLocationsString(locations: JV2Location[]) {
	const outy = [] as string[]
	if (locations && locations[0].locations.length > 0) {
		for (const cntry of locations) {
			for (const loc of cntry.locations) {
				outy.push(loc + ', ' + cntry.country)
			}
		}
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
			isSelected: parameters[f.dataKey]?.includes(o.value),
		})),
	}))
	return newFilters
}

export default function PageCareersResults() {
	const [{ page }] = usePages()

	useEffect(() => {
		if (!page?.miscdata) {
			return
		}

		const pageData = page.miscdata as PageCareersResultsPageData
		const { initialVacancies = [], initialFilters = [] } = pageData
		setInitialData(initialVacancies)
		setData(initialVacancies)
		setFilters(initialFilters)
		setInitialFilters(initialFilters)
	}, [page.miscdata])

	const [{ breadcrumbs }] = useNavigation()
	const [filters, setFilters] = useState<FilterGroup[]>([])
	const [initialFilters, setInitialFilters] = useState<FilterGroup[]>([])
	const [initialData, setInitialData] = useState<JV2[]>([])
	const [data, setData] = useState([] as JV2[])
	const [previousJobId, setPreviousJobId] = useState<string | undefined>()
	const [jobId, setJobId] = useState<string | undefined | null>()
	const [scrollPosition, setScrollPosition] = useState<number>(0)
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState('')

	const filterByUrlParameters = (data: JV2[]) => {
		const parameters = readUrlParams()

		let filteredOutData = [...data]

		for (const filter of filters) {
			switch (filter.name) {
				case 'country': {
					const selected = parameters.country // Filter.options.filter((o) => o.isSelected)
					if (selected?.some(Boolean)) {
						// eslint-disable-next-line @typescript-eslint/no-loop-func
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
					if (selected?.some(Boolean)) {
						// eslint-disable-next-line @typescript-eslint/no-loop-func
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
					if (selected?.some(Boolean)) {
						// eslint-disable-next-line @typescript-eslint/no-loop-func
						filteredOutData = selected.flatMap((s) =>
							filteredOutData.filter((d) => d.jobFamilyGroup === s),
						)
					}

					break
				}

				case 'subWorkerType': {
					const selected = parameters.subWorkerType // Filter.options.filter((o) => o.isSelected)
					if (selected?.some(Boolean)) {
						// eslint-disable-next-line @typescript-eslint/no-loop-func
						filteredOutData = selected.flatMap((s) =>
							filteredOutData.filter((d) => d.subWorkerType === s),
						)
					}

					break
				}

				case 'timeType': {
					const selected = parameters.timeType // Filter.options.filter((o) => o.isSelected)
					if (selected?.some(Boolean)) {
						// eslint-disable-next-line @typescript-eslint/no-loop-func
						filteredOutData = selected.flatMap((s) =>
							filteredOutData.filter((d) => d.timeType === s),
						)
					}

					break
				}
				// No default
			}
		}

		const newFilters = createVacanciesFilter(filteredOutData)
		setData(filteredOutData)
		setFilters(setSelectedCategoriesBasedOnUrlParameters(newFilters))
	}

	const fetchTypeSearchResults = async (query: string) => {
		const results = (await fetchSearchResultsVacancies(query)) || []

		return results
	}

	useEffect(() => {
		if (!router?.query) {
			return
		}

		if (router?.query.search) {
			void fetchTypeSearchResults(router.query.search as string).then(
				(results) => {
					filterByUrlParameters(results)
				},
			)
		} else {
			filterByUrlParameters(initialData)
		}
	}, [router.query, initialData])

	function getJobIdFromUrl() {
		const urlParameters = new URLSearchParams(window.location.search)
		return urlParameters.get('jobid')
	}

	function getSearchTermFromUrl() {
		const urlParameters = new URLSearchParams(window.location.search)
		const term = urlParameters.get('search') ?? ''
		return term
	}

	// To take the user back to their scroll position
	useEffect(() => {
		if (!jobId) {
			window.scrollTo(0, scrollPosition)
		}
	}, [jobId])

	const handleSearchTermChange = useCallback(
		debounce((query: string) => {
			void router.replace(
				{
					query: { ...router.query, search: query },
				},
				undefined,
				{ shallow: true },
			)

			setSearchTerm(query)
		}, 500),
		[router.query],
	)

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

	function onJobClick(event: MouseEvent, id: string) {
		event.preventDefault()
		onJobIdChange(id)
	}

	function onJobIdChange(id: string) {
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
		return (
			<PageCareersJob
				jobId={jobId}
				onJobIdChange={(jobId: string) => {
					onJobIdChange(jobId)
				}}
			/>
		)
	}

	const withFullBleed = (
		BaseComponent: ReactNode,
		fullbleedContainerOnly = false,
	) => {
		if (!fullbleedContainerOnly) {
			return BaseComponent
		}

		return <div className="pageblock--fullbleed">{BaseComponent}</div>
	}

	const noJobsFoundMessage =
		'There are currently no jobs available that match this criteria. Please try another search criteria.'

	const onFilterChange = (groupIndex, optionIndex, selectedFilter) => {
		const urlParameters: Partial<TUrlParameters> = {}
		const updatedFilters = [...filters]
		const currentFilter = updatedFilters[groupIndex].options[optionIndex]
		currentFilter.isSelected = !selectedFilter.isSelected
		setFilters(updatedFilters)

		for (const filter of filters) {
			switch (filter.name) {
				case 'country': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.country = selectedOptions as [string]
					}

					break
				}

				case 'city': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.city = selectedOptions as [string]
					}

					break
				}

				case 'jobFamilyGroup': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.jobFamilyGroup = selectedOptions as [string]
					}

					break
				}

				case 'subWorkerType': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.subWorkerType = selectedOptions as [string]
					}

					break
				}

				case 'timeType': {
					const selectedOptions = filter.options
						.filter((o) => o.isSelected)
						.map((s) => s.value)
					if (selectedOptions) {
						urlParameters.timeType = selectedOptions as [string]
					}

					break
				}
				// No default
			}
		}

		void router.replace(
			{
				query: { ...router.query, ...urlParameters },
			},
			undefined,
			{ shallow: true },
		)
	}

	const onClearAllFilters = () => {
		const { asPath } = router
		const querylessPath = asPath?.includes('?') ? asPath.split('?')[0] : asPath

		const search = getSearchTermFromUrl()
		const getClearedPath = () => {
			return search ? `${querylessPath}?search=${search}` : querylessPath
		}

		const clearedPath = getClearedPath()

		void router.replace(clearedPath, undefined, {
			shallow: true,
		})
	}

	const onFilterExpandChange = (groupIndex) => {
		const updatedFilters = [...filters]
		const currentGroup = updatedFilters[groupIndex]
		currentGroup.isExpanded = !currentGroup.isExpanded
		setFilters(updatedFilters)
	}

	return (
		<Layout layoutClass="">
			{/* {header} */}
			<SimpleSearch
				gradient="EVP-Grad-02"
				defaultValue={searchTerm}
				breadcrumbs={breadcrumbs}
				onChange={(value: string) => {
					handleSearchTermChange(value)
				}}
			/>
			<div className="header" />

			<section className="content-block p--l theme-white">
				<span className="offset-bg--reset" />
				<div className="block-banner">
					<div className="pageblock--fullbleed">
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
															getLocationsString(row.locations),
															'Posted ' +
																getDateAgoFormatting(row.jobPostingStartDate),
														]}
														onClick={(event: MouseEvent) => {
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
					</div>
				</div>
			</section>
		</Layout>
	)
}
