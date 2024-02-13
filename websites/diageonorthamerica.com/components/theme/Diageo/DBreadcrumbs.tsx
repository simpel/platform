import React from 'react'

import { PartialPage } from '../../../types'
import BreadcrumbsHelper from '../plain/custom/BreadcrumbHelper'

type BreadcrumbProps = {
	breadcrumbs: PartialPage[]
	className?: string
}

function DBreadcrumbs({ breadcrumbs, className }: BreadcrumbProps) {
	return (
		<div className={`breadcrumbs ${className || ''}`}>
			<ul className="breadcrumbs__list bare-list flex flex-wrap">
				<BreadcrumbsHelper breadcrumbs={breadcrumbs}></BreadcrumbsHelper>
			</ul>
		</div>
	)
}

export default DBreadcrumbs
