import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, PageHeaderBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { DoubleFigureItem, Theme } from 'types'

import { useNavigation } from 'context/navigation'
import { usePages } from 'context/pages'
import { ExtractDoubleFigureItems } from 'utilities/functions'
import { useLocale } from 'context/locale'

//import getCurrentThemeComponent from '../../utilities/themeComponent'

export default function BlockPageHeaderBlock({
	customComponent,
}: BlockProps<PageHeaderBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [{ localePage }] = useLocale()
	const componentIdentifier = f.text('componentIdentifier')
	let ells: Array<DoubleFigureItem> = []

	let tmpTheme = ''
	const useApplyLink = page.sectionId === 1687
	let applyHref = '/en/careers/search-and-apply/'

	const [{ breadcrumbs }] = useNavigation()

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

	const temp = localePage.fields.find((f) => f.alias === 'careersSearchPage')
		?.content?._id
	if (localePage.referencedContent && temp) {
		const applyNode = localePage.referencedContent.find((m) => m._id === temp)
			?.url
		if (applyNode) {
			applyHref = applyNode
		}
	}

	const props = {
		layout: f.text('layout'),
		aboveTitle: f.text('aboveTitle'),
		richTextTitle: f.html('richTextTitle'),
		textBody: f.html('textBody'),
		secondaryTextBody: f.html('secondaryTextBody'),
		image: f.imageRef('mainImage'),
		optionalFigures: ells,
		breadcrumbs: breadcrumbs,
		theme: tmpTheme as Theme,
		useApplyLink: useApplyLink,
		applyUrl: applyHref,
	}

	return getComponent<PageHeaderBlockProps>(
		Block.PageHeaderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
