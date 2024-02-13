import React from 'react'
import { usePaginationContext } from './pagination-context'

export type ResultsProps = {
	renderItem: (row) => void
	isGrid?: boolean
}

export default function Results({ renderItem, isGrid = false }: ResultsProps) {
	const { state } = usePaginationContext()
	const { sliced, length, viewed } = state

	const Wrapper = ({ children }: any) => {
		if (isGrid) {
			return <React.Fragment>{children}</React.Fragment>
		}
		return <div>{children}</div>
	}

	const resultsClass = `vacancies-title${
		isGrid ? ' search-results-centered' : ''
	}`
	return (
		<Wrapper>
			{sliced.map(renderItem)}
			{length !== 0 && viewed !== 0 && (
				<div
					className={resultsClass}
				>{`You've viewed ${viewed} of ${length} results`}</div>
			)}
		</Wrapper>
	)
}
