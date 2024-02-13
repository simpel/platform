import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	SitemapBlockItem,
	SitemapBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { useNavigation } from 'context/navigation'

export default function BlockSitemapBlock({
	customComponent,
}: BlockProps<SitemapBlockProps>) {
	const [f] = useFields()
	const [{ navPages }] = useNavigation()
	const componentIdentifier = f.text('componentIdentifier')
	//  const [{ page }] = usePages()

	//   let tmpTheme = ''

	//   if (page.referencedContent) {
	//     const themeNode = page.referencedContent.find((m) => m._id === f.content('blockTheme')?._id)
	//     if (themeNode) {
	//       tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
	//     }
	//   }

	const pages = [] as SitemapBlockItem[]

	navPages.children.map((itm) => {
		pages.push({
			letter: itm.title.substring(0, 1),
			title: itm.title,
			url: itm.url,
			linktext: itm.title,
		})
		itm.children.map((itm2) => {
			if (itm2.showonsitemap) {
				pages.push({
					letter: itm2.title.substring(0, 1),
					title: itm2.title,
					url: itm2.url,
					linktext: itm.title + ' - ' + itm2.title,
				})
			}
			itm2.children.map((itm3) => {
				if (itm3.showonsitemap) {
					pages.push({
						letter: itm3.title.substring(0, 1),
						title: itm3.title,
						url: itm3.url,
						linktext: itm.title + ' - ' + itm2.title + ' - ' + itm3.title,
					})
				}
				itm3.children.map((itm4) => {
					if (itm4.showonsitemap) {
						pages.push({
							letter: itm4.title.substring(0, 1),
							title: itm4.title,
							url: itm4.url,
							linktext:
								itm.title +
								' - ' +
								itm2.title +
								' - ' +
								itm3.title +
								' - ' +
								itm4.title,
						})
					}
					itm4.children.map((itm5) => {
						if (itm5.showonsitemap) {
							pages.push({
								letter: itm5.title.substring(0, 1),
								title: itm5.title,
								url: itm5.url,
								linktext:
									itm.title +
									' - ' +
									itm2.title +
									' - ' +
									itm3.title +
									' - ' +
									itm4.title +
									' - ' +
									itm5.title,
							})
						}
					})
				})
			})
		})
	})

	const props = {
		title: f.text('title'),
		pages: pages,
	}

	return getComponent<SitemapBlockProps>(
		Block.SitemapBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
