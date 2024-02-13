import React, { useEffect, useState } from 'react'
import l from 'utilities/l'
import { type TContactField } from './TContactField'

function ContactField({
	label,
	name,
	initalValue,
	id,
	validation,
	isNotValidMessage,
	type,
	onChange,
}: TContactField) {
	const [isValid, setIsValid] = useState(false)
	const [isTouched, setIsTouched] = useState(false)
	const [className, setClassName] = useState('flex-col-md-12')
	const [value, setValue] = useState(initalValue ?? '')

	const hasValue = () => {
		if (isTouched && value !== '') {
			return true
		}

		return false
	}

	const onFieldChange = (eventValue: string) => {
		setValue(eventValue)
	}

	const renderFieldType = () => {
		switch (type) {
			case 'textarea': {
				return (
					<textarea
						name={name}
						className={className}
						id={id}
						value={value}
						required={validation !== undefined}
						onFocus={() => {
							setIsTouched(true)
						}}
						onChange={(event) => {
							onFieldChange(event.target.value)
						}}
					/>
				)
			}

			default: {
				return (
					<input
						name={name}
						type={type}
						className={className}
						value={value}
						id={id}
						required={validation !== undefined}
						onFocus={() => {
							setIsTouched(true)
						}}
						onChange={(event) => {
							onFieldChange(event.target.value)
						}}
					/>
				)
			}
		}
	}

	useEffect(() => {
		if (isValid || !isTouched) {
			setClassName('flex-col-md-12')
		} else {
			setClassName('flex-col-md-12 contactus__error__field')
		}
	}, [isValid])

	useEffect(() => {
		if (isTouched && validation) setIsValid(validation.test(value))

		if (validation) {
			l(name, value, validation.test(value), isValid)
			onChange(name, value, validation.test(value))
		} else {
			setIsValid(false)
			onChange(name, value, false)
		}
	}, [value])

	return (
		<div className="flex-col-md-12">
			{label && (
				<div className="contactus__label">
					<label htmlFor={name}>{label}</label>
				</div>
			)}
			<div className="contactus__field__wrapper">
				{renderFieldType()}

				{!isValid && isTouched && (
					<svg
						width="16"
						height="17"
						viewBox="0 0 16 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 16C12.1421 16 15.5 12.6421 15.5 8.5C15.5 4.35786 12.1421 1 8 1C3.85786 1 0.5 4.35786 0.5 8.5C0.5 12.6421 3.85786 16 8 16Z"
							fill="#AF182E"
						/>
						<path
							d="M8 4.25V10.25"
							stroke="white"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M8 12.75C8.27614 12.75 8.5 12.5261 8.5 12.25C8.5 11.9739 8.27614 11.75 8 11.75C7.72386 11.75 7.5 11.9739 7.5 12.25C7.5 12.5261 7.72386 12.75 8 12.75Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</div>
			{!isValid && hasValue() && isNotValidMessage && (
				<small className="contactus__error__msg">{isNotValidMessage}</small>
			)}
		</div>
	)
}

export default ContactField
