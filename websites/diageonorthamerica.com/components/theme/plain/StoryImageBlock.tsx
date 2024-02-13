import React from 'react'
import { StoryImageBlockProps } from '../../../components/propTypes'
import Image from 'next/image'

export default function StoryImageBlock({
	blockImage,
	altText,
	largeSizeImage,
}: StoryImageBlockProps) {
	const dimensions = {
		styleDesk: '',
		widthDesk: 556,
		heightDesk: 370,
		pureimage: false,
	}
	if (largeSizeImage) {
		dimensions.widthDesk = 1000
		dimensions.heightDesk = 1000
	}

	blockImage.alt = altText

	if (largeSizeImage) {
		return (
			<section className="si-block content-block no-vertical-padding p--l theme-white">
				<div className="offset-bg--reset"></div>
				<div className="block-banner">
					<div className="container--profile-banner-wide p--s flex-row">
						<div className="flex-col-md-12 text-body">
							{/* <div style={{ position: 'relative', width: '100%' }}>
                <img
                  src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${blockImage.url}`}
                  alt={blockImage.alt}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div> */}
							<div className="story-image-large-container">
								<Image
									src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${blockImage.url}`}
									alt={blockImage.alt}
									width={dimensions.widthDesk}
									height={dimensions.heightDesk}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	} else {
		return (
			<section className="si-block content-block no-vertical-padding p--l theme-white">
				<div className="offset-bg--reset"></div>
				<div className="block-banner">
					<div className="container--profile-banner-wide p--s flex-row">
						<div className="flex-col-md-12 flex-row">
							<div className="flex-col-md-3 text-body"></div>
							<div className="flex-col-md-6 text-body">
								{/* <img
                  src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${blockImage.url}`}
                  alt={blockImage.alt}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                /> */}
								<div className="story-image-default-container">
									<Image
										src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${blockImage.url}`}
										alt={blockImage.alt}
										width={dimensions.widthDesk}
										height={dimensions.heightDesk}
									/>
								</div>
							</div>
							<div className="flex-col-md-3 text-body"></div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}
