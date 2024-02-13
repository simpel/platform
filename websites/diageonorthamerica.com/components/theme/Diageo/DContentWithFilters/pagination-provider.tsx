import React, {
	type PropsWithChildren,
	useEffect,
	useState,
	useMemo,
} from 'react'
import ReactPaginate from 'react-paginate'
import { useMediaQuery } from 'hooks/useMediaQuery/useMediaQuery'
import media from '../../../../constants/media'
// eslint-disable-next-line import/no-cycle
import { PaginationContext, type StateType } from './pagination-context'
import { Chevron } from './chevron'
import { type Data } from './index'

export type TResultsProps = {
	readonly data: Data
	readonly isGrid?: boolean
	readonly pageSize?: number
	readonly align?: 'center' // If needed, extend to 'left' | 'right'
}

const DEFAULT_PAGE_SIZE = 10

export const PaginationProvider = ({
	data = [],
	children,
	isGrid,
	pageSize,
	align,
}: PropsWithChildren<TResultsProps>) => {
	const usedPageSize = pageSize ?? DEFAULT_PAGE_SIZE
	const paginate = (pageIndex: number): Data => {
		const first = pageIndex * usedPageSize
		let last = pageIndex * usedPageSize + usedPageSize
		if (last > data.length) {
			last = data.length
		}
		// eslint-disable-next-line @typescript-eslint/padding-line-between-statements, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
		return [...data].filter((_, index) => {
			return first <= index && index < last
		})
	}

	const getViewed = (currentPage: number) => {
		const viewed = currentPage * usedPageSize
		if (viewed < data.length) {
			return viewed
		}

		return data.length
	}

	const isMobileMd = useMediaQuery(`(min-width: ${media.mobile_md}px)`)

	const [state, setState] = useState<StateType>({
		sliced: paginate(0),
		pageCount: Math.ceil((data?.length || 0) / usedPageSize),
		currentPage: 1,
		offset: usedPageSize,
		length: data.length,
		pageSize: usedPageSize,
		viewed: getViewed(1),
	})
	useEffect(() => {
		setState({
			sliced: paginate(0),
			pageCount: Math.ceil((data?.length || 0) / usedPageSize),
			currentPage: 1,
			offset: usedPageSize,
			length: data.length,
			pageSize: usedPageSize,
			viewed: getViewed(1),
		})
		// eslint-disable-next-line	react-hooks/exhaustive-deps
	}, [data.length])

	const memoizedState = useMemo(() => ({ state }), [state])

	if (!data || data.length === 0) return null
	const handlePageClick = (d: { selected: number }) => {
		const selected = d.selected
		const offset = Math.ceil(selected * usedPageSize)
		const currentPage = selected + 1

		setState((previous) => ({
			...previous,
			sliced: paginate(currentPage - 1),
			viewed: getViewed(currentPage),
			currentPage,
			offset,
		}))
	}

	const paginationItem = 'pagination__item'
	const containerClassName = `pagination ${
		isGrid ? ' pagination-centered' : ''
	} ${align ?? ''}`

	return (
		<PaginationContext.Provider value={memoizedState}>
			{children}
			{isMobileMd ? (
				<ReactPaginate
					key={data.length}
					previousLabel={<Chevron isPrev />}
					nextLabel={<Chevron />}
					breakLabel="…"
					breakClassName={`${paginationItem}__break`}
					breakLinkClassName={`${paginationItem}__break__link`}
					pageCount={state.pageCount}
					pageRangeDisplayed={4}
					marginPagesDisplayed={2}
					containerClassName={containerClassName}
					pageClassName={`${paginationItem}`}
					pageLinkClassName={`${paginationItem}__link`}
					previousClassName={`${paginationItem} ${paginationItem}__prev`}
					previousLinkClassName={`${paginationItem}__prev__link`}
					nextClassName={`${paginationItem} ${paginationItem}__next`}
					nextLinkClassName={`${paginationItem}__next__link`}
					activeClassName={`${paginationItem}-active`}
					onPageChange={handlePageClick}
				/>
			) : (
				<ReactPaginate
					previousLabel={<Chevron isPrev />}
					nextLabel={<Chevron />}
					breakLabel="…"
					breakClassName={`${paginationItem}__break`}
					breakLinkClassName={`${paginationItem}__break__link`}
					pageCount={state.pageCount}
					pageRangeDisplayed={1}
					marginPagesDisplayed={1}
					containerClassName={containerClassName}
					pageClassName={`${paginationItem}`}
					pageLinkClassName={`${paginationItem}__link`}
					previousClassName={`${paginationItem} ${paginationItem}__prev`}
					previousLinkClassName={`${paginationItem}__prev__link`}
					nextClassName={`${paginationItem} ${paginationItem}__next`}
					nextLinkClassName={`${paginationItem}__next__link`}
					activeClassName={`${paginationItem}-active`}
					onPageChange={handlePageClick}
				/>
			)}
		</PaginationContext.Provider>
	)
}
