import { type TOccuranceCount } from './TOccurenceCount'

export const getOccurenceCount = (elements: string[]): TOccuranceCount[] => {
	const result: TOccuranceCount[] = []
	for (const element of elements) {
		const existingIndex = result.findIndex((r) => r.value === element)
		if (existingIndex >= 0) {
			result[existingIndex].count += 1
		} else {
			result.push({ value: element, count: 1 })
		}
	}

	return result
}
