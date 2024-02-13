import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { type THeadlineBlock } from '../theme/plain/HeadlineBlock/THeadlineBlock'

export default function BlockHeadlineBlock({
	customComponent,
}: BlockProps<THeadlineBlock>) {
	const [f] = useFields()

	const imageProps = {
		src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${
			process.env.NEXT_PUBLIC_MEDIAPREFIX
		}${f.imageRefStandard('icon').url}`,
		alt: f.imageRefStandard('icon').alt,
	}

	const componentIdentifier = f.text('componentIdentifier')

	const props: THeadlineBlock = {
		background: f.text('gradient'),
		title: f.html('headline'),
		image: imageProps,
	}

	return getComponent<THeadlineBlock>(
		Block.HeadlineBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
