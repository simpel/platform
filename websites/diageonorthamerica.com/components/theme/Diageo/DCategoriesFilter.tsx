import React, { useState, useEffect } from 'react'
import { CategoriesFilterSimple } from '../../propTypes'

function DCategoriesFilter({
	heading,
	className,
	categories,
	allCategories,
	handleChooseFilter,
}: CategoriesFilterSimple) {
	const [activeFilter, setActiveFilter] = useState<string>('')

	useEffect(() => {
		if (allCategories) {
			setActiveFilter('all')
		}
	}, [])

	const handleClick = (categories: string[]) => {
		if (handleChooseFilter && categories) {
			handleChooseFilter([categories[0]])
			setActiveFilter(categories[0])
		}
	}

	const executeGoogleEvent = (eventLabel: string) => {
		//@ts-ignore
		if (!window || !window.dataLayer) {
			return
		}
		//@ts-ignore
		window.dataLayer = window.dataLayer || []
		//@ts-ignore
		window.dataLayer.push({
			event: 'customEvent',
			eventCategory: 'Brand Explorer',
			eventAction: 'Product Category click',
			eventLabel,
			eventInteraction: true,
		})
	}

	return (
		<div className={`categories-filter ${className || ''}`}>
			{heading && <p className="categories-filter__heading">{heading}</p>}
			{categories && categories.length && (
				<ul className="categories-filter__list bare-list">
					{allCategories && (
						<li className="categories-filter__item">
							<button
								className={`btn categories-filter__button ${
									activeFilter === 'all' ? 'active' : ''
								}`}
								onClick={() =>
									handleClick &&
									(handleClick(['all']), executeGoogleEvent('all'))
								}
								aria-label="All"
							>
								All
							</button>
						</li>
					)}
					{categories.map((category) => (
						<li key={category._id} className="categories-filter__item">
							<button
								className={`btn categories-filter__button ${
									activeFilter === category._id ? 'active' : ''
								}`}
								onClick={() =>
									handleClick &&
									(handleClick([category._id]),
									executeGoogleEvent(category.title))
								}
								aria-label={category.title}
							>
								{category.title}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default DCategoriesFilter
