import Link from 'next/link'
import React from 'react'
import Icon from 'components/theme/plain/Icon'
import { LinkHelper3Props } from 'components/propTypes'

export default function LinkHelper3({
	link,
	linkClass,
	showicon,
	linkText,
	isDownload,
	isMediaLibrary = false,
}: LinkHelper3Props) {
	let aTagClass = ''
	const proxyPrefix = '/api/proxy?filename='
	if (linkClass && linkClass.length) {
		aTagClass = linkClass
	}
	let m_target = '_self'
	let rel = ''
	let icon = 'icon_arrow_right'
	let iconleft = false
	let fileurl = ''

	const host = process.env.NEXT_PUBLIC_MEDIAHOST
	const prefix = process.env.NEXT_PUBLIC_MEDIAPREFIX

	if (isDownload && !isMediaLibrary) {
		fileurl = proxyPrefix + link.url
		return (
			<Link
				href={fileurl}
				className={aTagClass}
				download={isDownload}
				rel="noreferrer"
				target="_blank"
			>
				{showicon && iconleft && (
					<Icon
						name={icon}
						size="middle"
						className="link__icon link__icon--left"
					/>
				)}
				{linkText ?? link.name}
				{showicon && !iconleft && (
					<Icon name={icon} size="middle" className="link__icon" />
				)}
			</Link>
		)
	}

	if (link && link.url && link.url.length > 0) {
		let m_linkText = link.name
		if (linkText && linkText.length) {
			m_linkText = linkText
		}

		if (link.contentId && link.contentId.length > 0) {
			fileurl = link.url
			if (isDownload) {
				fileurl = proxyPrefix + fileurl
			}
			return (
				<Link href={fileurl} className={aTagClass} download={isDownload}>
					{showicon && iconleft && (
						<Icon
							name={icon}
							size="middle"
							className="link__icon link__icon--left"
						/>
					)}
					{m_linkText}
					{showicon && !iconleft && (
						<Icon name={icon} size="middle" className="link__icon" />
					)}
				</Link>
			)
		} else {
			if (link.mediaId && link.mediaId.length > 0) {
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
				fileurl = link.url
				m_target = '_blank'
				rel = 'noreferrer'
				icon = 'icon_external_link'
			} else {
				fileurl = link.url
			}
			if (isDownload) {
				fileurl = proxyPrefix + fileurl
			}

			return (
				<a
					href={fileurl}
					className={aTagClass}
					target={m_target}
					rel={rel}
					download={isDownload}
				>
					{showicon && iconleft && (
						<Icon
							name={icon}
							size="middle"
							className="link__icon link__icon--left"
						/>
					)}
					{m_linkText}
					{showicon && !iconleft && (
						<Icon name={icon} size="middle" className="link__icon" />
					)}
				</a>
			)
		}
	} else {
		return <></>
	}
}
