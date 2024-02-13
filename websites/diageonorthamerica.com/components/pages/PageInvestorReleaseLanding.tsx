/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks, renderByContentType } from 'components'
import { MiniPage, PartialPage, RenderSettings, UrlsGqlResponse } from 'types'
import { Block, HeadingLevel } from 'enums'
import Layout from 'components/Layout'
import DCard from '../theme/Diageo/cards/DCard'

import ContentWithFilters from 'components/theme/Diageo/DContentWithFilters'
import {
	fetchPressReleasesFeatures,
	fetchSearchResultsDocType,
} from 'lib/cms/api'
import { usePressReleaseFilters } from 'hooks'

export default function PageInvestorReleaseLanding() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const breadcrumbs = renderByContentType(Block.Breadcrumbs)
	//const [{ pages }] = usePages()
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 320,
		heightDesk: 180,
		pureimage: true,
	}

	const InvestorNews = true

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
			//fetchPageDataByDocType('pressReleasePage', firstFetch ? 10 : 999, true).then((res: UrlsGqlResponse) => {
			setPagelist(res.contents)
			if (firstFetch) {
				setFirstFetch(false)
			}
		})
	}
	const handleSearchTermChange = async (query: string) => {
		if (query) {
			const results =
				(await fetchSearchResultsDocType('pressReleasePage', query, 1000)) || []
			setPagelist(results)
			return results
		}
	}
	useEffect(fetchItems, [])
	useEffect(fetchItems, [firstFetch])

	const { filters } = usePressReleaseFilters({ isInvesterNews: InvestorNews })
	return (
		<Layout>
			{header}
			<section className="theme-white">
				<div className="block-banner">
					<ContentWithFilters
						onSearchTermChange={handleSearchTermChange}
						fullbleedContainerOnly
						breadcrumbEl={breadcrumbs}
						data={pagelist}
						filters={filters}
						searchType="CONTENT"
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
				</div>
			</section>
			{body}
		</Layout>
	)
}
