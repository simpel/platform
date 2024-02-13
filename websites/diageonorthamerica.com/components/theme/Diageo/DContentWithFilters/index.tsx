import React from 'react'
import { useEffect, useState } from 'react'

// utils
import {
	createFilters,
	updateFilterCounts,
	getFilteredData,
	setUrlParams,
	addRemoveFilterToStoredFilter,
	readUrlParams,
	searchData,
} from './utils'

// components
import SearchInput from 'components/theme/plain/SearchInput'
import Filters from './Filters'
import Results from './Results'
import SelectedFilterBadges from './SelectedFilterBadges'
import DefaultResultItem from './ResultItem'
import { PaginationProvider } from './pagination-provider'
import { SearchType } from 'types'
import { useCascadeJVFilters } from './use-cascade-jv-filters'
// import { Filter } from 'pages/[locale]/[[...slug]]';

// import Pagination from './Pagination'

export type Data = any[]
export interface StoredFilters {
	[key: string]: [string]
}
export type UserFilterOption = {
	name: string
	label: string
	dataKey: string
	isExpanded?: boolean
	customOptionLabel?: (row, value) => string | number
	customFilter?: (row, value, label) => boolean
}
export type FilterGroup = {
	name: string
	label: string
	dataKey: string
	options: FilterOption[]
	selectedOptionCount: number
	isExpanded: boolean
	customOptionLabel?: (row, value) => string | number
	customFilter?: (row, value, label) => boolean
	customiseOptions?: (
		row,
		options,
		storedFilters,
	) => { newOptions: FilterOption[]; selectedCount: number }
	resetCounter?: (options: FilterOption[]) => FilterOption[]
}
export type FilterOption = {
	name: string
	label: string
	value: string
	dataKey: string
	dataCount: number
	isSelected: boolean
	isHidden: boolean
	categoryId?: string
}
export type PaginationOptions = {
	itemsPerPage: number
}
export type ContentWithFiltersProps = {
	data: Data
	filters: UserFilterOption[]
	pagination?: PaginationOptions[]
	renderContentItem: (row) => void
	hideSearch?: boolean
	fullbleedContainerOnly?: boolean
	breadcrumbEl?: JSX.Element | null
	customErrorMessage?: string
	searchType: SearchType
	onSearchTermChange?: (query: string) => Promise<any>
	// a prop defining if we're using a newer version of filter
	isRefactored?: boolean
	directFilters?: FilterGroup[]
}

export const ContentListItem = DefaultResultItem

