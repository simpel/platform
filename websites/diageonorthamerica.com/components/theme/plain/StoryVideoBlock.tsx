import React, { useState } from 'react'
import { Icons as EnumsIcon } from 'enumsIcon'
import Popup from 'reactjs-popup'
import { getClearIdFromVideoUrl, getVideoEmbedUrl } from 'utilities/functions'
import VideoEmbedContainer from 'components/theme/plain/VideoEmbedContainer'
import VideoEmbedYoutube from 'components/theme/plain/VideoEmbedYoutube'
import VideoEmbedVimeo from 'components/theme/plain/VideoEmbedVimeo'
import DStoryCard from '../Diageo/DStoryCard'
import { type StoryVideoBlockProps } from '../../propTypes'
import IcoMoonIcon from './IcoMoonIcon'

const StoryVideoBlock = ({
	videoUrl,
	description,
	thumbnailImage,
}: StoryVideoBlockProps) => {
	const dim1 = {
		styleDesk: '',
		widthDesk: 400,
		heightDesk: 226,
		pureimage: true,
	}
	// eslint-disable-next-line react/hook-use-state
	const [vidUrl, setVideoUrl] = useState<string>('')
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

	const videoId = getClearIdFromVideoUrl(videoUrl)
	const cleanVideoUrl = getVideoEmbedUrl(videoUrl)
	let imageUrl = ''
	let ImageAlt = ''
	if (videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com')) {
		imageUrl = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg'
		ImageAlt = 'Youtube video'
	}

	let extImage = true

	if (thumbnailImage && thumbnailImage.url) {
		imageUrl = thumbnailImage.url
		ImageAlt = thumbnailImage.alt
		extImage = false
	}

	const openPopup = (url) => {
		setVideoUrl(url)
		setIsOpenModal(true)
	}

	return (
		<section className="content-block p--l theme-white">
			<div className="offset-bg--reset" />
			<div className="block-banner">
				<div className="container--profile-banner-wide p--s flex-row">
					<div className="flex-col-md-12 flex-row">
						<div className="flex-col-md-1 text-body" />
						<div className="flex-col-md-10 text-body">
							{/* <iframe src={videoUrl}></iframe> */}

							<DStoryCard
								playIcon
								image={{
									_id: '1',
									url: imageUrl,
									alt: ImageAlt,
								}}
								extImage={extImage}
								title=""
								videoUrl={cleanVideoUrl}
								text={description}
								dimensions={dim1}
								onImageClick={openPopup}
							/>

							<Popup
								closeOnEscape
								closeOnDocumentClick
								open={isOpenModal}
								className="video-popup"
								position="center center"
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

									<VideoEmbedContainer>
										<>
											{videoUrl.includes('youtu.be') ||
											videoUrl.includes('youtube.com') ? (
												<VideoEmbedYoutube videoId={videoId} />
											) : (
												<VideoEmbedVimeo videoId={videoId} />
											)}
										</>
									</VideoEmbedContainer>
								</div>
							</Popup>
						</div>
						<div className="flex-col-md-1 text-body" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default StoryVideoBlock
