import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, BlockBrandSliderProps } from 'components/propTypes'
import { Block } from 'enums'

function BlockHistoryTimelineSlider({
	customComponent,
}: BlockProps<BlockBrandSliderProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const props: BlockBrandSliderProps = {
		heading: `1998-2001`,
		text: `Laying the foundations of the business and setting benchmarks
      with iconic innovations and campaigns during a period of rapid growth.`,
		items: [],
	}

	return getComponent<BlockBrandSliderProps>(
		Block.BlockHistoryTimelineSlider,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockHistoryTimelineSlider
