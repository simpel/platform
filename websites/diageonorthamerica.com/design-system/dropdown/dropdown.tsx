import React, { Children, type PropsWithChildren, memo } from 'react'
import { type DropdownProps } from './types'

type Props = PropsWithChildren<DropdownProps>

function Label({
	label,
	id,
	className,
}: Pick<Props, 'label' | 'className' | 'id'>) {
	if (label) {
		return (
			<div className={className}>
				<label htmlFor={id}>{label.text}</label>
			</div>
		)
	}

	return null
}

export const Dropdown = memo(
	({
		label,
		options,
		helpText,
		onChange,
		placeholder,
		id,
		...props
	}: Props) => {
		const hasSelected = options.find(({ selected }) => selected)
		return (
			<div className="flex-col-md-12">
				<Label label={label} id={id} className="contactus__label" />
				<div>
					<select
						className="flex-col-md-12"
						id={id}
						onChange={onChange}
						{...props}
						style={{
							padding: '10px',
						}}
					>
						{!hasSelected && (
							<option selected disabled value="" className="hidden">
								{placeholder ?? ''}
							</option>
						)}
						{Children.toArray(
							options.map(({ label, id, ...options_ }) => (
								<option key={`${id}_${label.trim()}`} value={id} {...options_}>
									{label}
								</option>
							)),
						)}
					</select>
					{helpText && <div> {helpText}</div>}
				</div>
			</div>
		)
	},
)

Dropdown.displayName = 'Dropdown'
