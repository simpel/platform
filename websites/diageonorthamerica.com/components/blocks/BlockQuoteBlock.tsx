import React from 'react'

import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, QuoteBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme, Image } from 'types'

export default function BlockQuoteBlock({
	customComponent,
}: BlockProps<QuoteBlockProps>) {
	const [f] = useFields()

	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')
	let tmpTheme = ''

	const blockImage = f.imageRef('blockImage')
	let blkImage = {} as Image

	if (blockImage) {
		blkImage = { _id: blockImage?._id, url: blockImage?.url, alt: '*' }
		const var1 = f.blocks('blockImage')[0]
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

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const props = {
		attrLine1: f.text('attrLine1'),
		richTextQuote: f.html('richTextQuote'),
		attrLine2: f.text('attrLine2'),
		blockImage: blkImage,
		layout: f.text('layout'),
		flipped: f.boolean('flipped'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<QuoteBlockProps>(
		Block.QuoteBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
