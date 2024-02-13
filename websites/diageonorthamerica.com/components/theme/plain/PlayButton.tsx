import React from 'react'
import cn from 'classnames'

import { ButtonProps } from 'components/propTypes'
import { Icons as EnumsIcon } from '../../../enumsIcon'
import Button from './Button'
import IcoMoonIcon from './IcoMoonIcon'

export default function PlayButton({ className, round, ...rest }: ButtonProps) {
	const buttonBase = cn({
		'btn-play--round': round,
	})
	return (
		<Button
			className={`btn-play ${buttonBase} ${className ? className : ''}`}
			{...rest}
		>
			<div className="btn__icon">
				<IcoMoonIcon
					icon={EnumsIcon.Play}
					size={54}
					className="btn__icon-play"
				/>
				<IcoMoonIcon
					icon={EnumsIcon.PlayFilledAlt}
					size={54}
					className="btn__icon-play btn__icon-play-hover"
				/>
			</div>
		</Button>
	)
}
