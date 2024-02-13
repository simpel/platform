import React from 'react'
import Icon, { IconProps } from './SVGIconBase'

export default function LocationIcon(props: IconProps) {
	return (
		<Icon {...props} viewBox="0 0 12 17">
			<path
				d="M6 0.5C2.692 0.5 0 3.21067 0 6.54333C0 11.2787 5.436 16.168 5.66733 16.3733C5.76267 16.458 5.88133 16.5 6 16.5C6.11867 16.5 6.23733 16.458 6.33267 16.374C6.564 16.168 12 11.2787 12 6.54333C12 3.21067 9.308 0.5 6 0.5ZM6 9.83333C4.162 9.83333 2.66667 8.338 2.66667 6.5C2.66667 4.662 4.162 3.16667 6 3.16667C7.838 3.16667 9.33333 4.662 9.33333 6.5C9.33333 8.338 7.838 9.83333 6 9.83333Z"
				fill="inherit"
			/>
		</Icon>
	)
}
