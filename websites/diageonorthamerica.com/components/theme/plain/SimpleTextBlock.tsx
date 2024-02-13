/* eslint-disable react/no-danger */
import React from 'react'
import { type DoubleFigureItem } from 'types'
import { FixMediaPathsInHtml as fixMediaPathsInHtml } from 'utilities/functions'
import { type SimpleTextBlockProps } from '../../propTypes'
import ImageBlock from './Image'
import LinkHelper2 from './custom/LinkHelper2'

const MiniStat = ({ upperText, lowerText }: DoubleFigureItem) => {
	return (
		<li>
			<span className="heading-h1-xxl font-semibold"> {upperText}</span>
			<p>{lowerText}</p>
		</li>
	)
}

// Function MediaWithTextBlock({ title, heading, text, linktext, video, image, align }: MediaWithTextBlockProps) {
const SimpleTextBlock = ({
	layout,
	richTextTitle,
	richTextBody,
	image,
	linkText,
	link,
	reducedPadding,
	optionalFigures,
	theme,
}: SimpleTextBlockProps) => {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 350,
		heightDesk: 350,
		pureimage: false,
	}

	richTextBody = richTextBody ? fixMediaPathsInHtml(richTextBody) : ''

	let sectionClass = ''
	let divClass = ''
	let padClass = ' p--l '

	if (reducedPadding) {
		padClass = ' -pt-1 -pb-1 ml--m mr--m '
	}

	if (layout === 'with-image') {
		sectionClass = 'content-block heading-bg ' + padClass + ' ' + theme
		divClass = 'pageblock ' + padClass
		return (
			<section className={sectionClass}>
				<div className={divClass}>
					<div className="content-img">
						<div
							dangerouslySetInnerHTML={{ __html: richTextTitle }}
							className="heading-offset offet-10 h2"
						/>

						<div className="content-img--aside">
							<ul className="stats-list">
								{optionalFigures?.map((child, key) => (
									<MiniStat
										key={key}
										symbol={child.symbol}
										upperText={child.upperText}
										upperTextSuffix={child.upperTextSuffix}
										lowerText={child.lowerText}
									/>
								))}
							</ul>
							{image && (
								<div className="content-img--cont">
									<ImageBlock image={image} dimensions={dimensions} />
								</div>
							)}
						</div>
					</div>

					<div className="content-blurb">
						<div className="text-body">
							<div
								dangerouslySetInnerHTML={{ __html: richTextBody }}
								className="rich-text-editor"
							/>
							{link && link.url.length > 0 && (
								<LinkHelper2
									showicon
									name={linkText ?? link.name}
									url={link.url}
									contentId={link.contentId}
									mediaId={link.mediaId}
									target={link.target}
									linkClass="link"
									divClass="link__inner"
								/>
							)}
							{/* {linkUrl && linkText && (
                <p>
                  <a href={linkUrl} target={linkTarget} rel="noreferrer" className="link link__text">
                    {linkText}
                  </a>
                  <Icon name="icon_arrow_right" size="middle" className="link__icon" />
                </p>
              )} */}
						</div>
					</div>
				</div>
			</section>
		)
	}

	if (layout === 'heading-left') {
		sectionClass = 'content-block heading-bg ' + padClass + ' ' + theme
		divClass = 'pageblock ' + padClass
		return (
			<section className={sectionClass}>
				<div className={divClass}>
					<div className="content-img">
						<div
							dangerouslySetInnerHTML={{ __html: richTextTitle }}
							className="h2"
						/>
					</div>

					<div className="content-blurb">
						<div className="text-body">
							<div dangerouslySetInnerHTML={{ __html: richTextBody }} />
							{link && link.url.length > 0 && (
								<p>
									<LinkHelper2
										showicon
										name={linkText ?? link.name}
										url={link.url}
										contentId={link.contentId}
										mediaId={link.mediaId}
										target={link.target}
										linkClass="link"
										divClass="link__inner"
									/>
								</p>
							)}
							{/* {linkUrl && linkText && (
                <p>
                  <a href={linkUrl} target={linkTarget} rel="noreferrer" className="link link__text">
                    {linkText}
                  </a>
                  <Icon name="icon_arrow_right" size="middle" className="link__icon" />
                </p>
              )} */}
						</div>
					</div>
				</div>
			</section>
		)
	}

	if (layout === 'plain-full-width') {
		return (
			<section className="content-block--contact">
				<div className="block-banner">
					<div className="flex-container-wrapper">
						<div dangerouslySetInnerHTML={{ __html: richTextBody }} />
					</div>
				</div>
			</section>
		)
	}

	// Layout === 'centered'
	sectionClass = 'content-block heading-bg ' + theme
	divClass = 'pageblock text-align--center ' + padClass
	return (
		<section className={sectionClass}>
			<div className={divClass}>
				<div className="content-blurb--wide">
					{richTextTitle && (
						<div
							dangerouslySetInnerHTML={{
								__html: richTextTitle,
							}}
							className="h2"
						/>
					)}

					<div className="text-body">
						<div dangerouslySetInnerHTML={{ __html: richTextBody }} />
						{link && link.url.length > 0 && (
							<p>
								<LinkHelper2
									showicon
									name={linkText ?? link.name}
									url={link.url}
									contentId={link.contentId}
									mediaId={link.mediaId}
									target={link.target}
									linkClass="link"
									divClass=""
								/>
							</p>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default SimpleTextBlock
