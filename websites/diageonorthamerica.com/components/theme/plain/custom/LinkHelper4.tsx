import Link from 'next/link'
import React from 'react'
import Icon from 'components/theme/plain/Icon'
import { LinkHelper4Props } from 'components/propTypes'

export default function LinkHelper4({ link, linkText }: LinkHelper4Props) {
	let aTagClass = ''

	let m_target = '_self'
	let rel = ''
	let icon = 'icon_arrow_right'
	let iconleft = false
	let fileurl = ''

	if (link && link.url && link.url.length > 0) {
		let m_linkText = link.name
		if (linkText && linkText.length) {
			m_linkText = linkText
		}

		if (link.contentId && link.contentId.length > 0) {
			fileurl = link.url
			aTagClass = 'link'
			return (
				<Link href={fileurl} className={aTagClass}>
					<span className="link__inner">
						<span className="link__text">{m_linkText}</span>
						<Icon name={icon} size="middle" className="link__icon" />
					</span>
				</Link>
			)
		} else {
			if (link.mediaId && link.mediaId.length > 0) {
				aTagClass = 'download-link'
				fileurl =
					process.env.NEXT_PUBLIC_MEDIAHOST +
					`` +
					process.env.NEXT_PUBLIC_MEDIAPREFIX +
					'/media' +
					link.url.split('/media')[1]
				m_target = '_blank'
				rel = 'noreferrer'
				icon = 'icon_download'
				iconleft = true
			} else if (link.url.indexOf('/media') > -1) {
				aTagClass = 'download-link'
				fileurl =
					process.env.NEXT_PUBLIC_MEDIAHOST +
					`` +
					process.env.NEXT_PUBLIC_MEDIAPREFIX +
					'/media' +
					link.url.split('/media')[1]
				m_target = '_blank'
				rel = 'noreferrer'
				icon = 'icon_download'
				iconleft = true
			} else if (
				link.target &&
				(link.target === '_blank' || link.url.startsWith('http'))
			) {
				aTagClass = 'external-link'
				fileurl = link.url
				m_target = '_blank'
				rel = 'noreferrer'
				icon = 'icon_external_link'
			} else {
				fileurl = link.url
			}
			return (
				<a href={fileurl} className={aTagClass} target={m_target} rel={rel}>
					<span className="link__inner">
						{iconleft && (
							<Icon
								name={icon}
								size="middle"
								className="icon icon--middle link__icon link__icon--left"
							/>
						)}
						<span className="link__text">{m_linkText}</span>
						{!iconleft && (
							<Icon name={icon} size="middle" className="link__icon" />
						)}
					</span>
				</a>
			)
		}
	} else {
		return <></>
	}
}
