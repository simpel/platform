import { useNavigation } from 'context/navigation'
import { usePages } from 'context/pages'
import { BlockProps, BreadcrumbsProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'

function BlockBreadcrumbs({ customComponent }: BlockProps<BreadcrumbsProps>) {
	const [{ showBreadcrumbs }] = usePages()
	const [{ breadcrumbs }] = useNavigation()

	if (!showBreadcrumbs) return null

	const props = { breadcrumbs }

	return getComponent<BreadcrumbsProps>(
		Block.Breadcrumbs,
		props,
		'',
		customComponent,
	)
}

export default BlockBreadcrumbs
