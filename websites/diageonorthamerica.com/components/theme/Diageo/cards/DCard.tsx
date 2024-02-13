import React, { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { type CardProps } from '../../../propTypes'

import Heading from '../../plain/Heading'
import Image from '../../plain/Image'
import IcoMoonIcon from '../../plain/IcoMoonIcon'
import { Icons as EnumsIcon } from '../../../../enumsIcon'
import Popup from 'reactjs-popup'

import { getBaseDateFormat } from '../../../../utilities/dateFormatting'
import { getVideoEmbedUrl } from 'utilities/functions'

function Card({
	image,
	title,
	headingLevel,
	text,
	linkCta,
	linkUrl,
	date,
	typeCard,
	tags,
	linkCtaSize,
	bgColor,
	direction,
	className,
	dimensions,
	videoUrl,
}: CardProps) {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

	const cardBg = cn({
		'card--with-bg': bgColor === true,
	})

	const sizeLinkCta = cn({
		'link--medium': linkCtaSize === 'medium',
		'link--large': linkCtaSize === 'large',
	})

	const cardDirection = cn({
		'card--row': direction === true,
	})
	const cleanVideoUrl = videoUrl ? getVideoEmbedUrl(videoUrl) : ''

	const Thumbnail = () => {
		if (videoUrl) {
			return (
				<div
					aria-label={title}
					onClick={() => setIsOpenModal(true)}
					className={`card__image ${
						dimensions?.widthDesk && dimensions?.heightDesk
							? 'card__image-pure'
							: ''
					}`}
				>
					<Image image={image} dimensions={dimensions} />
					<IcoMoonIcon
						icon={EnumsIcon.Play}
						size={32}
						className="double-card__icon-play flex flex-align-center flex-justify-center"
						color="white"
					/>
				</div>
			)
		} else {
			return (
				<Link
					href={`${linkUrl ?? ''}`}
					aria-label={title}
					className={`card__image ${
						dimensions?.widthDesk && dimensions?.heightDesk
							? 'card__image-pure'
							: ''
					}`}
				>
					<Image image={image} dimensions={dimensions} />
				</Link>
			)
		}
	}

	return (
		<div className={`card ${cardDirection} ${cardBg} ${className ?? ''}`}>
			{image?.url && <Thumbnail />}
			<div className="card__body">
				<div className="card__content">
					{!(date === '' && typeCard === '') && (
						<ul className="card__date bare-list flex flex-wrap">
							{date && (
								<li className="card__date-item">{getBaseDateFormat(date)}</li>
							)}
							{typeCard && <li className="card__date-item"> {typeCard} </li>}
						</ul>
					)}
					{title &&
						(linkUrl ? (
							<Link href={linkUrl}>
								<Heading
									heading={title}
									headingLevel={headingLevel}
									className="card__heading font-semibold"
								/>
							</Link>
						) : (
							<Heading
								heading={title}
								headingLevel={headingLevel}
								className="card__heading font-semibold"
							/>
						))}
					{text && <p>{text}</p>}
					{tags && tags.length > 0 ? (
						<ul className="card__tags bare-list flex flex-wrap">
							{tags.map((tag, index) => (
								// eslint-disable-next-line react/no-array-index-key
								<li key={index} className="card__tags-item">
									{tag.title}
								</li>
							))}
						</ul>
					) : null}
				</div>
				{linkCta?.url && (
					<Link href={linkCta.url} className={`card__link link ${sizeLinkCta}`}>
						<span className="link__inner">
							<span className="link__text">{linkCta.name}</span>
							<IcoMoonIcon
								icon={EnumsIcon.ArrowRight}
								size={20}
								className="link__icon"
							/>
						</span>
					</Link>
				)}
			</div>
			<Popup
				open={isOpenModal}
				className="video-popup"
				position="center center"
				closeOnEscape
				closeOnDocumentClick
				onClose={() => setIsOpenModal(false)}
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
						src={cleanVideoUrl}
						frameBorder="0"
						allow="autoplay; encrypted-media"
						allowFullScreen
						title="video"
					/>
				</div>
			</Popup>
		</div>
	)
}

export default Card
