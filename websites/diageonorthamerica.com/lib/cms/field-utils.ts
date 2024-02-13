import { CmsLink, Content, Field, Link, Page } from 'types'

export function text(fields: Field[]) {
	return (name: string) => fields.find((f) => f.alias === name)?.text || ''
}
export function textList(fields: Field[]) {
	return (name: string) => fields.find((f) => f.alias === name)?.textList || []
}
export function boolean(fields: Field[]) {
	return (name: string, defaultValue = false) => {
		const bool = fields.find((f) => f.alias === name)?.boolean
		return typeof bool !== 'undefined' ? bool : defaultValue
	}
}
export function number(fields: Field[]) {
	return (name: string) => fields.find((f) => f.alias === name)?.number || 0
}
export function decimal(fields: Field[]) {
	return (name: string) => {
		const strValue = fields.find((f) => f.alias === name)?.decimal
		return strValue ? +strValue : undefined
	}
}
export function date(fields: Field[]) {
	return (name: string) => {
		const dateStr = fields.find((f) => f.alias === name)?.date
		if (!dateStr) return
		return new Date(dateStr)
	}
}
export function mapConfig(fields: Field[]) {
	return (name: string) => fields.find((f) => f.alias === name)?.map?.mapConfig
}
export function html(fields: Field[]) {
	return (name: string) => fields.find((f) => f.alias === name)?.html || ''
}
export function blocks(fields: Field[]) {
	return (name: string) => fields.find((f) => f.alias === name)?.blocks || []
}
export function content(fields: Field[]) {
	return (name: string) => fields.find((f) => f.alias === name)?.content
}
export function media(fields: Field[]) {
	// console.log('DEPRECATED: use mediaList instead')
	return (name: string) => fields.find((f) => f.alias === name)?.media
}
export function mediaList(fields: Field[]) {
	return (name: string) =>
		fields?.find((f) => f.alias === name)?.mediaList || []
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function mediaUrl(_fields: Field[]) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return (_name: string) => {
		console.warn(
			'OBSOLETE: mediaUrl is not referencing the up to date media object, update to mediaRef or mediaRefList instead',
		)
		return ''
	}
}
export function link(fields: Field[], page: Partial<Page>) {
	return (fName: string): Link => {
		const field = fields.find((f) => f.alias === fName)?.link
		let url = ''
		if (field?.contentId) {
			if (!page?.referencedContent) {
				console.warn(
					'Warning: Page for referencedContent is not provided, cannot get up to date links',
				)
			}
			const target = page?.referencedContent?.find(
				(c) => c._id === field.contentId,
			)
			url = target?.url || ''
		}
		if (!url) {
			url = field?.url || ''
		}
		url = url.replace('/home', '')
		const name = field?.name || ''
		const target = field?.target || ''
		return { url, name, target }
	}
}

export function link2(fields: Field[], page: Partial<Page>) {
	return (fName: string): CmsLink => {
		const field = fields.find((f) => f.alias === fName)?.link
		let url = ''
		if (field?.contentId) {
			if (!page?.referencedContent) {
				console.warn(
					'Warning: Page for referencedContent is not provided, cannot get up to date links',
				)
			}
			const target = page?.referencedContent?.find(
				(c) => c._id === field.contentId,
			)
			url = target?.url || ''
		}
		if (!url) {
			url = field?.url || ''
		}
		url = url.replace('/home', '')
		const name = field?.name || ''
		const target = field?.target || ''
		const contentId = field?.contentId || ''
		const mediaId = field?.mediaId || ''
		return { url, name, contentId, mediaId, target }
	}
}
export function list(fields: Field[]) {
	return (fName: string): Content[] => {
		const field = fields.find((f) => f.alias === fName)?.list
		return field || []
	}
}

export function parseFields(fields: Field[], page: Partial<Page>) {
	return {
		text: text(fields),
		textList: textList(fields),
		boolean: boolean(fields),
		number: number(fields),
		html: html(fields),
		blocks: blocks(fields),
		content: content(fields),
		mediaUrl: mediaUrl(fields),
		link: link(fields, page),
		link2: link2(fields, page),
		list: list(fields),
		decimal: decimal(fields),
		date: date(fields),
		mapConfig: mapConfig(fields),
	}
}

export type ParsedFields = ReturnType<typeof parseFields>
