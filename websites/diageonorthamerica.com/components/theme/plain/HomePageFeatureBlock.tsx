import React from 'react'
import StatisticsBlock from 'components/styled-components/Careers/StatisticsBlock/StatisticsBlock'
import { type DoubleFigureItem } from 'types'
// eslint-disable-next-line import/no-extraneous-dependencies
import isEmpty from 'lodash/isEmpty'
import { type HomePageFeatureBlockProps } from '../../propTypes'
import ImageBlock from './Image'
import LinkHelper2 from './custom/LinkHelper2'

// Function MiniStatQuad({ symbol, upperText, upperTextSuffix, lowerText }: DoubleFigureItem) {
//   return (
//     <div className="stats-item quadruple">
//       <p className="stat-figure">
//         {symbol && <pre className="currency_symbol">{symbol}</pre>}
//         {upperText}
//         {upperTextSuffix && <span className="stat-figure-small">{upperTextSuffix}</span>}
//       </p>
//       <p className="stat-title">{lowerText}</p>
//     </div>
//   )
// }

function MiniStatTriple({
	symbol,
	upperText,
	upperTextSuffix,
	lowerText,
}: DoubleFigureItem) {
	return (
		<div className="stats-item triple">
			<p className="stat-figure">
				{symbol && <pre className="currency_symbol">{symbol}</pre>}
				{upperText}
				{upperTextSuffix && (
					<span className="stat-figure-small">{upperTextSuffix}</span>
				)}
			</p>
			<p className="stat-title">{lowerText}</p>
		</div>
	)
}

function MiniStatDouble({
	symbol,
	upperText,
	upperTextSuffix,
	lowerText,
}: DoubleFigureItem) {
	return (
		<div className="stats-item double">
			<p className="stat-figure">
				{symbol && <pre className="currency_symbol">{symbol}</pre>}
				{upperText}
				{upperTextSuffix && (
					<span className="stat-figure-small">{upperTextSuffix}</span>
				)}
			</p>
			<p className="stat-title">{lowerText}</p>
		</div>
	)
}