export default function FiltersAndContent(props: ContentWithFiltersProps) {
	const {
		customErrorMessage,
		searchType,
		onSearchTermChange,
		isRefactored,
		directFilters = [],
	} = props
	const renderContentItem = props.renderContentItem
	const filterOptions = props.filters
	const data = props.data

	const [filters, setFilters] = useState<FilterGroup[]>([])
	const [filteredData, setFilteredData] = useState<Data>(data)
	const [storedFilters, setStoredFilters] = useState<StoredFilters>({}) //url params
	const [clearAllTrigger, setClearAllTrigger] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		if (onSearchTermChange) {
			onSearchTermChange(searchTerm)
		}
	}, [searchTerm])

	const whenDataAvailable = (data, existingFilters?: FilterGroup[]) => {
		const storedFilters = readUrlParams()
		const filters =
			existingFilters || createFilters(storedFilters, filterOptions, data)
		const filteredData = getFilteredData(storedFilters, filters, data)

		return {
			storedFilters: storedFilters,
			filters: filters,
			filteredData: filteredData,
		}
	}
	useEffect(() => {
		if (!clearAllTrigger) {
			const { storedFilters, filters, filteredData } = whenDataAvailable(data)
			setFilters(filters)
			setStoredFilters(storedFilters)
			setFilteredData(filteredData)

			if (storedFilters.search) {
				setSearchTerm(storedFilters.search.join(' '))
			}
		} else {
			setClearAllTrigger(true)
		}
	}, [data, clearAllTrigger])

	useEffect(() => {
		const { filteredData } = whenDataAvailable(data, filters)
		let hasFilterApplied = false
		filters.forEach(({ options }) => {
			options.forEach(({ isSelected }) => {
				if (!hasFilterApplied && isSelected) {
					hasFilterApplied = true
				}
			})
		})
		setFilteredData(
			searchTerm
				? searchData(
						searchTerm,
						hasFilterApplied ? filteredData : filteredData,
						searchType,
				  )
				: filteredData,
		)
	}, [searchTerm])

	useCascadeJVFilters({
		searchType,
		storedFilters,
		filterOptions,
		data,
		filteredData,
		setFilters,
	})

	function onFilterChange(groupIndex, optionIndex, selectedFilter) {
		const updatedFilters = [...filters]
		const currentFilter = updatedFilters[groupIndex].options[optionIndex]
		currentFilter.isSelected = !selectedFilter.isSelected

		// set stored filters (used for filtering data)
		const updatedStoredFilters = addRemoveFilterToStoredFilter(
			storedFilters,
			currentFilter,
		)

		// filter data
		let updatedData = data
		if (
			Object.keys(updatedStoredFilters).length >
			Object.keys(storedFilters).length
		) {
			updatedData = filteredData
		}
		updatedData = getFilteredData(
			updatedStoredFilters,
			updatedFilters,
			updatedData,
		)

		// render filters
		// const regeneratedFilters = createFilters(updatedStoredFilters, filterOptions, updatedData);
		const comparedHiddenFilters = updateFilterCounts(
			updatedFilters,
			updatedData,
		)

		setFilters(comparedHiddenFilters)

		//
		setFilteredData(updatedData)

		//
		setUrlParams(updatedStoredFilters)

		//
		setStoredFilters(updatedStoredFilters)
	}

	function onFilterExpandChange(groupIndex, group) {
		const updatedFilters = [...filters]
		const currentGroup = updatedFilters[groupIndex]

		currentGroup.isExpanded = !currentGroup.isExpanded
		setFilters(updatedFilters)
	}

	function onClearAllFilters() {
		setClearAllTrigger(true)
		const F = createFilters({}, filterOptions, data, true)
		setFilters(F)
		setFilteredData(data)
		setUrlParams({})
		setStoredFilters({})
		setSearchTerm('')
	}

	const noJobstFoundMessage =
		'There are currently no jobs available that match this criteria. Please try another search criteria.'
	const noResultsFoundMessage = customErrorMessage
		? customErrorMessage
		: noJobstFoundMessage

	// const UsedFilter = isRefactored ? NewFilters : Filters
	return (
		<>
			{!props.hideSearch &&
				withFullBleedContainer(
					<SearchInput
						size="large"
						name="search"
						placeholder="Search by keyword or region"
						label="I'm interested in..."
						buttonOnClick={setSearchTerm}
						onChange={({ value }) => {
							setStoredFilters((prevState) => ({
								...prevState,
								['search']: [''],
							}))
							setSearchTerm(value || '')
						}}
						defaultValue={searchTerm}
					/>,
					props.fullbleedContainerOnly,
					props.breadcrumbEl,
				)}

			{withFullBleed(
				<div className="careers-container theme-purple">
					<div className="career-results-grid">
						<Filters
							filters={isRefactored ? directFilters : filters}
							onChange={onFilterChange}
							onExpandChange={onFilterExpandChange}
							onClearAllFilters={onClearAllFilters}
						/>

						<div className="vacancies">
							<SelectedFilterBadges
								filters={filters}
								onChange={onFilterChange}
							/>
							{(!filteredData || filteredData.length === 0) && (
								<div>{noResultsFoundMessage}</div>
							)}
							<PaginationProvider data={filteredData}>
								<Results renderItem={renderContentItem} />
							</PaginationProvider>
						</div>
					</div>
				</div>,
				props.fullbleedContainerOnly,
			)}
		</>
	)
}

const withFullBleed = (BaseComponent, fullbleedContainerOnly = false) => {
	if (!fullbleedContainerOnly) {
		return BaseComponent
	}
	return <div className="pageblock--fullbleed">{BaseComponent}</div>
}

export const withFullBleedContainer = (
	BaseComponent,
	fullbleedContainerOnly,
	breadcrumbEl,
) => {
	if (!fullbleedContainerOnly) {
		return <div className="careers-search">{BaseComponent}</div>
	}
	return (
		<div className="searchblock--fullbleed">
			<div className="searchblock--fullbleed--breadcrumb">{breadcrumbEl}</div>
			{BaseComponent}
		</div>
	)
}
