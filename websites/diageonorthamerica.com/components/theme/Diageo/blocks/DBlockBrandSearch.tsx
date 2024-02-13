import React, { useState } from 'react'
import DContainer from '../DContainer'
import { HeadingLevel } from 'enums'
import { PartialPage } from 'types'
import { filterPartialPageByTitle } from 'utilities/functions'
import Heading from '../../plain/Heading'
import SearchInput from 'components/theme/plain/SearchInput'
import BrandsSearchDropdown from 'components/theme/plain/BrandsSearchDropdown'

function DBlockBrandSearch({
	subheading,
	headingLg,
	heading,
	categories,
}: {
	subheading?: string
	headingLg?: string
	heading: string
	categories?: PartialPage[]
}) {
	const [filteredArray, setFilterdArray] = useState<PartialPage[] | []>([])

	const handeChangeSearchInput = ({ value }) => {
		const filteredArray = filterPartialPageByTitle({ value, categories })
		if (!filteredArray.length) {
			setFilterdArray([])
		} else {
			setFilterdArray(filteredArray)
		}
	}

	return (
		<section className="block-brand-search">
			<div className="block-brand-search__bg-color"></div>
			<DContainer>
				<div className="block-brand-search__content text-align--center">
					{subheading && (
						<p className="block-brand-search__subheading text-uppercase">
							{subheading}
						</p>
					)}
					{headingLg && (
						<p className="block-brand-search__large-heading">{headingLg}</p>
					)}
					{heading && (
						<Heading
							heading={heading}
							headingLevel={HeadingLevel.H4}
							className="block-brand-search__heading"
						/>
					)}
				</div>
				<div className="block-brand-search__search">
					<SearchInput
						reversed
						name="search"
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
			</DContainer>
		</section>
	)
}

export default DBlockBrandSearch
