import React from 'react'

import { NavigationPromoBoxProps } from 'components/propTypes'

export default function NavigationPromoBox(props: NavigationPromoBoxProps) {
	const { buttons, headline, image, html, imageContent, hideDescription } =
		props
	return (
		<div
			data-component="promobox-navigation"
			className="relative bg-center bg-no-repeat bg-cover"
			style={{
				backgroundImage: !imageContent && image ? `url(${image.url})` : '',
			}}
		>
			<div className="relative z-10 px-8 py-20 text-center text-gray-50">
				<h2 className="text-shadow-lg">{headline}</h2>
				{!hideDescription && (
					<div
						className="overflow-x-hidden prose"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				)}
				{imageContent && (
					<div className="flex justify-center">
						<img src={image?.url} alt={image?.alt} className="h-80" />
					</div>
				)}
				<div className="">{buttons}</div>
			</div>
		</div>
	)
}
