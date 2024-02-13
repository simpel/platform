import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, VideoSliderBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { Theme, Image, CmsLink } from 'types'

export default function BlockVideoSliderBlock({
	customComponent,
}: BlockProps<VideoSliderBlockProps>) {
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

	const getBlocks = f.blocks('blocks').map((block) => {
		let image = {} as Image
		let videoUrl = ''
		let title1 = ''
		let title2 = ''
		let richText = ''
		let itemLink = {} as CmsLink

		block.fields.map((el) => {
			switch (el.alias) {
				case 'videoUrl':
					videoUrl = el.text ? el.text : ''
					break
				case 'title1':
					title1 = el.text ? el.text : ''
					break
				case 'title2':
					title2 = el.text ? el.text : ''
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
				case 'richText':
					richText = el.html ? el.html : ''
					break
				case 'itemLink':
					if (el.link) {
						itemLink = el.link
					}
					break
			}
		})
		return {
			image: image,
			title: title1,
			title2: title2,
			text: richText,
			videoUrl: videoUrl,
			itemLink: itemLink,
		}
	})

	const props = {
		richTextTitle: f.html('richTextTitle'),
		richText: f.html('richText'),
		link: f.link2('link'),
		blocks: getBlocks || [],
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<VideoSliderBlockProps>(
		Block.VideoSliderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
