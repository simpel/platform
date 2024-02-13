import React from 'react'
import cn from 'classnames'

type FigureProps = {
	title: string
	description: string
	isLarge?: boolean
}

function Figure({ title, description, isLarge }: FigureProps) {
	const sizeFigure = cn({
		'figure--large': isLarge,
	})

	return (
		<div className={`figure ${sizeFigure}`}>
			<strong className="figure__title">{title}</strong>
			<p className="figure__description">{description}</p>
		</div>
	)
}

export default Figure
