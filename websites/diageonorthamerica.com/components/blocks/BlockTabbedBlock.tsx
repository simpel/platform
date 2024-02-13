import { useFields } from 'context/fields'
import { getComponent, renderBlocks } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { type TTabItem, type TTabs } from '@diageo/designsystem'
import { type RenderSettings } from 'types'

export default function BlockTabbedBlock({
	customComponent,
}: BlockProps<TTabs>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const renderSettings: RenderSettings = {
		container: componentIdentifier,
	}
	const tabs = f.blocks('tabs')
	const items: TTabItem[] = tabs.map((tab) => {
		const title = tab.fields.find((field) => field.alias === 'title')
		const content = tab.fields.find((field) => field.alias === 'body')

		return {
			label: title?.text ?? '',
			key: title?.text?.toLowerCase() ?? '',
			children: <>{renderBlocks(content?.blocks ?? [])}</>,
		}
	})
	const props: TTabs = {
		items,
	}

	return getComponent<TTabs>(
		Block.TabbedBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
