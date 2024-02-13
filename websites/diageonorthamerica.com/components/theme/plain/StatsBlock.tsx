import React from 'react'
import { type TripleFigureItem } from 'types'
import { FixMediaPathsInHtml } from 'utilities/functions'
import { type StatsBlockProps } from '../../propTypes'

const MiniStat = ({
	symbol,
	upperText,
	upperSuffix,
	lowerText,
	classy,
	textSize,
}: TripleFigureItem) => {
	const classses = 'stats-item ' + classy
	const texty = 'stat-figure ' + textSize
	return (
		<div className={classses}>
			<p className={texty}>
				{symbol && <pre className="currency_symbol">{symbol}</pre>}
				{upperText}
				<span className="stat-figure-small">
					<sup>{upperSuffix}</sup>
				</span>
			</p>
			<p className="stat-title">{lowerText}</p>
		</div>
	)
}

export default function StatsBlock({
	heading,
	richTextHeading,
	useRichTextHeading,
	stats,
	blockTheme,
	useFourColumns,
	footnote,
}: StatsBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	const sectionclass = 'content-block section-bg -pt-10 -pb-10 ' + cleanTheme
	let count = 0
	let classy = 'double'
	const headingtext = useRichTextHeading
		? String(richTextHeading)
		: String(heading)
	let maxchars = 0
	let thischars = 0
	let textSize = 'stat-figure-m'
	textSize = 'stat-figure-xl'

	footnote = footnote ? FixMediaPathsInHtml(footnote) : ''

	if (stats) {
		count = stats.length
		stats.map((child) => {
			thischars = child.upperText.length
			if (thischars > maxchars) maxchars = thischars
		})
	}

	if (maxchars > 5) {
	} else if (maxchars > 8) {
	}

	switch (count) {
		case 1: {
			classy = 'double'
			textSize = 'stat-figure-xl'
			break
		}

		case 2: {
			classy = 'double'
			textSize = 'stat-figure-xl'
			break
		}

		case 3: {
			classy = 'triple'
			textSize = 'stat-figure-xl'
			if (maxchars > 7) {
				textSize = 'stat-figure-m'
			} else if (maxchars > 5) {
				textSize = 'stat-figure-x'
			}

			break
		}

		default: {
			if (useFourColumns) {
				classy = 'quadruple'
				textSize = 'stat-figure-m'
				if (maxchars > 7) {
					textSize = 'stat-figure-s'
				} else if (maxchars > 5) {
					textSize = 'stat-figure-m'
				}
			} else {
				classy = 'triple'
				if (maxchars > 7) {
					textSize = 'stat-figure-m'
				} else if (maxchars > 5) {
					textSize = 'stat-figure-x'
				}
			}

			break
		}
	}

	return (
		<section className={sectionclass}>
			<div className="block-banner">
				<div className="container">
					{!useRichTextHeading && headingtext && (
						<h3 className="h4">{headingtext}</h3>
					)}
					{useRichTextHeading && (
						<div
							dangerouslySetInnerHTML={{ __html: headingtext }}
							className="h2 ptb--l"
						/>
					)}
					<div className="stats-block">
						{stats &&
							stats.map((child, key) => (
								<MiniStat
									key={key}
									symbol={child.symbol}
									upperText={child.upperText}
									upperSuffix={child.upperSuffix}
									lowerText={child.lowerText}
									classy={classy}
									textSize={textSize}
								/>
							))}
					</div>
					{footnote && (
						<div
							dangerouslySetInnerHTML={{ __html: footnote }}
							className="rich-text-editor -mt-5"
						/>
					)}
				</div>
			</div>
		</section>
	)
}
