import React from 'react'
import ImageBlock from './Image'
import { SimpleDoubleCardBlockProps } from '../../../components/propTypes'
import Link from 'next/link'
import { FixMediaPathsInHtml } from 'utilities/functions'
import LinkHelper2 from './custom/LinkHelper2'

export default function SimpleDoubleCardBlock({
	leftImage,
	leftTitle,
	leftRichText,
	leftLinkText,
	leftLink,
	rightImage,
	rightTitle,
	rightRichText,
	rightLinkText,
	rightLink,
	blockTheme,
}: SimpleDoubleCardBlockProps) {
	const dimensions = {
		styleDesk: '',
		widthDesk: 725,
		heightDesk: 400,
		pureimage: false,
	}
	const cleanTheme = blockTheme ? blockTheme : ''
	const sectionClass = 'content-block ' + cleanTheme

	// let leftLinkExternal = false
	// let rightLinkExternal = false
	// let leftLinkInternal = false
	// let rightLinkInternal = false
	// let leftLinkMedia = false
	// let rightLinkMedia = false

	if (leftLink.url.toLowerCase().endsWith('.pdf')) {
		// leftLinkMedia = true
		leftLink.target = '_blank'
	} else if (leftLink.target === '_blank') {
		// leftLinkExternal = true
	} else {
		// leftLinkInternal = true
	}
	if (rightLink.url.toLowerCase().endsWith('.pdf')) {
		// rightLinkMedia = true
		rightLink.target = '_blank'
	} else if (rightLink.target === '_blank') {
		// rightLinkExternal = true
	} else {
		// rightLinkInternal = true
	}
	return (
		<section className={sectionClass}>
			<div className="content-block--contained flex-row">
				<div className="double-card flex-col-md-6">
					<div className="card  card--with-bg card-latest-story">
						<Link href={leftLink.url} className="card__image">
							<div className="image-box double-card--img">
								{leftImage && (
									<ImageBlock image={leftImage} dimensions={dimensions} />
								)}
							</div>
						</Link>
						<div className="card__body">
							<div className="card__content">
								{leftTitle && (
									<h4 className="card__heading font-semibold">
										<span className="">{leftTitle} </span>
									</h4>
								)}
								<div
									className="rich-text-editor"
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(leftRichText),
									}}
								></div>
							</div>
							<p>
								<LinkHelper2
									name={leftLinkText ? leftLinkText : leftLink.name}
									url={leftLink.url}
									contentId={leftLink.contentId}
									mediaId={leftLink.mediaId}
									target={leftLink.target}
									linkClass={'card__link link'}
									divClass={'link__inner'}
									showicon={true}
								></LinkHelper2>
								{/* {leftLink && (
                  <>
                    {leftLinkMedia && <Icon name="icon_download" size="middle" className="link__icon" />}
                    <Link href={leftLink.url}>
                      <a className="card__link link link--large link__text" target={leftLink.target}>
                        {leftLinkText}
                      </a>
                    </Link>
                    {leftLinkExternal && <Icon name="icon_arrow_right" size="middle" className="link__icon" />}
                  </>
                )} */}
							</p>
						</div>
					</div>
				</div>
				<div className="double-card flex-col-md-6">
					<div className="card  card--with-bg card-latest-story">
						<Link href={rightLink.url} className="card__image">
							<div className="image-box double-card--img">
								{rightImage && (
									<ImageBlock image={rightImage} dimensions={dimensions} />
								)}
							</div>
						</Link>
						<div className="card__body">
							<div className="card__content">
								{rightTitle && (
									<h4 className="card__heading font-semibold">
										<span className="">{rightTitle} </span>
									</h4>
								)}
								<div
									className="rich-text-editor"
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(rightRichText),
									}}
								></div>
							</div>

							<p>
								<LinkHelper2
									name={rightLinkText ? rightLinkText : rightLink.name}
									url={rightLink.url}
									contentId={rightLink.contentId}
									mediaId={rightLink.mediaId}
									target={rightLink.target}
									linkClass={'link'}
									divClass={'link__inner'}
									showicon={true}
								></LinkHelper2>

								{/* {rightLink && (
                  <>
                    {rightLinkMedia && <Icon name="icon_download" size="middle" className="link__icon" />}
                    <Link href={rightLink.url}>
                      <a className="card__link link link--large link__text" target={rightLink.target}>
                        {rightLinkText}
                      </a>
                    </Link>
                    {rightLinkExternal && <Icon name="icon_arrow_right" size="middle" className="link__icon" />}
                  </>
                )} */}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
