import React, { useEffect, useState } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import {
	type PartialPage,
	type RenderSettings,
	type SelectOption,
	type MiniPage,
	type PageFeatureLandingProps,
} from 'types'
import { HeadingLevel } from 'enums'
import Layout from 'components/Layout'
import SearchInput from 'components/theme/plain/SearchInput'
import Heading from 'components/theme/plain/Heading'
import Select from 'components/theme/plain/Select'
import DCard from 'components/theme/Diageo/cards/DCard'
import Button from 'components/theme/plain/Button'
import { fetchSearchResultsDocType } from 'lib/cms/api'
import { usePages } from 'context/pages'
import { PaginationProvider } from 'components/theme/Diageo/DContentWithFilters/pagination-provider'
import Results from 'components/theme/Diageo/DContentWithFilters/Results'
import { useNavigation } from 'context/navigation'
import BreadcrumbsHelper from 'components/theme/plain/custom/BreadcrumbHelper'
import { getLatestYearsForSelect } from '../../utilities/latestYears'
import DContainer from '../theme/Diageo/DContainer'

export default function PageFeatureLanding() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))
	const [selectedItems, setSelectedItems] = useState<PartialPage[]>([])
	const [topicslist, setTopicslist] = useState([] as SelectOption[])
	const [drinkslist, setDrinkslist] = useState([] as SelectOption[])
	const [regionslist, setRegionslist] = useState([] as SelectOption[])
	const [allItems, setAllItems] = useState<PartialPage[]>([])
	const [topic, setTopic] = useState<SelectOption>()
	const [drinkCategory, setDrinkCategory] = useState<SelectOption>()
	const [region, setRegion] = useState<SelectOption>()
	const [date, setDate] = useState<SelectOption>()
	const yearsOptions = getLatestYearsForSelect('decrease')
	const [{ breadcrumbs }] = useNavigation()

	const [{ page }] = usePages()

	useEffect(() => {
		if (!page?.miscdata) {
			return
		}

		const pageData = page.miscdata as PageFeatureLandingProps
		const { regions, topics, allPressReleases, drinkCategories } = pageData
		setRegionslist(regions)
		setTopicslist(topics)
		setDrinkslist(drinkCategories)
		setAllItems(allPressReleases)
		setSelectedItems(allPressReleases)
	}, [page])

	const shouldOmitRegionTab = f.boolean('omitRegionTab')
	const loadingMessage = 'Loading...'
	const notFoundPostsMessage = 'Stories not a found'

	const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false)
	const [message, setMessage] = useState<string>('')
	const [pagelist, setPagelist] = useState([] as PartialPage[] | MiniPage[])

	const filterResults = () => {
		if (!region && !drinkCategory && !topic && !date) {
			setSelectedItems(allItems)
			return
		}

		let output = allItems
		if (topic) {
			output = output.filter(
				(i) => i.categoryPages?.some((cp) => cp._id === topic.value),
			)
		}

		if (drinkCategory) {
			output = output.filter(
				(i) => i.categoryPages?.some((cp) => cp._id === drinkCategory.value),
			)
		}

		if (region) {
			output = output.filter(
				(i) => i.categoryPages?.some((cp) => cp._id === region.value),
			)
		}

		if (date) {
			output = output.filter(
				(fr) => new Date(fr.articleDate).getFullYear() === Number(date.value),
			)
		}

		setSelectedItems(output)
	}

	useEffect(() => {
		filterResults()
	}, [region, drinkCategory, topic, date])

	function handleSearchInput(value: string) {
		setMessage(loadingMessage)
		setIsLoadingPosts(true)
		fetchSearchResultsDocType('featurePage', value, 100)
			.then((ressy) => {
				if (ressy?.length) {
					setMessage('')
					setSelectedItems(ressy as PartialPage[])
				} else {
					setMessage(notFoundPostsMessage)
				}
			})
			.finally(() => {
				setIsLoadingPosts(false)
			})
	}

	return (
		<Layout>
			{header}
			<div className="block-banner">
				<div className="breadcrumbs">
					<ul className="breadcrumbs__list bare-list flex flex-wrap">
						<BreadcrumbsHelper breadcrumbs={breadcrumbs} />
					</ul>
				</div>
			</div>
			<section className="block-stories">
				<DContainer>
					<div
						className={`block-stories__form ${isLoadingPosts ? 'loading' : ''}`}
					>
						<div className="block-stories__search">
							<SearchInput
								reversed
								name="search"
								size="large"
								placeholder="Search all stories"
								buttonType="submit"
								label="I’m interested in..."
								buttonOnClick={(value: string) => {
									handleSearchInput(value)
								}}
							/>
						</div>
						<div className="block-stories__filters">
							<div className="block-stories__form-field form-field">
								<Select
									isClearable
									name="topic"
									placeholder="By topic"
									options={topicslist}
									value={topic}
									onChange={(opt) => {
										setTopic(opt)
									}}
								/>
							</div>
							<div className="block-stories__form-field form-field">
								<Select
									isClearable
									name="drinkCategory"
									placeholder="By drink category"
									options={drinkslist}
									value={drinkCategory}
									onChange={(opt) => {
										setDrinkCategory(opt)
									}}
								/>
							</div>
							{shouldOmitRegionTab && (
								<input type="hidden" name="region" value="" />
							)}
							{!shouldOmitRegionTab && (
								<div className="block-stories__form-field form-field">
									<Select
										isClearable
										name="region"
										placeholder="By region"
										options={regionslist}
										value={region}
										onChange={(opt) => {
											setRegion(opt)
										}}
									/>
								</div>
							)}
							<div className="block-stories__form-field form-field">
								<Select
									isClearable
									name="date"
									placeholder="By year"
									options={yearsOptions}
									value={date}
									onChange={(opt) => {
										setDate(opt)
									}}
								/>
							</div>
						</div>
					</div>
					{!isLoadingPosts && selectedItems.length > 0 ? (
						<PaginationProvider isGrid data={selectedItems} pageSize={9}>
							<div className="block-stories__list-stories">
								<Results
									isGrid
									renderItem={(card: PartialPage) => (
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
											/>
										</div>
									)}
								/>
							</div>
						</PaginationProvider>
					) : (
						<div className="block-stories__not-found-message">
							<Heading
								heading={message}
								headingLevel={HeadingLevel.H4}
								className="text-align--center"
							/>
						</div>
					)}
					{!isLoadingPosts &&
					selectedItems.length !== pagelist.length &&
					pagelist.length > 0 ? (
						<div className="block-stories__load-more-wrapper text-align--center">
							<Button className="block-stories__load-more" text="Load more" />
						</div>
					) : null}
				</DContainer>
			</section>
			{body}
		</Layout>
	)
}
