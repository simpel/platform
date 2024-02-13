import React, { useState } from 'react'
import Button from '../plain/Button'
import { PartialPage } from 'types'
import { Icons as EnumIcons } from 'enumsIcon'
import { filterPartialPageByTitle } from 'utilities/functions'
import { CategoriesSearchFilterProps } from '../../propTypes'
import SearchInput from 'components/theme/plain/SearchInput'
import BrandsSearchDropdown from 'components/theme/plain/BrandsSearchDropdown'

function DCategoriesSearchFilterMobile({
	className,
	categories,
}: CategoriesSearchFilterProps) {
	const [activeFilter, setActiveFilter] = useState(false)
	const [filteredArray, setFilterdArray] = useState<PartialPage[] | []>([])

	const handleClickToggleFilter = () => {
		setActiveFilter(!activeFilter)
	}

	const handeChangeSearchInput = ({ value }) => {
		const filteredArray = filterPartialPageByTitle({ value, categories })
		if (!filteredArray.length) {
			setFilterdArray([])
		} else {
			setFilterdArray(filteredArray)
		}
	}

	return (
		<div
			className={`categories-filter-mobile ${
				activeFilter ? 'categories-filter-mobile--active-filter' : ''
			} ${className ? className : ''}`}
		>
			<Button
				className="block-brand-explorer__filter-toggler"
				text="Search"
				iconName={EnumIcons.Search}
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
				<div className="categories-filter-mobile__search">
					<SearchInput
						reversed
						name="search-mobile"
						size="large"
						placeholder="Explore a selection of our brands"
						onChange={handeChangeSearchInput}
					/>
					{filteredArray && filteredArray.length > 0 ? (
						<BrandsSearchDropdown categories={filteredArray} />
					) : (
						''
					)}
				</div>
				<div className="categories-filter-mobile__buttons">
					<Button
						text="Close"
						className="categories-filter-mobile__button-results"
						onClick={handleClickToggleFilter}
					/>
				</div>
			</div>
		</div>
	)
}

export default DCategoriesSearchFilterMobile
