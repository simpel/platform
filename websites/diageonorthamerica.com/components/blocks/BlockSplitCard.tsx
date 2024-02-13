import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { type TSplitCard } from 'components/theme/plain/SplitCardBlock/TSplitCard'

export default function BlockAccordianBlock({
	customComponent,
}: BlockProps<TSplitCard>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')
	const image = f.imageRefStandard('image')

	const props: TSplitCard = {
		title: f.text('title'),
		backgroundColor: f.text('backgroundColor'),
		disclaimer: f.html('disclaimer'),
		text: f.html('text'),
		image: image
			? {
					// eslint-disable-next-line n/prefer-global/process
					src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
					alt: image.alt ?? '',
			  }
			: null,
	}

	return getComponent<TSplitCard>(
		Block.SplitCard,
		props,
		componentIdentifier,
		customComponent,
	)
}
