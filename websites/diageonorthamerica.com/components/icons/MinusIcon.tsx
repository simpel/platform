import React from 'react'
import Icon, { IconProps } from './SVGIconBase'

export default function MinusIcon(props: IconProps) {
	return (
		<Icon {...props} viewBox="0 0 8 2">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 0.5H8V1.5H0V0.5Z"
				fill="inherit"
			/>
		</Icon>
	)
}
