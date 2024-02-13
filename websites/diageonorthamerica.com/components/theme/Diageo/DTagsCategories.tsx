import React from 'react'
import cn from 'classnames'
import { Link as LinkType } from '../../../types'
import Link from 'next/link'

type TagsCategoriesProps = {
	title: string
	direction: 'row' | 'column'
	border?: boolean
	categories: LinkType[]
}

function TagsCategories({
	title,
	direction,
	border,
	categories,
}: TagsCategoriesProps) {
	const directionCategoriesList = cn({
		'tags-categories__list--row': direction === 'row',
	})

	return (
		<div
			className={`tags-categories ${
				border ? 'tags-categories--with-border' : ''
			}`}
		>
			<h6 className="tags-categories__title text-uppercase font-normal">
				{title}
			</h6>
			<ul
				className={`tags-categories__list bare-list ${directionCategoriesList}`}
			>
				{categories &&
					categories.map((category, key) => (
						<li key={key} className="tags-categories__item">
							<Link
								href={category.url || '/'}
								className="tags-categories__link text-uppercase"
							>
								<strong>{category.name}</strong>
							</Link>
						</li>
					))}
			</ul>
		</div>
	)
}

export default TagsCategories
