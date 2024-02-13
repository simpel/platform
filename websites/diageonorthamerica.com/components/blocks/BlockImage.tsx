import { useFields } from 'context/fields'
import { BlockProps, ImageProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'

export default function BlockImage({
	customComponent,
}: BlockProps<ImageProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const image = f.imageRef('image')
	const style = f.text('componentClassNames')
	const centered = style.includes('center')
	const props = { image, style, centered }

	return getComponent<ImageProps>(
		Block.Image,
		props,
		componentIdentifier,
		customComponent,
	)
}
