import React, { useCallback, useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import {
	PageVideoLandingProps,
	PartialPage,
	RenderSettings,
	SelectOption,
} from 'types'
import { HeadingLevel } from 'enums'
import Layout from 'components/Layout'
import { usePages } from 'context/pages'
import { PaginationProvider } from 'components/theme/Diageo/DContentWithFilters/pagination-provider'
import Results from 'components/theme/Diageo/DContentWithFilters/Results'
import DCard from 'components/theme/Diageo/cards/DCard'
import Select from 'components/theme/plain/Select'
import { getLatestYearsForSelect } from 'utilities/latestYears'

export default function PageVideoLanding() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const yearsOptions = getLatestYearsForSelect('decrease')
	const [selectedItems, setSelectedItems] = useState<PartialPage[]>([])
	const [allItems, setAllItems] = useState<PartialPage[]>([])

	useEffect(() => {
		if (!page || !page.miscdata) {
			return
		}
		const pageData = page.miscdata as PageVideoLandingProps
		const { videoPages } = pageData
		setAllItems(videoPages)
		setSelectedItems(videoPages)
	}, [page])

	const dims = {
		styleDesk: '',
		widthDesk: 500,
		heightDesk: 282,
		pureimage: true,
	}
	const [date, setDate] = useState<SelectOption>()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const filterResults = useCallback(
		(date) => {
			let output = allItems
			if (date) {
				output = output.filter(
					(fr) => new Date(fr.articleDate).getFullYear() === Number(date.value),
				)
			}
			setSelectedItems(output)
		},
		[allItems],
	)

	useEffect(() => {
		filterResults(date)
	}, [date, filterResults])

	return (
		<Layout>
			{header}
			<div className="block-stories">
				<div className="container">
					<div className="block-stories__filters short-filter">
						<div className="block-stories__form-field form-field">
							<Select
								name="date"
								placeholder="By year"
								options={yearsOptions}
								value={date}
								onChange={(opt) => setDate(opt)}
								isClearable={true}
							/>
						</div>
					</div>
					{/* <div className="block-stories__list-stories"> */}
					<PaginationProvider data={selectedItems} isGrid pageSize={9}>
						<div className="block-stories__list-stories">
							<Results
								isGrid
								renderItem={(card) => (
									<div
										key={card._id}
										className="block-stories__list-stories-col"
									>
										<DCard
											_id={card._id}
											image={{
												_id: card._id,
												url: card?.pageListingImage?.url,
												alt: card?.metaDescription,
											}}
											linkUrl={card.url}
											title={card.title}
											headingLevel={HeadingLevel.H4}
											date={card?.articleDate}
											tags={card.categoryPages}
											className="card-latest-story"
											typeCard="Story"
											dimensions={dims}
										/>
									</div>
								)}
							/>
						</div>
					</PaginationProvider>
					{/* </div> */}
				</div>
			</div>
			{body}
		</Layout>
	)
}
