import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, DoubleFigureItemsProps } from 'components/propTypes'
import { Block } from 'enums'
import { DoubleFigureItem } from 'types'

export default function BlockDoubleFigureItems({
	customComponent,
}: BlockProps<DoubleFigureItemsProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const ells: Array<DoubleFigureItem> = []
	let utextsymbol = ''
	let utext = ''
	let utextsuffix = ''
	let ltext = ''

	f.blocks('blocks').map((fig) => {
		utext = ''
		utextsuffix = ''
		ltext = ''
		fig.fields.map((el) => {
			switch (el.alias) {
				case 'symbol':
					utextsymbol = el.text ? el.text : ''
					break
				case 'upperText':
					utext = el.text ? el.text : ''
					break
				case 'upperTextSuffix':
					utextsuffix = el.text ? el.text : ''
					break
				case 'lowerText':
					ltext = el.text ? el.text : ''
					break
			}
		})
		ells.push({
			symbol: utextsymbol,
			upperText: utext,
			upperTextSuffix: utextsuffix,
			lowerText: ltext,
		})
	})

	const props = {
		figures: ells,
	}

	return getComponent<DoubleFigureItemsProps>(
		Block.DoubleFigureItems,
		props,
		componentIdentifier,
		customComponent,
	)
}
