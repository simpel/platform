import React from 'react'

import { useFields } from 'context/fields'
import { useNavigation } from 'context/navigation'
import { getComponent } from 'components'
import { BlockProps, MediaLandingHeaderBlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { PartialPage, Theme, Image } from 'types'
import { usePages } from 'context/pages'

export default function BlockMediaLandingHeaderBlock({
	customComponent,
}: BlockProps<MediaLandingHeaderBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')

	const [{ breadcrumbs }] = useNavigation()
	let tmpTheme = ''
	let article = {} as PartialPage
	const tags = [] as string[]
	//const art = f.content('featuredArticle')
	const article1 = page.referencedContent?.find(
		(m) => m._id === f.content('featuredArticle')?._id,
	)

	let blockImage = {} as Image
	const blockSetImage = f.imageRef('blockImage')
	if (blockSetImage) {
		blockImage = blockSetImage
	}

	if (article1) {
		// console.log('marshall', articleCats)
		article = article1 as PartialPage
		if (article1.categoryPages && article1.categoryPages.length) {
			article1.categoryPages.map((itm) => {
				tags.push(itm.title)
			})
		}
		if (
			!(blockImage && blockImage.url && blockImage.url.length > 0) &&
			article.pageListingImage &&
			article.pageListingImage.url &&
			article.pageListingImage.url.length > 0
		) {
			blockImage.url = article.pageListingImage.url
			blockImage._id = article.pageListingImage._id
			blockImage.alt = article1.title
		}
	}
	//console.log(art)

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const props = {
		smallTopTitle: f.text('smallTopTitle'),
		title: f.text('title'),
		introRichText: f.html('introRichText'),
		blockImage: blockImage,
		breadcrumbs: breadcrumbs,
		featuredArticle: article,
		link1: f.link2('link1'),
		link2: f.link2('link2'),
		theme: tmpTheme as Theme,
		tags: tags,
	}

	return getComponent<MediaLandingHeaderBlockProps>(
		Block.MediaLandingHeaderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
