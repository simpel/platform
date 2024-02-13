import React, { useContext } from 'react'
import { Data } from '.'

export type StateType = {
	sliced: Data
	pageCount: number
	currentPage: number
	offset: number
	length: number
	pageSize: number
	viewed: number
}

export const PaginationContext = React.createContext({
	state: {
		sliced: [],
		pageCount: 0,
		currentPage: 0,
		offset: 0,
		length: 0,
		pageSize: 0,
		viewed: 0,
	} as StateType,
})

export const usePaginationContext = () => {
	const context = useContext(PaginationContext)

	if (!context) {
		throw new Error(
			'usePaginationContext should be used within a component wrapped by PaginationProvider',
		)
	}

	return context
}
