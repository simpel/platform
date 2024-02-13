/* eslint-disable react/no-danger */
import React, { type ReactNode, useState } from 'react'
import {
	FixMediaPathsInHtml as fixMediaPathsInHtml,
	getClearIdFromVideoUrl,
	getVideoEmbedUrl,
} from 'utilities/functions'
import { Icons as EnumsIcon } from 'enumsIcon'
import IcoMoonIcon from 'components/theme/plain/IcoMoonIcon'
import Popup from 'reactjs-popup'
import VideoEmbedContainer from 'components/theme/plain/VideoEmbedContainer'
import VideoEmbedYoutube from 'components/theme/plain/VideoEmbedYoutube'
import VideoEmbedVimeo from 'components/theme/plain/VideoEmbedVimeo'
import { type MediaWithTextBlockProps } from '../../propTypes'
import ImageBlock from './Image'
import LinkHelper from './custom/LinkHelper'

// eslint-disable-next-line complexity
const MediaWithTextBlock = ({
	heading,
	richTextHeading,
	// RichTextHeadingSize = HeadingLevel.H2,
	text,
	// AdditionalContentSlot,
	image,
	imageAlign,
	noImageHeightConstraint,
	linkText,
	link,
	blockTheme,
	mediaBlockStyle,
	video,
	// Reversed,
	actualSizeImage,
}: MediaWithTextBlockProps) => {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 750,
		heightDesk: 450,
		pureimage: true,
	}

	let flipclass = ''
	let sectionclass = ''
	const cleanTheme = blockTheme ?? ''
	text = fixMediaPathsInHtml(text)

	if (video?.length) {
		video = getVideoEmbedUrl(video)
	}

	if (actualSizeImage) {
		dimensions.styleDesk = ''
	}

	const MediaBlock = ({ children }: { readonly children: ReactNode }) => {
		const videoUrl = video ?? ''

		return (
			<>
				{(video ?? '')?.length > 0 ? (
					<>
						<div
							className="flex flex-align-center flex-justify-center"
							style={{ position: 'relative', height: 'auto' }}
							onClick={() => {
								setIsOpenModal(true)
							}}
						>
							{children}
							{(video ?? '')?.length > 0 && (
								<IcoMoonIcon
									icon={EnumsIcon.Play}
									size={32}
									className="double-card__icon-play flex flex-align-center flex-justify-center"
									color="white"
								/>
							)}
						</div>

						<Popup
							closeOnEscape
							closeOnDocumentClick
							open={isOpenModal}
							className="video-popup"
							position="center center"
							onClose={() => {
								setIsOpenModal(false)
							}}
						>
							<div>
								<button
									type="button"
									aria-label="Close"
									className="popup-content__close-btn"
									onClick={() => {
										setIsOpenModal(false)
									}}
								>
									<IcoMoonIcon
										icon={EnumsIcon.Close}
										size={24}
										color="#ffffff"
									/>
								</button>

								{videoUrl.length > 0 && (
									<VideoEmbedContainer>
										<>
											{videoUrl.includes('youtu.be') ||
											videoUrl.includes('youtube.com') ? (
												<VideoEmbedYoutube
													videoId={getClearIdFromVideoUrl(videoUrl)}
												/>
											) : (
												<VideoEmbedVimeo
													videoId={getClearIdFromVideoUrl(videoUrl)}
												/>
											)}
										</>
									</VideoEmbedContainer>
								)}
							</div>
						</Popup>
					</>
				) : (
					<>{children}</>
				)}
			</>
		)
	}

	switch (mediaBlockStyle) {
		case '50-50': {
			dimensions.widthDesk = 670
			dimensions.heightDesk = 620
			if (noImageHeightConstraint) {
				dimensions.heightDesk = 414
			}

			flipclass = 'container'
			if (imageAlign) {
				flipclass = 'container flipped'
			}

			sectionclass = 'promo-content ' + cleanTheme
			return (
				<section className={sectionclass}>
					<div className={flipclass}>
						<div className="content-img">
							{image && (
								<MediaBlock>
									<ImageBlock
										isResponsive
										image={image}
										dimensions={dimensions}
									/>
								</MediaBlock>
							)}
						</div>
						<div className="content-blurb">
							<div className="content-centered text-body">
								<p className="font-semibold">{heading}</p>

								<div
									dangerouslySetInnerHTML={{ __html: richTextHeading }}
									className="content-heading h2"
								/>

								<div
									dangerouslySetInnerHTML={{ __html: text }}
									className="font-light sub-heading-hp"
								/>
								{link && (
									<LinkHelper
										name={linkText ?? link.name}
										url={link.url}
										contentId={link.contentId}
										mediaId={link.mediaId}
										target={link.target}
									/>
								)}
							</div>
						</div>
					</div>
				</section>
			)
		}

		case '50-50-black': {
			dimensions.widthDesk = 670
			dimensions.heightDesk = 620
			if (noImageHeightConstraint) {
				dimensions.heightDesk = 414
			}

			flipclass = 'container'
			if (imageAlign) {
				flipclass = 'container flipped'
			}

			sectionclass = 'promo-content black-background-important ' + cleanTheme
			return (
				<section className={sectionclass}>
					<div className={flipclass}>
						<div className="content-img">
							{image && (
								<MediaBlock>
									<ImageBlock image={image} dimensions={dimensions} />
								</MediaBlock>
							)}
						</div>
						<div className="content-blurb black-background-important">
							<div className="content-centered text-body">
								<p className="font-semibold">{heading}</p>

								<div
									dangerouslySetInnerHTML={{ __html: richTextHeading }}
									className="content-heading black-background-important h2"
								/>

								<div
									dangerouslySetInnerHTML={{ __html: text }}
									className="font-light sub-heading-hp"
								/>
								{link && (
									<LinkHelper
										name={linkText ?? link.name}
										url={link.url}
										contentId={link.contentId}
										mediaId={link.mediaId}
										target={link.target}
									/>
								)}
							</div>
						</div>
					</div>
				</section>
			)
		}

		case '50-50-full-bleed': {
			dimensions.widthDesk = 770
			dimensions.heightDesk = 530
			if (noImageHeightConstraint) {
				dimensions.heightDesk = 353
			}

			flipclass = 'container'
			if (imageAlign) {
				flipclass = 'container flipped'
			}

			sectionclass = 'promo-content fullbleed-bg -pt-10 -pb-10 ' + cleanTheme
			return (
				<section className={sectionclass}>
					<div className={flipclass}>
						<div className="content-blurb">
							<div className="content-centered--wide text-body">
								{heading && <h5>{heading}</h5>}
								<div
									dangerouslySetInnerHTML={{ __html: richTextHeading }}
									className="content-heading h1"
								/>
								<div
									dangerouslySetInnerHTML={{ __html: text }}
									className="rich-text-editor"
								/>
								{link && (
									<LinkHelper
										name={linkText ?? link.name}
										url={link.url}
										contentId={link.contentId}
										mediaId={link.mediaId}
										target={link.target}
									/>
								)}
							</div>
						</div>
						<div className="content-img">
							{image && (
								<div className="content-img-wrapper 2 narrow">
									<MediaBlock>
										<ImageBlock
											isResponsive
											isLegacy
											image={image}
											dimensions={dimensions}
										/>
									</MediaBlock>
								</div>
							)}
						</div>
					</div>
				</section>
			)
		}

		case '45-55': {
			dimensions.widthDesk = 750
			dimensions.heightDesk = 450
			if (noImageHeightConstraint) {
				dimensions.heightDesk = 300
			}

			sectionclass = 'content-block rte-themed ' + cleanTheme
			if (imageAlign) {
				return (
					<section className={sectionclass}>
						<div className="content-block--wrapper">
							<div className="content-blurb">
								<div className="content-left text-body">
									<div
										dangerouslySetInnerHTML={{ __html: richTextHeading }}
										className="content-heading h2"
									/>
									<div
										dangerouslySetInnerHTML={{ __html: text }}
										className="rich-text-editor"
									/>
									{link && (
										<LinkHelper
											name={linkText ?? link.name}
											url={link.url}
											contentId={link.contentId}
											mediaId={link.mediaId}
											target={link.target}
										/>
									)}
								</div>
							</div>
							<div className="content-img">
								{image && (
									<div className="content-img-wrapper 3">
										<MediaBlock>
											<ImageBlock
												isLegacy
												image={image}
												dimensions={dimensions}
											/>
										</MediaBlock>
									</div>
								)}
							</div>
						</div>
					</section>
				)
			}

			return (
				<section className={sectionclass}>
					<div className="content-block--wrapper">
						<div className="content-img alt">
							{image && (
								<MediaBlock>
									<ImageBlock isLegacy image={image} dimensions={dimensions} />
								</MediaBlock>
							)}
						</div>
						<div className="content-blurb alt">
							<div className="content-left text-body">
								<div
									dangerouslySetInnerHTML={{ __html: richTextHeading }}
									className="content-heading h2"
								/>
								<div
									dangerouslySetInnerHTML={{ __html: text }}
									className="rich-text-editor"
								/>
								{link && (
									<LinkHelper
										name={linkText ?? link.name}
										url={link.url}
										contentId={link.contentId}
										mediaId={link.mediaId}
										target={link.target}
									/>
								)}
							</div>
						</div>
					</div>
				</section>
			)
		}

		case 'short-50-50': {
			dimensions.widthDesk = 667
			dimensions.heightDesk = 374
			if (noImageHeightConstraint) {
				dimensions.heightDesk = 250
			}

			return (
				<section className="flex-container-wrapper">
					<div className="flex-row no-gutters">
						<div className="flex-col-md-6">
							<div className="image__wrapper sd_image">
								{image && (
									<MediaBlock>
										<ImageBlock image={image} dimensions={dimensions} />
									</MediaBlock>
								)}
							</div>
						</div>
						<div className="flex-col-md-6 full-height bg_colour_default theme-beige -pd-5">
							<div
								dangerouslySetInnerHTML={{ __html: richTextHeading }}
								className="h3"
							/>
							<div
								dangerouslySetInnerHTML={{ __html: text }}
								className="rich-text-editor"
							/>
							<div className="rich-text-editor anchored-bottom -mb-3">
								{link && (
									<LinkHelper
										name={linkText ?? link.name}
										url={link.url}
										contentId={link.contentId}
										mediaId={link.mediaId}
										target={link.target}
									/>
								)}
							</div>
						</div>
					</div>
				</section>
			)
		}

		default: {
			dimensions.widthDesk = 770
			dimensions.heightDesk = 660

			if (noImageHeightConstraint) {
				dimensions.heightDesk = 440
			}

			sectionclass = 'content-block rte-themed ' + cleanTheme
			if (imageAlign) {
				return (
					<section className={sectionclass}>
						<div className="content-block--wrapper">
							<div className="content-blurb">
								<div className="content-left text-body">
									{(heading ?? '')?.length > 0 && (
										<p className="font-semibold">{heading}</p>
									)}
									<div
										dangerouslySetInnerHTML={{ __html: richTextHeading }}
										className="content-heading h1"
									/>
									<div
										dangerouslySetInnerHTML={{ __html: text }}
										className="rich-text-editor"
									/>
									{link && (
										<LinkHelper
											name={linkText ?? link.name}
											url={link.url}
											contentId={link.contentId}
											mediaId={link.mediaId}
											target={link.target}
										/>
									)}
								</div>
							</div>

							<div className="content-img large-images">
								{image && (
									<div className="content-img-wrapper 1">
										<MediaBlock>
											<ImageBlock
												image={image}
												dimensions={dimensions}
												isLegacy={false}
											/>
										</MediaBlock>
									</div>
								)}
							</div>
						</div>
					</section>
				)
			}

			return (
				<section className={sectionclass}>
					<div className="content-block--wrapper">
						<div className="content-img alt">
							{image && (
								<MediaBlock>
									<ImageBlock image={image} dimensions={dimensions} />
								</MediaBlock>
							)}
						</div>
						<div className="content-blurb alt">
							<div className="content-left text-body">
								<div
									dangerouslySetInnerHTML={{ __html: richTextHeading }}
									className="content-heading h1"
								/>
								<div
									dangerouslySetInnerHTML={{ __html: text }}
									className="rich-text-editor"
								/>
								{link && (
									<LinkHelper
										name={linkText ?? link.name}
										url={link.url}
										contentId={link.contentId}
										mediaId={link.mediaId}
										target={link.target}
									/>
								)}
							</div>
						</div>
					</div>
				</section>
			)
		}
	}
}

export default MediaWithTextBlock
