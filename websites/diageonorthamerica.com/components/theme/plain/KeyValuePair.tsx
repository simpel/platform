import React from 'react'

import { KeyValuePairProps } from 'components/propTypes'

function KeyValuePair({ kvpKey, kvpValue }: KeyValuePairProps) {
	return (
		<section className="key-value-pair">
			{kvpKey}: {kvpValue}
		</section>
	)
}

export default KeyValuePair
