import React from 'react'

import { TextProps } from 'components/propTypes'

function HtmlText({ text, id, style }: TextProps) {
	const cmsStyle = style

	return (
		<div
			className={`block-text ${cmsStyle}`}
			id={id}
			dangerouslySetInnerHTML={{ __html: text }}
		></div>
	)
}

export default HtmlText
