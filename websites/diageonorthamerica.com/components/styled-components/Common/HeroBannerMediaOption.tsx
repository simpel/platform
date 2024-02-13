import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'react-responsive'
import ReactPopup from 'reactjs-popup'
import { Icons as EnumsIcons } from 'enumsIcon'
import IcoMoonIcon from 'components/theme/plain/IcoMoonIcon'
import { getVideoEmbedUrl } from 'utilities/functions'
import { type TSimpleImg } from '../Careers/MediaWithTextBlock/MediaWithTextBlock'

import * as S from './MediaOption.styles'

export type TMediaOption = {
	mediaType:
		| 'grad-background-video'
		| 'grad-landscape-image'
		| 'grad-image-slider'
		| 'grad-inset-image'
		| 'grad-montage-image'
		| 'grad-portrait-image'
	src?: string
	srcAlt?: string
	height?: string
	heightMobilePortrait?: string
	options?: TSimpleImg[]
	maxWidth?: string
	isInverted?: boolean
	secondaryMediaSrc?: string
	secondaryMediaSrcAlt?: string
	videoUrl?: string
	secondaryMediaSrc2?: string
	secondaryMediaSrcAlt2: string
}
function HeroBannerMediaOption({
	mediaType,
	src,
	srcAlt,
	height,
	heightMobilePortrait,
	isInverted,
	maxWidth,
	secondaryMediaSrc,
	secondaryMediaSrcAlt,
	videoUrl,
	options,
	secondaryMediaSrc2,
	secondaryMediaSrcAlt2,
}: TMediaOption) {
	const swiperRef = useRef(null)
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const videoParsed = getVideoEmbedUrl(videoUrl ?? '')

	const renderProperMedia = (mediaType) => {
		switch (mediaType) {
			case 'grad-background-video': {
				return (
					<div
						onClick={() => {
							setIsOpenModal(true)
						}}
					>
						<S.StyledImage
							fill
							src={src}
							alt={srcAlt}
							onClick={() => {
								setIsOpenModal(true)
							}}
						/>
						<div>
							<IcoMoonIcon
								icon={EnumsIcons.Play}
								size={32}
								className="story-card__image-icon flex flex-align-center flex-justify-center"
								color="white"
							/>
						</div>
					</div>
				)
			}

			// Return (
			//   <>
			//     sfddsfs
			//     <S.StyledVideoImage src={src} fill alt={srcAlt} />
			//     sfddsfs sfddsfs sfddsfs sfddsfs
			//   </>
			// )
			// return <iframe src={videoUrl} width="100%" height="420px" allowFullScreen />
			case 'grad-landscape-image':
			case 'grad-inset-image': {
				return <S.StyledImage fill src={src} alt={srcAlt} />
			}

			case 'grad-image-slider': {
				return (
					<Swiper /// create options for slider
						ref={swiperRef}
						loop
						slidesPerView={1}
						className="mySwiper"
						speed={800}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
					>
						{options &&
							options.length > 0 &&
							options.map((card, index: number) => (
								// eslint-disable-next-line react/no-array-index-key
								<SwiperSlide key={index}>
									<S.MediaContainer>
										<S.StyledImage
											fill
											src={card.mediaSrc}
											alt={card.mediaSrcAlt}
										/>
									</S.MediaContainer>
								</SwiperSlide>
							))}
					</Swiper>
				)
			}

			case 'grad-montage-image': {
				return (
					<>
						<S.MontageImage1>
							<S.StyledImage fill src={src} alt={srcAlt} />
						</S.MontageImage1>
						<S.MontageImage2>
							<S.StyledImage
								fill
								src={secondaryMediaSrc}
								alt={secondaryMediaSrcAlt}
							/>
						</S.MontageImage2>
						<S.MontageImage3>
							<S.StyledImage
								fill
								src={secondaryMediaSrc2}
								alt={secondaryMediaSrcAlt2}
							/>
						</S.MontageImage3>
					</>
				)
			}

			default: {
				return <S.StyledImage fill src={src} alt={srcAlt} />
			}
		}
	}

	const getHeightMobilePortrait = () => {
		if (mediaType === 'grad-montage-image') return
		if (mediaType === 'grad-portrait-image') return 700
		return heightMobilePortrait
	}

	return (
		<S.MediaContainer
			// Height={mediaType === 'grad-portrait-image' ? 700 : mediaType === 'grad-background-video' ? 'none' : height}
			height={mediaType === 'grad-portrait-image' ? 700 : height}
			heightMobilePortrait={getHeightMobilePortrait()}
			isInverted={isInverted}
			maxWidth={mediaType === 'grad-portrait-image' ? 505 : maxWidth} /// check if portrait image and set max width and height
			additionalPadding={mediaType === 'grad-montage-image'}
		>
			<ReactPopup
				closeOnEscape
				closeOnDocumentClick
				open={isOpenModal}
				className="video-popup"
				position="center center"
			>
				<div>
					<button
						aria-label="Close"
						className="popup-content__close-btn"
						type="button"
						onClick={() => {
							setIsOpenModal(false)
						}}
					>
						<IcoMoonIcon icon={EnumsIcons.Close} size={24} color="#ffffff" />
					</button>
					{/* eslint-disable-next-line react/iframe-missing-sandbox */}
					<iframe
						allowFullScreen
						src={videoParsed}
						frameBorder="0"
						allow="autoplay; encrypted-media"
						title="video"
					/>
				</div>
			</ReactPopup>
			{renderProperMedia(mediaType)}
			{secondaryMediaSrc && mediaType === 'grad-inset-image' && isTablet && (
				<S.SecondaryMediaWrapper>
					<S.SeconaryMediaContainer>
						<S.StyledImage
							fill
							src={secondaryMediaSrc}
							alt={secondaryMediaSrcAlt}
						/>
					</S.SeconaryMediaContainer>
				</S.SecondaryMediaWrapper>
			)}
		</S.MediaContainer>
	)
}

export default HeroBannerMediaOption
