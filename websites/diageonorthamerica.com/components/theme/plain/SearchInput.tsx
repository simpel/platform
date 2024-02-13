import React, { useRef, useEffect } from 'react'
import cn from 'classnames'
import SearchIcon from '../../icons/SearchIcon'

type Props = {
	size: 'middle' | 'large'
	placeholder?: string
	label?: string
	name: string
	buttonOnClick?: (event) => void
	onChange?: ({ value }: { value?: string }) => void
	buttonType?: 'button' | 'submit'
	reversed?: boolean
	defaultValue?: string
}

export default function SearchInput({
	placeholder,
	label,
	name,
	size,
	reversed,
	buttonOnClick,
	onChange,
	buttonType,
	defaultValue,
}: Props) {
	const searchInputRef = useRef<HTMLInputElement>(null)

	const classes = cn({
		'block-search-input--reversed': reversed,
		'block-search-input--middle': size === 'middle',
		'block-search-input--large': size === 'large',
	})

	useEffect(() => {
		const searchRefCurrent = searchInputRef.current
		if (searchRefCurrent) {
			searchRefCurrent.addEventListener('keydown', onEnter)
		}
		return () => {
			if (searchRefCurrent) {
				searchRefCurrent.removeEventListener('keydown', onEnter)
			}
		}
	}, [])

	function handleClick(value: string) {
		if (onChange) onChange({ value })
		if (value === '') {
			onClick()
		}
	}

	function onClick() {
		if (buttonOnClick && searchInputRef.current)
			buttonOnClick(searchInputRef.current.value)
	}

	function onEnter(e) {
		if (e.keyCode === 13) onClick()
	}

	return (
		<div className={`block-search-input ${classes}`}>
			{label && (
				<label className="search-label" htmlFor="search-input">
					{label}
				</label>
			)}
			<div className="s-input">
				<div className="s-form">
					<input
						{...(defaultValue ? { defaultValue } : {})}
						ref={searchInputRef}
						id={name}
						type="search"
						name={name}
						placeholder={placeholder}
						className="s-keyword"
						aria-label={placeholder}
						onChange={(e) => handleClick(e.target.value)}
					></input>
				</div>
				<div className="s-submit">
					<button
						className="s-submit"
						aria-label="Search"
						type={buttonType || 'submit'}
						onClick={onClick}
					>
						<SearchIcon className="s-submit-icon" />
					</button>
				</div>
			</div>
		</div>
	)
}
