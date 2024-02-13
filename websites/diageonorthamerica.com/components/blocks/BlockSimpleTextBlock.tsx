import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, SimpleTextBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { DoubleFigureItem, Theme } from 'types'
import { usePages } from 'context/pages'
import { ExtractDoubleFigureItems } from 'utilities/functions'

export default function BlockSimpleTextBlock({
	customComponent,
}: BlockProps<SimpleTextBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let ells: Array<DoubleFigureItem> = []

	let tmpTheme = ''

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
		layout: f.text('layout'),
		richTextTitle: f.html('richTextTitle'),
		richTextBody: f.html('richTextBody'),
		image: f.imageRef('image'),
		linkText: f.text('linkText'),
		link: f.link2('linkAddress'),
		reducedPadding: f.boolean('reducedPadding'),
		optionalFigures: ells,
		theme: tmpTheme as Theme, // we want something like this instead f.theme()
	}

	return getComponent<SimpleTextBlockProps>(
		Block.SimpleTextBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
