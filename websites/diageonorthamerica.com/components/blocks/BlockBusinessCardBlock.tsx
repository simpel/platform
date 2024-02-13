import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	ImageAndLinkItem,
	BusinessCardBlockProps,
	BusinessCardItemProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { Theme, CmsLink, Image, Link, Content } from 'types'
import { usePages } from 'context/pages'

export default function BlockBusinessCardBlock({
	customComponent,
}: BlockProps<BusinessCardBlockProps>) {
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

	const getBlocks = f.blocks('blocks').map((block) => {
		let pageLink = ''
		let image = {} as Image
		let title = ''
		let itemText = ''
		let videoUrl = ''

		block.fields.map((el) => {
			// console.log('marshall', { el })

			switch (el.alias) {
				case 'title':
					title = el.text ? el.text : ''
					break
				case 'itemText':
					itemText = el.html ? el.html : ''
					break
				case 'videoUrl':
					videoUrl = el.text ? el.text : ''
					break
				case 'image':
					if (el.mediaList && el.mediaList.length && pageMediaRef) {
						const mediaItem = el.mediaList[0]
						const elImage = pageMediaRef.filter(
							(refMedia) => refMedia._id === mediaItem._id,
						)[0]
						image = {
							...elImage,
							alt: elImage && elImage.title ? elImage.title : '*',
						}
					}
					break
				case 'pageLink':
					if (el.content != null && pagePageRef) {
						const thePage = pagePageRef.filter(
							(refPage) => refPage._id === el.content?._id,
						)[0]
						if (thePage) {
							pageLink = thePage.url
						}
					}
					break
			}
		})

		return {
			image: image,
			pageLink: pageLink,
			title: title,
			itemText: itemText,
			videoUrl: videoUrl,
		} as any
	})

	getBlocks.map((block) => {
		block.itemLink = {
			url: block.pageLink,
			name: block.title,
			contentId: '-',
			mediaId: '',
			target: 'self',
		}
	})

	const props = {
		blockRichTextTitle: f.html('blockRichTextTitle'),
		blockRichTextIntro: f.html('blockRichTextIntro'),
		blockLink: f.link2('blockLink'),
		useCarousel: f.boolean('useCarousel'),
		blocks: getBlocks,
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<BusinessCardBlockProps>(
		Block.BusinessCardBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
