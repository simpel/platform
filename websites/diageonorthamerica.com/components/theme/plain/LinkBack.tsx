import React, { useEffect, useState } from 'react'
import { setCookies, checkCookies } from 'cookies-next'
import Icon from 'components/theme/plain/Icon'
import Link from 'next/link'

export default function LinkBack() {
	const [consent, setConsent] = useState(true)

	useEffect(() => {
		setConsent(checkCookies('localConsent'))
	}, [])

	const acceptCookie = () => {
		setConsent(true)
		setCookies('localConsent', 'true', { maxAge: 60 * 60 * 24 * 365 })
	}
	if (consent === true) {
		return null
	}

	return (
		<section className="link-back-wrapper">
			<ul className="link-back-banner">
				<li>
					Are you looking for Diageo plc? &nbsp;
					<Link
						href="https://www.diageo.com/en"
						className="link link__text"
						target="_blank"
					>
						Visit Diageo.com
					</Link>
					<Icon name="icon_external_link" size="small" className="link__icon" />
				</li>
				<li>
					<Icon name="icon_close" size="middle" className="link__icon" />

					<a
						className="link link__text close-link-back"
						onClick={() => {
							acceptCookie()
						}}
					>
						Close
					</a>
				</li>
			</ul>
		</section>
	)
}
