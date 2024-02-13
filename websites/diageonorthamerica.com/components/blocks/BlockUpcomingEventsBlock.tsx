import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, UpcomingEventsBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { FinCalItem, FinContainer, Theme } from 'types'
import { useEffect, useState } from 'react'
import { fetchFinData } from 'lib/cms/api'

export default function BlockUpcomingEventsBlock({
	customComponent,
}: BlockProps<UpcomingEventsBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const [data, setData] = useState({} as FinContainer)

	useEffect(() => {
		fetchFinData().then((res: FinContainer) => {
			setData(res)
		})
	}, [])

	let evts = [] as FinCalItem[]

	if (data && data.eventItems) {
		evts = data.eventItems
			.filter((c) => new Date(c.eventDate) > new Date())
			.sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1))
			.slice(0, 2)
	}

	const props = {
		title: f.text('title'),
		link: f.link2('link'),
		blockTheme: tmpTheme as Theme,
		events: evts,
	}

	return getComponent<UpcomingEventsBlockProps>(
		Block.UpcomingEventsBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
