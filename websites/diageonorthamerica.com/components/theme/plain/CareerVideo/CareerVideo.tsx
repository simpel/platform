import { CareerVideoProps } from 'components/propTypes'
import React, { useState } from 'react'
import { getClearIdFromVideoUrl, getVideoEmbedUrl } from 'utilities/functions'
import styles from './CareerVideo.module.scss'

export default function CareerVideo({
	videoUrl = '',
	videoImageUrl = '',
}: CareerVideoProps) {
	const [isVideoShowing, setIsVideoShowing] = useState<boolean>(false)

	// src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&rel=0&modestbranding=1`}

	let m_videoImageUrl = ''
	let m_videoUrl = ''

	if (videoUrl && videoUrl.length) {
		m_videoUrl = getVideoEmbedUrl(videoUrl)
	}

	if (m_videoUrl === '') {
		return <></>
	}

	if (videoImageUrl && videoImageUrl.length) {
		m_videoImageUrl = videoImageUrl
	} else {
		if (
			videoUrl.indexOf('youtu.be') > -1 ||
			videoUrl.indexOf('youtube.com') > -1
		) {
			m_videoImageUrl = `//i.ytimg.com/vi/${getClearIdFromVideoUrl(
				videoUrl,
			)}/hqdefault.jpg`
		}
	}

	return (
		<div className={styles.videoContainer}>
			{isVideoShowing ? (
				<iframe
					src={m_videoUrl}
					frameBorder="0"
					allowFullScreen={true}
					allow={
						'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
					}
					title="video"
				/>
			) : (
				<>
					<img
						onClick={() => setIsVideoShowing(true)}
						src={m_videoImageUrl}
						alt="Diageo careers"
					/>
					<div className={styles.playButton}>
						<svg
							width="34"
							height="34"
							viewBox="0 0 34 34"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M7.8875 29.1498C7.28 29.1498 6.875 28.7448 6.875 28.1373V5.86227C6.875 5.45727 7.0775 5.25477 7.28 5.05227C7.685 4.84977 8.09 4.84977 8.495 5.05227L27.7325 16.1898C28.1375 16.3923 28.34 16.9998 28.1375 17.6073C28.1375 17.8098 27.935 17.8098 27.7325 18.0123L8.495 29.1498H7.8875ZM8.9 7.68477V26.5173L25.1 16.9998L8.9 7.68477Z"
								fill="white"
							/>
						</svg>
					</div>
				</>
			)}
		</div>
	)
}
