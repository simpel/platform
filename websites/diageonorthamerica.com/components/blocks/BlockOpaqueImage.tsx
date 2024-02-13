import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { type TOpaqueImageBlock } from 'components/theme/plain/OpaqueImageBlock/TOpaqueImageBlock'

export default function BlockOpaqueImage({
	customComponent,
}: BlockProps<TOpaqueImageBlock>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const image = f.imageRefStandard('image')
	const link = f.link('link')

	const props = {
		heading: f.html('title'),
		image: {
			// eslint-disable-next-line n/prefer-global/process
			url: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
			alt: image?.alt ?? '',
		},
		link,
	}

	return getComponent<TOpaqueImageBlock>(
		Block.OpaqueImage,
		props,
		componentIdentifier,
		customComponent,
	)
}
