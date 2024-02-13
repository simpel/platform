import React from 'react'

import { RenderedBlocks } from 'components'

type Props = {
	header?: RenderedBlocks
	children: React.ReactNode
	footer?: RenderedBlocks
	bgImage?: string
	className?: string
	padding?: boolean
}

function Container({
	header,
	children,
	footer,
	bgImage,
	className,
	padding,
}: Props) {
	return (
		<div
			className="bg-cover"
			style={{ backgroundImage: bgImage && `url(${bgImage})` }}
		>
			<div
				className={`in-container ${padding ? 'container-padding' : ''} ${
					className || ''
				}`}
			>
				{header && !!header.length && (
					<header className="mb-8">{header}</header>
				)}
				{children}
				{footer && !!footer.length && <footer>{footer}</footer>}
			</div>
		</div>
	)
}

export default Container
