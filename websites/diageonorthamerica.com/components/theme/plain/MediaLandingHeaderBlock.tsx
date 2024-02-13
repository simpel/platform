import React from 'react'
import ImageBlock from './Image'
import { MediaLandingHeaderBlockProps } from '../../propTypes'
import Link from 'next/link'
import LinkHelper from './custom/LinkHelper'
import BreadcrumbsHelper from './custom/BreadcrumbHelper'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { FixMediaPathsInHtml } from 'utilities/functions'

export default function MediaLandingHeaderBlock({
	smallTopTitle,
	title,
	introRichText,
	blockImage,
	breadcrumbs,
	featuredArticle,
	link1,
	link2,
	theme,
	tags,
}: MediaLandingHeaderBlockProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 656,
		heightDesk: 369,
		pureimage: true,
	}
	let contenttyp = 'Press Release'
	const sectionclass = `content-block p--l ${theme ? theme : ''}`
	let stringdate = ''
	if (featuredArticle) {
		const articleDate2 = getBaseDateFormat(featuredArticle.articleDate)
		stringdate = articleDate2 ? articleDate2 : ''
		if (featuredArticle.contentType != null) {
			switch (featuredArticle.contentType) {
				case 'pressReleasePage':
					contenttyp = 'Press Release'
					break
				case 'featurePage':
					contenttyp = 'Story'
					break
			}
		}
	}
	return (
		<section className={sectionclass}>
			<div className="offset-bg--reset"></div>
			<div className="block-banner">
				<div className="breadcrumbs">
					<ul className="breadcrumbs__list bare-list flex flex-wrap">
						<BreadcrumbsHelper breadcrumbs={breadcrumbs}></BreadcrumbsHelper>
					</ul>
				</div>

				<div className="container--profile-banner-wide p--s flex-row">
					<div className="flex-col-md-6 flex-row flex-row--align-v-center flex-row--align-h-center">
						<div className="flex-col-md-10">
							{smallTopTitle && (
								<h2 className="h4">
									<i>{smallTopTitle}</i>
								</h2>
							)}
							<h2 className="h1">{title}</h2>
							<div
								className="h4 font-light"
								dangerouslySetInnerHTML={{
									__html: FixMediaPathsInHtml(introRichText),
								}}
							></div>

							<div>
								<ul className="list-links bare-list">
									{link1 && (
										<li>
											<LinkHelper
												name={link1.name}
												url={link1.url}
												contentId={link1.contentId}
												mediaId={link1.mediaId}
												target={link1.target}
											></LinkHelper>
											{/* <Link href={link1.url}>
                        <a className="link link__text">{link1.name}</a>
                      </Link>
                      <Icon name="icon_arrow_right" size="middle" className="link__icon" /> */}
										</li>
									)}
									{link2 && (
										<li>
											<LinkHelper
												name={link2.name}
												url={link2.url}
												contentId={link2.contentId}
												mediaId={link2.mediaId}
												target={link2.target}
											></LinkHelper>
											{/* <Link href={link2.url}>
                        <a className="link link__text">{link2.name}</a>
                      </Link>
                      <Icon name="icon_arrow_right" size="middle" className="link__icon" /> */}
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>
					<div className="flex-col-md-6 ">
						{blockImage && (
							<div className="img-wrapper">
								<ImageBlock image={blockImage} dimensions={dimensions} />
							</div>
						)}
						{featuredArticle && (
							<div className="card__content p--l">
								<ul className="card__date bare-list flex flex-wrap">
									<li className="card__date-item text-uppercase">
										{stringdate}
									</li>
									<li className="card__date-item"> {contenttyp} </li>
								</ul>
								{featuredArticle.title && (
									<Link href={featuredArticle.url}>
										<h4 className="card__heading font-semibold">
											<span className="">{featuredArticle.title}</span>
										</h4>
									</Link>
								)}
								<ul className="card__tags bare-list flex flex-wrap">
									{tags &&
										tags.map((itm, index) => {
											return (
												<li className="card__tags-item" key={index}>
													{itm}
												</li>
											)
										})}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
