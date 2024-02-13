import { useFields } from 'context/fields'
import { BlockProps, HeadingProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block, HeadingLevel } from 'enums'

function BlockHeading({ customComponent }: BlockProps<HeadingProps>) {
	const [f] = useFields()

	const id = f.text('componentIdentifier')
	const heading = f.text('heading')
	const text = f.text('text')
	const style = f.text('componentClassNames')
	let headingLevel =
		f.settings.location && f.settings.location === 'header'
			? HeadingLevel.H1
			: undefined
	if (style.includes('h1')) headingLevel = HeadingLevel.H1
	if (style.includes('h2')) headingLevel = HeadingLevel.H2
	if (style.includes('h3')) headingLevel = HeadingLevel.H3
	if (style.includes('h4')) headingLevel = HeadingLevel.H4
	if (style.includes('h5')) headingLevel = HeadingLevel.H5
	const props: HeadingProps = { heading, text, headingLevel, style, id }

	return getComponent<HeadingProps>(Block.Heading, props, id, customComponent)
}

export default BlockHeading
