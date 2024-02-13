import React from 'react'
import Icon, { IconProps } from './SVGIconBase'

export default function CloseIcon(props: IconProps) {
	return (
		<Icon {...props} viewBox="0 0 8 9">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 1.2L7.3 0.5L4 3.8L0.7 0.5L0 1.2L3.3 4.5L0 7.8L0.7 8.5L4 5.2L7.3 8.5L8 7.8L4.7 4.5L8 1.2Z"
				fill="inherit"
			/>
		</Icon>
	)
}
