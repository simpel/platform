import { fetchCategories } from 'lib/cms/api'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { CategoryLite } from 'types'
import { getLatestYearsForSelect } from 'utilities/latestYears'

export const usePressReleaseFilters = ({ isInvesterNews }) => {
	const [topicslist, setTopicslist] = useState([] as CategoryLite[])
	const [regionslist, setRegionslist] = useState([] as CategoryLite[])
	const [drinkslist, setDrinkslist] = useState([] as CategoryLite[])
	const [investorList, setInvestorlist] = useState([] as CategoryLite[])

	useEffect(() => {
		const fn = async () => {
			const promised = await Promise.all(
				isInvesterNews
					? [fetchCategories('investor-categories')]
					: [
							fetchCategories('topics'),
							fetchCategories('regions'),
							fetchCategories('drink-categories'),
					  ],
			)
			if (isInvesterNews) {
				setInvestorlist(promised[0]?.contents || [])
			} else {
				setTopicslist(promised[0]?.contents || [])
				setRegionslist(promised[1]?.contents || [])
				setDrinkslist(promised[2]?.contents || [])
			}
		}

		fn()
	}, [isInvesterNews])
	const yearsOptions = getLatestYearsForSelect('decrease', 2010).reduce(
		(acc, cur) => {
			acc[cur.label.toString()] = {
				...cur,
				dataCount: 0,
				name: 'year',
			}
			return acc
		},
		{},
	)
	const getTitles = (arr: CategoryLite[], name: string) => {
		const obj = arr.reduce((acc, cur) => {
			acc[cur._id] = {
				value: cur.title,
				label: cur.title,
				name,
				dataCount: 0,
				categoryId: cur._id,
			}
			return acc
		}, {})
		return obj
	}

	const customFilter = (row, value) => {
		const categoryPages = row.categoryPages || []
		return categoryPages.find(({ _id }) => _id === value)
	}

	const customiseOptions = (row, options, storedFilters) => {
		const { categoryPages } = row
		let newOptions = options
		if (categoryPages) {
			newOptions = Object.keys(options).reduce((acc, cur) => {
				acc[cur] = options[cur]
				const category = categoryPages.find(({ _id }) => _id === cur)
				if (category) {
					acc[cur].dataCount += 1
					acc[cur].isSelected =
						storedFilters[acc[cur].name]?.includes(options[cur].value) || false
				}
				return acc
			}, {})
		}
		const selectedCount = Object.keys(newOptions).reduce((acc, cur) => {
			const { isSelected } = options[cur]
			if (isSelected) {
				return acc + 1
			}
			return acc
		}, 0)
		return { newOptions, selectedCount }
	}
	const resetCounter = (options) =>
		Object.keys(options).reduce((acc, cur) => {
			acc[cur] = {
				...options[cur],
				dataCount: 0,
				isSelected: false,
			}
			return acc
		}, {})
	const filters = [
		{
			name: 'year',
			label: 'Year',
			dataKey: 'articleDate',
			isExpanded: true,
			customOptionLabel: (row, label) => {
				return moment(row.articleDate).year()
			},
			customFilter: (row, value, label) => {
				return label == moment(row.articleDate).year()
			},
			resetCounter,
			options: yearsOptions,
		},
		...(isInvesterNews
			? [
					{
						name: 'investor',
						label: 'Investor Category',
						dataKey: 'categoryPages',
						isExpanded: true,
						customFilter,
						customiseOptions,
						resetCounter,
						options: getTitles(investorList, 'investor'),
					},
			  ]
			: [
					{
						name: 'region',
						label: 'Region',
						dataKey: 'categoryPages',
						isExpanded: true,
						customFilter,
						customiseOptions,
						resetCounter,
						options: getTitles(regionslist, 'region'),
					},
					{
						name: 'topics',
						label: 'Topics',
						dataKey: 'categoryPages',
						isExpanded: true,
						customFilter,
						customiseOptions,
						resetCounter,
						options: getTitles(topicslist, 'topics'),
					},
					{
						name: 'drinks',
						label: 'Drink categories',
						dataKey: 'categoryPages',
						isExpanded: true,
						customFilter,
						customiseOptions,
						resetCounter,
						options: getTitles(drinkslist, 'drinks'),
					},
			  ]),
	]
	return {
		filters,
	}
}
