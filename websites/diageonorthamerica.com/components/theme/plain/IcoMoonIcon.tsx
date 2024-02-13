import React from 'react'
import IcoMoon from 'react-icomoon'

import iconSet from '../../../assets/icons/selection.json'
import { IconComponentProps } from 'components/propTypes'

const IcoMoonIcon = ({
	className,
	size = 16,
	icon,
	color = 'black',
}: IconComponentProps) => {
	return (
		<span className={`icomoon-icon ${className || ''}`}>
			{icon && (
				<IcoMoon iconSet={iconSet} size={size} icon={icon} color={color} />
			)}
		</span>
	)
}

export default IcoMoonIcon
