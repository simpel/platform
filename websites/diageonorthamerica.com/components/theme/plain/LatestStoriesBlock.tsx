import Link from 'next/link'
import React from 'react'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { type LatestStoriesBlockProps } from '../../propTypes'
import LinkHelper2 from './custom/LinkHelper2'
import ImageBlock from './Image'

const LatestStoriesBlock = ({
	title,
	viewMoreLink,
	viewMoreLinkText,
	items,
	careersarticles,
}: LatestStoriesBlockProps) => {
	// Const dimensions = { styleDesk: 'fit-to-object', widthDesk: 620, heightDesk: 620, pureimage: true }
	const dim2 = {
		styleDesk: 'fit-to-object',
		widthDesk: 384,
		heightDesk: 384,
		pureimage: true,
	}
	// Const cleanTheme = blockTheme ? blockTheme : 'theme-amber'
	const cleanTheme = 'theme-amber'
	let cardType = 'Story'
	if (careersarticles) {
		cardType = 'Article'
	}

	return (
		<section className={`content-block ${cleanTheme}`}>
			<div className="block-banner">
				<div className="container--profile-banner-wide p--l">
					<div className="block-latest-news">
						<div className="heading-stories">
							{title?.length > 0 ? (
								<h3
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={{ __html: title }}
									className="h3"
								/>
							) : (
								<h3>Latest stories</h3>
							)}
							<LinkHelper2
								name={viewMoreLinkText ?? viewMoreLink.name}
								url={viewMoreLink.url}
								contentId={viewMoreLink.contentId}
								mediaId={viewMoreLink.mediaId}
								target={viewMoreLink.target}
								linkClass="link link--large"
								divClass="link__inner"
								showicon={false}
							/>
						</div>

						<div className="latest-news reset">
							{items?.map((card, index) => {
								const img = {
									_id: card.pageListingImage._id,
									url: card.pageListingImage.url,
									alt: card.title,
								}
								return (
									<div key={index} className="latest-news__col">
										<div className="card card-latest-story">
											<Link href={card.url} className="card__image">
												<div className="image-box ">
													{/* {card.pageListingImage && <ImageBlock isResponsive image={img} dimensions={dim2} />} */}
													{card.pageListingImage && (
														<ImageBlock
															isLegacy
															image={img}
															dimensions={{
																widthDesk: 630,
																heightDesk: 420,
																styleDesk: 'fit-to-object',
																pureimage: true,
															}}
														/>
													)}
												</div>
											</Link>
											<div className="card__body">
												<div className="card__content">
													<ul className="card__date bare-list flex flex-wrap">
														<li className="card__date-item text-uppercase">
															{getBaseDateFormat(card.articleDate)}
														</li>
														<li className="card__date-item"> {cardType} </li>
													</ul>
													{card.title && (
														<Link href={card.url}>
															<h4 className="card__heading font-semibold">
																<span className="">{card.title}</span>
															</h4>
														</Link>
													)}
													<ul className="card__tags cream-bg bare-list flex flex-wrap">
														{card.categoryPages?.map((itm, index) => {
															return (
																<li key={index} className="card__tags-item">
																	{itm.title}
																</li>
															)
														})}
													</ul>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LatestStoriesBlock
