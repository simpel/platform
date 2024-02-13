import { FinCalItem } from '../../../../types'
import {
	getBaseDateFormat,
	getLocaleDate,
} from '../../../../utilities/dateFormatting'
import React, { useEffect } from 'react'

export default function FinancialCalendarEntryCard({
	name,
	eventDate,
	index,
}: FinCalItem & { index: number }) {
	const executeGoogleEvent = (eventLabel: string) => {
		//@ts-ignore
		if (!window || !window.dataLayer) {
			return
		}
		//@ts-ignore
		window.dataLayer = window.dataLayer || []
		//@ts-ignore
		window.dataLayer.push({
			event: 'customEvent',
			eventCategory: 'investor calendar',
			eventAction: 'Add to calendar click',
			eventLabel,
			eventInteraction: true,
		})
	}
	return (
		<div className="stay_aligned_card_wrapper flex-col-md-6 calendar__card mb--xxs">
			<div className="stay_aligned_card rich-text-editor p--xl rte-themed theme-blue">
				<p>{getBaseDateFormat(eventDate)}</p>
				{name && <h4>{name}</h4>}
				<p className="mt--m">
					<a
						onClick={() => executeGoogleEvent(name)}
						href={`/api/calendar/${index}`}
						className="btn btn-outline"
					>
						<span className="icon_calendar"></span> Add to calendar
					</a>
				</p>
			</div>
		</div>
	)
}
