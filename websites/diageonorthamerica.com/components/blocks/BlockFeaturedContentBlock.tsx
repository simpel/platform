import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, FeaturedContentBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { DoubleFigureItem, Theme, Image } from 'types'
import { ExtractDoubleFigureItems } from 'utilities/functions'

export default function BlockFeaturedContentBlock({
	customComponent,
}: BlockProps<FeaturedContentBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')
	let ells: Array<DoubleFigureItem> = []
	let tmpTheme = ''

	const blockImage = f.imageRef('blockImage')
	let blkImage = {} as Image

	if (blockImage) {
		blkImage = { _id: blockImage?._id, url: blockImage?.url, alt: '*' }
		const var1 = f.blocks('blockImage')[0]
		if (var1) {
			if (var1.fields[1] && var1.fields[1].text) {
				blkImage = {
					_id: blockImage?._id,
					url: blockImage?.url,
					alt: var1.fields[1].text,
				}
			}
		}
	}

	const figgies = f.blocks('optionalFigures')
	if (figgies) {
		ells = ExtractDoubleFigureItems(figgies)
	}

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}
	const props = {
		richTextHeading: f.html('richTextHeading'),
		blockRichText: f.html('blockRichText'),
		blockImage: blkImage,
		optionalFigures: ells,
		linkText: f.text('linkText'),
		link: f.link2('linkAddress'),
		imageAlign: f.boolean('imageAlign'),
		blockTheme: tmpTheme as Theme,
		popupUsePopup: f.boolean('popupUsePopup'),
		popupLinkText: f.text('popupLinkText'),
		popupContentTitle: f.text('popupContentTitle'),
		popupContentText: f.text('popupContentText'),
		popupButtonText: f.text('popupButtonText'),
		popupTargetUrl: f.text('popupTargetUrl'),
	}

	return getComponent<FeaturedContentBlockProps>(
		Block.FeaturedContentBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
