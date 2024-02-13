import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { FixMediaPathsInHtml as fixMediaPathsInHtml } from 'utilities/functions'
import {
	type TMediaWithTextBlockProps,
	type TSimpleImg,
} from 'components/styled-components/Careers/MediaWithTextBlock/MediaWithTextBlock'

export default function BlockSimpleContentBlock({
	customComponent,
}: BlockProps<TMediaWithTextBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let temporaryTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			temporaryTheme = String(
				themeNode?.fields.find((m) => m.alias === 'value')?.text,
			)
		}
	}

	const imgArray: Array<Partial<TSimpleImg>> = []
	let richText = f.html('richText')
	richText = richText ? fixMediaPathsInHtml(richText) : ''

	const layout = f.text('layout') ?? 'standard'

	const mainImage = f.imageRefStandard('mainImage')
	const secondImage = f.imageRefStandard('secondImage')
	const thirdImage = f.imageRefStandard('thirdImage')

	const img1: Partial<TSimpleImg> = {}
	const img2: Partial<TSimpleImg> = {}
	const img3: Partial<TSimpleImg> = {}

	if (mainImage) {
		img1.mediaSrc = `${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${mainImage.url}`
		img1.mediaSrcAlt = mainImage?.alt
	}

	if (secondImage) {
		img2.mediaSrc = `${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${secondImage.url}`
		img2.mediaSrcAlt = secondImage?.alt
	}

	if (thirdImage) {
		img3.mediaSrc = `${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${thirdImage.url}`
		img3.mediaSrcAlt = thirdImage?.alt
	}

	const passedprops: Partial<TMediaWithTextBlockProps> = {}

	passedprops.blockLink = f.link2('blockLink')
	passedprops.gradient = temporaryTheme
	passedprops.isInverted = f.boolean('imageOnRight')
	passedprops.pageTitle = f.text('upperTitle')
	passedprops.title = f.html('richTextTitle')
	passedprops.text = richText
	passedprops.videoUrl = f.text('videoUrl')
	passedprops.mediaType = 'image'

	if (img1?.mediaSrc) {
		imgArray.push(img1)
		passedprops.mediaSrc = img1.mediaSrc
		passedprops.mediaSrcAlt = img1.mediaSrcAlt
	}

	if (img2?.mediaSrc) {
		imgArray.push(img2)
		passedprops.secondaryMediaSrc = img2.mediaSrc
		passedprops.secondaryMediaSrcAlt = img2.mediaSrcAlt
	}

	if (img3?.mediaSrc) {
		imgArray.push(img3)
	}

	switch (layout) {
		case 'slide-show': {
			passedprops.options = imgArray as TSimpleImg[]
			passedprops.mediaType = 'carousel'

			break
		}

		case 'inset-image': {
			passedprops.mediaType = 'inset-image'

			break
		}

		case 'video': {
			passedprops.mediaType = 'video'

			break
		}

		default: {
			passedprops.mediaType = 'image'
		}
	}

	return getComponent<Partial<TMediaWithTextBlockProps>>(
		Block.SimpleContentBlock,
		passedprops,
		componentIdentifier,
		customComponent,
	)
}
