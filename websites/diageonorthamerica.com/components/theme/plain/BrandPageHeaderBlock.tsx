import React from 'react'
import ImageBlock from './Image'
import { BrandPageHeaderBlockProps } from '../../../components/propTypes'

// function MediaWithTextBlock({ title, heading, text, linktext, video, image, align }: MediaWithTextBlockProps) {
export default function BrandPageHeaderBlock({
	mainImage,
	insetImage,
	richTextTitle,
	blockTheme,
}: BrandPageHeaderBlockProps) {
	const sectionClass = `content-block--contained ${
		blockTheme ? blockTheme : ''
	}`
	const dims1 = {
		styleDesk: 'fit-to-object',
		widthDesk: 600,
		heightDesk: 600,
		pureimage: true,
	}
	const dims2 = {
		styleDesk: 'fit-to-object',
		widthDesk: 210,
		heightDesk: 150,
		pureimage: true,
	}

	return (
		<section className={sectionClass}>
			<div className="offset-bg--right"></div>

			<div className="block-banner">
				<div className="container--profile-banner right">
					<div className="content-img">
						<div className="img-wrapper">
							{mainImage && <ImageBlock image={mainImage} dimensions={dims1} />}
						</div>
					</div>

					<div className="content-blurb">
						<div className="content-centered">
							<div className="content-brand-logo">
								{insetImage && (
									<ImageBlock image={insetImage} dimensions={dims2} />
								)}
							</div>

							<div
								className="h1"
								dangerouslySetInnerHTML={{ __html: richTextTitle }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
