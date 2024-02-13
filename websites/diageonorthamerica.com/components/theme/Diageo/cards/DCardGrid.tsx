import React from 'react'
import cn from 'classnames'
import Container from '../DContainer'
import { Image } from 'types'

type CardProps = {
	_id: string
	isWide?: boolean
	image: Image
	title: string
	text: string
	url: string
	metaLeft?: string
	metaRight?: string
}
export function Card({
	title,
	text,
	url,
	isWide,
	image,
	metaLeft,
	metaRight,
}: CardProps) {
	const cardClasses = cn({
		'card-expressive--wide': isWide === true,
	})

	return (
		<a href={url} className={`card-expressive ${cardClasses}`}>
			<div
				className="card-image"
				style={{ backgroundImage: `url(${image.url})` }}
			>
				<div className="card-meta">
					<span className="card-meta-left">{metaLeft}</span>
					<span className="card-meta-right">{metaRight}</span>
				</div>
				<img className="card-img" src={image.url} alt={image.alt} />
			</div>
			<div className="card-body">
				<div className="card-title">{title}</div>
				<div className="card-text">{text}</div>
			</div>
		</a>
	)
}

type CardGridProps = {
	items: CardProps[]
}
export default function CardGrid({ items }: CardGridProps) {
	// const cardDirection = cn({
	//   'card--row': direction === true,
	// })

	return (
		<Container>
			<div className="card-grid">
				<div className="card-grid-row">
					{items.map((cardProps: CardProps) => (
						<Card {...cardProps} key={cardProps._id} />
					))}
				</div>
			</div>
		</Container>
	)
}
