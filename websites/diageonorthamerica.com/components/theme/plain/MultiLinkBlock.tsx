import Link from 'next/link'
import React from 'react'
import { MultiLinkBlockProps } from '../../../components/propTypes'

export default function MultiLinkBlock({
	heading,
	pageLinks,
	blockTheme,
}: MultiLinkBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	const divClass = `row-full-bleed bg_colour_sophisticated -pt-6 -pb-6 ${cleanTheme}`

	return (
		<section className="flex-container-wrapper -mt-10 -mb-10 bod__list">
			<div className={divClass}>
				<div className="flex-col-md-12">
					<div className="h4 -mb-4">{heading && <h4>{heading}</h4>}</div>
				</div>
				<div className="flex-col-md-12">
					<ul>
						{pageLinks &&
							pageLinks.map((itm, index) => {
								if (itm.mediaId && itm.mediaId.length) {
									// Media file
									const fullUrl =
										process.env.NEXT_PUBLIC_MEDIAHOST +
										`` +
										process.env.NEXT_PUBLIC_MEDIAPREFIX +
										itm.url
									return (
										<li key={index}>
											<a href={fullUrl} target="_blank" rel="noreferrer">
												{itm.name}
											</a>
										</li>
									)
								} else if (itm.contentId && itm.contentId.length) {
									// Page
									return (
										<li key={index}>
											<Link href={itm.url}>{itm.name}</Link>
										</li>
									)
								} else if (itm.target === '_blank') {
									// Off site
									return (
										<li key={index}>
											<a href={itm.url} target="_blank" rel="noreferrer">
												{itm.name}
											</a>
										</li>
									)
								} else {
									// treat as page
									return (
										<li key={index}>
											<Link href={itm.url}>{itm.name}</Link>
										</li>
									)
								}
							})}
					</ul>
				</div>
			</div>
		</section>
	)
}
