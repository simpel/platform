/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks, renderByContentType } from 'components'
import { MiniPage, RenderSettings, UrlsGqlResponse } from 'types'
import { Block, HeadingLevel } from 'enums'
import Layout from 'components/Layout'
import DCard from '../theme/Diageo/cards/DCard'

import ContentWithFilters from 'components/theme/Diageo/DContentWithFilters'
import {
	fetchPressReleasesFeatures,
	fetchSearchResultsDocType,
} from 'lib/cms/api'
import { usePressReleaseFilters } from 'hooks'

export default function PagePressReleaseLanding() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const breadcrumbs = renderByContentType(Block.Breadcrumbs)
	//const [{ pages }] = usePages()
	// const dimensions = { styleDesk: 'fit-to-object', widthDesk: 320, heightDesk: 180, pureimage: true }

	const InvestorNews = f.boolean('investorNews')

	const cats = [] as string[]

	const [pagelist, setPagelist] = useState([] as MiniPage[])
	const [firstFetch, setFirstFetch] = useState(true)

	const fetchItems = () => {
		fetchPressReleasesFeatures(
			false,
			firstFetch ? 10 : 999,
			InvestorNews,
			false,
			0,
			cats,
			false,
		).then((res: UrlsGqlResponse) => {
			setPagelist(res.contents)
			if (firstFetch) {
				setFirstFetch(false)
			}
		})
	}
	useEffect(fetchItems, [InvestorNews])
	useEffect(fetchItems, [firstFetch])
	const handleSearchTermChange = async (query: string) => {
		if (query) {
			const results =
				(await fetchSearchResultsDocType('pressReleasePage', query, 1000)) || []
			setPagelist(results)
			return results
		}
	}
	const { filters } = usePressReleaseFilters({ isInvesterNews: InvestorNews })
	return (
		<Layout key={InvestorNews ? 'InvestorNews' : 'pressReleasePage'}>
			{header}
			<section className="theme-white">
				<div className="block-banner">
					<ContentWithFilters
						onSearchTermChange={handleSearchTermChange}
						fullbleedContainerOnly
						breadcrumbEl={breadcrumbs}
						data={pagelist}
						customErrorMessage="No results found that match this criteria"
						searchType="CONTENT"
						filters={filters}
						renderContentItem={(card: any) => (
							<DCard
								key={card._id}
								_id={card._id}
								image={{
									_id: card._id,
									url: card?.pageListingImage?.url,
									alt: card?.metaDescription,
									// dimensions: dimensions,
								}}
								linkUrl={card.url}
								title={card.title}
								headingLevel={HeadingLevel.H4}
								date={card?.articleDate}
								tags={card.categoryPages}
								className="card-news-listing theme-amber"
								typeCard="Press Release"
							/>
						)}
					/>

					{/* <div className="left-panel-filters">
              <div className="filter-category">
                <h5 className="h6 filter-category-by">Filter by: </h5>

                <button className="accordion">Select year</button>
                <div className="panel">
                  <ul className="filter-options">
                    {yearsOptions.map((year, index) => (
                      <li key={index}>
                        <a href="#">{year.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="accordion">Select month</button>
                <div className="panel">
                  <ul className="filter-options">
                    <li>
                      <a href="#">January (458)</a>
                    </li>
                    <li>
                      <a href="#">Febuary (458)</a>
                    </li>
                    <li>
                      <a href="#">March (458)</a>
                    </li>
                    <li>
                      <a href="#">April (458)</a>
                    </li>
                    <li>
                      <a href="#">May (458)</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="filter-category">
                <h5 className="h6 filter-category-by">Browse by: </h5>

                <button className="accordion">Country</button>
                <div className="panel">
                  <ul className="filter-options">
                    <li>
                      <a href="#">UK (458)</a>
                    </li>
                    <li>
                      <a href="#">Germany (458)</a>
                    </li>
                    <li>
                      <a href="#">Austrailia (458)</a>
                    </li>
                    <li>
                      <a href="#">Thailand (458)</a>
                    </li>
                    <li>
                      <a href="#">USA (458)</a>
                    </li>
                  </ul>
                </div>

                <button className="accordion">Topic</button>
                <div className="panel">
                  <ul className="filter-options">
                    <li>
                      <a href="#">Society 2030 (458)</a>
                    </li>
                    <li>
                      <a href="#">Brands (458)</a>
                    </li>
                    <li>
                      <a href="#">Investor (458)</a>
                    </li>
                    <li>
                      <a href="#">Corporate (458)</a>
                    </li>
                    <li>
                      <a href="#">Events (458)</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pageblock--textarea">
              <div className="results-listing bare-list">
                {pagelist.map((card) => {
                  return (
                    <DCard
                      key={card._id}
                      _id={card._id}
                      image={{
                        _id: card._id,
                        url: card?.pageListingImage?.url,
                        alt: card?.metaDescription,
                        dimensions: dimensions,
                      }}
                      linkUrl={card.url}
                      title={card.title}
                      headingLevel={HeadingLevel.H4}
                      date={card?.articleDate}
                      tags={card.categoryPages}
                      className="card-news-listing theme-amber"
                      typeCard="Press Release"
                    />
                  )
                })}
              </div>
            </div> */}
				</div>
			</section>
			{body}
		</Layout>
	)
}
