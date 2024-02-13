import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import { MiniPage, RenderSettings } from 'types'
import { HeadingLevel } from 'enums'
import Layout from 'components/Layout'

import SearchInput from 'components/theme/plain/SearchInput'
import { fetchSearchResultsDocType } from 'lib/cms/api'
import DCard from 'components/theme/Diageo/cards/DCard'
import { useRouter } from 'next/router'
import { GetFriendlyDocTypeName } from 'lib/utils'
import { useNavigation } from 'context/navigation'
import BreadcrumbsHelper from 'components/theme/plain/custom/BreadcrumbHelper'
import { PaginationProvider } from 'components/theme/Diageo/DContentWithFilters/pagination-provider'
import SearchResults from 'components/theme/Diageo/DSearchResults'

export default function PageSearch() {
	const {
		query: { q },
	} = useRouter()
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	//const body = renderBlocks(f.blocks('body'))
	const [{ breadcrumbs }] = useNavigation()
	const [searchTerm, setSearchTerm] = useState((q || '') as string)
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<MiniPage[]>([])

	const contentType = '' // Because we want all types

	// function getQueryFromUrl() {
	//   const urlParams = new URLSearchParams(window.location.search)
	//   return urlParams.get('q')
	// }

	useEffect(() => {
		// alert(searchTerm)
		fetchSearchResultsDocType(contentType, searchTerm, 200).then((ressy) => {
			setResults(ressy as MiniPage[])
		})
	}, [searchTerm])

	function onBtnClick() {
		if (query.length) {
			setSearchTerm(query)
		} else {
			setResults([])
		}
	}

	return (
		<Layout>
			{header}
			{/* <SearchForm />
      <SearchBox /> */}

			<section className="theme-white">
				<div className="block-banner">
					<div className="searchblock--fullbleed">
						<div className="searchblock--fullbleed--breadcrumb">
							<div className="breadcrumbs">
								<ul className="breadcrumbs__list bare-list flex flex-wrap">
									<BreadcrumbsHelper
										breadcrumbs={breadcrumbs}
									></BreadcrumbsHelper>
								</ul>
							</div>
							<SearchInput
								size="large"
								name="search"
								placeholder="Search by keyword or region"
								label="I'm trying to find..."
								buttonOnClick={onBtnClick}
								onChange={({ value }) => {
									setQuery(value ? value : '')
								}}
								defaultValue={searchTerm}
							/>
						</div>
					</div>
					<div className="pageblock--fullbleed">
						<div className=" careers-container theme-purple">
							<div>
								{/* <div className="career-results-grid"> */}
								<div className="filters">
									<div className="filter-content">
										{/* Filters Here:
                    <br />
                    Year, Topic, Document type */}
									</div>
								</div>
								<div
									className="vacancies"
									style={{ width: '80%', margin: '0 auto' }}
								>
									{results && results.length > 0 && (
										<h6 style={{ textIndent: '25px' }}>
											{results.length} results found
										</h6>
									)}
									{results && results.length == 0 && (
										<h6 style={{ textIndent: '25px' }}>
											There are currently no results available that match this
											criteria. Please try another keyword.{' '}
										</h6>
									)}
									<div>
										{results && results.length > 0 && (
											<PaginationProvider data={results} align="center">
												<SearchResults
													renderItem={(card, i) => (
														<DCard
															key={i}
															_id={card._id}
															image={{
																_id: card._id,
																url: card.pageListingImage?.url
																	? card.pageListingImage?.url
																	: '',
																alt: card?.metaDescription,
																// dimensions: dimensions,
															}}
															linkUrl={card.url}
															title={card.title}
															headingLevel={HeadingLevel.H4}
															date={card?.articleDate}
															className="card card-news-listing theme-amber"
															typeCard={GetFriendlyDocTypeName(
																card.contentType,
															)}
														/>
													)}
												/>
											</PaginationProvider>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}
