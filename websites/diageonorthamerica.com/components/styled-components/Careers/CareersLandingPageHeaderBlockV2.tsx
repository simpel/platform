import { CareersLandingPageHeaderBlockProps } from 'components/propTypes'
import VideoPlayer from 'components/theme/plain/VideoPlayer'
import {
	FixMediaPathsInHtml,
	getClearIdFromVideoUrl,
	getVideoEmbedUrl,
} from 'utilities/functions'
import ContentBounds from '../Common/ContentBounds'
import LayoutV2 from '../Common/LayoutV2'
import HomepageSearchBar from './HomepageSearchBar'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import * as S from './CareersLandingPageHeaderBlockV2.styles'
import * as C from '../Common/Layout/Layout.styles'
import IcoMoonIcon from 'components/theme/plain/IcoMoonIcon'
import { Icons as EnumIcons } from '../../../enumsIcon'
import Popup from 'reactjs-popup'
import { Icons as EnumsIcon } from 'enumsIcon'

interface IVideoComponentProps {
	mp4VideoUrl: string
	fullVideoLink: string
	imageUrl: string
	imageAlt: string
	handleClick: () => void
}

const VideoComponent = ({
	mp4VideoUrl,
	fullVideoLink,
	imageAlt,
	imageUrl,
	handleClick,
}: IVideoComponentProps) => {
	if (mp4VideoUrl && fullVideoLink) {
		return (
			<div
				tabIndex={0}
				style={{
					position: 'relative',
				}}
				role="button"
				aria-label="Open video"
				onClick={() => handleClick()}
			>
				<VideoPlayer
					style={{
						width: '100%',
						objectFit: 'cover',
						objectPosition: 'center',
						display: 'block',
					}}
					src={mp4VideoUrl}
					controls={false}
					autoPlay={true}
					loop={true}
					muted={true}
				/>
				<IcoMoonIcon
					icon={EnumIcons.Play}
					size={32}
					className="double-card__icon-play flex flex-align-center flex-justify-center"
					color="white"
				/>
			</div>
		)
	}
	if (mp4VideoUrl) {
		return (
			<VideoPlayer
				src={mp4VideoUrl}
				controls={false}
				autoPlay={true}
				loop={true}
				muted={true}
				style={{ width: '100%' }}
			/>
		)
	} else {
		return (
			<div
				tabIndex={0}
				style={{
					position: 'relative',
				}}
				role="button"
				aria-label="Open video"
				onClick={() => handleClick()}
			>
				{imageUrl && (
					<img
						src={imageUrl}
						alt={imageAlt}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
				)}
				<IcoMoonIcon
					icon={EnumIcons.Play}
					size={32}
					className="double-card__icon-play flex flex-align-center flex-justify-center"
					color="white"
				/>
			</div>
		)
	}
}

const CareersLandingPageHeaderBlockV2 = ({
	richTextTitle,
	richTextIntro,
	mp4VideoUrl,
	videoUrl = '',
}: CareersLandingPageHeaderBlockProps) => {
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const videoId = getClearIdFromVideoUrl(videoUrl)
	const cleanVideoUrl = getVideoEmbedUrl(videoUrl)
	let imageUrl = ''
	let ImageAlt = ''
	if (
		videoUrl.indexOf('youtu.be') > -1 ||
		videoUrl.indexOf('youtube.com') > -1
	) {
		imageUrl = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg'
		ImageAlt = 'Youtube video'
	}

	const handleClick = () => {
		setIsOpenModal(true)
	}

	return (
		<LayoutV2
			background={{
				gradient: 'EVP-Grad-02',
				viewWidth: isTablet ? 70 : 100,
				alignment: 'left',
			}}
		>
			<ContentBounds>
				<S.Wrapper>
					<S.UpperWrapper>
						<C.Column size={5}>
							<S.TextsWrapper>
								<S.TextTitleContainer>
									<S.TextTitle
										dangerouslySetInnerHTML={{
											__html: FixMediaPathsInHtml(richTextTitle),
										}}
									/>
								</S.TextTitleContainer>
								{!isDesktop && (
									<S.MediaWrapper>
										<VideoComponent
											mp4VideoUrl={mp4VideoUrl || ''}
											fullVideoLink={videoUrl || ''}
											imageUrl={imageUrl}
											imageAlt={ImageAlt}
											handleClick={handleClick}
										/>
									</S.MediaWrapper>
								)}
								<S.MiddleTextContainer>
									{isDesktop && <C.Column size={1} />}
									<C.Column size={4}>
										<S.TextIntroContainer>
											<S.TextIntro
												dangerouslySetInnerHTML={{
													__html: FixMediaPathsInHtml(richTextIntro),
												}}
											/>
										</S.TextIntroContainer>
									</C.Column>
								</S.MiddleTextContainer>
							</S.TextsWrapper>
						</C.Column>
						{isDesktop && <C.Column size={1} />}
						{isDesktop && (
							<C.Column size={6}>
								<S.MediaWrapper>
									<VideoComponent
										mp4VideoUrl={mp4VideoUrl || ''}
										fullVideoLink={videoUrl || ''}
										imageUrl={imageUrl}
										imageAlt={ImageAlt}
										handleClick={handleClick}
									/>
								</S.MediaWrapper>
							</C.Column>
						)}
					</S.UpperWrapper>
				</S.Wrapper>
				<S.SearchContainer>
					<HomepageSearchBar gradient={'EVP-Grad-02'} />
				</S.SearchContainer>
			</ContentBounds>
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
		</LayoutV2>
	)
}

export default CareersLandingPageHeaderBlockV2
