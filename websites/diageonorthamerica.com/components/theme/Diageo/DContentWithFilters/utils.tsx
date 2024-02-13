import {
	Data,
	FilterGroup,
	FilterOption,
	StoredFilters,
	UserFilterOption,
} from './index'
import {
	CategoryPage,
	JobVacancyLite,
	PartialPage,
	SearchType,
} from '../../../../types'
import { NextRouter } from 'next/router'

export function readUrlParams(): StoredFilters {
	const params = {}
	if (typeof window === 'undefined') {
		return params
	}
	const urlParams = new URLSearchParams(window.location.search)

	const entries = urlParams.entries()
	for (const entry of entries) {
		const key = entry[0]
		const values = entry[1].split('<')
		params[key] = values
	}

	return params
}

export function prepareUrlParams(storedFilters: StoredFilters): string {
	const urlParams = new URLSearchParams()
	for (const filterKey in storedFilters) {
		const filterValues = storedFilters[filterKey]
		urlParams.append(filterKey, filterValues.join('<'))
	}
	return urlParams.toString()
}

export function setUrlParams(
	storedFilters: StoredFilters,
	router?: NextRouter,
): void {
	const urlParams = new URLSearchParams()

	for (const filterKey in storedFilters) {
		const filterValues = storedFilters[filterKey]
		urlParams.append(filterKey, filterValues.join('<'))
	}

	if (window.history.replaceState) {
		const newurl = `${window.location.pathname}?${urlParams.toString()}`
		router
			? router.push({
					pathname: window.location.pathname,
					query: { name: 'Someone' },
			  })
			: window.history.replaceState({ path: newurl }, '', newurl)
	}
}

export function createFilters(
	storedFilters: StoredFilters,
	filterOptions: UserFilterOption[],
	rawData: Data,
	isClearFilter = false,
): FilterGroup[] {
	if (!rawData || !storedFilters || !filterOptions) return []
	const userFilters = [...filterOptions]
	const data = rawData
	const filters = [] as FilterGroup[]
	for (let i = 0; i < userFilters.length; i++) {
		const group = { ...userFilters[i] } as FilterGroup
		const groupName = group.name
		const groupDataKey = group.dataKey
		let options = group.options || {}
		const customiseOptions = group.customiseOptions
		group.selectedOptionCount = 0

		if (isClearFilter && group.resetCounter) {
			options = group.resetCounter(options)
		}
		if (groupDataKey.length) {
			for (let j = 0; j < data.length; j++) {
				const row = data[j]
				if (groupDataKey === 'country') {
					const allLocations = row.locations
					if (allLocations && allLocations.length > 0) {
						allLocations.map((loc: any) => {
							const optionValue = loc.country
							if (customiseOptions) {
								const { newOptions, selectedCount } = customiseOptions(
									row,
									options,
									storedFilters,
								)
								group.selectedOptionCount = selectedCount
								options = newOptions
							} else {
								const optionLabel = group.customOptionLabel
									? group.customOptionLabel(row, optionValue)
									: optionValue
								if (optionValue) {
									if (!options[optionLabel]) {
										const isOptionSelected =
											(storedFilters[groupName] &&
												storedFilters[groupName].includes(optionLabel)) ||
											false

										options[optionLabel] = {
											name: group.name,
											label: optionLabel.toString(),
											value: optionValue,
											dataKey: groupDataKey,
											dataCount: 0,
											isSelected: isOptionSelected,
											isHidden: false,
										} as FilterOption

										if (isOptionSelected) {
											group.selectedOptionCount += 1
										}
									}
									options[optionLabel].dataCount += 1
								}
							}
						})
					}
				} else {
					const optionValue = row[groupDataKey]
					if (customiseOptions) {
						const { newOptions, selectedCount } = customiseOptions(
							row,
							options,
							storedFilters,
						)
						group.selectedOptionCount = selectedCount
						options = newOptions
					} else {
						const optionLabel = group.customOptionLabel
							? group.customOptionLabel(row, optionValue)
							: optionValue
						if (optionValue) {
							if (!options[optionLabel]) {
								const isOptionSelected =
									(storedFilters[groupName] &&
										storedFilters[groupName].includes(optionLabel)) ||
									false

								options[optionLabel] = {
									name: group.name,
									label: optionLabel.toString(),
									value: optionValue,
									dataKey: groupDataKey,
									dataCount: 0,
									isSelected: isOptionSelected,
									isHidden: false,
								} as FilterOption

								if (isOptionSelected) {
									group.selectedOptionCount += 1
								}
							}
							options[optionLabel].dataCount += 1
						}
					}
				}
			}
		}
		// sort
		const optionsAsArray = Object.keys(options).map((key) => options[key])
		optionsAsArray.sort((a, b) =>
			(a.name === 'year' ? a.label > b.label : a.label < b.label) ? -1 : 1,
		)

		if (optionsAsArray.length > 0) {
			group.options = optionsAsArray
			filters.push(group)
		}
	}

	return filters
}

