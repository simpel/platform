import React from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import {
	type PageBoardMemberProps,
	type RenderSettings,
	type Media,
} from 'types'
import Layout from 'components/Layout'
import { usePages } from 'context/pages'
import ImageBlock from 'components/theme/plain/Image'
import BreadcrumbsHelper from 'components/theme/plain/custom/BreadcrumbHelper'
import { useNavigation } from 'context/navigation'
import { FixMediaPathsInHtml } from 'utilities/functions'
import LinkHelper3 from 'components/theme/plain/custom/LinkHelper3'

export default function PageBoardMember() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const [{ breadcrumbs }] = useNavigation()

	const firstname = f.text('firstName')
	const secondName = f.text('secondName')
	const jobTitle = f.text('jobTitle')
	const biography = f.html('biography')

	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 656,
		heightDesk: 551,
		pureimage: true,
	}

	const img = { _id: '', url: '', alt: '' }

	const passedObject = page.miscdata as PageBoardMemberProps

	let mediaList = [] as Media[]
	if (passedObject?.media) {
		mediaList = passedObject.media
	}

	let imgFullurl = ''
	let imgSizeString = ''
	let imgExt = ''

	if (page.pageListingImage2) {
		img._id = page.pageListingImage2._id
		img.url = page.pageListingImage2.url
		img.alt = page.title
		const lastDot = img.url.lastIndexOf('.')
		imgExt = img.url.slice(lastDot + 1)
		imgFullurl =
			(process.env.NEXT_PUBLIC_MEDIACROP ?? '') +
			(process.env.NEXT_PUBLIC_MEDIAPREFIX ?? '') +
			img.url
	} else {
		imgFullurl =
			(process.env.NEXT_PUBLIC_MEDIACROP ?? '') +
			(process.env.NEXT_PUBLIC_MEDIAPREFIX ?? '') +
			img.url
	}

	if (mediaList?.length && mediaList.length > 0) {
		const fuckingVariableThatMightBeFuckingNull = mediaList[0].fields.find(
			(m) => m.alias === 'umbracoBytes',
		)?.number
		if (fuckingVariableThatMightBeFuckingNull) {
			imgSizeString = humanFileSize(fuckingVariableThatMightBeFuckingNull, true)
		}
	}

	function humanFileSize(bytes: number, si = false, dp = 1): string {
		const thresh = si ? 1000 : 1024

		if (Math.abs(bytes) < thresh) {
			return `${bytes} B`
		}

		const units = si
			? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
			: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
		let u = -1
		const r = 10 ** dp

		do {
			bytes /= thresh
			++u
		} while (
			Math.round(Math.abs(bytes) * r) / r >= thresh &&
			u < units.length - 1
		)

		return bytes.toFixed(dp) + ' ' + units[u]
	}

	const formattedImageSizeString = imgSizeString ? ` - ${imgSizeString}` : ''

	return (
		<Layout>
			{header}

			<section className="flex-container-wrapper board-of-directors-profile">
				<div className="row-full-bleed no-gutters person-profile-block bg_colour_softgrad-v theme-blue -pt-5 -pb-10">
					<div className="breadcrumbs flex-col-md-12 p--xxs">
						<ul className="breadcrumbs__list bare-list flex flex-wrap">
							<BreadcrumbsHelper breadcrumbs={breadcrumbs} />
						</ul>
					</div>
					<div className="flex-col-md-6 -pd-5">
						<h1>
							<i>{firstname}</i> {secondName}
						</h1>

						<div className="rich-text-editor">
							<p className="intro">{jobTitle}</p>
						</div>
						<div className="rich-text-editor anchored-bottom -mb-0">
							{img?.url && (
								<p>
									<LinkHelper3
										isDownload
										linkText={`Download photo (${imgExt}${formattedImageSizeString})`}
										link={{
											name: img.alt,
											url: imgFullurl,
										}}
										linkClass="download-link"
										showicon={false}
									/>
								</p>
							)}
						</div>
					</div>

					<div className="flex-col-md-6 bg_colour_default theme-white">
						<div className="image__wrapper bod_image ">
							{img?.url && <ImageBlock image={img} dimensions={dimensions} />}
						</div>
					</div>
				</div>
			</section>
			<section className="flex-container-wrapper sm-width -mt-7">
				<div className="flex-row">
					<div className="flex-col-md-12">
						<div className="rich-text-editor -mb-5">
							<div
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{
									// eslint-disable-next-line new-cap
									__html: FixMediaPathsInHtml(biography),
								}}
								className="intro"
							/>
						</div>
					</div>
				</div>
			</section>
			{body}
		</Layout>
	)
}
