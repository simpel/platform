import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { usePages } from 'context/pages'
import {
	BlockProps,
	PressReleasePageContentRowProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { Theme } from 'types'

export default function BlockPressReleasePageContentRow({
	customComponent,
}: BlockProps<PressReleasePageContentRowProps>) {
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

	const props = {
		mainContent: f.blocks('mainContent'),
		asideContent: f.blocks('asideContent'),
		theme: tmpTheme as Theme,
	}

	// const mainContent = renderBlocks(f.blocks('mainContent'))
	// const asideContent = renderBlocks(f.blocks('asideContent'))

	//console.log(mainContent)

	return getComponent<PressReleasePageContentRowProps>(
		Block.PressReleasePageContentRow,
		props,
		componentIdentifier,
		customComponent,
	)
}

//export default BlockPressReleasePageContentRow
