import React from 'react'
import ImageBlock from './Image'
import {
	PageHeaderBlockProps,
	BreadcrumbsProps,
} from '../../../components/propTypes'
import { DoubleFigureItem } from 'types'
import BreadcrumbsHelper from './custom/BreadcrumbHelper'
import { FixMediaPathsInHtml } from 'utilities/functions'
import ApplyBlock from './custom/ApplyBlock'

function BreadcrumbsRender({ breadcrumbs }: BreadcrumbsProps) {
	return (
		<div className="breadcrumbs">
			<ul className="breadcrumbs__list bare-list flex flex-wrap">
				<BreadcrumbsHelper breadcrumbs={breadcrumbs}></BreadcrumbsHelper>
			</ul>
		</div>
	)
}

function MiniStat({ upperText, lowerText }: DoubleFigureItem) {
	return (
		<div className="stats">
			<p className="heading-h1-xxl font-semibold">
				{upperText}
				<span className="h5">{lowerText}</span>
			</p>
		</div>
	)
}
export default function PageHeaderBlock({
	layout,
	aboveTitle,
	richTextTitle,
	textBody,
	secondaryTextBody,
	image,
	optionalFigures,
	breadcrumbs,
	theme,
	useApplyLink,
	applyUrl,
}: PageHeaderBlockProps) {
	let richTextTitle2 = ''
	if (richTextTitle && richTextTitle.length > 0) {
		richTextTitle2 = richTextTitle
	}
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 650,
		heightDesk: 650,
		pureimage: true,
	}
	let sectionclass = 'content-block'
	let m_layout = ''

	if (layout != null) {
		m_layout = layout
	}

	textBody = textBody ? FixMediaPathsInHtml(textBody) : ''
	secondaryTextBody = secondaryTextBody
		? FixMediaPathsInHtml(secondaryTextBody)
		: ''

	let div1class = 'offset-bg--reset'
	// let div2class = 'block-banner'
	let div3class = 'container--profile-banner-wide p--s flex-row'

	let lCentered = false
	let lLev1 = false
	let lLev2 = false
	let lLev2s = false
	let lbrand = false
	let lLtitle = false

	if (m_layout == 'centered' || m_layout == '') {
		dimensions.widthDesk = 170
		dimensions.heightDesk = 170
		dimensions.styleDesk = ''
		sectionclass = `content-block p--l ${theme ? theme : ''}`
		div3class = 'container--profile-banner-wide p--s flex-row'
		lCentered = true
	} else if (m_layout == 'level-1-header') {
		sectionclass = `content-block p--l ${theme ? theme : ''}`
		div1class = 'offset-bg'
		div3class = 'container--profile-banner'
		lLev1 = true
	} else if (m_layout == 'level-2-header') {
		sectionclass = `content-block p--l ${theme ? theme : ''}`
		div3class = 'container--profile-banner-wide p--xxxl'
		lLev2 = true
	} else if (m_layout == 'level-2-short') {
		dimensions.heightDesk = 350
		sectionclass = `content-block p--l ${theme ? theme : ''}`
		div3class = 'container--profile-banner-wide'
		lLev2s = true
	} else if (m_layout == 'brand-header') {
		sectionclass = `content-block p--l ${theme ? theme : ''}`
		div3class = 'container--profile-banner'
		lbrand = true
	} else if (m_layout == 'left-title-only') {
		sectionclass = `content-block p--l ${theme ? theme : ''}`
		div3class = 'container--profile-banner-wide-title p--xl'
		lLtitle = true
	}

	return (
		<>
			{useApplyLink && <ApplyBlock theme={theme} applyUrl={''} />}
			<section className={sectionclass}>
				<div className={div1class}></div>
				<div className="block-banner">
					{breadcrumbs && <BreadcrumbsRender breadcrumbs={breadcrumbs} />}
					<div className={div3class}>
						{lCentered && (
							<div className="flex-col-md-12 flex-row">
								<div className="flex-col-md-3">
									{image && (
										<ImageBlock image={image} dimensions={dimensions} />
									)}
								</div>
								<div className="flex-col-md-6">
									{richTextTitle2 && (
										<div
											className="h1"
											dangerouslySetInnerHTML={{ __html: richTextTitle2 }}
										></div>
									)}
									<div
										className="h4 font-light"
										dangerouslySetInnerHTML={{ __html: textBody }}
									></div>
								</div>
							</div>
						)}
						{lLev1 && (
							<>
								<div className="content-blurb">
									<div className="content-left">
										<h2 className="h5">{aboveTitle}</h2>
										<div
											className="h1 font-semibold"
											dangerouslySetInnerHTML={{ __html: richTextTitle2 }}
										></div>
									</div>
								</div>
								<div className="content-img">
									<div className="img-wrapper">
										{image && (
											<ImageBlock image={image} dimensions={dimensions} />
										)}
									</div>
								</div>
							</>
						)}
						{lLev2 && (
							<>
								<div className="content-blurb">
									<div className="content-left">
										<div
											className="h1"
											dangerouslySetInnerHTML={{ __html: richTextTitle2 }}
										></div>
										<div
											className="h4 font-light rich-text-editor"
											dangerouslySetInnerHTML={{ __html: textBody }}
										></div>
									</div>
								</div>
								<div className="content-img">
									<div className="img-wrapper">
										{image && (
											<ImageBlock image={image} dimensions={dimensions} />
										)}
									</div>
								</div>
							</>
						)}{' '}
						{lLev2s && (
							<>
								<div className="content-blurb">
									<div className="content-left p--xxxl">
										<div
											className="h1"
											dangerouslySetInnerHTML={{ __html: richTextTitle2 }}
										></div>
										<div
											className="h4 font-light rich-text-editor"
											dangerouslySetInnerHTML={{ __html: textBody }}
										></div>
									</div>
								</div>
								<div className="content-img">
									<div className="img-wrapper">
										{image && (
											<ImageBlock image={image} dimensions={dimensions} />
										)}
									</div>
								</div>
							</>
						)}{' '}
						{lbrand && (
							<>
								<div className="content-blurb">
									<div className="content-left">
										<div
											className="h1"
											dangerouslySetInnerHTML={{ __html: richTextTitle2 }}
										></div>
										<div
											className="h3 font-normal rich-text-editor"
											dangerouslySetInnerHTML={{ __html: textBody }}
										></div>
										{optionalFigures &&
											optionalFigures.map((child, key) => (
												<MiniStat
													key={key}
													symbol={child.symbol}
													upperText={child.upperText}
													upperTextSuffix={child.upperTextSuffix}
													lowerText={child.lowerText}
												></MiniStat>
											))}
									</div>
								</div>
								<div className="content-img">
									<div className="img-wrapper">
										{image && (
											<ImageBlock image={image} dimensions={dimensions} />
										)}
									</div>
									<div
										className="h5 font-normal blurb"
										dangerouslySetInnerHTML={{ __html: secondaryTextBody }}
									></div>
								</div>
							</>
						)}
						{lLtitle && (
							<div className="content-blurb ">
								<div
									className="h1"
									dangerouslySetInnerHTML={{ __html: richTextTitle2 }}
								></div>
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	)

	/*
  if (m_layout == 'centered' || m_layout == '') {
    dimensions.widthDesk = 170
    dimensions.heightDesk = 170
    dimensions.styleDesk = ''
    sectionclass = `content-block p--l ${theme ? theme : ''}`
    return (
      <>
        {useApplyLink && <ApplyBlock theme={theme} />}
        <section className={sectionclass}>
          <div className="offset-bg--reset"></div>
          <div className="block-banner">
            <BreadcrumbsRender breadcrumbs={breadcrumbs} />

            <div className="container--profile-banner-wide p--s flex-row">
              <div className="flex-col-md-12 flex-row">
                <div className="flex-col-md-3">{image && <ImageBlock image={image} dimensions={dimensions} />}</div>
                <div className="flex-col-md-6">
                  {richTextTitle && <div className="h1" dangerouslySetInnerHTML={{ __html: richTextTitle }}></div>}
                  <div className="h4 font-light" dangerouslySetInnerHTML={{ __html: textBody }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  } else if (m_layout == 'level-1-header') {
    sectionclass = `content-block p--l ${theme ? theme : ''}`
    return (
      <>
        {useApplyLink && <ApplyBlock theme={theme} />}
        <section className={sectionclass}>
          <div className="offset-bg"></div>
          <div className="block-banner">
            <BreadcrumbsRender breadcrumbs={breadcrumbs} />

            <div className="container--profile-banner">
              <div className="content-blurb">
                <div className="content-left">
                  <h2 className="h5">{aboveTitle}</h2>

                  <div className="h1 font-semibold" dangerouslySetInnerHTML={{ __html: richTextTitle2 }}></div>
                </div>
              </div>

              <div className="content-img">
                <div className="img-wrapper">{image && <ImageBlock image={image} dimensions={dimensions} />}</div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  } else if (m_layout == 'level-2-header') {
    sectionclass = `content-block p--l ${theme ? theme : ''}`
    return (
      <>
        {useApplyLink && <ApplyBlock theme={theme} />}
        <section className={sectionclass}>
          <div className="offset-bg--reset"></div>
          <div className="block-banner">
            <BreadcrumbsRender breadcrumbs={breadcrumbs} />

            <div className="container--profile-banner-wide p--xxxl">
              <div className="content-blurb">
                <div className="content-left">
                  <h2 className="h1" dangerouslySetInnerHTML={{ __html: richTextTitle2 }}></h2>

                  <div className="h4 font-light rich-text-editor" dangerouslySetInnerHTML={{ __html: textBody }}></div>
                </div>
              </div>

              <div className="content-img">
                <div className="img-wrapper">{image && <ImageBlock image={image} dimensions={dimensions} />}</div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  } else if (m_layout == 'level-2-short') {
    dimensions.heightDesk = 350
    sectionclass = `content-block p--l ${theme ? theme : ''}`
    return (
      <>
        {useApplyLink && <ApplyBlock theme={theme} />}
        <section className={sectionclass}>
          <div className="offset-bg--reset"></div>
          <div className="block-banner">
            <BreadcrumbsRender breadcrumbs={breadcrumbs} />

            <div className="container--profile-banner-wide">
              <div className="content-blurb">
                <div className="content-left p--xxxl">
                  <h2 className="h1" dangerouslySetInnerHTML={{ __html: richTextTitle2 }}></h2>

                  <div className="h4 font-light rich-text-editor" dangerouslySetInnerHTML={{ __html: textBody }}></div>
                </div>
              </div>

              <div className="content-img">
                <div className="img-wrapper">{image && <ImageBlock image={image} dimensions={dimensions} />}</div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  } else if (m_layout == 'brand-header') {
    sectionclass = `content-block p--l ${theme ? theme : ''}`
    return (
      <>
        {useApplyLink && <ApplyBlock theme={theme} />}
        <section className={sectionclass}>
          <div className="offset-bg--reset"></div>
          <div className="block-banner">
            <BreadcrumbsRender breadcrumbs={breadcrumbs} />
            <div className="container--profile-banner">
              <div className="content-blurb">
                <div className="content-left">
                  <h2 className="h1" dangerouslySetInnerHTML={{ __html: richTextTitle2 }}></h2>

                  <div className="h3 font-normal rich-text-editor" dangerouslySetInnerHTML={{ __html: textBody }}></div>

                  {optionalFigures &&
                    optionalFigures.map((child, key) => (
                      <MiniStat
                        key={key}
                        symbol={child.symbol}
                        upperText={child.upperText}
                        upperTextSuffix={child.upperTextSuffix}
                        lowerText={child.lowerText}
                      ></MiniStat>
                    ))}
                </div>
              </div>

              <div className="content-img">
                <div className="img-wrapper">{image && <ImageBlock image={image} dimensions={dimensions} />}</div>
                <div className="h5 font-normal blurb" dangerouslySetInnerHTML={{ __html: secondaryTextBody }}></div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  } else if (m_layout == 'left-title-only') {
    sectionclass = `content-block p--l ${theme ? theme : ''}`
    return (
      <>
        {useApplyLink && <ApplyBlock theme={theme} />}
        <section className={sectionclass}>
          <div className="offset-bg--reset"></div>
          <div className="block-banner">
            <BreadcrumbsRender breadcrumbs={breadcrumbs} />
            <div className="container--profile-banner-wide-title p--xl">
              <div className="content-blurb ">
                <h2 className="h1" dangerouslySetInnerHTML={{ __html: richTextTitle2 }}></h2>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  */
}
