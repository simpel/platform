import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, DoubleCardBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { PartialPage, Theme } from 'types'
import { usePages } from 'context/pages'

export default function BlockDoubleCardBlock({
	customComponent,
}: BlockProps<DoubleCardBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')
	let tmpTheme = ''
	const article1 = page.referencedContent?.find(
		(m) => m._id === f.content('card1')?._id,
	)
	const article2 = page.referencedContent.find(
		(m) => m._id === f.content('card2')?._id,
	)

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	let art1 = {} as PartialPage
	let art2 = {} as PartialPage

	if (article1) {
		art1 = article1 as PartialPage
	}
	if (article2) {
		art2 = article2 as PartialPage
	}
	const props = {
		title: f.text('title'),
		viewMoreLink: f.link2('viewMoreLink'),
		viewMoreLinkText: f.text('viewMoreLinkText'),
		card1: art1,
		card1ImageOverride: f.imageRef('card1ImageOverride'),
		card1video: f.text('card1VideoUrl'),
		card2: art2,
		card2ImageOverride: f.imageRef('card2ImageOverride'),
		card2video: f.text('card2VideoUrl'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<DoubleCardBlockProps>(
		Block.DoubleCardBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
