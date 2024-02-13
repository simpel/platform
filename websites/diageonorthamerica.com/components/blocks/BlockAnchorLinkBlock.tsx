import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	AnchorLinkItem,
	AnchorLinkBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'

export default function BlockAnchorLinkBlock({
	customComponent,
}: BlockProps<AnchorLinkBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	const downloads = [] as AnchorLinkItem[]

	f.blocks('blocks').map((fig) => {
		const fields = fig.fields
		const postFields = {} as AnchorLinkItem
		for (let i = 0; i < fields.length; i++) {
			const item = fields[i]
			if (item.alias === 'title') {
				postFields.title = item.text ? item.text : ''
			}
			if (item.alias === 'anchorID') {
				postFields.anchorID = item.text ? item.text : ''
			}
		}

		downloads.push(postFields)
	})

	const props = {
		heading: f.text('heading'),
		blocks: downloads,
	}

	return getComponent<AnchorLinkBlockProps>(
		Block.AnchorLinkBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
