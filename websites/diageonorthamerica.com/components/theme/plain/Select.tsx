import React from 'react'

// https://react-select.com/home#getting-started
import ReactSelect from 'react-select'
import { type SelectProps } from '../../propTypes'

export default function Select(props: SelectProps) {
	let value = props.value
	if (props.value && props.value.value === '') {
		value = undefined
	}

	return (
		<div className="base-select">
			<ReactSelect
				aria-label="select dropdown"
				{...props}
				value={value}
				classNamePrefix="block-select"
				components={{
					IndicatorSeparator: () => null,
					...props.components,
				}}
			/>

			{/* eslint-disable-next-line react/no-unknown-property */}
			<style global jsx>{`
				.base-select {
					position: relative;
					display: inline-block;
					width: 100%;
				}
				.base-select .block-select__control {
					border-radius: 0px;
					border: 1px solid #000000;
					font-size: 18px;
					line-height: 20px;
					color: #000000;
					padding: 4px 4px;
				}
				.base-select .block-select__control:hover {
					border-color: #000000;
				}
				.block-select__menu-list {
					padding: 8px 4px;
				}
				.base-select .block-select__option {
					font-weight: 400;
					font-size: 16px;
					line-height: 19px;
					padding: 10px 12px;
					padding: 12px 16px;
					white-space: nowrap;
				}
				.base-select .block-select__option--is-focused {
					background: #fcf9ee;
				}
				.base-select .block-select__option--is-selected {
					background: #fcf9ee;
					color: inherit;
				}
				.base-select .block-select__placeholder {
					color: #000000;
				}
				.base-select .block-select__control:hover .block-select__placeholder {
					text-decoration: underline;
				}
				.base-select .block-select__indicator.block-select__dropdown-indicator {
					color: #000000;
				}
				.base-select .block-select__control--is-focused {
					background: #fcf9ee;
					box-shadow:
						0 0 0 1px #000000,
						0 4px 6px -1px rgb(0 0 0 / 0.1),
						0 2px 4px -2px rgb(0 0 0 / 0.1);
				}
			`}</style>
		</div>
	)
}
