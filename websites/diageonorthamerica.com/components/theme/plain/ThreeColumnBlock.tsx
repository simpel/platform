/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */

/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable unicorn/explicit-length-check */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable new-cap */
import React from 'react'
import { FixMediaPathsInHtml } from 'utilities/functions'
import { type ThreeColumnBlockProps } from '../../propTypes'
import ImageBlock from './Image'

export default function ThreeColumnBlock({
	blockHeading,
	blockItems,
	footerText,
	blockTheme,
	layout,
}: ThreeColumnBlockProps) {
	let fText = ''
	if (footerText && footerText.length) {
		fText = FixMediaPathsInHtml(footerText)
	}

	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 600,
		heightDesk: 335,
		pureimage: true,
	}
	const cleanTheme = blockTheme ? blockTheme : ''
	let sectionclass = ''

	switch (layout) {
		case 'Original':
		case '': {
			sectionclass = 'rte-themed ' + cleanTheme
			return (
				<section className={sectionclass}>
					<div className="three-column-block">
						{blockHeading && <h3>{blockHeading}</h3>}
						{blockItems &&
							blockItems.map((itm, index) => (
								<div key={index}>
									<ul className="three-column-list">
										<li>
											<div
												dangerouslySetInnerHTML={{ __html: itm.leftColumnText }}
											></div>
										</li>
										<li>
											{itm.middleColumnImage && (
												<ImageBlock
													image={itm.middleColumnImage}
													dimensions={dimensions}
												/>
											)}
										</li>
										<li>
											<div className="value-heading">
												<div className="value-container">
													<span className="small-suffix">
														{itm.rightColumnLargeTextPrefix}
													</span>
													<span className="large-value">
														{itm.rightColumnLargeText}
													</span>
													<span className="small-suffix">
														{itm.rightColumnLargeTextSuffix}
													</span>
												</div>
												<div className="value-text">
													{itm.rightColumnSmallText}
												</div>
											</div>
										</li>
									</ul>
								</div>
							))}
						{fText && (
							<div
								className="three-column-footer"
								dangerouslySetInnerHTML={{ __html: fText }}
							></div>
						)}
					</div>
				</section>
			)
		}

		default: {
			return null
		}
	}
}

// <div dangerouslySetInnerHTML={{ __html: blockHeading }}></div>
