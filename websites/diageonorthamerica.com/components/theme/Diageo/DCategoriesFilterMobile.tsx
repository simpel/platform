import React, { useState } from 'react'
import Button from '../plain/Button'
import { Icons as EnumIcons } from 'enumsIcon'
import { CategoriesFilterMultiple, CheckboxProps } from '../../propTypes'
import CheckboxField from '../../form/CheckboxField'

function DCategoriesFilterMobile({
	heading,
	className,
	categories,
	results,
	closeFilterAfterSearch,
	handleChooseFilter,
}: CategoriesFilterMultiple) {
	const [activeFilter, setActiveFilter] = useState(false)
	const [checkedArray, setCheckedArray] = useState<CheckboxProps[]>([])

	const handleClickToggleFilter = () => {
		setActiveFilter(!activeFilter)
	}

	const onHandleChangeFilter = ({ _id, checked, name }) => {
		let updatedList = [...checkedArray]
		if (checked) {
			updatedList = [...checkedArray, { _id: _id, name: name }]
		} else {
			updatedList.splice(checkedArray.indexOf(name), 1)
		}
		setCheckedArray(updatedList)
	}

	const onHandleReset = () => {
		Array.from(document.querySelectorAll('input')).forEach((input) => {
			input.value = ''
			input.checked = false
		})
		setCheckedArray([])
	}

	const onHandleResults = () => {
		if (!handleChooseFilter) return

		checkedArray.map((element) => {
			executeGoogleEvent(element.name)
		})

		handleChooseFilter(checkedArray)
		if (closeFilterAfterSearch) setActiveFilter(false)
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
		<div
			className={`categories-filter-mobile ${
				activeFilter ? 'categories-filter-mobile--active-filter' : ''
			} ${className ? className : ''}`}
		>
			<Button
				className="block-brand-explorer__filter-toggler"
				text="Filters"
				iconName={EnumIcons.Filter}
				onClick={handleClickToggleFilter}
			/>
			<div className="categories-filter-mobile__body">
				<Button
					className="categories-filter-mobile__button-close"
					iconName={EnumIcons.Close}
					size="extra_large"
					onClick={handleClickToggleFilter}
					ariaLabel="Close"
				/>
				{heading && (
					<p className="categories-filter-mobile__heading">{heading}</p>
				)}
				<form
					className="categories-filter-mobile__form"
					onSubmit={(e) => e.preventDefault()}
				>
					<div className="categories-filter-mobile__form-body">
						<ul className="categories-filter-mobile__list bare-list">
							{categories &&
								categories.length &&
								categories.map((category) => (
									<li
										className="categories-filter-mobile__list-item"
										key={category._id}
									>
										<CheckboxField
											_id={category._id}
											text={category.title}
											name={category.title.toLowerCase()}
											className="categories-filter-mobile__category"
											onChange={onHandleChangeFilter}
										/>
									</li>
								))}
						</ul>
						<button
							className="categories-filter-mobile__button-reset"
							type="reset"
							onClick={() => onHandleReset()}
						>
							Clear all filters
						</button>
					</div>
					<div className="categories-filter-mobile__buttons">
						<Button
							className="categories-filter-mobile__button-results"
							text={`View ${results ? results : ''} results`}
							onClick={() => onHandleResults()}
						/>
						<Button
							className="categories-filter-mobile__button-results"
							text="Close"
							onClick={() => setActiveFilter(false)}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default DCategoriesFilterMobile
