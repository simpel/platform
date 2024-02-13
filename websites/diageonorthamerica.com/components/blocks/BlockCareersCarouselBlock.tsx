import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	CareersCarouselBlockItem,
	CareersCarouselBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { CmsLink, Theme, Image } from 'types'

export default function BlockCareersCarouselBlock({
	customComponent,
}: BlockProps<CareersCarouselBlockProps>) {
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

	const pageMediaRef = page.referencedMedia
	const pagePageRef = page.referencedContent

	const getBlocks = f.blocks('blockItems').map((block) => {
		let itemLink = {} as CmsLink
		let itemImage = {} as Image
		let authorImage = {} as Image
		let richTextTitle = ''
		let richTextBody = ''
		let quoteText = ''
		let authorSubtext = ''
		let authorName = ''

		block.fields.map((el) => {
			switch (el.alias) {
				case 'richTextTitle':
					richTextTitle = el.html ? el.html : ''
					break
				case 'richTextBody':
					richTextBody = el.html ? el.html : ''
					break
				case 'authorName':
					authorName = el.html ? el.html : ''
					break
				case 'quoteText':
					quoteText = el.html ? el.html : ''
					break

				case 'authorSubtext':
					authorSubtext = el.text ? el.text : ''
					break
				case 'itemImage':
					if (el.mediaList && el.mediaList.length && pageMediaRef) {
						const mediaItem = el.mediaList[0]
						const elImage = pageMediaRef.filter(
							(refMedia) => refMedia._id === mediaItem._id,
						)[0]
						itemImage = {
							...elImage,
							alt: elImage && elImage.title ? elImage.title : '*',
						}
					}
					break
				case 'authorImage':
					if (el.mediaList && el.mediaList.length && pageMediaRef) {
						const mediaItem = el.mediaList[0]
						const elImage = pageMediaRef.filter(
							(refMedia) => refMedia._id === mediaItem._id,
						)[0]
						authorImage = {
							...elImage,
							alt: elImage && elImage.title ? elImage.title : '*',
						}
					}
					break
				case 'itemLink':
					if (el.link != null) {
						itemLink = el.link
					}
					break
			}
		})

		return {
			itemLink: itemLink,
			itemImage: itemImage,
			authorImage: authorImage,
			richTextTitle: richTextTitle,
			richTextBody: richTextBody,
			quoteText: quoteText,
			authorSubtext: authorSubtext,
			authorName: authorName,
		} as CareersCarouselBlockItem
	})

	const props: CareersCarouselBlockProps = {
		blockTheme: tmpTheme as Theme,
		layout: f.text('layout'),
		blockRichTextTitle: f.html('blockRichTextTitle'),
		items: getBlocks,
	}

	return getComponent<CareersCarouselBlockProps>(
		Block.CareersCarouselBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
