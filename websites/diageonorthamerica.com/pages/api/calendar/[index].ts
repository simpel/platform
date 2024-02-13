import { NextApiRequest, NextApiResponse } from 'next'
import { fetchFinData } from '../../../lib/cms/api'
import { FinCalItem } from '../../../types'

export default async function createICalFile(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { index } = req.query

		const data = await fetchFinData()

		const event: FinCalItem | undefined = data?.eventItems.find((obj) => {
			return obj.kkey === parseInt(index as string)
		})

		if (event === undefined) {
			if (req.headers.referer) {
				res.redirect(req.headers.referer!)
			} else {
				throw new Error('No calendar event could be found.')
			}
		} else {
			res.setHeader('Content-Type', 'text/calendar')
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=diageo_event_${getDate(
					event.eventDate,
				)}_${index}.ics`,
			)
			res.send(createCalendarContent(event))
		}
	} catch (error) {
		res.status(500).end(error.message)
	}
}

const matchNonAlphanumerics = /[^\da-z]/gi

function getDate(fromDateTimeString: string): string {
	return fromDateTimeString.split('T')[0].replace(matchNonAlphanumerics, '')
}

function createCalendarContent(fromEvent: FinCalItem): string {
	const { name, eventDate } = fromEvent
	const cleanedDate = getDate(eventDate)
	const timeStamp = new Date().toISOString().split('T')[0].split('-').join('')

	return (
		`BEGIN:VCALENDAR\n` +
		`PRODID:-//Diageo\n` +
		`VERSION:2.0\n` +
		`METHOD:PUBLISH\n` +
		`BEGIN:VEVENT\n` +
		`TZID:Europe/London\n` +
		`DTSTART:${cleanedDate}\n` +
		`DURATION:P1D\n` +
		`UID:${getId(name, cleanedDate)}@diageo.com\n` +
		`DTSTAMP:${timeStamp}\n` +
		`SUMMARY:Diageo - ${name}\n` +
		`URL:N/A\n` +
		`DESCRIPTION:\n` +
		`STATUS:CONFIRMED\n` +
		`CLASS:PUBLIC\n` +
		`END:VEVENT\n` +
		`END:VCALENDAR`
	)
}

function getId(fromName: string, andDate: string): string {
	return `${fromName.replace(matchNonAlphanumerics, '')}_${andDate}@diageo.com`
}
