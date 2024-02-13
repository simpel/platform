import React, { useEffect, useRef, useState } from 'react'

import { useFields } from 'context/fields'
import { JV2, JV2Full, RenderSettings } from 'types'
import {
	getBaseDateFormat,
	getDateAgoFormatting,
	momentDayWeekMonthsAgo,
} from 'utilities/dateFormatting'
import Layout from 'components/Layout'

import { fetchJV2Full, fetchJV2Lite } from 'lib/cms/api/graphql/queries'

import Button from 'components/theme/plain/Button'
import ClockIcon from 'components/icons/ClockIcon'
import LocationHollowIcon from 'components/icons/LocationHollowIcon'
import LoadingPage from 'components/LoadingPage'
import { usePages } from 'context/pages'
import Link from 'next/link'
import CareerVideo from '../theme/plain/CareerVideo/CareerVideo'
import LogoIcon from 'components/theme/plain/custom/LogoIcon'

type Props = {
	jobId: string
	onJobIdChange: (jobid) => void
}

const toDollars = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

export default function PageCareersJob({ jobId, onJobIdChange }: Props) {
	const [f] = useFields()
	const [{ page }] = usePages()
	// const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const [job, setJob] = useState({} as JV2Full)
	const [isLoading, setIsLoading] = useState(true)
	const [related, setRelated] = useState([] as JV2[])
	const [isStickySearchTab, setIsStickySearchTab] = useState<boolean>(false)
	const refSearchApply = useRef<HTMLDivElement>(null)
	const jobSidebarTopTitle = f.text('jobSidebarTopTitle')
	const jobSidebarTopText = f.html('jobSidebarTopText')
	const jobSidebarLowerTitle = f.text('jobSidebarLowerTitle')
	const jobSidebarLowerText = f.html('jobSidebarLowerText')

	const videoUrl = f.text('pageVideo')
	const pageImage = page.pageListingImage
	let videoImageUrl = ''

	if (pageImage) {
		videoImageUrl =
			process.env.NEXT_PUBLIC_MEDIACROP +
			`/566x318` +
			process.env.NEXT_PUBLIC_MEDIAPREFIX +
			pageImage.url
	}

	const num = page.url.lastIndexOf('/')
	const parentPageUrl = page.url.substring(0, num)

	useEffect(() => {
		setIsLoading(true)

		fetchJV2Full(jobId).then((jobV: JV2Full) => {
			if (!jobV) {
				onJobIdChange(null) // if job doesnt exist go back to results page
			} else {
				setJob(jobV)
				const jobCategory = jobV.jobCategory ? jobV.jobCategory : ''
				const jobFamilyGroup = jobV.jobFamilyGroup ? jobV.jobFamilyGroup : ''
				const primaryJobPostingLocation = jobV.locations[0].locations
					? jobV.locations[0].locations
					: []
				const locArray = [] as string[]
				job.locations &&
					job.locations[0].locations.length > 0 &&
					job.locations.map((cntry, index) =>
						cntry.locations.map((loc, index2) => locArray.push(loc)),
					)
				// console.log('marshall ', jobCategory + ' | ' + jobFamilyGroup + ' | ' + primaryJobPostingLocation + ' | ')
				fetchJV2Lite(6, [jobFamilyGroup], [], [], primaryJobPostingLocation, [
					jobCategory,
				]).then((res: JV2[]) => {
					setRelated(res)
					// console.log('marshall ', res)
				})
			}

			setIsLoading(false)
		})
	}, [jobId])

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}

		let topIndentForRefSeachApply = 0
		if (refSearchApply !== null && refSearchApply.current !== null) {
			const { offsetTop } = refSearchApply.current
			topIndentForRefSeachApply = window.pageYOffset + offsetTop
		}

		function handleScroll() {
			window.requestAnimationFrame(() => {
				const previousScrollValue = window.scrollY
				// console.log('previousScrollValue', previousScrollValue)
				setIsStickySearchTab(topIndentForRefSeachApply < previousScrollValue)
			})
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [refSearchApply])

	if (isLoading) {
		return <LoadingPage message="Fetching your vacancy" />
	}

	function onJobClick(e, id) {
		e.preventDefault()
		onJobIdChange(id)
	}

	function ApplyButton() {
		const applyurl = job.externalPostingURL + '/apply'
		return (
			<Button
				url={applyurl}
				target="_blank"
				className="apply-button"
				rel="noreferrer"
				text="Apply"
			/>
		)
	}

	function AdditionalInformation() {
		const articleDate2 = new Date(job.jobPostingStartDate)
		const articleDate3 = getBaseDateFormat(job.jobPostingStartDate)
		return (
			<div className="additional-info job-spec">
				<div className="job-spec-item">
					<h3 className="job-spec-heading">Worker Type:</h3>
					<p className="job-spec-text">{job.workerType}</p>
				</div>
				{job.locations &&
					job.locations[0].locations.length > 0 &&
					job.locations.map((cntry, index) =>
						cntry.locations.map((loc, index2) => (
							<div key={index + index2} className="job-spec-item">
								<h3 className="job-spec-heading">
									{index + index2 == 0
										? `Primary Location:`
										: `Secondary Location:`}
								</h3>
								<p className="job-spec-text">
									{loc}, {cntry.country}
								</p>
							</div>
						)),
					)}

				{/* {job.primaryJobPostingLocation && (
          <div className="job-spec-item">
            <h3 className="job-spec-heading">Primary Location:</h3>
            <p className="job-spec-text">{job.primaryJobPostingLocation}</p>
          </div>
        )}
        {additionalLocations &&
          additionalLocations.map((itm, index) => (
            <div key={index} className="job-spec-item">
              <h3 className="job-spec-heading">Secondary Location:</h3>
              <p className="job-spec-text">{itm}</p>
            </div>
          ))} */}
				<div className="job-spec-item">
					<h3 className="job-spec-heading">Job Posting Start Date:</h3>
					<p className="job-spec-text">{articleDate3}</p>
				</div>
			</div>
		)
	}

	function CheckShowSalary() {
		const countryName = 'United States of America'
		if (
			job.maximumSalary &&
			job.maximumSalary > 0 &&
			job.minimumSalary &&
			job.minimumSalary > 0
		) {
			if (
				job.compFrequency &&
				job.compFrequency.length > 0 &&
				job.compFrequency.toLowerCase() === 'annual'
			) {
				if (job.locations && job.locations[0].locations.length > 0) {
					for (let i = 0; i < job.locations.length; i++) {
						if (job.locations[i].country === countryName) {
							return true
						}
					}
				}
			}
		}
		return false
	}

	return (
		<div className="career-vacancy-page">
			<Layout>
				<div className="intro">
					<div className="nav-tabs container">
						<div className="bread-crumbs">
							<Link href={parentPageUrl} className="bread-crumb">
								Careers
							</Link>
							<span> / </span>
							<a
								className="bread-crumb"
								href="#"
								onClick={(e) => onJobClick(e, null)}
							>
								Search and apply
							</a>
							<span> / </span>
							<span className="bread-crumb">{job.key}</span>
						</div>
						<div
							ref={refSearchApply}
							className={`search-tab ${
								isStickySearchTab ? 'search-tab--fixed' : ''
							}`}
						>
							<a href="#" onClick={(e) => onJobClick(e, null)}>
								Search and Apply
							</a>
						</div>
					</div>

					<div className="jumbotron">
						<div className="indented-container container">
							<div>
								<h1 className="job-title">{job.jobPostingTitle}</h1>
								{job.locations &&
									job.locations[0].locations.length > 0 &&
									job.locations.map((cntry, index) =>
										cntry.locations.map((loc, index2) => (
											<h3 key={index + index2} className="job-location">
												<LocationHollowIcon width="11px" />
												<span>
													{loc}, {cntry.country}
												</span>
											</h3>
										)),
									)}
								<div>
									<ApplyButton />
								</div>
							</div>
							<CareerVideo videoUrl={videoUrl} videoImageUrl={videoImageUrl} />
						</div>
					</div>
				</div>

				<div className="job-spec">
					<div className="container">
						<div className="job-spec-item">
							<h3 className="job-spec-heading">Job description:</h3>
							<p className="job-spec-text">{job.jobFamily}</p>
						</div>
						<div className="job-spec-item">
							<h3 className="job-spec-heading">
								{job.locations[0].locations[0]}
							</h3>
							<p className="job-spec-text">{job.timeType}</p>
						</div>

						<ApplyButton />
					</div>
				</div>

				<div className="content container">
					<div>
						<div>
							<h3 className="job-description-title">Job Description:</h3>
							<p className="job-description-text">{job.jobFamily}</p>
						</div>

						<div>
							<h3 className="job-location-city">
								{job.locations[0].locations[0]}
							</h3>
							<p className="job-type-text">{job.timeType}</p>
						</div>
					</div>

					<div className="main-areas">
						<div className="left-column">
							{/* <div className="job-description-title">Job Description</div> */}
							<div
								className="job-description-rte"
								dangerouslySetInnerHTML={{ __html: job.jobDescription }}
							></div>

							<AdditionalInformation />
							<ApplyButton />
						</div>

						<div className="right-column">
							<div className="post-meta-item">
								<ClockIcon width="20px" fill="#5A6872" />
								<span>
									Posted {getDateAgoFormatting(job.jobPostingStartDate)}
								</span>{' '}
								<span
									dangerouslySetInnerHTML={{
										__html: `<!-- ${job.jobPostingStartDate} -->`,
									}}
								/>
								{/* <span>Posted {momentDayWeekMonthsAgo(job.jobPostingStartDate)} Ago</span> */}
							</div>
							<div className="post-meta-item">
								<span>{job.timeType}</span>
							</div>
							{CheckShowSalary() && (
								<>
									<div className="post-meta-item">
										<div className="salary">Minimum Salary</div>
										<div className="salary">
											{toDollars.format(job.minimumSalary)}
										</div>
									</div>
									<div className="post-meta-item">
										<div className="salary">Maximum Salary</div>
										<div className="salary">
											{toDollars.format(job.maximumSalary)}
										</div>
									</div>
								</>
							)}
							<div className="post-meta-item">
								<span>{job.key}</span>
							</div>

							<h3 className="right-column-heading">
								<span className="sr-only">{jobSidebarTopTitle}</span>
								<LogoIcon />
							</h3>
							<div
								className="right-column-text"
								dangerouslySetInnerHTML={{ __html: jobSidebarTopText }}
							></div>

							<h4 className="right-column-sub-heading">
								{jobSidebarLowerTitle}
							</h4>
							<div
								className="right-column-text"
								dangerouslySetInnerHTML={{ __html: jobSidebarLowerText }}
							></div>

							<h4 className="right-column-sub-heading">SIMILAR JOBS</h4>
							<div className="similar-jobs">
								{related &&
									related
										.filter(({ key }) => key !== job.key)
										.map((itm, index) => {
											return (
												<div className="similar-job-card" key={index}>
													<div>
														<h5 className="similar-job-card-title">
															{itm.jobPostingTitle}
														</h5>
														<Link
															href={page.url + `?jobid=${itm.key}`}
															className="similar-job-card-link"
														>
															View details
														</Link>
														<div className="similar-job-card-footer">
															<span>
																{itm.locations[0].locations[0]} |{' '}
																{itm.locations[0].country} |{' '}
																{momentDayWeekMonthsAgo(
																	itm.jobPostingStartDate,
																)}
															</span>
														</div>
													</div>
												</div>
											)
										})}

								{/* <div className="similar-job-card">
                  <div>
                    <h5 className="similar-job-card-title">
                      Project Manager - Global Supply - <br />
                      Digital &amp; Technology
                    </h5>
                    <a className="similar-job-card-link" href="#">
                      View details
                    </a>
                    <div className="similar-job-card-footer">
                      <span>GLASGOW | SCOTLAND | 3 days ago</span>
                    </div>
                  </div>
                </div> */}
							</div>

							<div className="job-alerts-card">
								<h3 className="job-alerts-card-title">
									Sign-up for job alerts
								</h3>
								<p className="job-alerts-card-description">
									Signing up for job alerts means you’ll be the first to hear
									about new jobs – they'll be sent direct to your inbox
								</p>
								<a
									className="job-alerts-card-link"
									href="https://diageo.wd3.myworkdayjobs.com/en-US/Diageo_Careers/jobAlerts"
									target="_blank"
									rel="noreferrer"
								>
									Sign-up for job alerts
								</a>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}
