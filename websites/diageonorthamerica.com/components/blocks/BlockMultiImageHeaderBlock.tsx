import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, MultiImageHeaderBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { useNavigation } from 'context/navigation'
import { usePages } from 'context/pages'
import { Theme } from 'types'
import { useLocale } from 'context/locale'

export default function BlockMultiImageHeaderBlock({
	customComponent,
}: BlockProps<MultiImageHeaderBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [{ localePage }] = useLocale()
	const componentIdentifier = f.text('componentIdentifier')
	const [{ breadcrumbs }] = useNavigation()

	let tmpTheme = ''
	const useApplyLink = page.sectionId === 1687
	let applyHref = '/en/careers/search-and-apply/'

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
	// console.log('yadda', temp)
	if (localePage.referencedContent && temp) {
		const applyNode = localePage.referencedContent.find((m) => m._id === temp)
			?.url
		if (applyNode) {
			applyHref = applyNode
		}
	}

	const props = {
		richTextTitle: f.html('richTextTitle'),
		richText: f.html('richText'),
		layout: f.text('layout'),
		mainImage: f.imageRefStandard('mainImage'),
		subImage1: f.imageRefStandard('subImage1'),
		subImage2: f.imageRefStandard('subImage2'),
		noImageHeightConstraint: f.boolean('noImageHeightConstraint'),
		blockTheme: tmpTheme as Theme,
		breadcrumbs: breadcrumbs,
		useApplyLink: useApplyLink,
		applyUrl: applyHref,
		upperTitle: f.text('upperTitle'),
		blockLink: f.link2('blockLink'),
		videoUrl: f.text('videoUrl'),
	}

	return getComponent<MultiImageHeaderBlockProps>(
		Block.MultiImageHeaderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
