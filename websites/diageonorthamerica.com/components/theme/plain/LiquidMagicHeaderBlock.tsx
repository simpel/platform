import React, { useState, useEffect } from 'react'
import { FixMediaPathsInHtml, getVideoEmbedUrl } from 'utilities/functions'
import cn from 'classnames'
import Image from 'next/legacy/image'
import Popup from 'reactjs-popup'
import { Icons as EnumsIcon } from 'enumsIcon'
import { Icons as EnumIcons } from '../../../enumsIcon'
import {
	type BreadcrumbsProps,
	type LiquidMagicHeaderBlockProps,
} from '../../propTypes'
import IcoMoonIcon from './IcoMoonIcon'
import VideoPlayer from './VideoPlayer'
import BreadcrumbsHelper from './custom/BreadcrumbHelper'
import LinkHelper from './custom/LinkHelper'
import ImageBlock from './Image'

const BreadcrumbsRender = ({ breadcrumbs }: BreadcrumbsProps) => {
	return (
		<div className="breadcrumbs">
			<ul className="breadcrumbs__list bare-list flex flex-wrap">
				<BreadcrumbsHelper breadcrumbs={breadcrumbs} />
			</ul>
		</div>
	)
}

export default function LiquidMagicHeaderBlock({
	richTextTitle,
	richTextIntro,
	link,
	link2,
	link3,
	mainImage,
	blockTheme,
	useLiquidMagic,
	imageLeft,
	secondaryImage,
	breadcrumbs,
	showBreadcrumbs,
	videoUrl,
	videoAspectSquare,
	fullVideoUrl,
	lowerMargin,
}: LiquidMagicHeaderBlockProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 600,
		heightDesk: 520,
		pureimage: true,
	}
	const dims2 = {
		styleDesk: '',
		widthDesk: 300,
		heightDesk: 150,
		pureimage: true,
	}
	const cleanTheme = blockTheme ? blockTheme : ''
	const bottmarg = lowerMargin ? ' bott-marg ' : ''
	const sectionclass =
		'content-block liquid-bg-feature ' + cleanTheme + bottmarg
	let offsetclass = 'liquid-bg-offset offset-wrapper '
	let fullVideoLink = ''
	let videoSizeWindow = 'w-full'

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const [vidUrl, setVidUrl] = useState<string>('')
	// Checks for video size square or fullwidth
	if (videoAspectSquare) {
		videoSizeWindow = 'w-square'
	}

	if (fullVideoUrl?.length) {
		fullVideoLink = getVideoEmbedUrl(fullVideoUrl)
	}

	const size = useWindowSize()

	function useWindowSize() {
		// Initialize state with undefined width/height so server and client renders match
		// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
		const [windowSize, setWindowSize] = useState({
			width: 0,
			height: 0,
		})

		useEffect(() => {
			// Only execute all the code below in client side
			// Handler to call on window resize
			function handleResize() {
				// Set window width/height to state
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				})
			}

			// Add event listener
			window.addEventListener('resize', handleResize)

			// Call handler right away so state gets updated with initial window size
			handleResize()

			// Remove event listener on cleanup
			return () => {
				window.removeEventListener('resize', handleResize)
			}
		}, []) // Empty array ensures that effect is only run on mount
		return windowSize
	}

	if (useLiquidMagic) {
		if (imageLeft) {
			offsetclass =
				'liquid-bg-offset--right ' + cleanTheme?.replace('theme-', 'liquid-')
		} else {
			offsetclass =
				'liquid-bg-offset ' + cleanTheme?.replace('theme-', 'liquid-')
		}

		// If a video is true, add the video bg class for ar - custom. maybe add a section/page class only for annual report page.
		if (videoUrl) {
			offsetclass = imageLeft
				? 'liquid-bg-offset--right liquid-ar-blue'
				: 'liquid-bg-offset liquid-ar-blue'
		}
	} else if (imageLeft) {
		offsetclass = 'offset-bg--right ' + cleanTheme
	} else {
		offsetclass = 'offset-bg ' + cleanTheme
	}

	const handleClick = (url: string) => {
		if (url) {
			setVidUrl(url)
			setIsOpenModal(true)
		}
	}

	const getLiquidBgBasedOnClass = (className: string) => {
		if (!offsetclass.includes('liquid')) {
			return ''
		}

		if (size.width >= 768) {
			if (className.includes('amber')) {
				return '/images/static/liquid_bg/d/th_amber.webp'
			}

			if (className.includes('blue')) {
				return '/images/static/liquid_bg/d/th_blue.webp'
			}

			if (className.includes('brown')) {
				return '/images/static/liquid_bg/d/th_brown.webp'
			}

			if (className.includes('green')) {
				return '/images/static/liquid_bg/d/th_green.webp'
			}

			if (className.includes('purple')) {
				return '/images/static/liquid_bg/d/th_purple.webp'
			}

			if (className.includes('red')) {
				return '/images/static/liquid_bg/d/th_red.webp'
			}

			return ''
		}

		if (className.includes('amber')) {
			return '/images/static/liquid_bg/m/th_amber.webp'
		}

		if (className.includes('blue')) {
			return '/images/static/liquid_bg/m/th_blue.webp'
		}

		if (className.includes('brown')) {
			return '/images/static/liquid_bg/m/th_brown.webp'
		}

		if (className.includes('green')) {
			return '/images/static/liquid_bg/m/th_green.webp'
		}

		if (className.includes('purple')) {
			return '/images/static/liquid_bg/m/th_purple.webp'
		}

		if (className.includes('red')) {
			return '/images/static/liquid_bg/m/th_red.webp'
		}

		return ''
	}

	return (
		<>
			<section className={sectionclass}>
				<div className={offsetclass}>
					{/* <div className="left-panel"></div> */}
					{/* <div> */}
					{useLiquidMagic && (
						<Image
							priority
							src={getLiquidBgBasedOnClass(offsetclass)} // '/images/static/liquid_bg/d/th_brown.webp'}
							layout="fill"
							objectFit="cover"
							quality={100}
							alt="Liquid Magic background image"
						/>
					)}
					{!useLiquidMagic && (
						<div className={getLiquidBgBasedOnClass(offsetclass)} />
					)}
					{/* </div> */}
					{/* <div className="right-panel"></div> */}
					{/* <div>
          <div>
            <Image
              src={getLiquidBgBasedOnClass(offsetclass)} //'/images/static/liquid_bg/d/th_brown.webp'}
              priority={true}
              layout="fill"
              objectFit="cover"
              quality={80}
            />
          </div>
        </div> */}
				</div>

				<div className="block-banner">
					{showBreadcrumbs && <BreadcrumbsRender breadcrumbs={breadcrumbs} />}
					<div className="container--profile-banner-wide p--s flex-row">
						<div className="flex-col-md-12 flex-row">
							{/* IMAGE ONLY */}
							{imageLeft && (
								<div className="flex-col-sm-6">
									<div
										className="liquid-magic-media-container"
										onClick={() => {
											handleClick(fullVideoLink)
										}}
									>
										{fullVideoLink ? (
											<IcoMoonIcon
												icon={EnumIcons.Play}
												size={32}
												className="double-card__icon-play flex flex-align-center flex-justify-center"
												color="white"
											/>
										) : null}
										{videoUrl ? (
											<VideoPlayer
												autoPlay
												loop
												muted
												src={videoUrl}
												vidSize={videoSizeWindow}
												controls={false}
											/>
										) : mainImage ? (
											<ImageBlock image={mainImage} dimensions={dimensions} />
										) : null}
									</div>
								</div>
							)}

							{/* BLURB */}
							<div
								className={cn('flex-row flex-row--align-v-center', {
									'flex-col-sm-4 flex-row--align-h-left alt-heading-h1 ':
										(videoUrl && mainImage) || (videoUrl && !mainImage),
									'flex-col-sm-6 flex-row--align-h-right  ':
										mainImage && !videoUrl,
								})}
							>
								<div className="flex-col-md-10">
									{secondaryImage && (
										<ImageBlock image={secondaryImage} dimensions={dims2} />
									)}
									<div
										dangerouslySetInnerHTML={{ __html: richTextTitle }}
										className="h1"
									/>
									<div
										dangerouslySetInnerHTML={{
											__html: FixMediaPathsInHtml(richTextIntro),
										}}
										className="sub-heading-hp"
									/>
									{link && (
										<LinkHelper
											name={link.name}
											url={link.url}
											contentId={link.contentId}
											mediaId={link.mediaId}
											target={link.target}
											extraclass="sm-link"
										/>
									)}
									{link2 && (
										<LinkHelper
											name={link2.name}
											url={link2.url}
											contentId={link2.contentId}
											mediaId={link2.mediaId}
											target={link2.target}
											extraclass="sm-link"
										/>
									)}
									{link3 && (
										<LinkHelper
											name={link3.name}
											url={link3.url}
											contentId={link3.contentId}
											mediaId={link3.mediaId}
											target={link3.target}
											extraclass="sm-link"
										/>
									)}
								</div>
							</div>

							{/* video, fallback to image    ONLY IMAGE TO LEFT AND VIDEO */}
							{!imageLeft && (
								<div
									className={cn({
										'flex-col-sm-8':
											(videoUrl && mainImage) || (videoUrl && !mainImage),
										'flex-col-sm-6': mainImage && !videoUrl,
									})}
								>
									<div
										className="liquid-magic-media-container"
										onClick={() => {
											handleClick(fullVideoLink)
										}}
									>
										{fullVideoLink ? (
											<IcoMoonIcon
												icon={EnumIcons.Play}
												size={32}
												className="double-card__icon-play flex flex-align-center flex-justify-center"
												color="white"
											/>
										) : null}
										{videoUrl ? (
											<VideoPlayer
												autoPlay
												loop
												muted
												src={videoUrl}
												vidSize={videoSizeWindow}
												controls={false}
											/>
										) : mainImage ? (
											<ImageBlock image={mainImage} dimensions={dimensions} />
										) : null}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

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
						aria-label="Close"
						className="popup-content__close-btn"
						onClick={() => {
							setIsOpenModal(false)
						}}
					>
						<IcoMoonIcon icon={EnumsIcon.Close} size={24} color="#ffffff" />
					</button>
					<iframe
						allowFullScreen
						src={vidUrl}
						frameBorder="0"
						allow="autoplay; encrypted-media"
						title="video"
					/>
				</div>
			</Popup>
		</>
	)
}
