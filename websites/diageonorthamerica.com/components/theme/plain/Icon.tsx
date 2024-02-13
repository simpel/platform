import React from 'react'
import cn from 'classnames'

import { IconProps } from 'components/propTypes'
import icons from '../../../assets/icons/icons.json'

const Icon = ({
	name,
	className,
	size = 'small',
	color = 'black',
}: IconProps) => {
	const iconsObj: { [index: string]: any } = icons
	const path = iconsObj[name]

	const iconSize = cn({
		'icon--ex-small': size === 'ex-small',
		'icon--small': size === 'small',
		'icon--middle': size === 'middle',
		'icon--large': size === 'large',
	})

	return (
		<span className={`icon ${iconSize} ${className || ''}`}>
			<span className="icon__inner">
				<svg
					className={name}
					preserveAspectRatio="xMidYMax meet"
					viewBox="0 0 64 64"
					fill="none"
					width="100%"
					height="100%"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d={path}
						stroke={color}
						strokeWidth="2"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
		</span>
	)
}

export default Icon
