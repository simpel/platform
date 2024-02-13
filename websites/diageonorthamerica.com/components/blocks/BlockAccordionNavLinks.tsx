import { BlockProps, AccordionNavLinksBlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'

function BlockAccordionNavLinks({
	customComponent,
}: BlockProps<AccordionNavLinksBlockProps>) {
	const props = { links: [] }

	return getComponent<AccordionNavLinksBlockProps>(
		Block.AccordionNavLinksBlock,
		props,
		'',
		customComponent,
	)
}

export default BlockAccordionNavLinks
