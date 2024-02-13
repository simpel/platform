import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import {
	type TItem,
	type TColumnSectionBlock,
} from 'components/theme/plain/ColumnSectionBlock/TColumnSectionBlock'

export default function BlockColumnSection({
	customComponent,
}: BlockProps<TColumnSectionBlock>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	const items = f.blocks('items').map((item): TItem => {
		const link = item.fields.find((field) => field.alias === 'link')?.link
		return {
			body: item.fields.find((field) => field.alias === 'body')?.html ?? '',
			link: link && {
				href: link?.url,
				label: link?.name ?? '',
			},
		}
	})

	const props = {
		caption: f.text('caption'),
		title: f.html('title'),
		items,
	}

	return getComponent<TColumnSectionBlock>(
		Block.ColumnSection,
		props,
		componentIdentifier,
		customComponent,
	)
}
