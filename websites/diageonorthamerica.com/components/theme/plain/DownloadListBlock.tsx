import Link from 'next/link'
import React from 'react'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { DownloadListBlockProps } from '../../../components/propTypes'
import LinkHelper2 from './custom/LinkHelper2'
import LinkHelper3 from './custom/LinkHelper3'

export default function DownloadListBlock({
	title,
	date,
	hideBlockDate,
	zippedLink,
	zippedLinkSize,
	downloads,
	showDocumentDate,
}: DownloadListBlockProps) {
	return (
		<section className="flex-container-wrapper sd-width">
			<div className="-pt-5 flex-row flex-row--align-v-top flex-row--align-h-center">
				<div className="flex-col flex-col-md-7 text-body">
					<div className="annual-results">
						<div className="ar-item active">
							<h4 className="h4-title">{title}</h4>
						</div>
						<div className="ar-content">
							<table className="results">
								<thead>
									<tr>
										<th>{!hideBlockDate && getBaseDateFormat(date)}</th>
										<th>Download</th>
									</tr>
								</thead>
								<tbody>
									{downloads &&
										downloads.map((itm, index) => {
											if (itm.download && itm.download.url) {
												const thename = 'PDF (' + itm.filesize + ')'
												return (
													<tr key={index}>
														<td className="results-table-sub-heading">
															{showDocumentDate &&
															showDocumentDate === true &&
															itm.itemDate ? (
																<>
																	{getBaseDateFormat(itm.itemDate)}
																	<br />
																	{itm.title}
																</>
															) : (
																<>{itm.title}</>
															)}
														</td>
														<td>
															{showDocumentDate &&
															showDocumentDate === true &&
															itm.itemDate ? (
																<>
																	&nbsp;
																	<br />
																	<LinkHelper3
																		linkText={thename}
																		link={itm.download}
																		linkClass={''}
																		showicon={false}
																	/>
																</>
															) : (
																<LinkHelper3
																	linkText={thename}
																	link={itm.download}
																	linkClass={''}
																	showicon={false}
																/>
															)}
														</td>
													</tr>
												)
											}
										})}
								</tbody>
							</table>
							{zippedLink && (
								<p>
									<LinkHelper3
										link={zippedLink}
										linkText={`Download all (${zippedLinkSize})`}
										linkClass={'btn btn-outline'}
										showicon={false}
									/>
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
