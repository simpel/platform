import { getBaseDateFormat } from '../../../../utilities/dateFormatting'
import React from 'react'
import { FinCalItem } from '../../../../types'

export default function FinancialCalendarPastEvent({
	name,
	eventDate,
}: FinCalItem) {
	return (
		<div className="flex-row">
			<div className="flex-col-md-12">
				<div className="calendar_event_card p--xl">
					<p>{getBaseDateFormat(eventDate)}</p>
					{name && <h4>{name}</h4>}
				</div>
			</div>
		</div>
	)
}
