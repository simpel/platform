import React from 'react'
import Icon, { IconProps } from './SVGIconBase'

export default function PlusIcon(props: IconProps) {
	return (
		<Icon {...props} viewBox="0 0 10 10">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.75 4.25V0H4.25V4.25H0V5.75H4.25V10H5.75V5.75H10V4.25H5.75Z"
				fill="inherit"
			/>
		</Icon>
	)
}
