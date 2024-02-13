import React from 'react'
import Link from 'next/link'

import Container from './Container'
import { BreadcrumbsProps } from 'components/propTypes'
import Icon from 'components/theme/plain/Icon'

// THERE IS A HELPER CALLED BreadcrumbsHelper that is more used on this site
function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
	// Breadcrumbs seperator can be customized here
	const Seperator = () => (
		<span>
			<Icon name="icon_angle_right" size="middle" className="link__icon" />
		</span>
	)

	if (!breadcrumbs || !breadcrumbs.length) return null

	return (
		<section className="block-breadcrumbs">
			<Container>
				<ul className="text-sm text-gray-500">
					{breadcrumbs.map((page, i) => (
						<li key={page.url} className="inline-block">
							{i === breadcrumbs.length - 1 ? (
								page.title
							) : (
								<>
									<Link
										href={page.url.replace('/home', '')}
										className="text-gray-700"
									>
										{page.title}
									</Link>
									{breadcrumbs.length > 1 && <Seperator />}
								</>
							)}
						</li>
					))}
				</ul>
			</Container>
		</section>
	)
}

export default Breadcrumbs
