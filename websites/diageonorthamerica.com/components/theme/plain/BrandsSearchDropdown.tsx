import React from 'react'
import Link from 'next/link'
import Icon from './Icon'
import Image from './Image'
import { PartialPage, CategoryLite } from 'types'

type BrandsSearchDropdownType = {
	categories?: PartialPage[] | CategoryLite[]
}

export default function BrandsSearchDropdown({
	categories,
}: BrandsSearchDropdownType) {
	return (
		<div className="brends-search-dropdown">
			{categories && categories.length ? (
				<div className="brends-search-dropdown__list">
					{categories.map((item) => (
						<div key={item._id} className="brends-search-dropdown__item">
							<div className="brand-line">
								<div className="brand-line__image">
									{item.pageListingImage2 && item.pageListingImage2.url ? (
										<Image
											image={{
												_id: item.pageListingImage2._id,
												url: item.pageListingImage2.url,
												alt: item.title,
											}}
										/>
									) : (
										<Image
											image={{
												_id: `image-placeholder-${item._id}`,
												url: '/images/static/careers-img-wide.jpg',
												alt: `${item.title} placeholder`,
											}}
										/>
									)}
								</div>
								<div className="brand-line__body">
									<p className="brand-line__brand">{item.title}</p>
									{item.categoryPages &&
									item.categoryPages.length &&
									item.categoryPages[1] ? (
										<p className="brand-line__category">
											{item.categoryPages[1].title}
										</p>
									) : (
										''
									)}
								</div>
								<div className="brand-line__link-wrapper">
									{item.alternateUrl ? (
										<a
											className="brand-line__link-icon"
											href={item.alternateUrl}
										>
											<Icon
												name="icon_arrow_right_circle"
												size="middle"
												stroke={true}
												color="black"
											/>
										</a>
									) : (
										<Link href={item.url} className="brand-line__link-icon">
											<Icon
												name="icon_arrow_right_circle"
												size="middle"
												stroke={true}
												color="black"
											/>
										</Link>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				''
			)}
		</div>
	)
}
