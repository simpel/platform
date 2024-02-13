import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	LargeTabBlockItem,
	LargeTabBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { CmsLink, Theme, Media, Content } from 'types'

export default function BlockLargeTabBlock({
	customComponent,
}: BlockProps<LargeTabBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')
	let pageLink = {} as LargeTabBlockItem
	const pageLinks = [] as LargeTabBlockItem[]
	let tmpTheme = ''

	let thrLink = {} as CmsLink

	const blocks = f.blocks('blocks')
	let fieldText = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
		if (blocks && blocks.length) {
			blocks.map((b, index) => {
				pageLink = {} as LargeTabBlockItem
				for (let i = 0; i < b.fields.length; i++) {
					//console.log('Marshall', b.fields[i].alias)
					fieldText = ''
					if (b.fields[i].text && b.fields[i].text?.length) {
						fieldText = '' + b.fields[i].text
					}
					if (b.fields[i].html && b.fields[i].html?.length) {
						fieldText = '' + b.fields[i].html
					}
					switch (b.fields[i].alias) {
						case 'tabTitle':
							pageLink.tabTitle = fieldText
							break
						case 'richTextTitle':
							pageLink.richTextTitle = fieldText
							break
						case 'richTextIntro':
							pageLink.richTextIntro = fieldText
							break
						case 'stat1Prefix':
							pageLink.stat1Prefix = fieldText
							break
						case 'stat1Large':
							pageLink.stat1Large = fieldText
							break
						case 'stat1Suffix':
							pageLink.stat1Suffix = fieldText
							break
						case 'stat1Small':
							pageLink.stat1Small = fieldText
							break
						case 'stat2Prefix':
							pageLink.stat2Prefix = fieldText
							break
						case 'stat2Large':
							pageLink.stat2Large = fieldText
							break
						case 'stat2Suffix':
							pageLink.stat2Suffix = fieldText
							break
						case 'stat2Small':
							pageLink.stat2Small = fieldText
							break
						case 'tabMainLink':
							const linkk = b.fields[i].link as CmsLink
							if (linkk) {
								pageLink.tabMainLink = linkk
							}
							break
						case 'tabImage':
							const imgg = b.fields[i].mediaList as Media[]
							if (page.referencedMedia && imgg) {
								const imgid = imgg[0]._id
								if (imgid != null) {
									const dlObject2 = page.referencedMedia.find(
										(m) => m._id === imgid,
									)
									if (dlObject2) {
										pageLink.tabImage = {
											_id: dlObject2._id,
											url: dlObject2.url,
											alt: '',
										}
									}
								}
							}

							break
						case 'tabLinks':
							const pages = b.fields[i].list as Content[]
							const tabLinks = [] as CmsLink[]
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
											tabLinks.push(thrLink)
										}
									}
								})
								pageLink.tabLinks = tabLinks
							}
							break
					}
				}
				pageLinks.push(pageLink)
			})
		}
	}

	const props = {
		blockTitle: f.text('blockTitle'),
		blocks: pageLinks,
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<LargeTabBlockProps>(
		Block.LargeTabBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
