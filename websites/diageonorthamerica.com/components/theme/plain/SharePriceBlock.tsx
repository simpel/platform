import React from 'react'
import { SharePriceBlockProps } from '../../../components/propTypes'
import LinkHelper from './custom/LinkHelper'

export default function SharePriceBlock({
	title,
	blockTheme,
	link,
	figures,
}: SharePriceBlockProps) {
	// TODO - ADD Link html and Theme facility
	const cleanTheme = blockTheme ? blockTheme : ''
	let nypercent = ''
	let lspercent = ''
	let nyPerClass = ''
	let lsPerClass = ''
	switch (figures.nyDirection) {
		case -1:
			nypercent =
				'-' +
				new Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(
					figures.nyPercent,
				)
			nyPerClass = 'price_down'
			break
		case 0:
			nypercent =
				'' +
				new Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(
					figures.nyPercent,
				)
			break
		case 1:
			nypercent =
				'+' +
				new Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(
					figures.nyPercent,
				)
			nyPerClass = 'price_up'
			break
	}
	switch (figures.lsDirection) {
		case -1:
			lspercent =
				'-' +
				new Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(
					figures.lsPercent,
				)
			lsPerClass = 'price_down'
			break
		case 0:
			lspercent =
				'' +
				new Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(
					figures.lsPercent,
				)
			break
		case 1:
			lspercent =
				'+' +
				new Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(
					figures.lsPercent,
				)
			lsPerClass = 'price_up'
			break
	}
	const sectionClass =
		'flex-row flex-col-md-10 offset-md-1 bg_colour_softgrad-v theme-blue ' +
		cleanTheme
	return (
		<section className="flex-container-wrapper no-gutters share_price_block -mb-5 -mt-5">
			<div className={sectionClass}>
				<div className="flex-col-md-12">{title && <h4>{title}</h4>}</div>
				<div className="flex-col-md-6">
					<p>LSE</p>
					<div className="shareprice_value">
						{new Intl.NumberFormat('en-us', {
							minimumFractionDigits: 2,
						}).format(figures.lsFigure)}
						<span>p</span>
					</div>
					<p className={lsPerClass}>
						{lspercent}
						<span></span>
					</p>
				</div>
				<div className="flex-col-md-6">
					<p>NYSE</p>
					<div className="shareprice_value">
						<span>$</span>
						{new Intl.NumberFormat('en-us', {
							minimumFractionDigits: 2,
						}).format(figures.nyFigure)}
					</div>
					<p className={nyPerClass}>
						{nypercent}
						<span></span>
					</p>
				</div>
				<div className="flex-col-md-12 rich-text-editor right__aligned">
					<p>Delayed by 15 minutes</p>
				</div>
			</div>
			<div className="flex-col-md-10 offset-md-1">
				{link && (
					<LinkHelper
						name={link.name}
						url={link.url}
						contentId={link.contentId}
						mediaId={link.mediaId}
						target={link.target}
					></LinkHelper>
				)}
			</div>
		</section>
	)
}
