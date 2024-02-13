import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, BlockBrandSliderProps } from 'components/propTypes'
import { Block } from 'enums'

function BlockExplorerSlider({
	customComponent,
}: BlockProps<BlockBrandSliderProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const props: BlockBrandSliderProps = {
		items: [],
	}

	return getComponent<BlockBrandSliderProps>(
		Block.BlockExplorerSlider,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockExplorerSlider
