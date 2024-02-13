import React from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import Layout from 'components/Layout'
import { usePages } from 'context/pages'
import BreadcrumbsHelper from 'components/theme/plain/custom/BreadcrumbHelper'
import { useNavigation } from 'context/navigation'
import {
	FixMediaPathsInHtml as fixMediaPathsInHtml,
	getVideoEmbedUrl,
} from 'utilities/functions'
import { getBaseDateFormat } from 'utilities/dateFormatting'

export default function PageVideo() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const body = renderBlocks(f.blocks('body'))
	const [{ breadcrumbs }] = useNavigation()

	// MetaDescription, pageListingImage, pageVideo, tileTitle, summary, thumbnailAltText

	const summary = f.html('summary')
	const videoUrl = f.text('pageVideo')
	const tileTitle = f.text('tileTitle')
	const theme = 'theme-blue'
	const sectionclass = `content-block p--l ${theme || ''}`
	const iframeClass = 'flex-col-md-12 iframe height-750'

	// Const videoId = getClearIdFromVideoUrl(videoUrl)
	const cleanVideoUrl = getVideoEmbedUrl(videoUrl)

	return (
		<Layout>
			<section className={sectionclass}>
				<div className="offset-bg--reset" />
				<div className="block-banner">
					<div className="breadcrumbs">
						<ul className="breadcrumbs__list bare-list flex flex-wrap">
							<BreadcrumbsHelper breadcrumbs={breadcrumbs} />
						</ul>
					</div>
					<div className="container--profile-banner-wide-title p--xl">
						<div className="content-blurb ">
							<h2 className="h1">{page.title}</h2>
						</div>
					</div>
				</div>
			</section>
			<section className="content-block p--l theme-white">
				<div className="offset-bg--reset" />
				<div className="block-banner">
					<div className="container--profile-banner-wide p--s flex-row">
						<div className="flex-col-md-1" />
						<div className="flex-col-md-10">
							<h5>{getBaseDateFormat(page.articleDate)}</h5>
							{/* eslint-disable-next-line react/iframe-missing-sandbox */}
							<iframe
								className={iframeClass}
								src={cleanVideoUrl}
								title={page.title}
								aria-label={page.title}
							/>
						</div>
						<div className="flex-col-md-1" />
					</div>
					<div className="container--profile-banner-wide p--s flex-row">
						<div className="flex-col-md-2" />
						<div className="flex-col-md-8">
							<div className="-mt-3">
								{tileTitle && <h3>{tileTitle}</h3>}
								<div
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={{
										__html: fixMediaPathsInHtml(summary),
									}}
									className="rich-text-editor -mt-5"
								/>
							</div>
						</div>
						<div className="flex-col-md-2" />
					</div>
				</div>
			</section>

			{body}
		</Layout>
	)
}
