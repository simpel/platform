import React from 'react'
import Link from 'next/link'
import { FixMediaPathsInHtml } from 'utilities/functions'
import LinkHelper2 from 'components/theme/plain/custom/LinkHelper2'
import { type BaseCardProps } from '../../../propTypes'
import { type CmsLink, type Link as LinkType } from '../../../../types'
import IcoMoonIcon from '../../plain/IcoMoonIcon'
import Heading from '../../plain/Heading'
import Image from '../../plain/Image'
import Icon from '../../plain/Icon'
import DLinkUnderline from '../DLinkUnderline'
import { HeadingLevel, BrandCardType } from '../../../../enums'
import { Icons as EnumsIcon } from '../../../../enumsIcon'

const simpleArrowWithOutlineLink = (linkCta: LinkType) => {
	return (
		<Link
			href={linkCta.url}
			target={linkCta.target}
			className="brand-card__link-icon"
		>
			<Icon stroke name="icon_arrow_right_circle" size="middle" color="black" />{' '}
			<span className="brand-name">{linkCta.name}</span>
		</Link>
	)
}

const exteranalLink = (linkCta: CmsLink) => {
	return (
		// <LinkHelper3 link={linkCta} showicon={true} linkClass={''} linkText={''} />
		<div>
			<LinkHelper2
				showicon
				url={linkCta.url}
				contentId={linkCta.contentId}
				mediaId={linkCta.mediaId}
				linkClass="link"
				name={linkCta.name}
				divClass=""
			/>
		</div>
		// <DLinkUnderline
		//   className="card__link"
		//   link={linkCta}
		//   icon={{
		//     icon: EnumsIcon.Launch,
		//   }}
		// />
	)
}

const simpleArrowLink = (linkCta: LinkType) => {
	return (
		<Link href={linkCta.url} className="brand-card__link-icon">
			<Icon stroke name="icon_arrow_right" size="middle" color="black" />
		</Link>
	)
}

const baseLinkArrow = (linkCta: LinkType) => {
	return (
		<DLinkUnderline
			className="card__link"
			link={linkCta}
			icon={{
				size: 16,
				icon: EnumsIcon.ArrowRight,
			}}
		/>
	)
}

const benefitLink = (linkCta: LinkType) => {
	return (
		<Link
			href={linkCta.url}
			className="brand-card__link-benefit"
			target={linkCta.target}
		>
			{linkCta.name}
			<IcoMoonIcon icon={EnumsIcon.ArrowRight} size={14} />
		</Link>
	)
}

const getCardLink = (typeCard: string, linkCta?: LinkType) => {
	switch (typeCard) {
		case BrandCardType.brand: {
			return linkCta?.url ? simpleArrowWithOutlineLink(linkCta) : null
		}

		case BrandCardType.product: {
			return linkCta?.url ? exteranalLink(linkCta) : null
		}

		case BrandCardType.productSecondary: {
			return linkCta?.url ? exteranalLink(linkCta) : null
		}

		case BrandCardType.explorer: {
			return linkCta?.url ? simpleArrowLink(linkCta) : null
		}

		case BrandCardType.historyTimeLine: {
			return linkCta?.url ? exteranalLink(linkCta) : null // BaseLinkArrow(linkCta) : null
		}

		case BrandCardType.history: {
			return linkCta?.url ? exteranalLink(linkCta) : null // SimpleArrowWithOutlineLink(linkCta) : null
		}

		case BrandCardType.benefit: {
			return linkCta?.url ? benefitLink(linkCta) : null
		}

		case BrandCardType.person: {
			return linkCta?.url ? simpleArrowWithOutlineLink(linkCta) : null
		}

		// Case BrandCardType.brandExplorer: {
		//   return linkCta && linkCta.url ? exteranalLink(linkCta) : null
		// }
		default: {
			return null
		}
	}
}

