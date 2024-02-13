import React, { useState } from 'react'
import { PRVideoBlockProps } from '../../../components/propTypes'

import DStoryCard from '../Diageo/DStoryCard'
import { Icons as EnumsIcon } from 'enumsIcon'
import Popup from 'reactjs-popup'
import IcoMoonIcon from '../plain/IcoMoonIcon'
import { getClearIdFromVideoUrl, getVideoEmbedUrl } from 'utilities/functions'

export default function PRVideoBlock({
	videoUrl,
	description,
	thumbnailImage,
}: PRVideoBlockProps) {
	const dim1 = {
		styleDesk: '',
		widthDesk: 400,
		heightDesk: 226,
		pureimage: true,
	}
	const [vidUrl, setVideoUrl] = useState<string>('')
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
		// <blockquote className="blockquote-a">
		//   <p>this is video</p>
		//   <span className="theme-vibrant-h"></span>
		//   <div>videoUrl: {videoUrl}</div>
		//   <div>description: {description}</div>
		// </blockquote>
		<>
			<DStoryCard
				image={{
					_id: '1',
					url: imageUrl,
					alt: ImageAlt,
				}}
				extImage={extImage}
				title={''}
				videoUrl={cleanVideoUrl}
				text={description}
				playIcon={true}
				dimensions={dim1}
				onImageClick={openPopup}
			/>

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
