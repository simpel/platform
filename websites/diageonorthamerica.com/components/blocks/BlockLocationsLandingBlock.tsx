import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	LocationsLandingBlockProps,
	locationsLandingLinkItem,
} from 'components/propTypes'
import { Block } from 'enums'
import { CmsLink, DoubleFigureItem, Theme } from 'types'
import { usePages } from 'context/pages'
import { ExtractDoubleFigureItems } from 'utilities/functions'

export default function BlockLocationsLandingBlock({
	customComponent,
}: BlockProps<LocationsLandingBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let llink = {} as CmsLink | ''

	const getBlocks = f.blocks('blockLinks').map((fig) => {
		fig.fields.map((el) => {
			switch (el.alias) {
				case 'itemLink':
					llink = el.link ? el.link : ''
					break
			}
		})
		return {
			itemLink: llink,
		} as locationsLandingLinkItem
	})

	const props = {
		blockTitle: f.text('blockTitle'),
		blockRichText: f.html('blockRichText'),
		blockImage: f.imageRefStandard('blockImage'),
		linksTitle: f.text('linksTitle'),
		blockLinks: getBlocks,
	}

	// console.log('mhp', { getBlocks })

	return getComponent<LocationsLandingBlockProps>(
		Block.LocationsLandingBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
