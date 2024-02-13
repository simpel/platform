import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	DownloadListBlockItem,
	DownloadListBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { CmsLink, Theme } from 'types'

export default function BlockDownloadListBlock({
	customComponent,
}: BlockProps<DownloadListBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	const downloads = [] as DownloadListBlockItem[]
	const thedate = f.date('date')

	let theDateString = ''

	if (thedate) {
		theDateString = thedate.toUTCString()
	} else {
		theDateString = new Date().toUTCString()
	}

	f.blocks('blocks').map((fig) => {
		const fields = fig.fields
		const postFields = {} as DownloadListBlockItem
		for (let i = 0; i < fields.length; i++) {
			const item = fields[i]
			if (item.alias === 'title') {
				postFields.title = item.text ? item.text : ''
			}
			if (item.alias === 'download') {
				if (item.link) {
					postFields.download = item.link
				}
			}
			if (item.alias === 'filesize') {
				postFields.filesize = item.text ? item.text : ''
			}
			if (item.alias === 'itemDate') {
				postFields.itemDate = item.date ? item.date : ''
			}
		}
		downloads.push(postFields)
	})

	const props = {
		title: f.text('title'),
		date: theDateString,
		hideBlockDate: f.boolean('hideBlockDate'),
		zippedLink: f.link2('zippedLink'),
		zippedLinkSize: f.text('zippedLinkSize'),
		downloads: downloads,
		showDocumentDate: f.boolean('showDocumentDate'),
	}

	return getComponent<DownloadListBlockProps>(
		Block.DownloadListBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
