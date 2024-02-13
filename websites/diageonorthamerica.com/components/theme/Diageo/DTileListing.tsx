import React from 'react'
import Link from 'next/link'
import Container from './DContainer'
import RightArrowIcon from '../../../components/icons/RightArrowIcon'

export type TileListingProps = {
	pretitle?: string
	title?: string
	subtitle?: string
	items: TileProps[]
	TileComponent?: (props: TileProps) => JSX.Element
	CtaComponent?: () => JSX.Element
}

export default function TileListing({
	pretitle,
	title,
	subtitle,
	items,
	TileComponent,
	CtaComponent,
}: TileListingProps) {
	return (
		<div className="tile-listings">
			<div className="tile-listings-header">
				<Container>
					<div className="tile-listings-pretitle">{pretitle}</div>
					<div className="tile-listings-title">{title}</div>
					<div className="tile-listings-subtitle">{subtitle}</div>
				</Container>
			</div>
			<Container>
				<div className="tile-listings-tiles">
					{items.map((props: TileProps, index) =>
						TileComponent ? (
							<TileComponent {...props} key={index} />
						) : (
							<Tile
								key={props.title}
								title={props.title}
								subtitle={props.subtitle}
								href={props.href}
							/>
						),
					)}
				</div>
				<div className="tile-listings-cta">
					{CtaComponent && <CtaComponent />}
				</div>
			</Container>
		</div>
	)
}

export type TileProps = {
	title?: string
	subtitle?: string
	href: string
}

export function Tile({ title, subtitle, href }: TileProps) {
	return (
		<Link href={href} legacyBehavior>
			<div className="tile-listing-tile">
				<div className="tile-listing-tile-title">
					<span>{title}</span>
					<span className="tile-listing-tile-icon">
						<RightArrowIcon width="9px" />
					</span>
				</div>
				<div className="tile-listing-tile-subtitle">{subtitle}</div>
			</div>
		</Link>
	)
}
