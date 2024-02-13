import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, StatsBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { TripleFigureItem, Theme } from 'types'

export default function BlockStatsBlock({
	customComponent,
}: BlockProps<StatsBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const [{ page }] = usePages()

	const ells: Array<TripleFigureItem> = []

	let tmpTheme = ''
	let utextsymbol = ''
	let utext = ''
	let ltext = ''
	let utextSuff = ''

	f.blocks('stats').map((fig) => {
		utext = ''
		ltext = ''
		fig.fields.map((el) => {
			switch (el.alias) {
				case 'symbol':
					utextsymbol = el.text ? el.text : ''
					break
				case 'upperText':
					utext = el.text ? el.text : ''
					break
				case 'lowerText':
					ltext = el.text ? el.text : ''
					break
				case 'upperTextSuffix':
					utextSuff = el.text ? el.text : ''
					break
			}
		})
		ells.push({
			symbol: utextsymbol,
			upperText: utext,
			lowerText: ltext,
			upperSuffix: utextSuff,
			classy: '',
			textSize: 'stat-figure-x',
		})
	})

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const props = {
		heading: f.text('heading'),
		richTextHeading: f.html('richTextHeading'),
		footnote: f.html('footnote'),
		useRichTextHeading: f.boolean('useRichTextHeading'),
		stats: ells,
		blockTheme: tmpTheme as Theme,
		useFourColumns: f.boolean('useFourColumns'),
	}

	return getComponent<StatsBlockProps>(
		Block.StatsBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
