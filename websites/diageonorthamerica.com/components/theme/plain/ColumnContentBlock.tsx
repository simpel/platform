/* eslint-disable complexity */
/* eslint-disable react/no-danger */
import process from 'process'
import Icon from 'components/theme/plain/Icon'
import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { Icons as EnumsIcon } from 'enumsIcon'
import {
	FixMediaPathsInHtml as fixMediaPathsInHtml,
	GiveFullLinkTarget as giveFullLinkTarget,
	GiveFullLinkUrl as giveFullLinkUrl,
} from 'utilities/functions'
import Image from 'next/legacy/image'
import { useMediaQuery } from 'hooks/useMediaQuery/useMediaQuery'
import { Slider } from '@diageo/designsystem'
import {
	type ColumnContentItemProps,
	type ColumnContentBlockProps,
} from '../../propTypes'
import IcoMoonIcon from './IcoMoonIcon'
import ImageBlock from './Image'
import LinkHelper4 from './custom/LinkHelper4'

const BlockLink = ({
	item,
	children,
	className,
}: {
	readonly item: ColumnContentItemProps
	readonly children: ReactNode
	readonly className?: string
}) => {
	if (item.itemLink?.url) {
		return (
			<Link
				href={giveFullLinkUrl(item.itemLink)}
				target={giveFullLinkTarget(item.itemLink)}
				className={className}
			>
				{children}
			</Link>
		)
	}

	return <>{children}</>
}

const Card = ({
	smallUpperTitle,
	richTextTitle,
	richTextIntro,
	itemImage,
	itemLink,
	itemLink2,
	dimensions,
}: ColumnContentItemProps & {
	readonly dimensions: {
		styleDesk: string
		widthDesk: number
		heightDesk: number
		pureimage: boolean
	}
}) => {
	const item: ColumnContentItemProps = {
		itemLink,
		itemLink2,
		itemImage,
		smallUpperTitle,
		richTextIntro,
		richTextTitle,
	}
	const itmSmallTitle = smallUpperTitle ?? ''
	const itmTitle = richTextTitle ?? ''
	const itmText = richTextIntro ?? ''

	return (
		<div className="block-cards__list-item">
			<div className="card">
				<BlockLink item={item} className="card__image">
					<div className="image-box">
						{item.itemImage?.url && (
							<ImageBlock image={item.itemImage} dimensions={dimensions} />
						)}
					</div>
				</BlockLink>
				<div className="card-body">
					<div className="card-content">
						{itmSmallTitle && (
							<ul className="flex flex-wrap card__date bare-list">
								<li className="card__data-item">{itmSmallTitle}</li>
							</ul>
						)}
						<BlockLink item={item} className="">
							{itmTitle && (
								<div
									dangerouslySetInnerHTML={{
										__html: itmTitle,
									}}
									className="font-semibold card__heading h4"
								/>
							)}
						</BlockLink>
						<div
							dangerouslySetInnerHTML={{
								__html: fixMediaPathsInHtml(itmText),
							}}
							className="rich-text-editor"
						/>
					</div>
					{itemLink?.url && (
						<LinkHelper4 linkText={itemLink.name} link={itemLink} />
					)}
				</div>
			</div>
		</div>
	)
}

