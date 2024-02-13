import React from 'react'

import { EventCardProps } from '../../../propTypes'
import { HeadingLevel } from '../../../../enums'

import Heading from '../../plain/Heading'
import Image from '../../plain/Image'
import Button from '../../plain/Button'

function DEventCard({
	image,
	title,
	preTitle,
	text,
	linkCta,
	eventInfo,
}: EventCardProps) {
	return (
		<div className="event-card">
			{image && image.url && (
				<div className="event-card__image">
					<Image image={image} />
				</div>
			)}
			<div className="event-card__body">
				{preTitle && (
					<p className="event-card__pre-heading text-uppercase">{preTitle}</p>
				)}
				{title && (
					<Heading
						heading={title}
						headingLevel={HeadingLevel.H3}
						className="event-card__heading font-semibold"
					/>
				)}
				{text && <p>{text}</p>}
				{eventInfo && eventInfo.title && (
					<p className="event-card__event-title font-semibold">
						{eventInfo.title}
					</p>
				)}
				<ul className="event-card__event-list bare-list font-semibold">
					{eventInfo &&
						eventInfo.events.length &&
						eventInfo.events.map((event, key) => (
							<li className="event-card__event-item" key={key}>
								{event}
							</li>
						))}
				</ul>
				{linkCta && linkCta.url && (
					<Button url={linkCta.url} buttonStyle="ghost" text={linkCta.name} />
				)}
			</div>
		</div>
	)
}

export default DEventCard
