import React from 'react'
import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	TabBlockProps,
	TabBlockItemProps,
	TabBlockItemType,
} from 'components/propTypes'
import { Block } from 'enums'

export default function BlockTabBlock({
	customComponent,
}: BlockProps<TabBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const [{ page }] = usePages()

	const blockList = [] as TabBlockItemProps[]

	f.blocks('blocks').map((item) => {
		const blk = {} as TabBlockItemProps
		let goo1 = false
		let goo2 = false
		switch (item.contentType) {
			case 'tabBlockHeadingItem':
				item.fields.map((el) => {
					switch (el.alias) {
						case 'richTextTitle':
							blk.itemText = el.html ? el.html : ''
							goo1 = true
							break
						case 'headingImage':
							if (page.referencedMedia && el.mediaList) {
								const imgid = el.mediaList[0]._id
								if (imgid != null) {
									const dlObject2 = page.referencedMedia.find(
										(m) => m._id === imgid,
									)
									if (dlObject2) {
										blk.image = {
											_id: dlObject2._id,
											url: dlObject2.url,
											alt: '',
										}
									}
								}
							}
							goo2 = true // Does not need to be there
							break
					}
				})
				if (goo1) {
					blk.itemType = TabBlockItemType.HeadingItem
					blockList.push(blk)
				}
				break
			case 'tabBlockTextItem':
				item.fields.map((el) => {
					switch (el.alias) {
						case 'richText':
							blk.itemText = el.html ? el.html : ''
							goo1 = true
							break
						case 'largeText':
							blk.itemOption = el.boolean
							goo2 = true
							break
					}
				})
				if (goo1 && goo2) {
					blk.itemType = TabBlockItemType.TextItem
					blockList.push(blk)
				}
				break
			case 'tabBlockImageItem':
				item.fields.map((el) => {
					switch (el.alias) {
						case 'imageCaption':
							blk.itemText = el.text ? el.text : ''
							goo1 = true
							break
						case 'itemImage':
							if (page.referencedMedia && el.mediaList) {
								const imgid = el.mediaList[0]._id
								if (imgid != null) {
									const dlObject2 = page.referencedMedia.find(
										(m) => m._id === imgid,
									)
									if (dlObject2) {
										blk.image = {
											_id: dlObject2._id,
											url: dlObject2.url,
											alt: '',
										}
									}
								}
							}
							goo2 = true
							break
					}
				})
				if (goo1 && goo2) {
					blk.itemType = TabBlockItemType.ImageItem
					blockList.push(blk)
				}
				break
			case 'tabBlockLinkItem':
				item.fields.map((el) => {
					switch (el.alias) {
						case 'itemLink':
							goo1 = true
							blk.itemLink = el.link
							break
					}
				})
				if (goo1) {
					blk.itemType = TabBlockItemType.LinkItem
					blockList.push(blk)
				}
				break
			case 'tabBlockOnTrackItem':
				item.fields.map((el) => {
					switch (el.alias) {
						case 'richText':
							blk.itemText = el.html ? el.html : ''
							goo1 = true
							break
					}
				})
				if (goo1) {
					blk.itemType = TabBlockItemType.OnTrackItem
					blockList.push(blk)
				}
				break
		}
	})

	const props = {
		id: f.text('tabTitle').split(' ').join('-').toLowerCase(),
		tabTitle: f.text('tabTitle'),
		blocks: blockList,
		activeBlock: false,
	}

	return getComponent<TabBlockProps>(
		Block.TabBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
