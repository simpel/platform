import React, { useCallback, useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks, renderByContentType } from 'components'
import { FinCalItem, RenderSettings } from 'types'
import { Block } from 'enums'
import Layout from 'components/Layout'
import { fetchFinData } from '../../lib/cms/api'
import moment from 'moment'
import FinancialCalendarEntryCard from '../theme/plain/FinancialCalendar/FinancialCalendarEntryCard'
import FinancialCalendarPastEvent from '../theme/plain/FinancialCalendar/FinancialCalendarPastEvent'
import { usePages } from 'context/pages'
import { FixMediaPathsInHtml } from 'utilities/functions'

export default function PageFinancialCalendar() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const breadcrumbs = renderByContentType(Block.Breadcrumbs)

	const [upcomingEvents, setUpcomingEvents] = useState<FinCalItem[]>([])
	const [pastEvents, setPastEvents] = useState<FinCalItem[]>([])
	const eventCountIncrement = 5
	const [pastEventCount, setPastEventCount] =
		useState<number>(eventCountIncrement)

	const TopTitle = f.text('topTitle')
	const TopSubtitle = f.text('topSubtitle')
	const midText = f.html('midLinksRichText')

	useEffect(() => {
		fetchData().catch((error) =>
			console.error('Could not fetch financial calendar data.', error),
		)
	}, [])

	const fetchData = async () => {
		const data = await fetchFinData()

		if (data?.eventItems && data?.eventItems.length > 0) {
			setUpcomingEvents(
				data.eventItems
					.filter((event) => {
						return moment(event.eventDate).isAfter(moment.now())
					})
					.sort(({ eventDate: firstDate }, { eventDate: secondDate }) => {
						return moment(firstDate).valueOf() - moment(secondDate).valueOf()
					}),
			)

			setPastEvents(
				data.eventItems
					.filter((event) => {
						return moment(event.eventDate).isBefore(moment.now())
					})
					.sort(({ eventDate: firstDate }, { eventDate: secondDate }) => {
						return moment(secondDate).valueOf() - moment(firstDate).valueOf()
					}),
			)
		}
	}

	const renderUpcomingCalendarItems = () => {
		return upcomingEvents.map((event, index) => (
			<FinancialCalendarEntryCard key={index} {...event} index={event.kkey} />
		))
	}

	const renderPastCalendarItems = () => {
		if (pastEvents.length === 0) return null

		let currentlyAppliedYear = -1

		return pastEvents
			.filter((_, index) => index < pastEventCount)
			.map((event, index) => {
				const markup = [<FinancialCalendarPastEvent key={index} {...event} />]

				// Add year heading if necessary.
				if (event.year !== currentlyAppliedYear) {
					currentlyAppliedYear = event.year
					markup.unshift(
						<div className="flex-row" key={event.year + index}>
							<div className="flex-col-md-12">
								<h4 className="mt--m mb--m">{currentlyAppliedYear}</h4>
							</div>
						</div>,
					)
				}

				return <div key={index}>{markup}</div>
			})
	}

	const incrementPastEventCount = useCallback(
		(event) => {
			event.preventDefault()
			setPastEventCount((prevEventCount) =>
				Math.min(prevEventCount + eventCountIncrement, pastEvents.length),
			)
		},
		[pastEvents, eventCountIncrement],
	)

	return (
		<Layout>
			{header}
			{breadcrumbs}
			<section className="flex-container-wrapper mb--m mt--m">
				<div className="flex-row">
					<div className="flex-col-md-12 -mb-5">
						<h2 className="mb--xxs">{TopTitle}</h2>
						{TopSubtitle && <h5>{TopSubtitle}</h5>}
					</div>
				</div>

				<div className="flex-row">{renderUpcomingCalendarItems()}</div>
			</section>

			<section className="flex-container-wrapper register-for-email-block">
				<div className="flex-row">
					<div className="flex-col-md-12">
						<div
							className="rich-text-editor p--xl theme-beige-gradient"
							dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(midText) }}
						></div>
					</div>
				</div>
			</section>

			<section className="flex-container-wrapper mt--xxxl">
				<div className="flex-row">
					<div className="flex-col-md-12">
						<h2 className="mb--0">Previous events</h2>
					</div>
				</div>
			</section>

			<section className="flex-container-wrapper mt--0">
				{renderPastCalendarItems()}
			</section>
			{pastEventCount < pastEvents.length && (
				<section className="flex-container-wrapper register-for-email-block mt--l">
					<div className="flex-row">
						<div className="flex-col-md-12">
							<div className="rich-text-editor p--xl">
								<p className="centered">
									<a href="#" onClick={incrementPastEventCount}>
										Load more events
									</a>
								</p>
							</div>
						</div>
					</div>
				</section>
			)}
			{body}
		</Layout>
	)
}
