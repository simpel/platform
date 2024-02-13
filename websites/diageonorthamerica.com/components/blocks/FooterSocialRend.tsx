import React from 'react'
import { ContentBlock } from '../../types'

type FooterSocialProp = {
	linksContent: ContentBlock[]
}
type FooterSocialLinksProp = {
	item: ContentBlock
}
function FooterSocialItem({ item }: FooterSocialLinksProp) {
	let title = ''
	let link = ''
	let cssClass = ''
	if (item && item.fields) {
		title = item.fields[0].text as string
		cssClass = item.fields[1].text as string
		link = item.fields[2].text as string
	}
	return (
		<li>
			<a href={link} rel="noreferrer" target="_blank" className={cssClass}>
				{title}
			</a>
		</li>
	)
}

export default function FooterSocialRend({ linksContent }: FooterSocialProp) {
	return (
		<ul className="social__media__links">
			{linksContent.map((child, key) => (
				<FooterSocialItem key={key} item={child}></FooterSocialItem>
			))}
		</ul>
	)
}
