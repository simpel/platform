import React from 'react'
import Link from 'next/link'
import { AnchorLinkBlockProps } from '../../../components/propTypes'

export default function AnchorLinkBlock({
	heading,
	blocks,
}: AnchorLinkBlockProps) {
	//console.log('marshall', { blocks })
	return (
		<section className="flex-container-wrapper sd-width">
			<div className="-pt-5 bg_colour_default flex-row flex-row--align-v-top flex-row--align-h-center">
				<div className="flex-col-md-11">
					{heading && <h4 className="h4">{heading}</h4>}
					<ul className="anchored-link-list">
						{blocks &&
							blocks.map((itm, index) => {
								const theurl = '#ANCH' + itm.anchorID.toLowerCase()
								const theurl2 = 'ANCH' + itm.anchorID.toLowerCase()

								const handleClick = (e) => {
									e.preventDefault()
									// @ts-ignore
									document
										.getElementById(theurl2)
										.scrollIntoView({ behavior: 'smooth' })
								}
								return (
									<li key={index}>
										<Link
											href={theurl}
											className={'link link__text-naked'}
											onClick={handleClick}
										>
											{itm.title}
										</Link>
									</li>
								)
							})}
					</ul>
				</div>
			</div>
		</section>
	)
}
