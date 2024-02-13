import { Field, Image, Media, Page } from 'types'
import { blocks, mediaList, text } from './field-utils'

function parseImage(m: Media): Image {
	const alt = m.fields ? text(m.fields)('altText') : ''
	const { url, _id } = m
	return { _id, alt, url }
}

export function parseImage2(m: Media): Image {
	const alt = m.fields ? text(m.fields)('altText') : ''
	const { url, _id } = m
	return { _id, alt, url }
}

export function mediaRef(fields: Field[], page: Partial<Page>) {
	return (name: string) => {
		const mediaBlocks = blocks(fields)(name)
		if (!mediaBlocks?.length) {
			return undefined
		}
		const field = mediaList(mediaBlocks[0]?.fields)('file')[0]
		return page.referencedMedia?.find((m) => m._id === field?._id)
	}
}

export function youtubeId(fields: Field[]) {
	return (name: string) => {
		const mediaBlocks = blocks(fields)(name)
		if (!mediaBlocks?.length) {
			return undefined
		}
		const ytBlock = mediaBlocks.find(
			({ contentType }) => contentType === 'youTubeVideo',
		)
		if (!ytBlock) {
			return undefined
		}
		return text(ytBlock.fields)('youTubeVideoId')
	}
}

export function vimeoId(fields: Field[]) {
	return (name: string) => {
		const mediaBlocks = blocks(fields)(name)
		if (!mediaBlocks?.length) {
			return undefined
		}
		const ytBlock = mediaBlocks.find(
			({ contentType }) => contentType === 'vimeoVideo',
		)
		if (!ytBlock) {
			return undefined
		}
		return text(ytBlock.fields)('videoId')
	}
}

export function mediaRefList(fields: Field[], page: Partial<Page>) {
	return (name: string) => {
		return (
			blocks(fields)(name)
				.map((block) => mediaList(block.fields)('file')[0])
				.map((c) => page.referencedMedia?.find((m) => c && m._id === c._id))
				.filter((m) => m) as Media[]
		).filter((m) => m)
	}
}

export function imageRefStandard(fields: Field[], page: Partial<Page>) {
	return (alias: string, altTextFieldName?: string) => {
		const image = {} as Image

		const file = fields.filter((m) => m.alias == alias)[0]
		if (file) {
			const mediaList = file.mediaList && file.mediaList[0]

			if (mediaList) {
				const media = page.referencedMedia?.find(
					(p) => p && mediaList._id === p._id,
				) as Media
				if (media) {
					image._id = media._id
					image.url = media.url
					image.alt = text(fields)(altTextFieldName || '') || media.title
				}
			}
		}
		return image
	}
}

export function imageRef(fields: Field[], page: Partial<Page>) {
	return (name: string) => {
		const m = mediaRef(fields, page)(name)
		return m && parseImage(m)
	}
}

export function imageRefList(fields: Field[], page: Partial<Page>) {
	return (name: string) => mediaRefList(fields, page)(name).map(parseImage)
}

/**
 * Extract referenced media objects for the given field.
 *
 * Note: it will search for these referencedMedia objects on the given page.
 * If no page was specified, it will use the current page. But in referenced content
 * and listing components, these media objects exists on the referencedContent page,
 * not the current page, so make sure you pass that. (See an example in the
 * BlockProductListing component
 */
export function parseMedia(fields: Field[], page: Partial<Page>) {
	return {
		mediaRef: mediaRef(fields, page),
		mediaRefList: mediaRefList(fields, page),
		imageRefStandard: imageRefStandard(fields, page),
		imageRef: imageRef(fields, page),
		imageRefList: imageRefList(fields, page),
		youtubeId: youtubeId(fields),
		vimeoId: vimeoId(fields),
	}
}

export type ParsedMedia = ReturnType<typeof parseMedia>
