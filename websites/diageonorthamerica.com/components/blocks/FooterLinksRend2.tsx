import React from 'react'
import NextLink from 'next/link'
import { ContentBlock } from '../../types'
import Icon from 'components/theme/plain/Icon'

// NOT NEEDED ANY MORE

type FooterNavFieldsProp2 = {
	footerLinks: ContentBlock[]
}

type FooterLinksRendBProp2 = {
	item?: ContentBlock
}

function FooterLinksRendC2({ item }) {
	const url = item.fields[1].link.url
	const target = item.fields[1].link.target
	const title = item.fields[0].text
	if (target === '_blank') {
		return (
			<>
				<li className="footer__nav-list-item">
					<a
						href={url}
						target="_blank"
						className="footer__nav-list-link font-semibold"
						rel="noreferrer"
					>
						<span className="footer__nav-list-text">{title}</span>
						<Icon name="icon_external_link" size="small" />
					</a>
				</li>
			</>
		)
	} else {
		return (
			<>
				<li className="footer__nav-list-item">
					<NextLink
						href={url}
						className="footer__nav-list-link font-semibold"
						target={target}
					>
						<span className="footer__nav-list-text">{title}</span>
					</NextLink>
				</li>
			</>
		)
	}
}

function FooterLinksRendB2({ item }: FooterLinksRendBProp2) {
	const title = item?.fields[0].text
	const items = item?.fields[1].blocks
	//console.log(item)
	return (
		<>
			<div className="footer__nav-item">
				<section className="footer__nav-heading font-bold">
					<h5 className="footer__nav-heading font-bold">
						<span>{title}</span>
					</h5>
				</section>
				<ul className="footer__nav-list bare-list">
					{items &&
						items.map((child, key) => (
							<FooterLinksRendC2 key={key} item={child}></FooterLinksRendC2>
						))}
				</ul>
			</div>
		</>
	)
}

export default function FooterLinksRend2({
	footerLinks,
}: FooterNavFieldsProp2) {
	return (
		<>
			{footerLinks.map((child, key) => (
				<FooterLinksRendB2 key={key} item={child}></FooterLinksRendB2>
			))}
		</>
	)
}
