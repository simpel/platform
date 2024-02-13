import React, { useState } from 'react'
import ImageBlock from './Image'
import { DoubleCardBlockProps } from '../../../components/propTypes'
import Link from 'next/link'
import { Image } from 'types'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { getVideoEmbedUrl } from 'utilities/functions'
import IcoMoonIcon from '../plain/IcoMoonIcon'
import { Icons as EnumIcons } from '../../../enumsIcon'
import Popup from 'reactjs-popup'
import { Icons as EnumsIcon } from 'enumsIcon'
import LinkHelper2 from './custom/LinkHelper2'

export default function DoubleCardBlock({
	title,
	viewMoreLink,
	viewMoreLinkText,
	card1,
	card1ImageOverride,
	card1video,
	card2,
	card2ImageOverride,
	card2video,
	blockTheme,
}: DoubleCardBlockProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 656,
		heightDesk: 369,
		pureimage: true,
	}
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const [vidUrl, setVidUrl] = useState<string>('')

	let contenttyp1 = ''
	let contenttyp2 = ''
	let stringdate1 = ''
	let stringdate2 = ''
	let Image1 = {} as Image
	let Image2 = {} as Image
	const cleanTheme = blockTheme ? blockTheme : ''
	const section1Class = 'container ' + cleanTheme
	const section2Class = 'content-block heading-bg ' + cleanTheme

	let cleanVideoUrl1 = ''
	let cleanVideoUrl2 = ''

	if (card1video && card1video.length) {
		cleanVideoUrl1 = getVideoEmbedUrl(card1video)
	}
	if (card2video && card2video.length) {
		cleanVideoUrl2 = getVideoEmbedUrl(card2video)
	}

	if (card1) {
		const articleDate1 = getBaseDateFormat(card1.articleDate)
		stringdate1 = articleDate1 ? articleDate1 : ''
		if (card1.pageListingImage) {
			Image1 = {
				_id: card1.pageListingImage._id,
				url: card1.pageListingImage.url,
				alt: card1.title,
			}
		}
	}
	if (card1ImageOverride) {
		Image1 = {
			_id: card1ImageOverride._id,
			url: card1ImageOverride.url,
			alt: card1.title,
		}
	}
	if (card2) {
		const articleDate2 = getBaseDateFormat(card2.articleDate)
		stringdate2 = articleDate2 ? articleDate2 : ''
		if (card2.pageListingImage) {
			Image2 = {
				_id: card2.pageListingImage._id,
				url: card2.pageListingImage.url,
				alt: card2.title,
			}
		}
	}
	if (card2ImageOverride) {
		Image2 = {
			_id: card2ImageOverride._id,
			url: card2ImageOverride.url,
			alt: card2.title,
		}
	}

	const handleClick = (url: string) => {
		if (url) {
			setVidUrl(url)
			setIsOpenModal(true)
		}
	}

	switch (card1.contentType) {
		case 'pressReleasePage':
			contenttyp1 = 'Press Release'
			break
		case 'featurePage':
			contenttyp1 = 'Story'
			break
	}
	switch (card2.contentType) {
		case 'pressReleasePage':
			contenttyp2 = 'Press Release'
			break
		case 'featurePage':
			contenttyp2 = 'Story'
			break
	}
	return (
		<>
			<section className={section1Class}>
				<div className="heading-stories">
					{title && (
						<h3 className="heading-stories__heading">
							<span className="text-black">{title}</span>
						</h3>
					)}
					<LinkHelper2
						name={viewMoreLinkText ? viewMoreLinkText : viewMoreLink.name}
						url={viewMoreLink.url}
						contentId={viewMoreLink.contentId}
						mediaId={viewMoreLink.mediaId}
						target={viewMoreLink.target}
						linkClass={'heading-stories__link link link--large'}
						divClass={'link__inner'}
						showicon={false}
					></LinkHelper2>
					{/* {viewMoreLink != null && viewMoreLink.url != null && (
          <Link href={viewMoreLink.url}>
            <a className="heading-stories__link link link--large">
              <div className="link__inner">
                <span className="link__text">{viewMoreLinkText}</span>
                <div className="icomoon-icon link__icon"></div>
              </div>
            </a>
          </Link>
        )} */}
				</div>
			</section>

			<section className={section2Class}>
				<div className="content-block--contained">
					<div className="double-card content-50">
						<div className="double-card__image-wrapper">
							{!cleanVideoUrl1 ? (
								<Link href={`${card1.url}`} className="story-card__image">
									<ImageBlock
										image={Image1}
										dimensions={{
											widthDesk: 656,
											heightDesk: 369,
											styleDesk: 'fit-to-object',
											pureimage: true,
										}}
										isLegacy={true}
									/>{' '}
								</Link>
							) : (
								<div>
									<div
										tabIndex={0}
										role="button"
										className="story-card__image"
										onClick={() => handleClick(cleanVideoUrl1)}
									>
										{Image1 && (
											<ImageBlock
												image={Image1}
												dimensions={{
													widthDesk: 656,
													heightDesk: 369,
													styleDesk: 'fit-to-object',
													pureimage: true,
												}}
												isLegacy={true}
											/>
										)}
										{cleanVideoUrl1 ? (
											<IcoMoonIcon
												icon={EnumIcons.Play}
												size={32}
												className="double-card__icon-play flex flex-align-center flex-justify-center"
												color="white"
											/>
										) : null}
									</div>
								</div>
							)}
						</div>
						<div className="card__body">
							<div className="card__content">
								<ul className="card__date bare-list flex flex-wrap">
									<li className="card__date-item text-uppercase">
										{stringdate1}
									</li>
									<li className="card__date-item"> {contenttyp1} </li>
								</ul>
								{card1 && card1.url && card1.title && (
									<Link href={card1.url}>
										<h4 className="card__heading font-semibold">
											<span className="">{card1.title}</span>
										</h4>
									</Link>
								)}

								<p>{card1 && card1.metaDescription}</p>
							</div>
						</div>
					</div>
					<div className="double-card content-50">
						<div className="double-card__image-wrapper">
							{!cleanVideoUrl2 ? (
								<Link href={`${card1.url}`} className="story-card__image">
									{Image2 && (
										<ImageBlock
											image={Image2}
											dimensions={{
												widthDesk: 656,
												heightDesk: 369,
												styleDesk: 'fit-to-object',
												pureimage: true,
											}}
											isLegacy={true}
										/>
									)}
								</Link>
							) : (
								<div>
									<div
										tabIndex={0}
										role="button"
										className="story-card__image"
										onClick={() => handleClick(cleanVideoUrl2)}
									>
										{Image2 && (
											<ImageBlock
												image={Image2}
												dimensions={{
													widthDesk: 656,
													heightDesk: 369,
													styleDesk: 'fit-to-object',
													pureimage: true,
												}}
												isLegacy={true}
											/>
										)}
										{cleanVideoUrl2 ? (
											<IcoMoonIcon
												icon={EnumIcons.Play}
												size={32}
												className="double-card__icon-play flex flex-align-center flex-justify-center"
												color="white"
											/>
										) : null}
									</div>
								</div>
							)}
						</div>
						<div className="card__body">
							<div className="card__content">
								<ul className="card__date bare-list flex flex-wrap">
									<li className="card__date-item text-uppercase">
										{stringdate2}
									</li>
									<li className="card__date-item"> {contenttyp2} </li>
								</ul>
								{card2 && card2.url && card2.title && (
									<Link href={card2.url}>
										<h4 className="card__heading font-semibold">
											<span className="">{card2.title}</span>
										</h4>
									</Link>
								)}

								<p>{card2 && card2.metaDescription}</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Popup
				open={isOpenModal}
				className="video-popup"
				position="center center"
				closeOnEscape
				closeOnDocumentClick
			>
				<div>
					<button
						aria-label="Close"
						onClick={() => setIsOpenModal(false)}
						className="popup-content__close-btn"
					>
						<IcoMoonIcon icon={EnumsIcon.Close} size={24} color="#ffffff" />
					</button>
					<iframe
						src={vidUrl}
						frameBorder="0"
						allow="autoplay; encrypted-media"
						allowFullScreen
						title="video"
					/>
				</div>
			</Popup>
		</>
	)
}
