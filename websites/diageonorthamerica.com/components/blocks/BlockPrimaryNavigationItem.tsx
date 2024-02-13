import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, PrimaryNavigationItemProps } from 'components/propTypes'
import { Block } from 'enums'

export default function PrimaryNavigationItem({
	customComponent,
}: BlockProps<PrimaryNavigationItemProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		link: f.link('navLink'),
		secondLevelItems: f.blocks('secondLevelItems'),
		megaMenuContents: f.blocks('megaMenuContents'),
		text: f.text('navText'),
	}

	return getComponent<PrimaryNavigationItemProps>(
		Block.PrimaryNavigationItem,
		props,
		componentIdentifier,
		customComponent,
	)
}
