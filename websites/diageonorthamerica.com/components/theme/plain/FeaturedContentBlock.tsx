import React, { useState } from 'react'
import ImageBlock from './Image'
import { FeaturedContentBlockProps } from 'components/propTypes'
import { DoubleFigureItem } from 'types'
import { FixMediaPathsInHtml } from 'utilities/functions'
import IcoMoonIcon from '../plain/IcoMoonIcon'
import { Icons as EnumsIcon } from 'enumsIcon'
import LinkHelper2 from './custom/LinkHelper2'
import Icon from 'components/theme/plain/Icon'

function MiniStat({ upperText, lowerText }: DoubleFigureItem) {
	return (
		<div className="stats">
			<p className="h2 font-semibold">
				{upperText}
				<span className="h5">{lowerText}</span>
			</p>
		</div>
	)
}

export default function FeaturedContentBlock({
	richTextHeading,
	blockRichText,
	blockImage,
	optionalFigures,
	linkText,
	link,
	imageAlign,
	blockTheme,
	popupUsePopup,
	popupLinkText,
	popupContentTitle,
	popupContentText,
	popupButtonText,
	popupTargetUrl,
}: FeaturedContentBlockProps) {
	const [showModal, setShowModal] = useState(false)

	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 600,
		heightDesk: 600,
		pureimage: true,
	}
	const cleanTheme = blockTheme ? blockTheme : ''
	const section1Class = 'content-block--featured ' + cleanTheme
	let divClass = 'container--profile-banner' // flipped
	if (imageAlign) {
		divClass = 'container--profile-banner flipped'
	}
	let buttonText = 'Continue to external site'
	if (popupUsePopup && popupButtonText != null) {
		buttonText = popupButtonText
	}
	if (popupTargetUrl === null || popupTargetUrl.length === 0) {
		popupUsePopup = false
	}

	return (
		<section className={section1Class}>
			<div className="offset-bg--reset"></div>
			<div className="block-banner">
				<div className={divClass}>
					<div className="content-blurb text-body">
						<div
							className="h1"
							dangerouslySetInnerHTML={{ __html: richTextHeading }}
						></div>
						<div
							className="rich-text-editor"
							dangerouslySetInnerHTML={{
								__html: FixMediaPathsInHtml(blockRichText),
							}}
						></div>

						{popupUsePopup && (
							<div>
								<a
									className="link link__text"
									onClick={() => setShowModal(true)}
								>
									{popupLinkText}
								</a>
								<Icon
									name="icon_external_link"
									size="small"
									className="link__icon"
								/>
							</div>
						)}

						{optionalFigures &&
							optionalFigures.map((child, key) => (
								<MiniStat
									key={key}
									symbol={child.symbol}
									upperText={child.upperText}
									upperTextSuffix={''}
									lowerText={child.lowerText}
								></MiniStat>
							))}
						{link && link.url && link.url.length > 0 && (
							<p>
								<LinkHelper2
									name={linkText ? linkText : link.name}
									contentId={link.contentId}
									mediaId={link.mediaId}
									url={link.url}
									target={link.target}
									linkClass={'link'}
									divClass={'link__inner'}
									showicon={true}
								></LinkHelper2>
							</p>
						)}
					</div>
					<div className="content-img">
						<div className="img-wrapper">
							{blockImage && (
								<ImageBlock image={blockImage} dimensions={dimensions} />
							)}
						</div>
					</div>
				</div>
			</div>

			{/* this content to be pulled in from the CMS */}
			{showModal ? (
				<div className="modal-overlay">
					<div className="modal-dialog-box">
						<button
							className="popup-content__close-btn"
							aria-label="Close"
							onClick={() => setShowModal(false)}
						>
							<IcoMoonIcon icon={EnumsIcon.Close} size={24} color="#000" />
						</button>
						<img src="/images/logo.svg" alt="Diageo" />
						<h4>{popupContentTitle}</h4>
						<p>{popupContentText}</p>

						<ul className="modal-links-list">
							<li>
								<a href={popupTargetUrl} className="btn btn-outline">
									{buttonText}
								</a>
							</li>
							<li>
								<a className="link" onClick={() => setShowModal(false)}>
									<span className="link__text">Cancel</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			) : null}
		</section>
	)
}
