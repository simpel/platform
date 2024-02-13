import React from 'react'

import { getComponent } from 'components'
import { Block } from 'enums'

type Props = {
	message?: string
}

function LoadingPage({ message }: Props) {
	return (
		<div
			className="flex"
			style={{
				height: '100vh',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{getComponent(Block.Spinner, {})}
			<span>{message}</span>
		</div>
	)
}

export default LoadingPage
