import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import { type Media, type UrlsGqlResponse, type PartialPage } from 'types'
import { Icons as EnumsIcon } from 'enumsIcon'
import Layout from 'components/Layout'
import Button from 'components/theme/plain/Button'
import Icon from 'components/theme/plain/Icon'
import { usePages } from 'context/pages'
import { useLocale } from 'context/locale'
import Link from 'next/link'
import { fetchPressReleasesFeatures } from 'lib/cms/api'
import {
	FixMediaPathsInHtml as fixMediaPathsInHtml,
	getModifyUrl,
} from 'utilities/functions'
import staticSocialIcons from 'components/theme/plain/custom/StaticSocialIcons'
import { getBaseDateFormat } from 'utilities/dateFormatting'

function PagePressRelease() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [{ html, link2 }] = useLocale()
	const body = renderBlocks(f.blocks('body'))

	// Let dlObject: Media = { _id: '', contentType: '', url: '', title: '', fields: [] }
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	let dlObject = {} as Media
	const contacts = f.html('contacts')
	const footertext = f.html('notes')
	const footertitle = f.text('notesHeading')
	const pagetitle = f.text('pageTitle')

	const stdfooterlink = link2('pressReleaseFooterLink')

	let stdfootertitle = 'About <i>Diageo</i>'
	let stdfootertext = ''
	stdfootertitle =
		footertitle && footertitle.length > 0
			? footertitle
			: html('pressReleaseFooterTitle')

	stdfootertext =
		footertext && footertext.length > 0
			? footertext
			: html('pressReleaseBoilerplate')

	const dlJson = f.fields.find((m) => m.alias === 'pageDownload')
	const mediaid = dlJson?.mediaList ? dlJson?.mediaList[0]._id : ''

	if (page.referencedMedia) {
		const dlObject2 = page.referencedMedia.find((m) => m._id === mediaid)
		if (dlObject2) {
			dlObject = dlObject2
		}
	}

	// Const articleDate2 = new Date(page.articleDate)
	const articleDate3 = getBaseDateFormat(page.articleDate) // ArticleDate2.toLocaleDateString()

	const [pageList, setPageList] = useState({} as UrlsGqlResponse)

	const categories = [] as string[]
	let relatednews = [] as PartialPage[]

	const number_ = page.url.split('/')
	const parentPageUrl = number_.slice(0, -2).join('/')

	if (page.categoryPages) {
		for (const categoryPage of page.categoryPages) {
			categories.push(categoryPage._id)
		}
	}

	useEffect(() => {
		void fetchPressReleasesFeatures(
			false,
			4,
			false,
			false,
			0,
			categories,
			false,
		).then((response: UrlsGqlResponse) => {
			setPageList(response)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (pageList?.contents) {
		relatednews = pageList.contents
			.filter((a) => a._id !== page._id)
			.slice(0, 3)
	}

	// UseEffect(() => {
	//   fetchPressReleasesFeatures(false, 3, false, false, 0, categories).then((res: UrlsGqlResponse) => {
	//     setPageList(res)
	//   })
	// }, [])

	// if (pageList && pageList.contents) {
	//   relatednews = pageList.contents
	// }

	return (
		<Layout>
			<section className="pageblock p--l">
				<div className="filler" />
				<div className="pageblock--textarea">
					<h1 className="h2">{pagetitle}</h1>
					<div className="date">
						{/* <date>{articleDate3}</date> | <span>Press release</span> */}
						<span>{articleDate3}</span> | <span>Press release</span>
					</div>
					{dlObject?.url && (
						<p>
							<Button
								url={getModifyUrl(dlObject.url)}
								text="Download PDF"
								iconName={EnumsIcon.Download}
								target="_blank"
								rel="noreferrer"
							/>
						</p>
					)}
				</div>
				<aside className="pageblock--aside" />
			</section>

			<section className="pageblock p--l">
				<div className="filler" />
				<div className="pageblock--textarea">
					<div className="pageblock--textarea-sm">{body}</div>
				</div>
				<aside className="pageblock--aside">
					<div
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: fixMediaPathsInHtml(contacts) }}
						className="rich-text-editor"
					/>
				</aside>
			</section>
			{relatednews && (
				<section className="related-stories p--xxxl theme-amber">
					<h4>Latest press releases</h4>
					<ul className="related-stories-list">
						{relatednews.map((object) => {
							return (
								<li key={object._id} className="related-stories-item">
									<span />
									<div className="date">
										{/* <date>{getBaseDateFormat(obj.articleDate)}</date> | <span>Press release</span> */}
										<span>{getBaseDateFormat(object.articleDate)}</span> |{' '}
										<span>Press release</span>
									</div>
									<div>
										<p>
											<Link href={object.url}>{object.title}</Link>
										</p>
									</div>
								</li>
							)
						})}
					</ul>
					<div>
						<p>
							<Link href={parentPageUrl} className="link link__text">
								View all press releases
							</Link>
							<Icon
								name="icon_arrow_right"
								size="middle"
								className="link__icon"
							/>
						</p>
					</div>
				</section>
			)}
			<section className="page-press-footer p--xxxl">
				<div className="pageblock">
					{stdfootertitle && (
						<h2
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: stdfootertitle }}
							className="footer-h2"
						/>
					)}
				</div>
				<div className="pageblock">
					<div className="filler" />
					<div className="pageblock--textarea th-red">
						<div
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: fixMediaPathsInHtml(stdfootertext),
							}}
							className="pageblock--textarea-sm text-body rich-text-editor"
						/>

						<div className="pageblock--textarea-sm">
							<h3 className="strapline-heading">
								<i>Celebrating life,</i>
								<span className="second-line">every day, everywhere</span>
								{/* <span className="third-line">everywhere</span> */}
							</h3>
							{stdfooterlink && (
								<p>
									<Link
										href={stdfooterlink.url}
										className="link link__text learn-more-cta"
									>
										{stdfooterlink.name}
									</Link>
									<Icon
										name="icon_arrow_right"
										size="middle"
										className="link__icon"
									/>
								</p>
							)}
						</div>
					</div>
					<aside className="pageblock--aside">
						<h5>Follow us </h5>

						{staticSocialIcons()}
					</aside>
				</div>
			</section>
		</Layout>
	)
}

export default PagePressRelease