export function updateFilterCounts(
	filters: FilterGroup[],
	data: Data,
): FilterGroup[] {
	if (!filters || !data) return []

	const filterGroups = [...filters] as FilterGroup[]

	for (let i = 0; i < filterGroups.length; i++) {
		const group = filterGroups[i]
		const options = group.options
		const optionLabels = [] as string[]
		const dataKey = group.dataKey
		if (dataKey.length) {
			group.selectedOptionCount = 0

			for (let g = 0; g < options.length; g++) {
				const option = options[g]

				// if (selectedFilterName !== option.name) {
				//   option.dataCount = 0
				// }

				if (option.isSelected) {
					group.selectedOptionCount += 1
				}

				optionLabels.push(option.label)
			}

			// for (let j = 0; j < data.length; j++) {
			//   const row = data[j]
			//   let optionIndex

			//   if (group.customOptionLabel) {
			//     optionIndex = optionLabels.indexOf(group.customOptionLabel(row, row[group.dataKey]).toString())
			//   } else {
			//     optionIndex = optionLabels.indexOf(row[group.dataKey])
			//   }

			//   if (optionIndex > -1) {
			//     if (selectedFilterName !== options[optionIndex].name) {
			//       options[optionIndex].dataCount += 1
			//     }
			//   }
			// }
		}
	}

	return filterGroups
}

let selectedFilterName = null

export function addRemoveFilterToStoredFilter(storedFilters, filter) {
	const updatedStoredFilters = { ...storedFilters }
	const dataKey = filter.name
	if (updatedStoredFilters[dataKey]) {
		const existsIndex = updatedStoredFilters[dataKey].indexOf(filter.label)
		if (filter.isSelected && existsIndex === -1) {
			updatedStoredFilters[dataKey].push(filter.label)
		}
		if (!filter.isSelected && existsIndex > -1) {
			updatedStoredFilters[dataKey].splice(existsIndex, 1)
		}
		if (updatedStoredFilters[dataKey].length === 0) {
			delete updatedStoredFilters[dataKey]
		}
	} else {
		updatedStoredFilters[dataKey] = [filter.label]
	}

	selectedFilterName = dataKey
	if (
		Object.keys(updatedStoredFilters).length < Object.keys(storedFilters).length
	) {
		selectedFilterName = null
	}

	return updatedStoredFilters
}

export function getFilteredData(
	storedFilters: StoredFilters,
	filters: FilterGroup[],
	data: Data,
) {
	const filterKeys = Object.keys(storedFilters)
	if (filterKeys.length === 0) return data

	const filteredData = [...data]

	// get only selected filters
	const filtersByName = filters.reduce((acc, filter) => {
		const options = filter.options.filter((o) => o.isSelected)
		if (options.length > 0) {
			acc[filter.name] = { ...filter }
			acc[filter.name].options = options
		}
		return acc
	}, {})

	// match options and remove data if not matched
	for (const key in filtersByName) {
		const group = filtersByName[key]
		const options = group.options

		for (let j = filteredData.length - 1; j >= 0; j--) {
			const row = filteredData[j]
			let optionsMatched = 0

			for (let o = 0; o < options.length; o++) {
				const option = options[o]

				if (group.customFilter) {
					if (
						group.customFilter(
							row,
							option.categoryId || option.value,
							option.label,
						)
					) {
						optionsMatched += 1
					}
				} else if (group.customOptionLabel) {
					if (option.label == group.customOptionLabel(row, option.value)) {
						optionsMatched += 1
					}
				} else if (option.label == row[option.dataKey]) {
					optionsMatched += 1
				}
				if (group.dataKey === 'country') {
					optionsMatched += row.locations.some(
						(l) => l.country === option.value,
					)
						? 1
						: 0
				}
			}

			if (optionsMatched === 0) {
				filteredData.splice(j, 1)
			}
		}
	}

	return filteredData
}

export const searchData = (
	searchTerm: string,
	data: Data,
	searchType: SearchType,
) => {
	const includes = (text: string) => {
		return (
			text?.toLowerCase().includes(searchTerm.toLowerCase().trim()) || false
		)
	}

	const concatenateCategoryPages = (categoryPages: CategoryPage[]) =>
		categoryPages.map((c) => c.title.toLocaleLowerCase().trim()).join(' ')

	if (searchType === 'JOBS') {
		return data.filter((jobVacancy: JobVacancyLite) => {
			const {
				jobPostingTitle,
				primaryJobPostingLocation,
				additionalJobPostingLocations,
			} = jobVacancy
			const concatenatedStringToBeSearched = [
				jobPostingTitle,
				primaryJobPostingLocation,
				additionalJobPostingLocations,
			].join(' ')

			if (includes(concatenatedStringToBeSearched)) {
				return jobVacancy
			}

			return false
		})
	} else {
		return data.filter((page: PartialPage) => {
			const { metaDescription, title, categoryPages } = page
			const baseFields = [metaDescription, title].join(' ')
			const concatenatedStringToBeSearched = categoryPages
				? [concatenateCategoryPages(categoryPages), baseFields].join(' ')
				: baseFields

			if (includes(concatenatedStringToBeSearched)) {
				return page
			}

			return false
		})
	}
}
