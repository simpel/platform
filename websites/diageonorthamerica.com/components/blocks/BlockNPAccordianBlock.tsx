import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	AccordionBlockProps,
	TitleAndRichTextProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { Theme } from 'types'
import { usePages } from 'context/pages'

export default function BlockNPAccordianBlock({
	customComponent,
}: BlockProps<AccordionBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	const accordianitems = [] as TitleAndRichTextProps[]

	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	let utext = ''
	let ltext = ''

	f.blocks('blocks').map((fig) => {
		utext = ''
		ltext = ''
		fig.fields.map((el) => {
			switch (el.alias) {
				case 'title':
					utext = el.text ? el.text : ''
					break
				case 'richText':
					ltext = el.html ? el.html : ''
					break
			}
		})
		accordianitems.push({ heading: utext, richText: ltext })
	})

	const props = {
		items: accordianitems,
		blockTheme: tmpTheme as Theme,
		wider: f.boolean('wider'),
		fullWidthPage: false,
	}

	return getComponent<AccordionBlockProps>(
		Block.NPAccordianBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
