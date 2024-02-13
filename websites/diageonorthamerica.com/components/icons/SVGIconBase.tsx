import React from 'react'

export type IconProps = {
	maxWidth?: string
	width?: string
	style?: { string: string }
	className?: string
	fill?: string
}

export type IconBaseProps = {
	viewBox: string
	children: JSX.Element
}

export default function Icon({
	viewBox,
	maxWidth,
	width = '1em',
	style,
	className,
	fill = 'inherit',
	children,
	...props
}: IconProps & IconBaseProps) {
	return (
		<svg
			style={{
				maxWidth: maxWidth || width,
				width: width || maxWidth,
				...style,
			}}
			className={className}
			viewBox={viewBox}
			fill={fill}
			preserveAspectRatio="xMidYMax meet"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			{children}
		</svg>
	)
}
