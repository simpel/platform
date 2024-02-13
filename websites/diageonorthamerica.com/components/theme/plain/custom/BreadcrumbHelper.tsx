import { type BreadcrumbsProps } from 'components/propTypes'
import Link from 'next/link'
import React from 'react'

export default function BreadcrumbsHelper({ breadcrumbs }: BreadcrumbsProps) {
	if (!breadcrumbs?.length) return null

	return (
		<>
			{breadcrumbs
				.filter((p) => p.url)
				.map((page, i) => {
					return (
						<li key={i} className="breadcrumbs__item">
							{i === breadcrumbs.length - 1 ? (
								<>
									<span className="breadcrumbs__current">{page.title}</span>
								</>
							) : (
								<>
									<Link
										href={page.url.replace('/home', '')}
										className="breadcrumbs__link"
									>
										{page.title}
									</Link>
									{breadcrumbs.length > 1 && ' / '}
								</>
							)}
						</li>
					)
				})}
		</>
	)
}
