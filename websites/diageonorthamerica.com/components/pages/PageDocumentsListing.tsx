import React, { useCallback, useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import { CmsLink, RenderSettings, SelectOption } from 'types'
import Layout from 'components/Layout'
import { usePages } from 'context/pages'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import Link from 'next/link'
import { getModifyUrl } from 'utilities/functions'
import Select from 'components/theme/plain/Select'
import { getLatestYearsForSelect } from 'utilities/latestYears'
import DocumentListAccordion from 'components/theme/plain/custom/DocumentListAccordian'
import BreadcrumbsHelper from 'components/theme/plain/custom/BreadcrumbHelper'
import { useNavigation } from 'context/navigation'
import LinkHelper3 from 'components/theme/plain/custom/LinkHelper3'

export type DocListingItem = {
	title: string
	itemDate: string
	download: string
	filesize: string
	alternativeUrl: CmsLink
	keyDocument: boolean
	doctype: string
}

export type DocListingMonth = {
	index?: number
	name: string
	month: number
	blockItems: DocListingItem[]
}
export type DocListingProp = {
	blockYear: string
	blockItems: DocListingMonth[]
	blockHeading: string
	blockDate: string
}

type OptionType = {
	value: string
	label: string
}

const doctypelist = [] as string[]
const itemsmonthlist = [] as number[]

export function DecodeDoctype(token: string) {
	switch (token) {
		case 'annual-report':
			return 'Annual report'
			break
		case 'results':
			return 'Results'
			break
		case 'presentation':
			return 'Presentations'
			break
		case 'policy':
			return 'Policies'
			break
		case 'notice':
			return 'Notices'
			break
		case 'download':
			return 'Downloads'
			break
		case 'subsidiaries-financial':
			return 'Subsidiaries Financial'
			break
		case 'corporate-governance':
			return 'Corporate Governance'
			break
		case 'shareholding-pattern':
			return 'Shareholding Pattern'
			break
		case 'us-merger':
			return 'Proposed US Merger'
			break
	}
	return ''
}

export const fruits: string[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
export const getMonthsForSelect = (): OptionType[] => {
	const dataForSelect: OptionType[] = []

	for (let i = 0; i < fruits.length; i++) {
		if (itemsmonthlist.includes(i)) {
			const optionObj = {
				value: i.toString(),
				label: fruits[i].toString(),
			}
			dataForSelect.push(optionObj)
		}
	}

	return dataForSelect
}

export const getDoctypesForSelect = (): OptionType[] => {
	const dataForSelect: OptionType[] = []

	for (let i = 0; i < doctypelist.length; i++) {
		const optionObj = {
			value: doctypelist[i].toString(),
			label: DecodeDoctype(doctypelist[i].toString()),
		}
		dataForSelect.push(optionObj)
	}

	return dataForSelect
}
// const dlObject2 = page.referencedMedia.find((m) => m._id === imgid)

export default function PageDocumentsListing() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	// const breadcrumbs = renderByContentType(Block.Breadcrumbs)
	const [{ breadcrumbs }] = useNavigation()
	const [selectedItems, setSelectedItems] = useState<DocListingProp[]>([])
	const [allItems, setAllItems] = useState<DocListingProp[]>([])
	const [month, setMonth] = useState<SelectOption>()
	const [year, setYear] = useState<SelectOption>()
	const [doctype, setDoctype] = useState<SelectOption>()
	const [keydoc, setKeydoc] = useState(false)

	const yearsOptions = getLatestYearsForSelect('decrease', 2015)

	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 656,
		heightDesk: 376,
		pureimage: false,
	}

	const img = { _id: '', url: '', alt: '' }

	itemsmonthlist.splice(0)
	doctypelist.splice(0)

	if (page.pageListingImage) {
		img._id = page.pageListingImage._id
		img.url = page.pageListingImage.url
		img.alt = page.title
	}

	const useDoctypeFilter = f.boolean('useTypeFilter')
	const useKeyDocs = f.boolean('useKeyDocs')
	const getDownloads = f.blocks('financialData').map((fig) => {
		//const downloads = [] as DocListingProp[]
		const fields = fig.fields
		const postFields = {} as DocListingProp
		postFields.blockItems = [] as DocListingMonth[]
		let itemmonths = [] as number[]
		let monthObjs = [] as DocListingMonth[]
		let thismonth = 0
		let newMonthObj = {} as DocListingMonth

		for (let i = 0; i < fields.length; i++) {
			const item = fields[i]
			if (item.alias === 'blockYear') {
				postFields.blockYear = item.text ? item.text : ''
			}
			if (item.alias === 'blockHeading') {
				postFields.blockHeading = item.text ? item.text : ''
			}
			if (item.alias === 'blockDate') {
				postFields.blockDate = item.date ? item.date : ''
				const blockDate = new Date(postFields.blockDate)
				const thamonth = blockDate.getMonth()
			}
			if (item.alias === 'blockItems') {
				itemmonths = [] as number[]
				monthObjs = [] as DocListingMonth[]
				const bla = item.blocks
				bla &&
					bla.map((fig2) => {
						const f2 = fig2.fields

						const postF2 = {} as DocListingItem
						thismonth = 0

						for (let a = 0; a < f2.length; a++) {
							const itm2 = f2[a]
							if (itm2.alias === 'documentType') {
								const dtype = itm2.text ? itm2.text : ''
								postF2.doctype = dtype
								if (!doctypelist.includes(dtype)) {
									doctypelist.push(dtype)
								}
							}
							if (itm2.alias === 'title') {
								postF2.title = itm2.text ? itm2.text : ''
							}
							if (itm2.alias === 'itemDate') {
								postF2.itemDate = itm2.date ? itm2.date : ''
								const itemDate = new Date(postF2.itemDate)
								thismonth = itemDate.getMonth()
								if (!itemsmonthlist.includes(thismonth)) {
									itemsmonthlist.push(thismonth)
								}
							}
							if (itm2.alias === 'filesize') {
								postF2.filesize = itm2.text ? itm2.text : ''
							}
							if (itm2.alias === 'alternativeUrl') {
								if (itm2.link != null) {
									postF2.alternativeUrl = itm2.link
								}
							}
							if (itm2.alias === 'keyDocument') {
								if (itm2.boolean != null && itm2.boolean != undefined) {
									postF2.keyDocument = itm2.boolean
								} else {
									postF2.keyDocument = false
								}
							}
							if (itm2.alias === 'download') {
								if (itm2.mediaList != null && itm2.mediaList.length) {
									const dlid = itm2.mediaList[0]._id
										? itm2.mediaList[0]._id
										: ''
									if (dlid.length > 0) {
										const dlObject2 = page.referencedMedia.find(
											(m) => m._id === dlid,
										)
										if (dlObject2) {
											postF2.download = dlObject2.url
										}
									}
								}
							}
						}

						if (itemmonths.includes(thismonth)) {
							for (let a = 0; a < monthObjs.length; a++) {
								if (monthObjs[a].month === thismonth) {
									monthObjs[a].blockItems.push(postF2)
								}
							}
						} else {
							itemmonths.push(thismonth)
							newMonthObj = {} as DocListingMonth
							newMonthObj.blockItems = [] as DocListingItem[]
							newMonthObj.month = thismonth
							newMonthObj.blockItems.push(postF2)
							newMonthObj.name = fruits[thismonth]
							monthObjs.push(newMonthObj)
						}
						// postFields.blockItems.push(postF2)
					})
			}
			postFields.blockItems = monthObjs
		}
		return postFields
	})

	useEffect(() => {
		const downloads = getDownloads
		setAllItems(downloads)
		setSelectedItems(downloads)
	}, [page])

	const filterResults = useCallback(
		(year, month, doctype) => {
			let iteems = [] as DocListingMonth[]
			const filtered = [] as DocListingProp[]
			allItems.map((itm) => {
				if (
					year === null ||
					year === undefined ||
					new Date(itm.blockDate).getFullYear() === Number(year.value)
				) {
					iteems = [] as DocListingMonth[]
					if (month != null && month != undefined) {
						for (let f = 0; f < itm.blockItems.length; f++) {
							if (
								month === null ||
								month === undefined ||
								itm.blockItems[f].month === Number(month.value)
							) {
								iteems.push(itm.blockItems[f])
							}
						}
						if (iteems.length) {
							const yearry = {} as DocListingProp
							yearry.blockYear = itm.blockYear
							yearry.blockDate = itm.blockDate
							yearry.blockHeading = itm.blockHeading
							yearry.blockItems = iteems
							filtered.push(yearry)
						}
					} else if (
						doctype != null &&
						doctype != undefined &&
						doctype.value.length
					) {
						iteems = [] as DocListingMonth[]
						let xxx = {} as DocListingMonth
						let isFound = false
						for (let f = 0; f < itm.blockItems.length; f++) {
							isFound = false
							xxx = {} as DocListingMonth
							xxx.blockItems = []
							xxx.name = itm.blockItems[f].name
							xxx.month = itm.blockItems[f].month
							for (let z = 0; z < itm.blockItems[f].blockItems.length; z++) {
								if (
									itm.blockItems[f].blockItems[z].doctype.length > 0 &&
									itm.blockItems[f].blockItems[z].doctype === doctype.value
								) {
									xxx.blockItems.push(itm.blockItems[f].blockItems[z])
									isFound = true
								}
							}
							if (isFound) {
								iteems.push(xxx)
							}
						}
						if (iteems.length) {
							const yearry = {} as DocListingProp
							yearry.blockYear = itm.blockYear
							yearry.blockDate = itm.blockDate
							yearry.blockHeading = itm.blockHeading
							yearry.blockItems = iteems
							filtered.push(yearry)
						}
					} else {
						filtered.push(itm)
					}
				}
			})

			setSelectedItems(filtered)
		},
		[allItems],
	)

	useEffect(() => {
		filterResults(year, month, doctype)
	}, [year, month, doctype, filterResults])

	const getFirstGroup = (index, subIndex) => {
		if (index === 1 && subIndex === 1) {
			return true
		}
		return false
	}

	return (
		<Layout>
			{header}

			<div className="doc-listing">
				<section className="presentation-block presentation-block--with-image theme-blue">
					<div className="offset-bg--reset"></div>
					<div className="container  presentation-block__container">
						<div className="breadcrumbs">
							<ul className="breadcrumbs__list bare-list flex flex-wrap">
								<BreadcrumbsHelper
									breadcrumbs={breadcrumbs}
								></BreadcrumbsHelper>
							</ul>
						</div>

						<div className="presentation-block__body">
							{/* <div className="presentation-block__right-col">
                <div className="presentation-block__media">
                  <div className="presentation-block__image img-wrapper">
                    {page.pageListingImage && <ImageBlock image={img} dimensions={dimensions} />}
                  </div>
                </div>
              </div> */}
							<div className="presentation-block__left-col">
								<div className="h2">{page.title}</div>
								<div className="h4 font-light rich-text-editor">
									<p>&nbsp;</p>
								</div>
								<div className="block-stories__filters">
									<div className="block-stories__form-field form-field">
										<Select
											name="year"
											placeholder="By year"
											options={yearsOptions}
											value={year}
											onChange={(opt) => setYear(opt)}
											isClearable={true}
										/>
									</div>
									<div className="block-stories__form-field form-field">
										{!useDoctypeFilter && (
											<Select
												name="month"
												placeholder="By Month"
												options={getMonthsForSelect()}
												value={month}
												onChange={(opt) => setMonth(opt)}
												isClearable={true}
											/>
										)}
										{useDoctypeFilter && (
											<Select
												name="doctype"
												placeholder="By Type"
												options={getDoctypesForSelect()}
												value={doctype}
												onChange={(opt) => setDoctype(opt)}
												isClearable={true}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="flex-col-md-12 flex-row key-doc-wrapper">
					{useKeyDocs && (
						<>
							Only include key documents{' '}
							<label className="switch-wrap">
								<input
									type="checkbox"
									checked={keydoc}
									onChange={(e) => setKeydoc(e.target.checked)}
								/>
								<div className="switch"></div>
							</label>
						</>
					)}
				</section>
				<section className="content-block p--l m--0 theme-white">
					<div className="offset-bg--reset"></div>
					<div className="block-banner">
						{selectedItems.map((item, index) => {
							if (item.blockItems.length) {
								return (
									<div
										key={index}
										className="flex-col-md-12 flex-row annual-report-block"
									>
										<div className="flex-col-md-3 text-body">
											<h3 className="year-title">{item.blockYear}</h3>
										</div>
										<div className="flex-col-md-7 text-body">
											{item.blockItems && item.blockItems.length !== 0 && (
												<>
													{!keydoc &&
														item.blockItems.map((groupItem, subIndex) => (
															<>
																{groupItem.blockItems.length !== 0 ? (
																	<DocumentListAccordion
																		index={
																			getFirstGroup(index + 1, subIndex + 1)
																				? 1
																				: 0
																		}
																		key={groupItem.name}
																		{...groupItem}
																	/>
																) : null}
															</>
														))}
													{keydoc && (
														<div className="annual-results">
															<div className={`ar-item active`}>
																<h4 className="h4-title">Key documents</h4>
															</div>
															<div className="ar-content">
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
																		{item.blockItems.map(
																			(groupItem, subIndex) => (
																				<>
																					{groupItem.blockItems.length !== 0
																						? groupItem.blockItems.map(
																								(row, subsubindex) =>
																									row.keyDocument && (
																										<tr key={subsubindex}>
																											<td className="results-table-sub-heading">
																												<span className="date-item">
																													{getBaseDateFormat(
																														row.itemDate,
																													)}
																												</span>
																												{row.title}
																											</td>

																											<td
																												className={`centered`}
																											>
																												&nbsp; <br />
																												<ul className="results__list-links bare-list flex flex-align-center">
																													{row.alternativeUrl && (
																														<li>
																															<LinkHelper3
																																link={
																																	row.alternativeUrl
																																}
																																linkClass={
																																	'cta-view-online'
																																}
																																showicon={false}
																																linkText={
																																	'View online'
																																}
																															></LinkHelper3>
																														</li>
																													)}
																												</ul>
																											</td>
																											<td
																												className={`${
																													!row.download
																														? ' mobile-hidden'
																														: ''
																												}`}
																											>
																												&nbsp; <br />
																												{row.download && (
																													<Link
																														href={getModifyUrl(
																															row.download,
																														)}
																														className="cta-download"
																														target="_blank"
																														download
																													>
																														<span className="text-uppercase">
																															{
																																row.download.split(
																																	'.',
																																)[1]
																															}{' '}
																														</span>
																														<span>
																															{' '}
																															({row.filesize})
																														</span>
																													</Link>
																												)}
																											</td>
																										</tr>
																									),
																						  )
																						: null}
																				</>
																			),
																		)}
																	</tbody>
																</table>
															</div>
														</div>
													)}
												</>
											)}
										</div>
									</div>
								)
							}
						})}
					</div>
				</section>
			</div>
		</Layout>
	)
}
