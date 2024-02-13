import React, { useState } from 'react'
import { VideoSliderBlockProps } from '../../../components/propTypes'

import DContainer from '../Diageo/DContainer'
import DStoryCard from '../Diageo/DStoryCard'

import DSlider from '../Diageo/DSlider'
import { storiesSliderSetting } from '../../../shared/sliderSetting'
import DHeadingSlider from '../Diageo/DHeadingSlider'
import { Icons as EnumsIcon } from 'enumsIcon'
import Popup from 'reactjs-popup'
import IcoMoonIcon from '../plain/IcoMoonIcon'
import { getVideoEmbedUrl } from 'utilities/functions'

export default function VideoSliderBlock({
	richTextTitle,
	richText,
	link,
	blocks,
	blockTheme,
}: VideoSliderBlockProps) {
	const dim1 = {
		styleDesk: '',
		widthDesk: 400,
		heightDesk: 226,
		pureimage: true,
	}
	const [videoUrl, setVideoUrl] = useState<string>('')
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

	const openPopup = (url) => {
		const cleanVideoUrl = getVideoEmbedUrl(url)
		setVideoUrl(cleanVideoUrl)
		setIsOpenModal(true)
	}

	return (
		<section className="slider-stories">
			{blockTheme && (
				<div
					className={`slider-stories__decor-bg  ${
						blockTheme ? blockTheme : ''
					}`}
				></div>
			)}
			<DContainer containerWidth="middle">
				<DHeadingSlider
					heading={richTextTitle}
					linkCta={link}
					text={richText}
					headingSize="medium"
				/>
				<div className="slider-stories__slider">
					{blocks && blocks.length ? (
						<DSlider settings={storiesSliderSetting} progressSlides={false}>
							{blocks.map((card, index) => (
								<DStoryCard
									key={index}
									{...card}
									playIcon={true}
									image={{
										_id: card.image?._id ? card.image._id : '',
										url: card.image?.url ? card.image.url : '',
										alt: card.title || '',
									}}
									dimensions={dim1}
									onImageClick={openPopup}
								/>
							))}
						</DSlider>
					) : null}
				</div>

				{/* <LinkHelper
          name={link.name}
          url={link.url}
          contentId={link.contentId}
          mediaId={link.mediaId}
          target={link.target}
          extraclass={'slider-stories__link-wrapper'}
        ></LinkHelper> */}

				{/* {link && link.url && (
          <div className="slider-stories__link-wrapper">
            <DLinkUnderline
              link={{
                name: link.name,
                url: link.url,
              }}
              icon={{
                icon: EnumsIcon.ArrowRight,
              }}
              size="large"
            />
          </div>
        )} */}
			</DContainer>
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
						src={videoUrl}
						frameBorder="0"
						allow="autoplay; encrypted-media"
						allowFullScreen
						title="video"
					/>
				</div>
			</Popup>
		</section>
	)
}
