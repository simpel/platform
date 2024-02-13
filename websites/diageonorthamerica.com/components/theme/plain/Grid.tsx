import React from 'react'
import { classnames as cn } from 'tailwindcss-classnames'

type Props = {
	columns: Array<JSX.Element | null>
	columnClassName?: HTMLElement['className'] | 'TAILWIND_STRING'
	rowClassName?: HTMLElement['className'] | 'TAILWIND_STRING'
}

/**
 * Helper component for displaying content in a grid.
 * If the className for the columns is not specified it will stack up to
 * 3 columns in row.
 */
function Grid({ columns, columnClassName, rowClassName }: Props) {
	if (!rowClassName) rowClassName = cn('grid', 'grid-cols-12', 'gap-4')
	if (!columnClassName) {
		let span = 6
		const l = columns.length
		if (l === 1) span = 12
		else if (l === 3) span = 4
		columnClassName = `hello col-span-full md:col-span-${span}`
	}
	return (
		<div className={rowClassName}>
			{columns
				.filter((column) => column)
				.map((column) => (
					<div key={column?.key} className={columnClassName}>
						{column}
					</div>
				))}
		</div>
	)
}

export default Grid
