import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { type THeroWithGraphs } from 'components/theme/plain/HeroWithGraphs/THeroWithGraphs'

export default function BlockHero({
	customComponent,
}: BlockProps<THeroWithGraphs>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	const title = f.fields.find((field) => field.alias === 'title')?.html ?? ''
	const image = f.imageRefStandard('image')

	const props = {
		// eslint-disable-next-line n/prefer-global/process
		img: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
		title,
		alt: image.alt ?? '',
	}

	return getComponent<THeroWithGraphs>(
		Block.HeroBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