const DBrandCard = ({
	_id,
	typeCard,
	image,
	dimensions,
	imageLogo,
	title,
	text,
	linkCta,
	linkUrl,
	className,
	location,
	date,
	alternateUrl,
	itemIndex = 0,
}: BaseCardProps) => {
	const dim1 = dimensions || {
		styleDesk: 'fit-to-object',
		widthDesk: 380,
		heightDesk: 500,
		pureimage: true,
	}
	const dim2 = dimensions || {
		styleDesk: '',
		widthDesk: 188,
		heightDesk: 105,
		pureimage: true,
	}
	return (
		<div
			className={`brand-card brand-card--${typeCard} ${
				className ? className : ''
			}`}
		>
			{image && image.url !== undefined ? (
				<div className="brand-card__image">
					{/* <Image image={image} dimensions={dim1} isResponsive /> */}
					{/* <ImageBlock
            image={image}
            dimensions={{
              widthDesk: 550,
              heightDesk: 400,
              styleDesk: 'fit-to-object',
              pureimage: true,

            }}
            isResponsive={true}
          /> */}
					<Image isResponsive isLegacy image={image} dimensions={dim1} />
					{/* <ImageNext
            quality={60}
            width={itemIndex <= 5 ? 600 : 320}
            height={itemIndex <= 5 ? 550 : 320}
            src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image.url}`}
            alt={image.alt}
            layout="responsive"
          /> */}
					{typeCard === BrandCardType.brand &&
						imageLogo &&
						imageLogo.url !== undefined && (
							<div className="brand-card__image-logo">
								<Image image={imageLogo} dimensions={dim2} />
							</div>
						)}
					{typeCard === BrandCardType.brand && linkCta?.url ? (
						<Link
							href={linkCta?.url}
							target={linkCta?.target}
							className="brand-card__link-image"
							aria-label={`Find out more about ${title}`}
						/>
					) : null}
				</div>
			) : (
				<div className="brand-card__image">
					<Image
						image={{
							_id: `image-placeholder-${_id}`,
							url: '/images/static/careers-img-wide.jpg',
							alt: `${title} placeholder`,
						}}
						dimensions={dim1}
					/>
					<div className="brand-card__image-logo">
						{typeCard === BrandCardType.brand && (
							<Image
								image={{
									_id: `logo-placeholder-${_id}`,
									url: '/images/static/careers-img-wide.jpg',
									alt: `${title} placeholder`,
								}}
								dimensions={dim2}
							/>
						)}
					</div>
				</div>
			)}
			<div className="brand-card__body">
				{typeCard === BrandCardType.explorer ||
				typeCard === BrandCardType.brandExplorer
					? imageLogo &&
					  imageLogo.url && (
							<div className="brand-card__image-logo">
								<Image image={imageLogo} dimensions={dim2} />
							</div>
					  )
					: null}
				<div className="brand-card__content">
					{typeCard === BrandCardType.historyTimeLine && date && (
						<p className="brand-card__date font-semibold">{date}</p>
					)}
					{location && (
						<p className="brand-card__location font-semibold">{location}</p>
					)}
					{typeCard === BrandCardType.brandExplorer ? null : (
						<>
							{title &&
								(linkUrl ? (
									<Link href={linkUrl} className="link">
										<Heading
											heading={title}
											headingLevel={HeadingLevel.H3}
											className="brand-card__heading font-semibold link__text"
										/>
									</Link>
								) : (
									<Heading
										heading={title}
										headingLevel={HeadingLevel.H3}
										className="brand-card__heading font-semibold"
									/>
								))}
						</>
					)}
					{typeCard === BrandCardType.brandExplorer ? null : (
						<>
							{text && (
								<div
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(text),
									}}
									className="brand-card__text"
								/>
							)}
						</>
					)}
				</div>
				{typeCard === BrandCardType.brandExplorer ? (
					<>
						{alternateUrl === '' ? (
							<>
								{linkCta &&
									baseLinkArrow({
										name: linkCta.name,
										url: linkCta.url,
									})}
							</>
						) : (
							<>
								{linkCta &&
									exteranalLink({
										name: linkCta.name,
										url: alternateUrl || '',
										target: '_blank',
									})}
							</>
						)}
					</>
				) : (
					<>{typeCard && getCardLink(typeCard, linkCta)}</>
				)}
			</div>
		</div>
	)
}

export default DBrandCard
