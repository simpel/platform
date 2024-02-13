import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'

export default function BlockSeparator({ customComponent }: BlockProps<{}>) {
	return getComponent<{}>(Block.Separator, {}, '', customComponent)
}
