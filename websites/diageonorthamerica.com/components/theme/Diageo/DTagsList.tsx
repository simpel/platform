import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { Link as LinkType } from '../../../types'

type CategoriesListProps = {
	categories: LinkType[]
	className?: string
	direction?: 'row' | 'column'
}

function TagsList({
	categories,
	className,
	direction = 'row',
}: CategoriesListProps) {
	const typeDirection = cn({
		'categories--row': direction === 'row',
		'categories--column': direction === 'column',
	})

	return (
		<div className={`categories ${className || ''} ${typeDirection}`}>
			<ul className="categories__list bare-list">
				{categories &&
					categories.map((category, key) => (
						<li key={key} className="categories__item">
							<Link
								href={category.url || '/'}
								className="categories__link text-uppercase font-semibold"
							>
								{category.name}
							</Link>
						</li>
					))}
			</ul>
		</div>
	)
}

export default TagsList