export default function HomePageFeatureBlock(props: HomePageFeatureBlockProps) {
	const {
		mainImage,
		secondaryImage,
		link,
		smallTitle,
		richTextTitle,
		richTextIntro,
		figuresTitle,
		noTopWhitespace,
		optionalFigures,
		blockTheme,
		insetImageLayout,
		figuresSubText,
	} = props
	// const mainImage = undefined
	// const secondaryImage = mainImage
	// const isImageVisible = !isEmpty(mainImage)
	// return (
	//   <StatisticsBlock
	//     pageTitle={smallTitle}
	//     title={richTextTitle}
	//     buttonText={link?.name || ''}
	//     buttonHref={link?.url || ''}
	//     gradient={blockTheme || ''}
	//     statistics={
	//       optionalFigures?.map(
	//         ({ symbol, upperText, upperTextSuffix, lowerText }) => ({
	//           value: upperText,
	//           title: lowerText,
	//         })
	//       ) || []
	//     }
	//     isMediaVisible={isImageVisible}
	//     image1={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${mainImage.url}`}
	//     alt1="Statistics image"
	//   />
	// )
	const dim1 = {
		styleDesk: 'fit-to-object',
		widthDesk: 650,
		heightDesk: 650,
		pureimage: true,
	}
	const dim2 = {
		styleDesk: 'fit-to-object',
		widthDesk: 400,
		heightDesk: 400,
		pureimage: true,
	}
	let sectionclass = 'content-block p--xxxl m--0 '
	let sectionclass2 = 'content-block section-bg p--0 m--0  '
	const cleanTheme = blockTheme ? blockTheme : ''
	let imageBoxClass =
		'flex-col-sm-6 ' +
		(mainImage || secondaryImage ? 'content-img ' : '') +
		'stats-right-column-wrapper'
	if (noTopWhitespace) {
		imageBoxClass = 'flex-col-sm-6 mt--l stats-right-column-wrapper'
	}

	const secondaryImageExists = !isEmpty(secondaryImage)

	if (insetImageLayout) {
		sectionclass = 'content-block p--xxxl m--0 ' + cleanTheme
		sectionclass2 = 'content-block section-bg p--0 m--0 -pb-10 ' + cleanTheme
		return (
			<>
				<section className={sectionclass}>
					<div className="offset-bg--reset"></div>
					<div className="block-banner">
						<div className="container--profile-banner-wide p--s flex-row">
							<div className="flex-col-sm-6 flex-row flex-row--align-v-center flex-row--align-h-center">
								<div className="flex-col-md-10">
									<h2 className="h5">{smallTitle}</h2>

									<div
										className="h3"
										dangerouslySetInnerHTML={{ __html: richTextTitle }}
									></div>

									{richTextIntro && (
										<div
											dangerouslySetInnerHTML={{ __html: richTextIntro }}
										></div>
									)}

									{link && (
										<LinkHelper2
											name={link.name}
											url={link.url}
											contentId={link.contentId}
											mediaId={link.mediaId}
											target={link.target}
											linkClass={'link'}
											divClass={'link__inner'}
											showicon={true}
										></LinkHelper2>
									)}
								</div>
							</div>

							<div className="flex-col-sm-6 stats-right-column-wrapper">
								<div className="img-wrapper img-alt-wrapper-4">
									<div className="img-cont-1">
										{mainImage && (
											<ImageBlock image={mainImage} dimensions={dim1} />
										)}
									</div>
									{secondaryImageExists && (
										<div className="img-cont-2">
											<ImageBlock image={secondaryImage} dimensions={dim2} />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className={sectionclass2}>
					<div className="block-banner">
						<div className="container">
							{figuresTitle && <h4>{figuresTitle}</h4>}
							<div className="stats-block">
								{optionalFigures &&
									optionalFigures.map((child, key) => (
										<MiniStatTriple
											key={key}
											symbol={child.symbol}
											upperText={child.upperText}
											upperTextSuffix={child.upperTextSuffix}
											lowerText={child.lowerText}
										></MiniStatTriple>
									))}
								{figuresSubText && (
									<div
										className={'small-text'}
										dangerouslySetInnerHTML={{ __html: figuresSubText }}
									></div>
								)}
							</div>
						</div>
					</div>
				</section>
			</>
		)
	} else {
		sectionclass = 'content-block--featured feature-large-spacing ' + cleanTheme
		return (
			<>
				<section className={sectionclass}>
					<div className="offset-bg--reset"></div>
					<div className="block-banner">
						<div className="container--profile-banner p--s flex-row">
							<div className="flex-col-sm-6 flex-row flex-row--align-v-center flex-row--align-h-center text-body">
								<div className="flex-col-md-10">
									<h2 className="h5">{smallTitle}</h2>

									<div
										className="h3"
										dangerouslySetInnerHTML={{ __html: richTextTitle }}
									></div>
									{richTextIntro && (
										<div
											dangerouslySetInnerHTML={{ __html: richTextIntro }}
										></div>
									)}

									{link && (
										<LinkHelper2
											name={link.name}
											url={link.url}
											contentId={link.contentId}
											mediaId={link.mediaId}
											target={link.target}
											linkClass={'link'}
											divClass={'link__inner'}
											showicon={true}
										></LinkHelper2>
									)}
								</div>
							</div>
							<div className={imageBoxClass}>
								<div className="img-wrapper">
									{mainImage && (
										<ImageBlock image={mainImage} dimensions={dim1} />
									)}
								</div>
								<div className="stats-block small">
									{optionalFigures &&
										optionalFigures.map((child, key) => (
											<MiniStatDouble
												key={key}
												symbol={child.symbol}
												upperText={child.upperText}
												upperTextSuffix={child.upperTextSuffix}
												lowerText={child.lowerText}
											></MiniStatDouble>
										))}
									{figuresSubText && (
										<div
											className={'small-text'}
											dangerouslySetInnerHTML={{ __html: figuresSubText }}
										></div>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		)
	}
}
