import { useEffect } from 'react'
import { createFilters } from './utils'

const filterBySelectedCountry = (selectedCountries, data) =>
	data
		.map((d) => {
			return !selectedCountries.length || selectedCountries.includes(d.country)
				? d
				: false
		})
		.filter(Boolean)

export const useCascadeJVFilters = ({
	searchType,
	storedFilters,
	filterOptions,
	data,
	filteredData,
	setFilters,
}) => {
	useEffect(() => {
		if (searchType === 'JOBS') {
			const filters = createFilters(storedFilters, filterOptions, data)
			const [country] = filters.filter((f) => f.name === 'country')
			const selectedCountries = Array.from(
				new Set(
					country?.options
						.map((o) => {
							if (o.isSelected) {
								return o.value
							}
							return false
						})
						.filter(Boolean) as string[],
				),
			)
			const newFilters = createFilters(
				storedFilters,
				filterOptions,
				filterBySelectedCountry(selectedCountries, data),
			)
			const [location] = filters.filter(
				(f) => f.name === 'primaryJobPostingLocation',
			)
			if (location && selectedCountries.length) {
				location.options = location.options
					.map((o) => {
						const [_, c] = o.value.split(',')
						if (o.isSelected || selectedCountries.includes(c?.trim())) {
							return o
						}
						return false
					})
					.filter(Boolean) as typeof location.options
			}

			const countryLocations = ['country', 'primaryJobPostingLocation']
			const nonCountryLocations = newFilters.filter(
				(f) => !countryLocations.includes(f.name),
			)
			setFilters([country, location, ...nonCountryLocations].filter((f) => !!f))
		}
	}, [filteredData])
}
