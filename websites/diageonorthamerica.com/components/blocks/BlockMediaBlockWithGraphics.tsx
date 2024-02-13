import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { type TMediaBlockWithGraphics } from 'components/theme/plain/MediaBlockWithGraphics/TMediaBlockWithGraphics'

export default function BlockMediaBlockWithGraphics({
	customComponent,
}: BlockProps<TMediaBlockWithGraphics>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')

	const image = f.imageRefStandard('image')

	const props = {
		body: f.html('body') ?? '',
		title: f.html('title') ?? '',
		image: {
			// eslint-disable-next-line n/prefer-global/process
			url: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
			alt: image?.alt ?? '',
		},
	}

	return getComponent<TMediaBlockWithGraphics>(
		Block.MediaBlockWithGraphics,
		props,
		componentIdentifier,
		customComponent,
	)
}
