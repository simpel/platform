import React from 'react'
import { DoubleFigureItemsProps } from '../../../components/propTypes'
import { DoubleFigureItem } from 'types'

function MiniStat({ upperText, lowerText }: DoubleFigureItem) {
	return (
		<li>
			<span className="h2 font-semibold">{upperText}</span>
			<p> {lowerText}</p>
		</li>
	)
}

export default function DoubleFigureItems({ figures }: DoubleFigureItemsProps) {
	return (
		<ul className="stats-list">
			{figures &&
				figures.map((child, key) => (
					<MiniStat
						key={key}
						symbol={child.symbol}
						upperText={child.upperText}
						upperTextSuffix={child.upperTextSuffix}
						lowerText={child.lowerText}
					></MiniStat>
				))}
		</ul>
	)
}
