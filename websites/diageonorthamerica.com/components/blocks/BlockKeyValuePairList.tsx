import React from 'react'

import { useFields } from 'context/fields'
import { getComponent, renderBlocks } from 'components'
import { BlockProps } from 'components/propTypes'
import { BaseProps } from 'types'
import { Block } from 'enums'

function BlockKeyValuePairList({ customComponent }: BlockProps<BaseProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		children: renderBlocks(f.blocks('pairs')),
	}

	return getComponent<BaseProps>(
		Block.KeyValuePairList,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockKeyValuePairList
