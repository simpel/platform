import React from 'react'

import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	MediaWithTextBlockProps,
	MediaWithTextBlockStyle,
} from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme, Image } from 'types'

function BlockMediaWithTextBlock({
	customComponent,
}: BlockProps<MediaWithTextBlockProps>) {
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

	// console.log('marshall', f.blocks('image')[0].fields[1].text)

	const blockImage = f.imageRef('image')
	let blkImage = {} as Image

	if (blockImage) {
		blkImage = { _id: blockImage?._id, url: blockImage?.url, alt: '*' }
		const var1 = f.blocks('image')[0]
		if (var1) {
			if (var1.fields[1] && var1.fields[1].text) {
				blkImage = {
					_id: blockImage?._id,
					url: blockImage?.url,
					alt: var1.fields[1].text,
				}
			}
		}
	}

	const props = {
		heading: f.text('heading'),
		richTextHeading: f.html('richTextHeading'),
		text: f.html('text'),
		video: f.text('video'),
		image: blkImage,
		imageAlign: f.boolean('imageAlign'),
		noImageHeightConstraint: f.boolean('noImageHeightConstraint'),
		linkText: f.text('linkText'),
		link: f.link2('linkAddress'),
		blockTheme: tmpTheme as Theme,
		mediaBlockStyle: f.text('mediaBlockStyle') as MediaWithTextBlockStyle,
		actualSizeImage: f.boolean('actualSizeImage'),
	}

	return getComponent<MediaWithTextBlockProps>(
		Block.MediaWithTextBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockMediaWithTextBlock
