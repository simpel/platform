import LatestJobVacancies, {
	IJob,
} from 'components/styled-components/Careers/LatestJobVacancies/LatestJobVacancies'
import Link from 'next/link'
import React from 'react'
import {
	IframeBlockProps,
	JobVacanciesBlockProps,
} from '../../../components/propTypes'

export default function JobVacanciesBlock(props: JobVacanciesBlockProps) {
	const { richTextTitle, items = [], viewAllUrl, topTitle, blockTheme } = props
	const jobs: IJob[] = items.map((item, index) => ({
		title: item.title || '',
		location: item.subtitle || '',
		href: item.href,
		id: `job_${index}`,
	}))

	return (
		<LatestJobVacancies
			topTitle={topTitle}
			title={richTextTitle}
			buttonText={''}
			buttonHref={''}
			gradient={blockTheme}
			jobs={jobs}
			viewAllUrl={viewAllUrl}
		/>
	)

	return (
		<>
			<section className="flex-container-wrapper md-width career__list__item">
				<div className="row-full-bleed bg_colour_default theme-purple -pb-2 -pt-5">
					<div className="flex-col-md-12">
						<div
							className="h2 -mb-5"
							dangerouslySetInnerHTML={{ __html: richTextTitle }}
						></div>
					</div>
					<div className="flex-col-md-12 rich-text-editor">
						<p>
							<Link href={viewAllUrl} className="internal-link">
								View all vacancies
							</Link>
						</p>
					</div>
				</div>
			</section>
			<section className="flex-container-wrapper md-width career__list__item">
				<div className="row-full-bleed bg_colour_default theme-purple -pb-5 -pt-0">
					<ul className="flex-col-md-12">
						{items.length > 0 ? (
							items.map((itm, index) => {
								return (
									<li key={index}>
										<Link href={itm.href} key={index}>
											{itm.title && <h4>{itm.title}</h4>}
											<h5>
												<span className="icon__pin blue"></span> {itm.subtitle}
											</h5>
											<div className="icon_wrapper bg_colour_default theme-purple">
												<span className="icon_right_rounded"></span>
											</div>
										</Link>
									</li>
								)
							})
						) : (
							<h4>Currently, there are no available opportunities.</h4>
						)}
					</ul>
					<div className="flex-col-md-12 right__aligned">
						<p className="mt--m">
							<a
								href="https://diageo.wd3.myworkdayjobs.com/en-US/Diageo_Careers/jobAlerts"
								className="btn btn-outline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Create job alerts
							</a>
						</p>
					</div>
				</div>
			</section>
		</>
	)
	// <TileListingVacancies pretitle={topTitle} title={blockTitle} subtitle={subtitle} items={items} />
}
