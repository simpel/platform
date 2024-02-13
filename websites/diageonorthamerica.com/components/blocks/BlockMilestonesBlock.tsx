import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	MilestonesBlockProps,
	MilestonesItem,
} from 'components/propTypes'
import { Block } from 'enums'
import { getPostsByFields } from 'utilities/functions'
import { CmsLink, Theme, Image } from 'types'

export default function BlockMilestonesBlock({
	customComponent,
}: BlockProps<MilestonesBlockProps>) {
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
		let videoUrl = ''
		let itemImage = {} as Image
		let authorImage = {} as Image
		let itemTitle = ''
		let richTextBody = ''
		let quoteText = ''
		let authorName = ''
		let authorSubtext = ''
		let itemImageCaption = ''

		block.fields.map((el) => {
			// console.log('marshall', { el })

			switch (el.alias) {
				case 'itemTitle':
					itemTitle = el.text ? el.text : ''
					break
				case 'richTextBody':
					richTextBody = el.html ? el.html : ''
					break
				case 'authorName':
					authorName = el.html ? el.html : ''
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
				case 'videoUrl':
					videoUrl = el.text ? el.text : ''
					break

				case 'quoteText':
					quoteText = el.html ? el.html : ''
					break
				case 'authorName':
					authorName = el.html ? el.html : ''
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
				case 'authorSubtext':
					authorSubtext = el.text ? el.text : ''
					break
				case 'itemImageCaption':
					itemImageCaption = el.html ? el.html : ''
					break
			}
		})

		return {
			itemTitle: itemTitle,
			videoUrl: videoUrl,
			itemImage: itemImage,
			authorImage: authorImage,
			richTextBody: richTextBody,
			quoteText: quoteText,
			authorName,
			authorSubtext: authorSubtext,
			itemImageCaption: itemImageCaption,
		} as MilestonesItem
	})

	const props: MilestonesBlockProps = {
		blockTheme: tmpTheme as Theme,
		blockItems: getBlocks,
	}

	return getComponent<MilestonesBlockProps>(
		Block.MilestonesBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
