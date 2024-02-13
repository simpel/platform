type OptionType = {
	value: string
	label: string
}

export const getYearsForSelect = <T extends string | number>(
	years: T[],
): OptionType[] => {
	if (years.length === 0) return []
	const dataForSelect: OptionType[] = []

	for (let i = 0; i <= years.length - 1; i++) {
		const optionObj = {
			value: years[i].toString(),
			label: years[i].toString(),
		}
		dataForSelect.push(optionObj)
	}

	return dataForSelect
}

export const getLatestYearsForSelect = (
	orderList?: 'increase' | 'decrease',
	baseYear = 2020,
): OptionType[] => {
	const lastYear = new Date().getFullYear()
	const dataForSelect: OptionType[] = []

	for (let i = baseYear; i <= lastYear; i++) {
		const optionObj = {
			value: i.toString(),
			label: i.toString(),
		}
		dataForSelect.push(optionObj)
	}

	if (orderList === 'decrease') {
		return dataForSelect.reverse()
	}

	return dataForSelect
}
