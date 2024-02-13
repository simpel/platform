import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, BrandPageHeaderBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme } from 'types'

export default function BlockBrandPageHeaderBlock({
	customComponent,
}: BlockProps<BrandPageHeaderBlockProps>) {
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
		mainImage: f.imageRef('mainImage'),
		insetImage: f.imageRef('insetImage'),
		richTextTitle: f.html('richTextTitle'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<BrandPageHeaderBlockProps>(
		Block.BrandPageHeaderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
