import React from 'react'

type CheckboxProps = {
	_id: string
	className?: string
	props?: React.HTMLProps<HTMLInputElement>
	text?: string
	name: string
	onChange: (obj: any) => void
}

const CheckboxField = ({
	_id,
	className,
	text,
	name,
	onChange,
	props,
}: CheckboxProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const obj = {
			_id: _id,
			name: e.target.name,
			checked: e.target.checked,
		}
		onChange(obj)
	}

	return (
		<label
			htmlFor={_id}
			className={`checkbox-filed ${className ? className : ''}`}
		>
			<input
				id={_id}
				type="checkbox"
				className="checkbox-filed__input"
				name={name}
				onChange={(e) => handleChange(e)}
				{...props}
			/>
			<span className="checkbox-filed__marker"></span>
			{text && <span className="checkbox-filed__text">{text}</span>}
		</label>
	)
}

export default CheckboxField
