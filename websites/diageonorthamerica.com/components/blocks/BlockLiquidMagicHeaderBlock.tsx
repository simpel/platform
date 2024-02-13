import React from 'react'

import { useFields } from 'context/fields'
import { BlockProps, LiquidMagicHeaderBlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { Theme } from 'types'
import { useNavigation } from 'context/navigation'

export default function BlockLiquidMagicHeaderBlock({
	customComponent,
}: BlockProps<LiquidMagicHeaderBlockProps>) {
	const [f] = useFields()

	const [{ page }] = usePages()
	const [{ breadcrumbs }] = useNavigation()
	const componentIdentifier = f.text('componentIdentifier')

	let tmpTheme = ''
	let videoUrl = ''
	let fullVideoUrl = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const videoUrlField = f.text('videoUrl')
	if (videoUrlField && videoUrlField.length) {
		fullVideoUrl = videoUrlField
	}

	const videoObj = f.imageRefStandard('videoPicker')
	if (videoObj && videoObj.url) {
		const localMp4url = videoObj.url
		if (localMp4url.length) {
			videoUrl =
				process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				localMp4url
		}
	}

	const props = {
		smallTitle: f.text('smallTitle'),
		richTextTitle: f.html('richTextTitle'),
		richTextIntro: f.html('richTextIntro'),
		link: f.link2('link'),
		link2: f.link2('link2'),
		link3: f.link2('link3'),
		mainImage: f.imageRefStandard('mainImage'),
		blockTheme: tmpTheme as Theme,
		useLiquidMagic: f.boolean('useLiquidMagic'),
		imageLeft: f.boolean('imageLeft', false),
		secondaryImage: f.imageRefStandard('secondaryImage'),
		breadcrumbs: breadcrumbs,
		showBreadcrumbs: f.boolean('showBreadcrumbs', false),
		videoUrl: videoUrl,
		videoAspectSquare: f.boolean('videoAspectSquare', false),
		fullVideoUrl: fullVideoUrl,
		lowerMargin: f.boolean('lowerMargin', false),
	}

	return getComponent<LiquidMagicHeaderBlockProps>(
		Block.LiquidMagicHeaderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
