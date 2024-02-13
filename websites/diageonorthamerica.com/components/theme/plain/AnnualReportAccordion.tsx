import React, { useState, useEffect } from 'react'
import Button from './Button'
import IcoMoonIcon from '../plain/IcoMoonIcon'
import { Icons as EnumsIcon } from 'enumsIcon'
import { FinGroup } from 'types'
import Link from 'next/link'
import min from 'lodash/min'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { getModifyUrl } from 'utilities/functions'

function AnnualReportAccordion({
	index,
	name,
	items,
	fileUrl,
	fileSize,
}: FinGroup) {
	const [isActive, setIsActive] = useState<boolean>(false)
	const [isLoadingDownloadBtn, setIsLoadingDownloadBtn] =
		useState<boolean>(false)
	const arrayOfDate = items.map((item) => item.articleDate.split('T')[0])
	const earlierDate: string = min(arrayOfDate) || ''

	const toggleAccordionContent = () => setIsActive(!isActive)

	const handleClick = (e) => {
		setIsLoadingDownloadBtn(true)
		setTimeout(() => {
			setIsLoadingDownloadBtn(false)
		}, 3000)
	}

	useEffect(() => {
		if (index && index === 1) {
			setIsActive(true)
		}
	}, [])

	return (
		<div className="annual-results">
			<div
				className={`ar-item ${isActive ? 'active' : ''}`}
				onClick={toggleAccordionContent}
			>
				{name && <h4 className="h4-title">{name}</h4>}
				<button
					aria-label={`toggle - ${name}`}
					className="toggle-close"
				></button>
			</div>
			<div className="ar-content">
				{items && items.length ? (
					<>
						<table className="results">
							<thead>
								<tr>
									<th>{getBaseDateFormat(earlierDate)}</th>
									<th>View Online</th>
									<th>Download</th>
								</tr>
							</thead>
							<tbody>
								<>
									{items.map((row) => {
										if (row.name !== '') {
											return (
												<tr key={row.name}>
													<td className="results-table-sub-heading">
														{row.name}
													</td>

													<td
														className={`centered${
															!row.videoPageLink && !row.pressReleaseLink
																? ' mobile-hidden'
																: ''
														}`}
													>
														<ul className="results__list-links bare-list flex flex-align-center">
															{row.videoPageLink && (
																<li>
																	<Link
																		href={row.videoPageLink}
																		className="cta-view-online"
																	>
																		<IcoMoonIcon
																			icon={EnumsIcon.PlayFilledAlt}
																		/>
																		<span className="label"> Video</span>
																	</Link>
																</li>
															)}
															{row.pressReleaseLink && (
																<li>
																	<Link
																		href={row.pressReleaseLink}
																		className="cta-view-online"
																	>
																		<IcoMoonIcon icon={EnumsIcon.Link} />{' '}
																		<span className="label">
																			{' '}
																			Press release
																		</span>
																	</Link>
																</li>
															)}
														</ul>
													</td>
													<td
														className={`${
															!row.fileUrl ? ' mobile-hidden' : ''
														}`}
													>
														{row.fileUrl && (
															<Link
																href={getModifyUrl(row.fileUrl)}
																className="cta-download"
																target="_blank"
																download
															>
																<span className="text-uppercase">
																	{row.fileName.split('.')[1]}{' '}
																</span>
																<span> ({row.fileSize})</span>
															</Link>
														)}
													</td>
												</tr>
											)
										}
									})}
								</>
							</tbody>
						</table>
						{fileUrl !== '' ? (
							<div className="ar-content__button-wrapper">
								<p>
									<Button
										loading={isLoadingDownloadBtn}
										url={fileUrl}
										text={`Download ALL (ZIP – ${fileSize})`}
										iconName={EnumsIcon.Download}
										onClick={handleClick}
										target="_blank"
									/>
								</p>
							</div>
						) : null}
					</>
				) : null}
			</div>
		</div>
	)
}

export default AnnualReportAccordion
