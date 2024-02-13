import { ContentBlock, Page } from 'types'

function logBlocks(blocks: ContentBlock[]) {
	blocks.map((b) => {
		console.group('Block', b.contentType)
		//console.log('ComponentIdentifier: ', b.fields.find(({ alias }) => alias === 'componentIdentifier')?.text || '-')
		//console.log('Fields', b.fields)
		b.fields.map((f) => logBlocks(f.blocks || []))
		console.groupEnd()
	})
}

export function inspectPage(page: Page) {
	if (typeof window === 'undefined') return
	//console.group('Page', page.title, page.urlSegment)
	//console.log('Page', page)
	//console.log('Fields', page.fields)
	//console.group('headerContent')
	logBlocks(page.fields.find((f) => f.alias === 'headerContent')?.blocks || [])
	//console.groupEnd()
	//console.group('bodyContent')
	logBlocks(page.fields.find((f) => f.alias === 'body')?.blocks || [])
	//console.groupEnd()
	//console.groupEnd()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(...items: any[]) {
	if (typeof window === 'undefined') return
	console.log(items)
}
