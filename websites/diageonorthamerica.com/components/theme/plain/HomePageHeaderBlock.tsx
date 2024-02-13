import Link from 'next/link'
import React from 'react'
import { HomePageHeaderBlockProps } from '../../propTypes'
import ImageBlock from './Image'
import { usePages } from 'context/pages'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { FixMediaPathsInHtml } from 'utilities/functions'

export default function HomePageHeaderBlock({
	richTextTitle,
	richTextIntro,
	mainImage,
	newsItems,
}: HomePageHeaderBlockProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 620,
		heightDesk: 620,
		pureimage: true,
	}
	const dim2 = {
		styleDesk: 'fit-to-object',
		widthDesk: 384,
		heightDesk: 384,
		pureimage: true,
	}
	const blktitle = richTextTitle ? richTextTitle : ''
	const blktext = richTextIntro ? richTextIntro : ''

	const [{ page }] = usePages()

	// const items = pages
	//   .filter((o) => o.contentType === 'pressReleasePage')
	//   .filter((o) => o.pageListingImage != null)
	//   .sort((a, b) => (a.articleDate < b.articleDate ? 1 : -1))
	//   .slice(0, 3)

	return (
		<div>
			<section className="content-block theme-amber">
				<div className="offset-bg--homepage"></div>
				<div className="block-banner">
					<div className="container--profile-banner">
						<div className="content-blurb">
							<div className="content-left">
								<h2 className="h5">Latest</h2>

								<div
									className="h2"
									dangerouslySetInnerHTML={{ __html: blktitle }}
								/>

								<div
									className="h4 font-light blurb"
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(blktext),
									}}
								></div>

								<ul className="card__tags bare-list flex flex-wrap">
									{page.categoryPages &&
										page.categoryPages.map((itm, index) => {
											return (
												<li key={index} className="card__tags-item">
													{itm.title}
												</li>
											)
										})}
								</ul>
							</div>
						</div>

						<div className="content-img">
							<div className="img-wrapper">
								{mainImage && (
									<ImageBlock image={mainImage} dimensions={dimensions} />
								)}
							</div>
						</div>
					</div>

					<div className="block-banner">
						<div className="container--profile-banner-wide p--l">
							<div className="block-latest-news">
								<h3>Latest stories</h3>
								<div className="latest-news reset">
									{newsItems &&
										newsItems.map((card, index) => {
											const img = {
												_id: card.pageListingImage._id,
												url: card.pageListingImage.url,
												alt: card.title,
											}
											return (
												<div key={index} className="latest-news__col">
													<div className="card card-latest-story">
														<Link href={card.url} className="card__image">
															<div className="image-box">
																{card.pageListingImage && (
																	<ImageBlock image={img} dimensions={dim2} />
																)}
															</div>
														</Link>
														<div className="card__body">
															<div className="card__content">
																<ul className="card__date bare-list flex flex-wrap">
																	<li className="card__date-item text-uppercase">
																		{getBaseDateFormat(card.articleDate)}
																	</li>
																	<li className="card__date-item"> Story </li>
																</ul>
																{card.title && (
																	<Link href={card.url}>
																		<h4 className="card__heading font-semibold">
																			<span className="">{card.title}</span>
																		</h4>
																	</Link>
																)}
																<ul className="card__tags cream-bg bare-list flex flex-wrap">
																	{card.categoryPages &&
																		card.categoryPages.map((itm, index) => {
																			return (
																				<li
																					key={index}
																					className="card__tags-item"
																				>
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
				</div>
			</section>

			{/* <p>{videoUrl}</p> */}
		</div>
	)
}
