import React from 'react'

export type IconTextProps = {
	icon?: JSX.Element
	text?: string | JSX.Element
	reversed?: boolean
	className?: string
}

export default function IconText({
	icon,
	text,
	reversed,
	className,
	...props
}: IconTextProps) {
	return (
		<div
			className={`icon-text ${className} ${
				reversed ? 'icon-text-reversed' : ''
			}`}
			{...props}
		>
			<span className="icon-text-icon">{icon}</span>
			<span className="icon-text-text">{text}</span>
		</div>
	)
}
