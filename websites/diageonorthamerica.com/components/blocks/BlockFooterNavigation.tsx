import { useLocale } from 'context/locale'
import { getComponent, renderBlocks } from 'components'
import { BlockProps, FooterNavigationProps } from 'components/propTypes'
import { Block } from 'enums'

function BlockFooterNavigation({
	customComponent,
}: BlockProps<FooterNavigationProps>) {
	const [{ blocks, localePage }] = useLocale()
	const footerNavigationItems = renderBlocks(
		blocks('footerNavigation'),
		undefined,
		undefined,
		localePage,
	)
	const props = { footerNavigationItems }

	return getComponent<FooterNavigationProps>(
		Block.FooterNavigation,
		props,
		'',
		customComponent,
	)
}

export default BlockFooterNavigation
