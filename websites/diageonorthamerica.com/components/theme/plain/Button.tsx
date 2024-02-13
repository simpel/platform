import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { ButtonProps } from 'components/propTypes'
import IcoMoonIcon from './IcoMoonIcon'

export default function Button({
	url,
	target,
	rel,
	buttonStyle = 'primary',
	disabled,
	className,
	loading,
	iconName,
	iconNameRight,
	download,
	size = 'medium',
	onClick,
	type,
	ariaLabel,
	...rest
}: ButtonProps) {
	const handleClick = (e) => {
		if (onClick) {
			onClick(e)
		}
	}
	if (url) {
		return (
			<Link
				href={url}
				passHref
				target={target}
				download
				className={getButtonClassName({
					buttonStyle,
					disabled,
					className,
					loading,
					size,
					iconName,
					iconNameRight,
				})}
				rel={rel}
				onClick={(e) => handleClick(e)}
			>
				<ButtonBase
					size={size}
					iconName={iconName}
					iconNameRight={iconNameRight}
					{...rest}
				/>
			</Link>
		)
	} else {
		return (
			<button
				className={getButtonClassName({
					buttonStyle,
					disabled,
					className,
					loading,
					size,
					iconName,
					iconNameRight,
				})}
				onClick={(e) => handleClick(e)}
				{...(type ? { type } : {})}
				aria-label={ariaLabel}
			>
				<ButtonBase
					size={size}
					iconName={iconName}
					iconNameRight={iconNameRight}
					{...rest}
				/>
			</button>
		)
	}
}

export function getButtonClassName({
	buttonStyle,
	className,
	disabled,
	loading,
	size,
	iconName,
}: Partial<ButtonProps>) {
	const buttonBase = cn({
		'btn--with-icon': iconName,
		'btn--disabled': disabled,
		'btn--small': size === 'small',
		'btn--large': size === 'large',
		'btn--loading': loading,
	})

	let buttonClassName = ''

	if (buttonStyle === 'tertiary') buttonClassName = 'btn--tertiary'
	else if (buttonStyle === 'ghost') buttonClassName = 'btn--ghost'

	return `btn ${buttonClassName} ${buttonBase} ${className || ''}`
}

const getSizeIconByButtonSize = (
	size: 'small' | 'medium' | 'large' | 'extra_large' | undefined,
) => {
	switch (size) {
		case 'small': {
			return 14
		}
		case 'medium': {
			return 16
		}
		case 'large': {
			return 20
		}
		case 'extra_large': {
			return 32
		}
		default: {
			return 16
		}
	}
}

const ButtonBase = ({
	iconName,
	iconNameRight,
	text,
	size,
	children,
}: ButtonProps) => {
	return (
		<span className="btn__inner">
			{children && children}
			{iconName && (
				<IcoMoonIcon
					icon={iconName}
					size={getSizeIconByButtonSize(size)}
					className="btn__icon"
				/>
			)}
			{text ? text : ''}
			{iconNameRight && (
				<IcoMoonIcon
					icon={iconNameRight}
					size={getSizeIconByButtonSize(size)}
					className="btn__icon btn__icon--right"
				/>
			)}
		</span>
	)
}
