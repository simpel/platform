import Link from 'next/link'
import React from 'react'
import { CmsLink } from 'types'
import Icon from 'components/theme/plain/Icon'

export default function LinkHelper2({
	name,
	url,
	contentId,
	mediaId,
	target,
	linkClass,
	divClass,
	showicon,
	size,
}: CmsLink & {
	linkClass: string
	divClass: string
	showicon: boolean
	size?: string
}) {
	let aTagClass = linkClass
	if (size && size.length) {
		switch (size) {
			case 'medium':
				aTagClass += ' link--medium'
				break
			case 'large':
				aTagClass += ' link--large'
				break
		}
	}

	let m_target = '_self'
	let rel = ''
	let icon = 'icon_arrow_right'
	let iconleft = false
	let fileurl = ''

	if (url && url.length > 0) {
		if (contentId && contentId.length > 0) {
			fileurl = url
		} else if (mediaId && mediaId.length > 0) {
			fileurl =
				process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				'/media' +
				url.split('/media')[1]
			m_target = '_blank'
			rel = 'noreferrer'
			icon = 'icon_download'
			iconleft = true
		} else if (url.indexOf('/media') > -1) {
			fileurl =
				process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				'/media' +
				url.split('/media')[1]
			m_target = '_blank'
			rel = 'noreferrer'
			icon = 'icon_download'
			iconleft = true
		} else if (target === '_blank' || url.startsWith('http')) {
			fileurl = url
			m_target = '_blank'
			rel = 'noreferrer'
			icon = 'icon_external_link'
		} else {
			fileurl = url
		}
		return (
			<Link
				href={fileurl}
				prefetch={false}
				className={aTagClass}
				target={m_target}
				rel={rel}
			>
				<span className={divClass}>
					{showicon && iconleft && (
						<Icon
							name={icon}
							size="middle"
							className="link__icon link__icon--left"
						/>
					)}
					<span className="link__text">{name}</span>
					{showicon && !iconleft && (
						<Icon name={icon} size="middle" className="link__icon" />
					)}
				</span>
			</Link>
		)
	} else {
		return <></>
	}
}
