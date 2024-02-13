import React from 'react'
import NextLink from 'next/link'
import Icon from 'components/theme/plain/Icon'
import { type ContentBlock } from '../../types'

type FooterNavFieldsProp = {
	readonly footerLinks: ContentBlock[]
}

type FooterLinksRendBProp = {
	readonly item?: ContentBlock
}

const FooterLinksRendC = ({ item }) => {
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
	}

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

const FooterLinksRendB = ({ item }: FooterLinksRendBProp) => {
	// Const blocks = item?.fields[0].blocks
	// const title = blocks && blocks[0].fields[0].text
	// const items = item?.fields[1].blocks
	const title = item?.fields[0].text
	const items = item?.fields[1].blocks
	return (
		<>
			<div className="footer__nav-item">
				<section className="footer__nav-heading font-bold">
					<p className="footer__nav-heading font-bold h5">
						<span>{title}</span>
					</p>
				</section>
				<ul className="footer__nav-list bare-list">
					{items?.map((child, key) => (
						<FooterLinksRendC key={key} item={child} />
					))}
				</ul>
			</div>
		</>
	)
}

export default function FooterLinksRend({ footerLinks }: FooterNavFieldsProp) {
	return (
		<>
			{footerLinks.map((child, key) => (
				<FooterLinksRendB key={key} item={child} />
			))}
		</>
	)
}
