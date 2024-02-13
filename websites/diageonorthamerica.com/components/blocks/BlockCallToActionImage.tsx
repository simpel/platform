import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	ButtonStyle,
	CallToActionImageProps,
} from 'components/propTypes'
import { Block } from 'enums'

function BlockCallToActionImage({
	customComponent,
}: BlockProps<CallToActionImageProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		url: f.link('link').url,
		title: f.link('link').name,
		image: f.imageRef('image'),
		target: f.link('link').target,
		buttonStyle: f.text('buttonStyle') as ButtonStyle,
	}

	return getComponent<CallToActionImageProps>(
		Block.CallToActionImage,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockCallToActionImage
