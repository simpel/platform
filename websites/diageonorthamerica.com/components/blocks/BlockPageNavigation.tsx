import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { type TPageNavigationBlock } from 'components/theme/plain/PageNavigationBlock/TPageNavigationBlock'

export default function BlockPageNavigation({
	customComponent,
}: BlockProps<TPageNavigationBlock>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	const items = f.blocks('links').map((item) => {
		const link = item.fields.find((f) => f.alias === 'link')
		return {
			href: link?.link?.url ?? '',
			label: link?.link?.name ?? '',
			target: link?.link?.target,
		}
	})

	const props = {
		navTitle: f.text('title'),
		items,
	}

	return getComponent<TPageNavigationBlock>(
		Block.PageNavigation,
		props,
		componentIdentifier,
		customComponent,
	)
}
