import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	type BlockProps,
	type ColumnContentBlockProps,
	type ColumnContentItemProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { type CmsLink, type Image } from 'types'
import { usePages } from 'context/pages'

export default function BlockColumnContentBlock({
	customComponent,
}: BlockProps<ColumnContentBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let temporaryTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			temporaryTheme = ` ${themeNode?.fields.find((m) => m.alias === 'value')
				?.text}`
		}
	}

	const pageMediaRef = page.referencedMedia

	const getBlocks = f.blocks('blocks').map((block) => {
		let upperTitle = ''
		let mainTitle = ''
		let text = ''
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		let link = {} as CmsLink
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		let image = {} as Image
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		let link2 = {} as CmsLink

		for (const element of block.fields) {
			switch (element.alias) {
				case 'smallUpperTitle': {
					upperTitle = element.text ?? ''
					break
				}

				case 'richTextTitle': {
					mainTitle = element.html ?? ''
					break
				}

				case 'richTextIntro': {
					text = element.html ?? ''
					break
				}

				case 'itemImage': {
					if (element.mediaList?.length && pageMediaRef) {
						const mediaItem = element.mediaList[0]
						const elementImage = pageMediaRef.find(
							(refMedia) => refMedia._id === mediaItem._id,
						)
						if (elementImage) {
							image = {
								...elementImage,
								alt: elementImage?.title ?? '*',
							}
						}
					}

					break
				}

				case 'itemLink': {
					if (element.link) {
						link = element.link
					}

					break
				}

				case 'itemLink2': {
					if (element.link) {
						link2 = element.link
					}

					break
				}

				default: {
					break
				}
			}
		}

		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		return {
			smallUpperTitle: upperTitle,
			richTextTitle: mainTitle,
			richTextIntro: text,
			itemLink: link,
			itemImage: image,
			itemLink2: link2,
		} as ColumnContentItemProps
	})

	const props = {
		richTextTitle: f.html('richTextTitle'),
		richTextIntro: f.html('richTextIntro'),
		link: f.link2('link'),
		blocks: getBlocks || [],
		layout: f.text('layout'),
		blockTheme: temporaryTheme,
		topMargin: Boolean(
			f.fields.find((field) => field.alias === 'topMargin')?.boolean,
		),
		bottomMargin: Boolean(
			f.fields.find((field) => field.alias === 'bottomMargin')?.boolean,
		),
	}

	return getComponent<ColumnContentBlockProps>(
		Block.ColumnContentBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
