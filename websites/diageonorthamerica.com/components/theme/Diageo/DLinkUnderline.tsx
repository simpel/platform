import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { LinkUnderlineProps } from '../../propTypes'
import IcoMoonIcon from '../plain/IcoMoonIcon'

function DLinkUnderline({
	link,
	icon,
	size = 'medium',
	className,
	onClick,
}: LinkUnderlineProps) {
	const sizeLink = cn({
		'link--medium': size === 'medium',
		'link--large': size === 'large',
	})

	const handleClick = (e) => {
		if (onClick) {
			e.preventDefault()
			onClick(e)
		}
	}

	return (
		<Link
			href={link.url}
			className={`${className ? className : ''} link ${sizeLink}`}
			target={link.target || ''}
			onClick={(e) => handleClick(e)}
		>
			<span className="link__inner">
				{link.name && <span className="link__text">{link.name}</span>}
				{icon && icon.icon && (
					<IcoMoonIcon
						icon={icon?.icon}
						size={icon?.size}
						className="link__icon"
					/>
				)}
			</span>
		</Link>
	)
}

export default DLinkUnderline
