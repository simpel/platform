import React from 'react'
import { usePaginationContext } from './DContentWithFilters/pagination-context'

export type ResultsProps = {
	renderItem: (row, i) => JSX.Element
}

export default function SearchResults({ renderItem }: ResultsProps) {
	const { state } = usePaginationContext()
	const { sliced, length, viewed } = state
	const resultsClass = `vacancies-title`
	return (
		<div>
			{sliced.map(renderItem)}
			{length !== 0 && viewed !== 0 && (
				<div
					className={resultsClass}
				>{`You've viewed ${viewed} of ${length} results`}</div>
			)}
		</div>
	)
}
