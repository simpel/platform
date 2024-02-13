import React from 'react'
import cn from 'classnames'

type Props = {
	children: React.ReactNode
	className?: string
	containerWidth?: 'small' | 'middle' | 'wide'
}

function Container({ children, className, containerWidth }: Props) {
	const typeContainer = cn({
		'container--small': containerWidth === 'small',
		'container--middle': containerWidth === 'middle',
		'container--wide': containerWidth === 'wide',
	})

	return (
		<div className={`container ${typeContainer} ${className || ''}`}>
			{children}
		</div>
	)
}

export default Container
