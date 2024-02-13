import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	CareersCarouselBlockItem,
	CareersAccordianBlockProps,
	CareersAccordianItem,
} from 'components/propTypes'
import { Block } from 'enums'
import { getPostsByFields } from 'utilities/functions'
import { CmsLink, Theme, Image } from 'types'

export default function BlockCareersAccordianBlock({
	customComponent,
}: BlockProps<CareersAccordianBlockProps>) {
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
		let itemTitle = ''
		let location = ''
		let greenDot = false
		let dotText = ''
		let itemImage = {} as Image
		let imageRichText = ''
		let richTextBody = ''
		let jobId = ''

		block.fields.map((el) => {
			// console.log('marshall', { el })

			switch (el.alias) {
				case 'itemTitle':
					itemTitle = el.text ? el.text : ''
					break
				case 'location':
					location = el.text ? el.text : ''
					break
				case 'jobId':
					jobId = el.text ? el.text : ''
					break
				case 'greenDot':
					greenDot = el.boolean ? el.boolean : false
					break
				case 'dotText':
					dotText = el.html ? el.html : ''
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
				case 'imageRichText':
					imageRichText = el.html ? el.html : ''
					break
				// case 'itemLink':
				//   if (el.link != null) {
				//     itemLink = el.link
				//   }
				//   break
				case 'richTextBody':
					richTextBody = el.html ? el.html : ''
					break
			}
		})

		return {
			itemTitle: itemTitle,
			location: location,
			greenDot: greenDot,
			dotText: dotText,
			itemImage: itemImage,
			imageRichText: imageRichText,
			jobId: jobId,
			richTextBody: richTextBody,
		} as CareersAccordianItem
	})

	const props: CareersAccordianBlockProps = {
		blockTheme: tmpTheme as Theme,
		blockTitle: f.html('blockTitle'),
		blockItems: getBlocks,
	}

	return getComponent<CareersAccordianBlockProps>(
		Block.CareersAccordianBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
