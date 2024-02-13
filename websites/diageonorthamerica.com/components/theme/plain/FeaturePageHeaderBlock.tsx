import React from 'react'
import ImageBlock from './Image'
import { FeaturePageHeaderBlockProps } from '../../propTypes'
import { FixMediaPathsInHtml } from 'utilities/functions'
import ArticleHeader from 'components/styled-components/Careers/ArticleHeader/ArticleHeader'

export default function FeaturePageHeaderBlock({
	richTextTitle,
	introRichText,
	blockImage,
	articleDate,
	tags,
	breadcrumbs,
	blockTheme,
	isAlternate,
}: FeaturePageHeaderBlockProps) {
	if (isAlternate) {
		return (
			<ArticleHeader
				gradient={blockTheme}
				date={articleDate || ''}
				header={richTextTitle}
				tags={[]}
				imageSrc={
					`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${blockImage?.url}` ||
					''
				}
				imageAlt={blockImage?.alt || ''}
			/>
		)
	}
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 1000,
		heightDesk: 600,
		pureimage: true,
	}
	const layoutObj = {
		spanClass: 'offset-bg--reset',
		sectionClass: 'content-block heading-bg ',
	}

	if (blockTheme) {
		layoutObj.sectionClass += blockTheme
	}

	let rightcolumn = false

	if ((introRichText && introRichText.length > 10) || (tags && tags.length)) {
		rightcolumn = true
	}

	if (blockImage) {
		layoutObj.spanClass = 'offset-bg--reset'
	}
	// let audiof = {} as Media

	// if (associatedFile) {
	//   audiof = associatedFile[0]
	// }

	// console.log('associatedFile ' + associatedFile)

	return (
		<section className={layoutObj.sectionClass}>
			<span className={layoutObj.spanClass}></span>
			<div className="block-banner">
				{breadcrumbs && (
					<h1 className="hidden">
						{' '}
						{breadcrumbs[breadcrumbs.length - 1].title}
					</h1>
				)}
				{/* <div className="breadcrumbs">
          <ul className="breadcrumbs__list bare-list flex flex-wrap">
            <BreadcrumbsHelper breadcrumbs={breadcrumbs}></BreadcrumbsHelper>
          </ul>
        </div> */}
				{!rightcolumn && (
					<div className="pageblock--wide">
						<div className="pageblock--textarea p--xxl">
							<div
								className="h2"
								dangerouslySetInnerHTML={{ __html: richTextTitle }}
							></div>
							<div className="date">
								{/* <date>{articleDate}</date> */}
								<span>{articleDate}</span>
							</div>
						</div>
					</div>
				)}
				{rightcolumn && (
					<div className="container--profile-banner">
						<div className="pageblock--half">
							<div className="pageblock--textarea">
								<div
									className="h2"
									dangerouslySetInnerHTML={{ __html: richTextTitle }}
								></div>
								<div className="date">
									{/* <date>{articleDate}</date> */}
									<span>{articleDate}</span>
								</div>
							</div>
							<aside className="pageblock--aside">
								<div
									className="h5"
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(introRichText),
									}}
								></div>

								{tags && (
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
								)}
							</aside>
							{blockImage && (
								<div className="pageblock--feature">
									<ImageBlock image={blockImage} dimensions={dimensions} />
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
