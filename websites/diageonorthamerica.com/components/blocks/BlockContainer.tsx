import { useFields } from 'context/fields'
import { getComponent, renderBlocks } from 'components'
import { RenderSettings } from 'types'
import { BlockProps, GeneralContainerProps } from 'components/propTypes'
import { useLocale } from 'context/locale'
import { Block } from 'enums'

function BlockGeneralContainer({
	customComponent,
}: BlockProps<GeneralContainerProps>) {
	const [f] = useFields()
	const [{ localePage }] = useLocale()
	const customMediaPage = ['header', 'footer'].includes(
		f.settings?.location || '',
	)
		? localePage
		: undefined

	const componentIdentifier = f.text('componentIdentifier')
	const renderSettings: RenderSettings = {
		container: componentIdentifier,
	}
	const props = {
		header: renderBlocks(
			f.blocks('header'),
			renderSettings,
			undefined,
			customMediaPage,
		),
		body: renderBlocks(
			f.blocks('body'),
			renderSettings,
			undefined,
			customMediaPage,
		),
		footer: renderBlocks(
			f.blocks('footer'),
			renderSettings,
			undefined,
			customMediaPage,
		),
		bgImage: f.imageRef('backgroundImage')?.url || '',
	}

	return getComponent<GeneralContainerProps>(
		Block.GeneralContainer,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockGeneralContainer
