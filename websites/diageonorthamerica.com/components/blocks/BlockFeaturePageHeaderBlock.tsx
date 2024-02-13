import React from 'react'

import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, FeaturePageHeaderBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { useNavigation } from 'context/navigation'
import { Theme, Image } from 'types'
import { getBaseDateFormat } from 'utilities/dateFormatting'

export default function BlockFeaturePageHeaderBlock({
	customComponent,
}: BlockProps<FeaturePageHeaderBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [{ breadcrumbs }] = useNavigation()
	const componentIdentifier = f.text('componentIdentifier')

	const articleDate2 = new Date(page.articleDate)
	const articleDate3 = getBaseDateFormat(page.articleDate)

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

	const tags: string[] = []
	const brands = f.list('blkBrands')
	if (brands && page.referencedContent) {
		for (let i = 0; i < page.referencedContent.length; i++) {
			for (let a = 0; a < brands.length; a++) {
				if (page.referencedContent[i]._id === brands[a]._id) {
					tags.push(page.referencedContent[i].title)
				}
			}
		}
	}

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
		richTextTitle: f.html('richTextTitle'),
		introRichText: f.html('introRichText'),
		blockImage: blkImage,
		associatedFile: f.mediaRef('associatedFile'),
		articleDate: articleDate3 ? articleDate3 : '',
		tags: tags,
		breadcrumbs: breadcrumbs,
		blockTheme: tmpTheme as Theme,
		isAlternate: f.boolean('alternateLayout'),
	}

	return getComponent<FeaturePageHeaderBlockProps>(
		Block.FeaturePageHeaderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
