import React from 'react'
import { FixMediaPathsInHtml as fixMediaPathsInHtml } from 'utilities/functions'
import InternalPageHeroBanner from 'components/styled-components/Careers/InternalPageHeroBanner/InternalPageHeroBanner'
import {
	type MultiImageHeaderBlockProps,
	type BreadcrumbsProps,
} from '../../propTypes'
import ImageBlock from './Image'
import BreadcrumbsHelper from './custom/BreadcrumbHelper'
import ApplyBlock from './custom/ApplyBlock'

function BreadcrumbsRender({ breadcrumbs }: BreadcrumbsProps) {
	return (
		<div className="breadcrumbs">
			<ul className="breadcrumbs__list bare-list flex flex-wrap">
				<BreadcrumbsHelper breadcrumbs={breadcrumbs} />
			</ul>
		</div>
	)
}

// eslint-disable-next-line complexity
export default function MultiImageHeaderBlock(
	props: MultiImageHeaderBlockProps,
) {
	const {
		richTextTitle,
		richText: richTextInput,
		layout,
		mainImage,
		subImage1,
		subImage2,
		breadcrumbs,
		blockTheme,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		useApplyLink,
		upperTitle,
		blockLink,
		videoUrl,
	} = props

	let m_layout = ''

	const gradlayouts: string[] = [
		'grad-background-video',
		'grad-landscape-image',
		'grad-image-slider',
		'grad-portrait-image',
		'grad-inset-image',
		'grad-montage-image',
	]

	if (layout !== null) {
		m_layout = layout
	}

	if (gradlayouts.includes(m_layout)) {
		return (
			<InternalPageHeroBanner
				gradient={blockTheme}
				subTitle={upperTitle}
				title={richTextTitle}
				description={richTextInput}
				blockLink={blockLink}
				layout={layout}
				imageSrc={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${mainImage?.url}`}
				imageAlt={mainImage.alt}
				videoUrl={videoUrl}
				secondaryMediaSrc={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${subImage1?.url}`}
				secondaryMediaSrcAlt={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${subImage1?.alt}`}
				secondaryMediaSrc2={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${subImage2?.url}`}
				secondaryMediaSrcAlt2={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${subImage2?.alt}`}
			/>
		)
		// Here you go Ozzy
	}

	const dim1 = {
		styleDesk: 'fit-to-object',
		widthDesk: 657,
		heightDesk: 368,
		pureimage: true,
	}
	const dim2 = {
		styleDesk: 'fit-to-object',
		widthDesk: 276,
		heightDesk: 276,
		pureimage: true,
	}
	const dim3 = {
		styleDesk: 'fit-to-object',
		widthDesk: 750,
		heightDesk: 450,
		pureimage: true,
	}
	const cleanTheme = blockTheme ?? ''
	const section1 = 'content-block p--l ' + cleanTheme

	const richText = fixMediaPathsInHtml(richTextInput)

	if (m_layout === 'sub-image-below' || m_layout === '') {
		dim1.widthDesk = 657
		dim1.heightDesk = 368
		dim2.widthDesk = 276
		dim2.heightDesk = 276

		const isEVP = blockTheme.includes('EVP')
		return (
			<>
				{useApplyLink && (
					<ApplyBlock theme={blockTheme} applyUrl="" isEVP={isEVP} />
				)}
				<section className={section1}>
					{/* something */}
					<div className="offset-bg--reset" />
					<div className="block-banner">
						<BreadcrumbsRender breadcrumbs={breadcrumbs} />
						<div className="container--profile-banner-wide p--s flex-row">
							<div className="flex-col-sm-6 flex-row flex-row--align-v-top flex-row--align-h-top">
								<div className="flex-col-md-10">
									{upperTitle && <h5>{upperTitle}</h5>}
									<div
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{ __html: richTextTitle }}
										className="h1"
									/>
									<div
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{ __html: richText }}
										className="h4 font-light"
									/>
								</div>
							</div>
							<div className="flex-col-sm-6 theme-blue">
								<div className="img-wrapper img-alt-wrapper-1">
									<div className="img-cont-1">
										{mainImage && (
											<ImageBlock image={mainImage} dimensions={dim1} />
										)}
									</div>
									<div className="img-cont-2">
										{subImage1 && (
											<ImageBlock image={subImage1} dimensions={dim2} />
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		)
	}

	if (m_layout === 'sub-image-left') {
		dim1.widthDesk = 550
		dim1.heightDesk = 550
		dim2.widthDesk = 432
		dim2.heightDesk = 300
		return (
			<>
				{useApplyLink && <ApplyBlock theme={blockTheme} applyUrl="" />}
				<section className={section1}>
					{/* something2 */}
					<div className="offset-bg--reset" />
					<div className="block-banner">
						<BreadcrumbsRender breadcrumbs={breadcrumbs} />
						<div className="container--profile-banner-wide p--s pb-100 flex-row">
							<div className="flex-col-sm-5 flex-row flex-row--align-v-center flex-row--align-h-center">
								<div className="flex-col-md-10">
									{upperTitle && <h5>{upperTitle}</h5>}
									<div
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{ __html: richTextTitle }}
										className="h1"
									/>
									<div
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{ __html: richText }}
										className="h4 font-light"
									/>
								</div>
							</div>
							<div className="flex-col-sm-7 theme-blue">
								<div className="img-wrapper img-alt-wrapper-2">
									<div className="img-cont-1">
										{mainImage && (
											<ImageBlock image={mainImage} dimensions={dim1} />
										)}
									</div>
									<div className="img-cont-2">
										{subImage1 && (
											<ImageBlock image={subImage1} dimensions={dim2} />
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		)
	}

	if (m_layout === 'three-image') {
		dim1.widthDesk = 650
		dim1.heightDesk = 650
		dim2.widthDesk = 222
		dim2.heightDesk = 259
		dim3.widthDesk = 322
		dim3.heightDesk = 228
		return (
			<>
				{useApplyLink && <ApplyBlock theme={blockTheme} applyUrl="" />}
				<section className={section1}>
					{/* something3 */}
					<div className="offset-bg--reset" />
					<div className="block-banner">
						<BreadcrumbsRender breadcrumbs={breadcrumbs} />

						<div className="container--profile-banner-wide p--s pb-100 flex-row">
							<div className="flex-col-sm-5 flex-row flex-row--align-v-center flex-row--align-h-center">
								<div className="flex-col-md-10">
									{upperTitle && <h5>{upperTitle}</h5>}
									<div
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{ __html: richTextTitle }}
										className="h1"
									/>
									<div
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{ __html: richText }}
										className="h4 font-light"
									/>
								</div>
							</div>

							<div className="flex-col-sm-7 theme-blue">
								<div className="img-wrapper img-alt-wrapper-3">
									<div className="img-cont-1">
										{mainImage && (
											<ImageBlock image={mainImage} dimensions={dim1} />
										)}
									</div>
									<div className="img-cont-2">
										{subImage1 && (
											<ImageBlock image={subImage1} dimensions={dim2} />
										)}
									</div>
									<div className="img-cont-3">
										{subImage2 && (
											<ImageBlock image={subImage2} dimensions={dim3} />
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		)
	}

	return null
}
