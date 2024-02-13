import React from 'react'

import { useFields } from 'context/fields'
import { BlockProps, KeyValuePairProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'

function BlockKeyValuePair({ customComponent }: BlockProps<KeyValuePairProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const props = {
		kvpKey: f.text('kvpKey'),
		kvpValue: f.text('kvpValue'),
	}

	return getComponent<KeyValuePairProps>(
		Block.KeyValuePair,
		props,
		componentIdentifier,
		customComponent,
	)
}

export default BlockKeyValuePair
