import React from 'react'

import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, StandardTextBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme } from 'types'

export default function BlockStandardTextBlock({
	customComponent,
}: BlockProps<StandardTextBlockProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const [{ page }] = usePages()

	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const props = {
		richText: f.html('richText'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<StandardTextBlockProps>(
		Block.StandardTextBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
