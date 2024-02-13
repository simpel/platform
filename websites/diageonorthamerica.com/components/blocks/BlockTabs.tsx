import { getComponent } from 'components'
import { BlockProps, TabProps } from 'components/propTypes'
import { useFields } from 'context/fields'
import { Block } from 'enums'
import { blocks, text } from 'lib/cms/field-utils'

export default function BlockTabs({ customComponent }: BlockProps<TabProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const sections = f.blocks('sections')
	const bgImage = f.mediaRef('backgroundImage')

	if (!sections) return null

	const tabs = sections
		.filter((s) => s.contentType === 'tab')
		.map((tab) => {
			const { fields, _id, key } = tab
			const tabText = text(fields)('tabText')
			const tabContents = blocks(fields)('body')
			return { tabText, tabContents, _id, key }
		})

	const props = { tabs, bgImage, tabContents: [] }

	return getComponent<TabProps>(
		Block.Tabs,
		props,
		componentIdentifier,
		customComponent,
	)
}
