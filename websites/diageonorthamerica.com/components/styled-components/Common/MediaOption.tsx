import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'react-responsive'
import ReactPopup from 'reactjs-popup'
import { Icons as EnumsIcon } from 'enumsIcon'
import IcoMoonIcon from 'components/theme/plain/IcoMoonIcon'

import { getVideoEmbedUrl } from 'utilities/functions'
import { type TSimpleImg } from '../Careers/MediaWithTextBlock/MediaWithTextBlock'
import * as S from './MediaOption.styles'

type TMediaOption = {
	mediaType: 'video' | 'image' | 'carousel' | 'inset-image'
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
}
function MediaOption({
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
}: TMediaOption) {
	const swiperRef = useRef(null)
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const videoParsed = getVideoEmbedUrl(videoUrl ?? '')

	const renderProperMedia = (mediaType) => {
		switch (mediaType) {
			case 'video': {
				return (
					<div
						onClick={() => {
							setIsOpenModal(true)
						}}
					>
						<S.StyledImage fill src={src} alt={srcAlt} />
						<div>
							<IcoMoonIcon
								icon={EnumsIcon.Play}
								size={32}
								className="story-card__image-icon flex flex-align-center flex-justify-center"
								color="white"
							/>
						</div>
					</div>
				)
			}

			case 'image':
			case 'inset-image': {
				return <S.StyledImage fill src={src} alt={srcAlt} />
			}

			case 'carousel': {
				return (
					<Swiper
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

			default: {
				return <S.StyledImage fill src={src} alt={srcAlt} />
			}
		}
	}

	return (
		<S.MediaContainer
			height={height}
			heightMobilePortrait={heightMobilePortrait}
			isInverted={isInverted}
			maxWidth={maxWidth}
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
						<IcoMoonIcon icon={EnumsIcon.Close} size={24} color="#ffffff" />
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
			{secondaryMediaSrc && mediaType === 'inset-image' && isTablet && (
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

export default MediaOption
