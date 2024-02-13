import React from 'react'

import { BaseProps } from 'types'
import Container from './Container'

function KeyValuePairList({ children }: BaseProps) {
	return (
		<section className="key-value-pair-list">
			<div className="py-10 bg-gray-300">
				<Container>
					<p>
						<i>
							Example for custom frontend widget implemented with Key Value
							pairs
						</i>
					</p>
					{children}
				</Container>
			</div>
		</section>
	)
}

export default KeyValuePairList
