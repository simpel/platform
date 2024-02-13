import React from 'react'

import {
	ComplexElementProps,
	HeadingProps,
	TextProps,
} from 'components/propTypes'
import { renderBlockByContentType, renderBlocks } from 'components'
import { Block } from 'enums'

function Heading({ heading }: HeadingProps) {
	return <h2 className="text-4xl text-black">{heading}</h2>
}

function Text({ text }: TextProps) {
	return <div dangerouslySetInnerHTML={{ __html: text }} />
}

function ElementFacebook({
	header,
	body,
	footer,
	backgroundImage,
}: ComplexElementProps) {
	return (
		<div
			className="text-black bg-white bg-right bg-no-repeat bg-contain element-box"
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			<div className="flex flex-col justify-between h-full px-12 py-14">
				<div className="w-7/12">
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

export default ElementFacebook
