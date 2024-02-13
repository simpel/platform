import React from 'react'
import DContainer from '../Diageo/DContainer'
import { HeadingLevel } from '../../../enums'
import { SocietyCardsProps } from '../../propTypes'
import DCard from '../Diageo/cards/DCard'
import Heading from './Heading'
import LinkHelper2 from './custom/LinkHelper2'

function SocietyCardsBlock({
	heading,
	itemLarge,
	items,
	viewMoreLink,
	viewMoreLinkText,
}: Partial<SocietyCardsProps>) {
	const dim1 = {
		styleDesk: 'fit-to-object',
		widthDesk: 656,
		heightDesk: 656,
		pureimage: true,
	}
	const dim2 = {
		styleDesk: 'fit-to-object',
		widthDesk: 320,
		heightDesk: 230,
		pureimage: true,
	}
	return (
		<section className="block-society-cards">
			<DContainer>
				<section className="content-block--featured theme-white">
					<div className="offset-bg--reset"></div>
					<div className="block-banner">
						<div className="container">
							<div className="flex-row">
								<div className="flex-col-md-6">
									{heading && (
										<Heading
											heading={heading}
											className="block-society-cards__heading"
										/>
									)}
									{itemLarge && (
										<DCard
											_id={itemLarge._id}
											title={itemLarge.title}
											image={{
												_id: itemLarge.pageListingImage?._id
													? itemLarge.pageListingImage._id
													: '',
												url: itemLarge.pageListingImage?.url
													? itemLarge.pageListingImage.url
													: '',
												alt: itemLarge.title,
											}}
											dimensions={dim1}
											date={itemLarge.articleDate}
											tags={itemLarge.categoryPages}
											typeCard={itemLarge.contentType}
											linkUrl={itemLarge.url}
											className="card-featured-story"
											headingLevel={HeadingLevel.H4}
										/>
									)}
								</div>
								<div className="flex-col-md-6">
									{items && items.length && (
										<ul className="media-listing">
											{items.map((card, index) => (
												<li key={index} className=" flex-col-md-6">
													<DCard
														{...card}
														date={card.articleDate}
														tags={card.categoryPages}
														typeCard="Story"
														image={{
															_id: card.pageListingImage?._id
																? card.pageListingImage._id
																: '',
															url: card.pageListingImage?.url
																? card.pageListingImage.url
																: '',
															alt: card.title,
														}}
														dimensions={dim2}
														headingLevel={HeadingLevel.H4}
													/>
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
							<div className="flex-row flex-row--align-h-center">
								{viewMoreLink && (
									<LinkHelper2
										name={
											viewMoreLinkText ? viewMoreLinkText : viewMoreLink.name
										}
										url={viewMoreLink.url}
										contentId={viewMoreLink.contentId}
										mediaId={viewMoreLink.mediaId}
										target={viewMoreLink.target}
										linkClass={'link'}
										divClass={'link__inner'}
										showicon={true}
										size={'large'}
									/>
								)}
								{/* <DLinkUnderline
                  link={{
                    name: viewMoreLinkText ? viewMoreLinkText : '',
                    url: viewMoreLink?.url ? viewMoreLink.url : '',
                  }}
                  icon={{
                    icon: EnumsIcon.ArrowRight,
                  }}
                  size="large"
                /> */}
							</div>
						</div>
					</div>
				</section>
			</DContainer>
		</section>
	)
}

export default SocietyCardsBlock
