import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, MultiLinkBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { CmsLink, Theme } from 'types'

export default function BlockMultiLinkBlock({
	customComponent,
}: BlockProps<MultiLinkBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let thrLink = {} as CmsLink
	const pageLinks = [] as CmsLink[]

	let tmpTheme = ''

	const pages = f.list('pageLinks')

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
		if (pages && pages.length) {
			pages.map((itm, index) => {
				for (let i = 0; i < page.referencedContent.length; i++) {
					if (page.referencedContent[i]._id === itm._id) {
						thrLink = {
							url: page.referencedContent[i].url,
							name: page.referencedContent[i].title,
							contentId: itm._id,
							mediaId: '',
							target: '',
						}
						pageLinks.push(thrLink)
					}
				}
			})
		}
	}

	const props = {
		heading: f.text('heading'),
		pageLinks: pageLinks,
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<MultiLinkBlockProps>(
		Block.MultiLinkBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
