import React from 'react'
import { LatestPressReleasesBlockProps } from 'components/propTypes'
import { PartialPageLite } from 'types'

import Link from 'next/link'
import LinkHelper from './custom/LinkHelper'
import { getBaseDateFormat } from 'utilities/dateFormatting'

function LocalCard2({ title, url, articleDate, contentType }: PartialPageLite) {
	let contentType1 = ''

	const articleDate1 = getBaseDateFormat(articleDate)
	const stringDate1 = articleDate1 ? articleDate1 : ''
	switch (contentType) {
		case 'pressReleasePage':
			contentType1 = 'Press Release'
			break
		case 'featurePage':
			contentType1 = 'Story'
			break
	}

	return (
		<li className="related-stories-item">
			<span></span>
			<div className="date">
				{/* <date>{stringDate1}</date>| <span>{contentType1}</span> */}
				<span>{stringDate1}</span>| <span>{contentType1}</span>
			</div>
			<div>
				<p>
					<Link href={url}>{title}</Link>
				</p>
			</div>
		</li>
	)
}

function LocalCard({
	_id,
	title,
	url,
	articleDate,
	categoryPages,
	contentType,
}: PartialPageLite) {
	let contentType1 = ''

	const articleDate1 = getBaseDateFormat(articleDate)
	const stringDate1 = articleDate1 ? articleDate1 : ''
	switch (contentType) {
		case 'pressReleasePage':
			contentType1 = 'Press Release'
			break
		case 'featurePage':
			contentType1 = 'Story'
			break
	}

	return (
		<div key={_id} className="press-release__col">
			<div className="card--with-bg card-latest-story">
				<div className="card__body">
					<div className="card__content">
						<ul className="card__date bare-list flex flex-wrap">
							<li className="card__date-item text-uppercase">
								{' '}
								{stringDate1}{' '}
							</li>
							<li className="card__date-item"> {contentType1} </li>
						</ul>
						{title && (
							<Link href={url}>
								<h4 className="card__heading font-semibold">
									<span className="">{title}</span>
								</h4>
							</Link>
						)}
						<ul className="card__tags bare-list flex flex-wrap">
							{categoryPages &&
								categoryPages.map((item, index) => {
									return (
										<li key={index} className="card__tags-item">
											{item.title}
										</li>
									)
								})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function LatestPressReleasesBlock({
	title,
	viewMoreLink,
	viewMoreLinkText,
	investorNewsLayout,
	blockTheme,
	items,
}: LatestPressReleasesBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	let sectionClass: string
	if (investorNewsLayout) {
		sectionClass = 'related-stories -mb-3 ' + cleanTheme
		return (
			<section className={sectionClass}>
				{title && <h4>{title}</h4>}
				<ul className="related-stories-list">
					{items &&
						items.map((card, index) => (
							<LocalCard2
								key={index}
								_id={card._id}
								title={card.title}
								url={card.url}
								categoryPages={card.categoryPages}
								articleDate={card.articleDate}
								contentType={card.contentType}
							/>
						))}
				</ul>

				{viewMoreLink && (
					<LinkHelper
						name={viewMoreLink.name}
						url={viewMoreLink.url}
						contentId={viewMoreLink.contentId}
						mediaId={viewMoreLink.mediaId}
						target={viewMoreLink.target}
					></LinkHelper>
				)}
			</section>
		)
	} else {
		sectionClass = 'block-press-release ' + cleanTheme
		return (
			<>
				<section className="container -mt-5">
					<div className="heading-stories">
						{title && (
							<h3 className="heading-stories__heading">
								<span className="text-black">{title}</span>
							</h3>
						)}
						{viewMoreLink && (
							<Link
								href={viewMoreLink.url}
								className="heading-stories__link link link--large"
							>
								<span className="link__inner">
									<span className="link__text">{viewMoreLinkText}</span>
									<span className="icomoon-icon link__icon"></span>
								</span>
							</Link>
						)}
					</div>
				</section>

				<section className="container">
					<div className={sectionClass}>
						<div className="press-release p--s">
							{items &&
								items.map((card, index) => (
									<LocalCard
										key={index}
										_id={card._id}
										title={card.title}
										url={card.url}
										categoryPages={card.categoryPages}
										articleDate={card.articleDate}
										contentType={card.contentType}
									/>
								))}
						</div>
					</div>
				</section>
			</>
		)
	}
}
