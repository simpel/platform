import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { getModifyUrl } from 'utilities/functions'
import { DocListingMonth } from 'components/pages/PageDocumentsListing'
import LinkHelper3 from './LinkHelper3'

function DocumentListAccordion({ index, name, blockItems }: DocListingMonth) {
	const [isActive, setIsActive] = useState<boolean>(false)
	// const [isLoadingDownloadBtn, setIsLoadingDownloadBtn] = useState<boolean>(false)
	// const arrayOfDate = blockItems.map((item) => item.itemDate.split('T')[0])
	// const earlierDate: string = min(arrayOfDate) || ''

	const toggleAccordionContent = () => setIsActive(!isActive)

	// const handleClick = (e) => {
	//   setIsLoadingDownloadBtn(true)
	//   setTimeout(() => {
	//     setIsLoadingDownloadBtn(false)
	//   }, 3000)
	// }

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
				{blockItems && blockItems.length ? (
					<>
						<table className="results">
							<thead>
								<tr>
									{/* <th>{getBaseDateFormat(earlierDate)}</th> */}
									<th></th>
									<th>View Online</th>
									<th>Download</th>
								</tr>
							</thead>
							<tbody>
								<>
									{blockItems.map((row, index) => {
										if (row.title !== '') {
											return (
												<tr key={index}>
													<td className="results-table-sub-heading">
														<span className="date-item">
															{getBaseDateFormat(row.itemDate)}
														</span>
														{row.title}
													</td>

													<td className={`centered`}>
														&nbsp; <br />
														<ul className="results__list-links bare-list flex flex-align-center">
															{row.alternativeUrl && (
																<li>
																	<LinkHelper3
																		link={row.alternativeUrl}
																		linkClass={'cta-view-online'}
																		showicon={false}
																		linkText={'View online'}
																	></LinkHelper3>
																</li>
															)}
															{/* {row.videoPageLink && (
                                <li>
                                  <Link href={row.videoPageLink}>
                                    <a className="cta-view-online">
                                      <IcoMoonIcon icon={EnumsIcon.PlayFilledAlt} />
                                      <span className="label"> Video</span>
                                    </a>
                                  </Link>
                                </li>
                              )} */}
															{/* {row.pressReleaseLink && (
                                <li>
                                  <Link href={row.pressReleaseLink}>
                                    <a className="cta-view-online">
                                      <IcoMoonIcon icon={EnumsIcon.Link} />{' '}
                                      <span className="label"> Press release</span>
                                    </a>
                                  </Link>
                                </li>
                              )} */}
														</ul>
													</td>
													<td
														className={`${
															!row.download ? ' mobile-hidden' : ''
														}`}
													>
														&nbsp; <br />
														{row.download && (
															<Link
																href={getModifyUrl(row.download)}
																className="cta-download"
																target="_blank"
																download
															>
																<span className="text-uppercase">
																	{row.download.split('.')[1]}{' '}
																</span>
																<span> ({row.filesize})</span>
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
					</>
				) : null}
			</div>
		</div>
	)
}

export default DocumentListAccordion
