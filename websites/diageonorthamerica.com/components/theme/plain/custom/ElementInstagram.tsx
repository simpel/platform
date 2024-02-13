import React from 'react'

import {
	ComplexElementProps,
	HeadingProps,
	TextProps,
} from 'components/propTypes'
import { renderBlockByContentType, renderBlocks } from 'components'
import { Block } from 'enums'

function Heading({ heading }: HeadingProps) {
	return <h2 className="text-4xl text-white">{heading}</h2>
}

function Text({ text }: TextProps) {
	return <div dangerouslySetInnerHTML={{ __html: text }} />
}

function ElementInstagram({ header, body, footer }: ComplexElementProps) {
	return (
		<div className="text-white bg-green-dark element-box">
			<div className="flex flex-col justify-between h-full px-12 py-14">
				<div>
					<header className="mb-8">
						{renderBlockByContentType(header, Block.Heading, Heading)}
					</header>
					<main>{renderBlockByContentType(body, Block.Text, Text)}</main>
				</div>
				<footer>{renderBlocks(footer)}</footer>
			</div>
		</div>
	)
}

export default ElementInstagram
