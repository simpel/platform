import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, HomePageFeatureBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { DoubleFigureItem, PartialPage, Theme } from 'types'
import { usePages } from 'context/pages'
import { ExtractDoubleFigureItems } from 'utilities/functions'

export default function BlockHomePageFeatureBlock({
	customComponent,
}: BlockProps<HomePageFeatureBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')

	let ells: Array<DoubleFigureItem> = []
	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const figgies = f.blocks('optionalFigures')
	if (figgies) {
		ells = ExtractDoubleFigureItems(figgies)
	}

	const props = {
		mainImage: f.imageRefStandard('mainImage'),
		secondaryImage: f.imageRefStandard('secondaryImage'),
		link: f.link2('link'),
		smallTitle: f.text('smallTitle'),
		richTextTitle: f.html('richTextTitle'),
		richTextIntro: f.html('richTextIntro'),
		figuresTitle: f.text('figuresTitle'),
		noTopWhitespace: f.boolean('noTopWhitespace'),
		optionalFigures: ells,
		blockTheme: tmpTheme as Theme,
		insetImageLayout: f.boolean('insetImageLayout'),
		figuresSubText: f.html('figuresSubText'),
	}

	return getComponent<HomePageFeatureBlockProps>(
		Block.HomePageFeatureBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
