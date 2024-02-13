import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	ThreeColumnBlockItem,
	ThreeColumnBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme } from 'types'
import { Image as ImageType } from 'types'

export default function BlockThreeColumnBlock({
	customComponent,
}: BlockProps<ThreeColumnBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const pageMediaRef = page.referencedMedia
	const componentIdentifier = f.text('componentIdentifier')

	// const blockItems = [] as ThreeColumnBlockItem[]

	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const getBlocks = f.blocks('blockItems').map((block) => {
		let middleColumnImage = {} as ImageType
		let leftColumnText = ''
		let rightColumnLargeTextPrefix = ''
		let rightColumnLargeText = ''
		let rightColumnLargeTextSuffix = ''
		let rightColumnSmallText = ''

		block.fields.map((el) => {
			switch (el.alias) {
				case 'leftColumnText':
					leftColumnText = el.html ? el.html : ''
					break
				case 'rightColumnLargeTextPrefix':
					rightColumnLargeTextPrefix = el.text ? el.text : ''
					break
				case 'rightColumnLargeText':
					rightColumnLargeText = el.text ? el.text : ''
					break
				case 'rightColumnLargeTextSuffix':
					rightColumnLargeTextSuffix = el.text ? el.text : ''
					break
				case 'rightColumnSmallText':
					rightColumnSmallText = el.text ? el.text : ''
					break
				case 'middleColumnImage':
					if (el.mediaList && el.mediaList.length && pageMediaRef) {
						const mediaItem = el.mediaList[0]
						const elImage = pageMediaRef.filter(
							(refMedia) => refMedia._id === mediaItem._id,
						)[0]
						middleColumnImage = {
							...elImage,
							alt: elImage && elImage.title ? elImage.title : '*',
						}
					}
					break
			}
		})
		return {
			middleColumnImage: middleColumnImage,
			leftColumnText: leftColumnText,
			rightColumnLargeTextPrefix: rightColumnLargeTextPrefix,
			rightColumnLargeText: rightColumnLargeText,
			rightColumnLargeTextSuffix: rightColumnLargeTextSuffix,
			rightColumnSmallText: rightColumnSmallText,
		} as ThreeColumnBlockItem
	})

	const props = {
		blockHeading: f.text('blockHeading'),
		blockItems: getBlocks,
		footerText: f.html('footerText'),
		blockTheme: tmpTheme as Theme,
		layout: f.text('layout'),
	}

	return getComponent<ThreeColumnBlockProps>(
		Block.ThreeColumnBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
