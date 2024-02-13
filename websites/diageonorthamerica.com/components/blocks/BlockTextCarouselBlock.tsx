import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	TextCarouselBlockProps,
	TextCarouselItem,
} from 'components/propTypes'
import { Block } from 'enums'
import { CmsLink, Theme } from 'types'
import { usePages } from 'context/pages'

export default function BlockTextCarouselBlock({
	customComponent,
}: BlockProps<TextCarouselBlockProps>) {
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

	let utext = ''
	let ltext = ''
	let llink = {} as CmsLink | ''

	const getBlocks = f.blocks('blocks').map((fig) => {
		utext = ''
		ltext = ''
		fig.fields.map((el) => {
			switch (el.alias) {
				case 'itemTitle':
					utext = el.text ? el.text : ''
					break
				case 'itemRichText':
					ltext = el.html ? el.html : ''
					break
				case 'itemLink':
					llink = el.link ? el.link : ''
					break
			}
		})
		return {
			itemTitle: utext,
			itemRichText: ltext,
			itemLink: llink,
		} as TextCarouselItem
	})

	const props = {
		blocks: getBlocks,
		blockTheme: tmpTheme as Theme,
		richTextTitle: f.html('richTextTitle'),
	}

	return getComponent<TextCarouselBlockProps>(
		Block.TextCarouselBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
