import React from 'react'
import CloseIcon from '../../../icons/CloseIcon'

import { FilterGroup, FilterOption } from './index'

export type SelectedFilterBadgesProps = {
	filters: FilterGroup[]
	onChange: (
		groupIndex: number,
		optionIndex: number,
		option: FilterOption,
	) => void
}

export default function SelectedFilterBadges({
	filters,
	onChange,
}: SelectedFilterBadgesProps) {
	return (
		<div className="filter-tags">
			{filters.map((group, groupIndex) =>
				group.options.map((option, optionIndex) => {
					if (option.isSelected) {
						return (
							<span
								className="filter-tag"
								onClick={() => onChange(groupIndex, optionIndex, option)}
								key={option.label}
							>
								<span>{option.label}</span>
								<span className="filter-tag-icon">
									<CloseIcon width="8px" />
								</span>
							</span>
						)
					}
				}),
			)}
		</div>
	)
}