const Desktop = ({
	richTextTitle,
	richTextIntro,
	link,
	blocks,
	layout,
	blockTheme,
	topMargin,
	bottomMargin,
}: ColumnContentBlockProps) => {
	const cleanTheme = blockTheme ?? ''
	let sectionClass = `block-column-content ${
		topMargin ? 'block-column-content__top-margin' : ''
	} ${bottomMargin ? 'block-column-content__bottom-margin' : ''} `

	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 550,
		heightDesk: 300,
		pureimage: true,
	}

	const blklinktext = link ? link.name : ''
	const blkTitle = richTextTitle ?? ''
	const blkText = richTextIntro ?? ''

	switch (layout) {
		case '': {
			return <></>
		}

		case 'plain-images': {
			sectionClass += 'content-block--contact -pt-3 -pb-4'
			dimensions.widthDesk = 432
			dimensions.heightDesk = 300
			return (
				<section className={sectionClass}>
					<div className="offset-bg--reset" />
					<div className="block-banner">
						<div className="flex-container-wrapper">
							<div
								dangerouslySetInnerHTML={{ __html: blkTitle }}
								className="h3"
							/>
							<div className="flex-row md-grid-lg">
								{blocks?.map((item, index) => {
									return (
										<div key={index} className="flex-col-md-4 md-grid-lg">
											<div className="rich-text-editor -pt-3 -pb-5">
												{item.itemImage && (
													<div className="image-box">
														{item.itemImage && (
															<Image
																src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${item.itemImage.url}`}
																alt={item.itemImage.alt}
																quality={60}
																objectFit="contain"
																width={dimensions.widthDesk ?? 500} // 500
																height={dimensions.heightDesk ?? 500} // 200
															/>
														)}
													</div>
												)}
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</section>
			)
		}

		case 'contacts': {
			sectionClass +=
				cleanTheme.length > 0
					? 'content-block--contact -pt-10 -pb-10 ' + cleanTheme
					: 'content-block--contact -pt-3 -pb-4'

			return (
				<section className={sectionClass}>
					<div className="offset-bg--reset" />
					<div className="block-banner">
						<div className="flex-container-wrapper">
							<div
								dangerouslySetInnerHTML={{ __html: blkTitle }}
								className="h3"
							/>
							<div className="flex-row md-grid-lg">
								{blocks?.map((item, index) => {
									const itmTitle = item.richTextTitle ?? ''
									const itmText = item.richTextIntro ?? ''
									return (
										<div key={index} className="flex-col-md-4 md-grid-lg">
											{itmTitle && itmTitle.length > 0 && (
												<div
													dangerouslySetInnerHTML={{ __html: itmTitle }}
													className="h6"
												/>
											)}
											<div
												dangerouslySetInnerHTML={{
													__html: fixMediaPathsInHtml(itmText),
												}}
												className="rich-text-editor"
											/>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</section>
			)
		}

		case 'further-reading': {
			dimensions.widthDesk = 550
			dimensions.heightDesk = 300
			sectionClass += 'content-block p--l ' + cleanTheme
			return (
				<section className={sectionClass}>
					<div className="offset-bg--reset" />
					<div className="block-banner">
						<div className="flex-row container--profile-banner-wide p--s pb-150">
							<div className="flex-row flex-col-md-12 flex-row--align-v-top flex-row--align-h-top">
								<div
									dangerouslySetInnerHTML={{ __html: blkTitle }}
									className="flex-col-md-3 h3"
								/>
								{blocks?.map((item, index) => {
									const itmTitle = item.richTextTitle ?? ''
									const itmText = item.richTextIntro ?? ''
									return (
										<div key={index} className="flex-col-md-3">
											<div className="card card--with-bg card-latest-story">
												<BlockLink item={item} className="card__image">
													<div className="image-box double-card--img">
														{item.itemImage?.url && (
															<ImageBlock
																image={item.itemImage}
																dimensions={dimensions}
															/>
														)}
													</div>
												</BlockLink>
												<div className="card__body">
													<div className="card__content">
														{itmTitle && (
															<h4
																dangerouslySetInnerHTML={{ __html: itmTitle }}
																className="font-semibold card__heading"
															/>
														)}
														<div
															dangerouslySetInnerHTML={{
																__html: fixMediaPathsInHtml(itmText),
															}}
															className="rich-text-editor"
														/>
													</div>
													{item.itemLink?.url && (
														<p>
															<Link
																href={giveFullLinkUrl(item.itemLink)}
																target={giveFullLinkTarget(item.itemLink)}
																className="link"
															>
																<span className="link__inner">
																	<span className="link__text">
																		{item.itemLink.name}
																	</span>
																	<Icon
																		name="icon_arrow_right"
																		size="middle"
																		className="link__icon"
																	/>
																</span>
															</Link>
														</p>
													)}
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</section>
			)
		}

		case 'meet-the-people': {
			dimensions.widthDesk = 400
			dimensions.heightDesk = 400
			sectionClass += 'content-block p--l ' + cleanTheme
			return (
				<>
					<section className="-mt-6 flex-container-wrapper z__index">
						<div className="flex-row">
							<div className="flex-col-md-12">
								<div
									dangerouslySetInnerHTML={{ __html: richTextTitle }}
									className="h2"
								/>
							</div>
						</div>
					</section>
					<section className="flex-container-wrapper md-width -pt-6 -mb-7 bg_colour_semi_full">
						<div className="flex-row">
							{blocks?.map((item, index) => {
								const itmText = item.richTextIntro ?? ''
								return (
									<div
										key={index}
										className="flex-col-sm-6 flex-col-md-4 md-grid-lg"
									>
										<div className="image__wrapper xs_image">
											{item.itemImage && (
												<ImageBlock
													image={item.itemImage}
													dimensions={dimensions}
												/>
											)}
										</div>
										<div
											dangerouslySetInnerHTML={{ __html: itmText }}
											className="p--xs h3"
										/>
									</div>
								)
							})}
						</div>
					</section>
				</>
			)
		}

		case 'home-triple': {
			dimensions.widthDesk = 700
			dimensions.heightDesk = 300
			sectionClass += 'block-cards block-cards--three-cards ' + cleanTheme

			return (
				<section className={sectionClass}>
					<div className="container">
						<div className="block-cards__inner">
							<div
								dangerouslySetInnerHTML={{ __html: blkTitle }}
								className="block-cards__heading h3"
							/>
							<div className="block-cards__list">
								{blocks?.length &&
									blocks.map((item, index) => {
										const itmSmallTitle = item.smallUpperTitle ?? ''
										const itmTitle = item.richTextTitle ?? ''
										const itmText = item.richTextIntro ?? ''

										const itemLink = item.itemLink
										return (
											<div key={index} className="block-cards__list-item">
												<div className="card">
													<BlockLink item={item} className="card__image">
														<div className="image-box">
															{item.itemImage?.url && (
																<ImageBlock
																	image={item.itemImage}
																	dimensions={dimensions}
																/>
															)}
														</div>
													</BlockLink>
													<div className="card-body">
														<div className="card-content">
															{itmSmallTitle && (
																<ul className="flex flex-wrap card__date bare-list">
																	<li className="card__data-item">
																		{itmSmallTitle}
																	</li>
																</ul>
															)}
															{itemLink?.url && itmTitle && (
																<Link
																	href={giveFullLinkUrl(itemLink)}
																	target={giveFullLinkTarget(itemLink)}
																>
																	<h4
																		dangerouslySetInnerHTML={{
																			__html: itmTitle,
																		}}
																		className="font-semibold card__heading"
																	/>
																</Link>
															)}
															<div
																dangerouslySetInnerHTML={{
																	__html: fixMediaPathsInHtml(itmText),
																}}
																className="rich-text-editor"
															/>
														</div>
														{itemLink?.url && (
															<Link
																href={giveFullLinkUrl(itemLink)}
																target={giveFullLinkTarget(itemLink)}
																className="card__link link link--medium"
															>
																<span className="link__inner">
																	<span className="link_text">
																		{itemLink.name}
																	</span>
																	<IcoMoonIcon
																		icon={EnumsIcon.ArrowRight}
																		size={20}
																		className="link__icon"
																	/>
																</span>
															</Link>
														)}
													</div>
												</div>
											</div>
										)
									})}
							</div>
						</div>
						{link?.url && (
							<Link
								href={giveFullLinkUrl(link)}
								target={giveFullLinkTarget(link)}
								className="card__link link link--medium"
							>
								<div className="link__inner">
									<span className="link_text">{blklinktext}</span>
									<IcoMoonIcon
										icon={EnumsIcon.ArrowRight}
										size={20}
										className="link__icon"
									/>
								</div>
							</Link>
						)}
					</div>
				</section>
			)
		}

		case 'centered-title': {
			dimensions.widthDesk = 600
			dimensions.heightDesk = 400
			sectionClass += 'block-benefits bg_colour_default ' + cleanTheme
			return (
				<section className={sectionClass}>
					<div className="container">
						<div
							dangerouslySetInnerHTML={{ __html: blkTitle }}
							className="font-bold block-benefits__heading h2 text-align--center"
						/>
						<div className="block-benefits__list">
							{blocks?.length &&
								blocks.map((item, index) => {
									const itmTitle = item.richTextTitle ?? ''
									const itmText = item.richTextIntro ?? ''

									return (
										<div key={index} className="block-benefits__list-col">
											<div className="brand-card brand-card--benefit">
												<div className="brand-card__image">
													{item.itemImage && item.itemImage.url && (
														<div className="brand-card__image">
															{item.itemImage && (
																<ImageBlock
																	image={item.itemImage}
																	dimensions={dimensions}
																/>
															)}
														</div>
													)}
													<div className="brand-card__content">
														<div
															dangerouslySetInnerHTML={{ __html: itmTitle }}
															className="font-semibold brand-card__heading"
														/>
														<div
															dangerouslySetInnerHTML={{
																__html: fixMediaPathsInHtml(itmText),
															}}
															className="brand-card__text"
														/>
													</div>
													{item.itemLink?.url && (
														<div className="rich-text-editor">
															<p>
																<Link
																	href={giveFullLinkUrl(item.itemLink)}
																	target={giveFullLinkTarget(item.itemLink)}
																	className="internal-link"
																>
																	{item.itemLink.name}
																</Link>
															</p>
														</div>
													)}
													{item.itemLink2?.url && (
														<div className="rich-text-editor">
															<p>
																<Link
																	href={giveFullLinkUrl(item.itemLink2)}
																	target={giveFullLinkTarget(item.itemLink2)}
																	className="internal-link"
																>
																	{item.itemLink2.name}
																</Link>
															</p>
														</div>
													)}
												</div>
											</div>
										</div>
									)
								})}
						</div>
					</div>
				</section>
			)
		}

		case 'esg-quad': {
			dimensions.widthDesk = 700
			dimensions.heightDesk = 400
			sectionClass +=
				'block-cards block-cards--four-cards bg-themed ' + cleanTheme

			return (
				<section className={sectionClass}>
					<div className="container">
						<div className="block-cards__inner">
							<div
								dangerouslySetInnerHTML={{ __html: blkTitle }}
								className="block-cards__heading h3"
							/>
							<div
								dangerouslySetInnerHTML={{ __html: blkText }}
								className="intro-text"
							/>
							{link?.url && (
								<div className="">
									<LinkHelper4 linkText={link.name} link={link} />
								</div>
							)}
							<div className="block-cards__list">
								{blocks?.length &&
									blocks.map((item, index) => {
										const itmSmallTitle = item.smallUpperTitle ?? ''
										const itmTitle = item.richTextTitle ?? ''
										const itmText = item.richTextIntro ?? ''

										const itemLink = item.itemLink
										return (
											<div key={index} className="block-cards__list-item">
												<div className="card">
													<BlockLink item={item} className="card__image">
														<div className="image-box">
															{item.itemImage?.url && (
																<ImageBlock
																	image={item.itemImage}
																	dimensions={dimensions}
																/>
															)}
														</div>
													</BlockLink>
													<div className="card-body">
														<div className="card-content">
															{itmSmallTitle && (
																<ul className="flex flex-wrap card__date bare-list">
																	<li className="card__data-item">
																		{itmSmallTitle}
																	</li>
																</ul>
															)}
															<BlockLink item={item}>
																{itmTitle && (
																	<h4
																		dangerouslySetInnerHTML={{
																			__html: itmTitle,
																		}}
																		className="font-semibold card__heading"
																	/>
																)}
															</BlockLink>
															<div
																dangerouslySetInnerHTML={{
																	__html: fixMediaPathsInHtml(itmText),
																}}
																className="rich-text-editor"
															/>
														</div>
														{itemLink?.url && (
															<LinkHelper4
																linkText={itemLink.name}
																link={itemLink}
															/>
														)}
													</div>
												</div>
											</div>
										)
									})}
							</div>
						</div>
					</div>
				</section>
			)
		}

		case 'esg-triple': {
			dimensions.widthDesk = 700
			dimensions.heightDesk = 400
			sectionClass +=
				'block-cards block-cards--three-cards bg-themed ' + cleanTheme

			return (
				<section className={sectionClass}>
					<div className="container">
						<div className="block-cards__inner">
							<div className="block-cards__heading">
								<div
									dangerouslySetInnerHTML={{ __html: blkTitle }}
									className="h3"
								/>
								<div
									dangerouslySetInnerHTML={{
										__html: fixMediaPathsInHtml(blkText),
									}}
								/>
								{link?.url && (
									<div className="">
										<LinkHelper4 linkText={link.name} link={link} />
									</div>
								)}
							</div>
							<div className="block-cards__list">
								{blocks?.length &&
									blocks.map((item, index) => {
										const itmSmallTitle = item.smallUpperTitle ?? ''
										const itmTitle = item.richTextTitle ?? ''
										const itmText = item.richTextIntro ?? ''

										const itemLink = item.itemLink
										return (
											<div key={index} className="block-cards__list-item">
												<div className="card">
													<BlockLink item={item} className="card__image">
														<div className="image-box">
															{item.itemImage?.url && (
																<ImageBlock
																	image={item.itemImage}
																	dimensions={dimensions}
																/>
															)}
														</div>
													</BlockLink>

													<div className="card-body card-body-alt">
														<div className="card-content">
															{itmSmallTitle && (
																<ul className="flex flex-wrap card__date bare-list">
																	<li className="card__data-item">
																		{itmSmallTitle}
																	</li>
																</ul>
															)}
															<BlockLink item={item}>
																{itmTitle && (
																	<h4
																		dangerouslySetInnerHTML={{
																			__html: itmTitle,
																		}}
																		className="font-semibold card__heading"
																	/>
																)}
															</BlockLink>

															<div
																dangerouslySetInnerHTML={{
																	__html: fixMediaPathsInHtml(itmText),
																}}
																className="rich-text-editor"
															/>
														</div>
														{itemLink?.url && (
															<LinkHelper4
																linkText={itemLink.name}
																link={itemLink}
															/>
														)}
													</div>
												</div>
											</div>
										)
									})}
							</div>
						</div>
					</div>
				</section>
			)
		}

		case 'esg-wide-triple': {
			dimensions.widthDesk = 900
			dimensions.heightDesk = 500
			sectionClass +=
				'block-cards block-cards--three-wide-cards bg-themed ' + cleanTheme

			return (
				<section className={sectionClass}>
					<div className="container">
						<div className="block-cards__inner">
							<div
								dangerouslySetInnerHTML={{ __html: blkTitle }}
								className="block-cards__heading h3"
							/>
							{link?.url && (
								<div className="">
									<LinkHelper4 linkText={link.name} link={link} />
								</div>
							)}
							<div className="block-cards__list">
								{blocks?.length &&
									blocks.map((item, index) => {
										return (
											<Card key={index} dimensions={dimensions} {...item} />
										)
									})}
							</div>
						</div>
					</div>
				</section>
			)
		}

		default: {
			return null
		}
	}
}

const Mobile = ({
	richTextTitle,
	richTextIntro,
	link,
	blocks,
	layout,
	blockTheme,
	topMargin,
	bottomMargin,
}: ColumnContentBlockProps) => {
	const cleanTheme = blockTheme ?? ''
	let sectionClass = `block-column-content ${
		topMargin ? 'block-column-content__top-margin' : ''
	} ${bottomMargin ? 'block-column-content__bottom-margin' : ''} `

	if (layout === 'esg-wide-triple') {
		sectionClass +=
			'block-cards block-cards--three-wide-cards bg-themed ' + cleanTheme
	}

	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 550,
		heightDesk: 300,
		pureimage: true,
	}

	const blkTitle = richTextTitle ?? ''

	return (
		<section className={sectionClass}>
			<div className="container block-cards-container">
				<div className="block-cards__inner">
					<div
						dangerouslySetInnerHTML={{ __html: blkTitle }}
						className="block-cards__heading h3"
					/>
					{link?.url && (
						<div className="">
							<LinkHelper4 linkText={link.name} link={link} />
						</div>
					)}
					<div className="block-cards__list">
						<Slider
							navigation={false}
							config={{
								spaceBetween: -60,
							}}
						>
							{blocks?.length &&
								blocks.map((item, index) => {
									return <Card key={index} dimensions={dimensions} {...item} />
								})}
						</Slider>
					</div>
				</div>
			</div>
		</section>
	)
}

const ColumnContentBlock = ({ ...props }: ColumnContentBlockProps) => {
	const isSmall = useMediaQuery('(max-width: 575px)')

	return <>{isSmall ? <Mobile {...props} /> : <Desktop {...props} />} </>
}

export default ColumnContentBlock
