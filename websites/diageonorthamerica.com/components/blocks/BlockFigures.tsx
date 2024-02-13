import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import {
	type TFiguresBlock,
	type TFigure,
} from 'components/theme/plain/FiguresBlock/TFiguresBlock'

export default function BlockFigures({
	customComponent,
}: BlockProps<TFiguresBlock>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')

	const items = f.blocks('list').map((item): TFigure => {
		const progress =
			item.fields.find((field) => field.alias === 'slider')?.decimal ?? ''
		const description =
			item.fields.find((field) => field.alias === 'topText')?.html ?? ''
		const stat = {
			stat: item.fields.find((field) => field.alias === 'stat')?.text ?? '',
			suffix: item.fields.find((field) => field.alias === 'suffix')?.text,
			description: item.fields.find((field) => field.alias === 'bottomText')
				?.text,
		}

		return {
			progress,
			description,
			stat,
		}
	})

	const props = {
		heading: f.html('title') ?? '',
		caption: f.text('caption'),
		items,
	}

	return getComponent<TFiguresBlock>(
		Block.Figures,
		props,
		componentIdentifier,
		customComponent,
	)
}
