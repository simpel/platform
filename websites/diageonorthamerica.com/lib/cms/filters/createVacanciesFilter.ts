import { type FilterGroup } from 'components/theme/Diageo/DContentWithFilters'
import { type JV2 } from 'types'
import { getOccurenceCount } from 'utilities/getOccurenceCount/getOccurenceCount'

export const createVacanciesFilter = (data: JV2[]): FilterGroup[] => {
	const cities = data.flatMap((d) =>
		d.locations.flatMap((loc) => loc.locations.map((l) => l)),
	)
	const countries = data.flatMap((d) =>
		d.locations.flatMap((loc) => loc.country),
	)
	const countedCountries = getOccurenceCount(countries.sort())
	const countedCities = getOccurenceCount(cities.sort())
	const jobCategories = getOccurenceCount(
		data.map((d) => d.jobFamilyGroup).sort(),
	)
	const subWorkerTypes = getOccurenceCount(
		data.map((d) => d.subWorkerType).sort(),
	)
	const timeTypes = getOccurenceCount(data.map((d) => d.timeType).sort())

	const countryFilter = {
		name: 'country',
		label: 'All countries/regions',
		isExpanded: true,
		selectedOptionCount: 0,
		dataKey: 'country',
		options: countedCountries
			.filter((f) => f.value)
			.map((entry) => ({
				name: 'country',
				label: entry.value,
				value: entry.value,
				dataCount: entry.count,
				dataKey: 'country',
				isSelected: false,
				isHidden: false,
			})),
	}

	const citiesFilter = {
		name: 'city',
		label: 'Towns/cities',
		isExpanded: true,
		selectedOptionCount: 0,
		dataKey: 'city',
		options: countedCities
			.filter((f) => f.value)
			.map((entry) => ({
				name: 'city',
				label: entry.value,
				value: entry.value,
				dataCount: entry.count,
				dataKey: 'city',
				isSelected: false,
				isHidden: false,
			})),
	}
	const jobCategoriesFilter = {
		name: 'jobFamilyGroup',
		label: 'Business areas',
		isExpanded: true,
		selectedOptionCount: 0,
		dataKey: 'jobFamilyGroup',
		options: jobCategories
			.filter((f) => f.value)
			.map((entry) => ({
				name: 'jobFamilyGroup',
				label: entry.value,
				value: entry.value,
				dataCount: entry.count,
				dataKey: 'jobFamilyGroup',
				isSelected: false,
				isHidden: false,
			})),
	}
	const subWorkerFilter = {
		name: 'subWorkerType',
		label: 'Job Type',
		isExpanded: true,
		selectedOptionCount: 0,
		dataKey: 'subWorkerType',
		options: subWorkerTypes
			.filter((f) => f.value)
			.map((entry) => ({
				name: 'subWorkerType',
				label: entry.value,
				value: entry.value,
				dataCount: entry.count,
				dataKey: 'subWorkerType',
				isSelected: false,
				isHidden: false,
			})),
	}
	const timeTypesFilter = {
		name: 'timeType',
		label: 'Full/Part Time',
		isExpanded: true,
		selectedOptionCount: 0,
		dataKey: 'timeType',
		options: timeTypes
			.filter((f) => f.value)
			.map((entry) => ({
				name: 'timeType',
				label: entry.value,
				value: entry.value,
				dataCount: entry.count,
				dataKey: 'timeType',
				isSelected: false,
				isHidden: false,
			})),
	}

	return [
		countryFilter,
		citiesFilter,
		jobCategoriesFilter,
		subWorkerFilter,
		timeTypesFilter,
	]
}
