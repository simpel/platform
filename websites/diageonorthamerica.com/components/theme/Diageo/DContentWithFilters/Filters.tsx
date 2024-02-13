import React, { useState } from 'react'

import PlusIcon from 'components/icons/PlusIcon'
import MinusIcon from 'components/icons/MinusIcon'
import CloseIcon from 'components/icons/CloseIcon'
import SettingsIcon from 'components/icons/SettingsIcon'

import Button from 'components/theme/plain/Button'

import { FilterGroup } from './index'
import cn from 'classnames'

export type FiltersProps = {
	filters: FilterGroup[]
	onChange: (groupIndex, optionIndex, option) => void
	onExpandChange: (groupIndex, group) => void
	onClearAllFilters: () => void
}

export default function Filters({
	filters,
	onChange,
	onExpandChange,
	onClearAllFilters,
}: FiltersProps) {
	const [filterMenuVisible, setFilterMenuVisible] = useState(false)

	const classNames = cn({
		filters: true,
		open: filterMenuVisible,
	})

	const selectedOptions = filters.reduce((acc, group) => {
		acc += group.selectedOptionCount
		return acc
	}, 0)

	return (
		<div className={classNames}>
			<Button
				className="cwf-filters-button"
				buttonStyle="primary"
				text={`Filters (${selectedOptions})`}
				onClick={() => setFilterMenuVisible(true)}
			>
				<SettingsIcon width="16px" />
			</Button>
			<div className="filter-content">
				<div className="filters-title">
					Filter by:{' '}
					<button
						className="cwf-filters-clear-button"
						onClick={() => onClearAllFilters()}
					>
						clear all
					</button>
				</div>
				<div className="filter-groups">
					{filters.map((group, groupIndex) => (
						<div className="filter" key={group.name}>
							<h3
								className="filter-title"
								onClick={() => onExpandChange(groupIndex, group)}
							>
								<span className="filter-title-text">
									{group.label}{' '}
									{group.selectedOptionCount > 0 && (
										<span className="filter-title-count">
											({group.selectedOptionCount})
										</span>
									)}
								</span>
								<span className="filter-title-icon">
									{group.isExpanded ? (
										<MinusIcon width="8px" fill="black" />
									) : (
										<PlusIcon width="10px" fill="black" />
									)}
								</span>
							</h3>

							<div
								className="filter-options"
								style={{ display: `${group.isExpanded ? 'block' : 'none'}` }}
							>
								{group.options.map((option, optionIndex) => (
									<div
										className={`
                      filter-option 
                      ${option.isSelected ? 'active' : ''} 
                      ${
												!option.isSelected && option.dataCount === 0
													? 'hidden'
													: ''
											}
                    `}
										key={option.label}
										onClick={() => onChange(groupIndex, optionIndex, option)}
									>
										<span>
											{option.label}
											{option.dataCount && <b> ({option.dataCount})</b>}
										</span>
										<span className="filter-option-icon">
											<CloseIcon width="8px" />
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
				<div className="filter-content-footer">
					<Button
						className="cwf-filters-close-button"
						text="Apply"
						onClick={() => setFilterMenuVisible(false)}
					>
						<SettingsIcon width="16px" />
					</Button>
				</div>
			</div>
		</div>
	)
}
