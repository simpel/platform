import React, { useState, useEffect, useCallback } from 'react'

import { useFields } from 'context/fields'
import { renderBlocks, renderByContentType } from 'components'
import { GalleryItem, RenderSettings } from 'types'
import { Block } from 'enums'
import Layout from 'components/Layout'
import { usePages } from 'context/pages'
import Filters from 'components/theme/Diageo/DContentWithFilters/Filters'
import {
	FilterGroup,
	withFullBleedContainer,
} from 'components/theme/Diageo/DContentWithFilters'
import {
	prepareUrlParams,
	readUrlParams,
} from 'components/theme/Diageo/DContentWithFilters/utils'
import { useRouter } from 'next/router'
import SelectedFilterBadges from 'components/theme/Diageo/DContentWithFilters/SelectedFilterBadges'
import { PaginationProvider } from 'components/theme/Diageo/DContentWithFilters/pagination-provider'
import Results from 'components/theme/Diageo/DContentWithFilters/Results'
// import Image from 'components/theme/plain/Image'
import Image from 'next/image'
import cn from 'classnames'
import { Icons as EnumsIcon } from 'enumsIcon'
import IcoMoonIcon from 'components/theme/plain/IcoMoonIcon'
import LinkHelper3 from '../../components/theme/plain/custom/LinkHelper3'
import SearchInput from 'components/theme/plain/SearchInput'
import debounce from 'lodash/debounce'

interface ItemProps {
	row: GalleryItem
}
export default function PageMediaGallery() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
	const [initialData, setInitialData] = useState<GalleryItem[]>([])
	const galleryIntro = f.html('galleryIntro')
	const mediaTabTitle = f.text('mediaTabTitle')
	const zipFileTabTitle = f.text('zipFileTabTitle')

	useEffect(() => {
		if (!page || !page.miscdata) {
			return
		}
		const pageData = page.miscdata as any
		setInitialData(pageData.galleryItems)
		setFilteredGalleryItems(pageData.galleryItems)
		setGalleryItems(pageData.galleryItems)
		setFilters([...pageData.filters])
	}, [page])

	useEffect(() => {
		if (searchTerm) {
			handleSearchTermChange(searchTerm)
		}
	}, [initialData])

	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const [selectedContentType, setSelectedContentType] = useState<
		'all' | 'images' | 'zip'
	>('all')
	const breadcrumbs = renderByContentType(Block.Breadcrumbs)
	const [filters, setFilters] = useState<FilterGroup[]>([])
	const router = useRouter()

	useEffect(() => {
		if (!router || !router.query) {
			return
		}
		const params = readUrlParams()

		let filteredOutData = [...initialData]
		filters.map((filter) => {
			if (filter.name === 'category') {
				const selected = params.category
				if (selected && selected.filter((f) => !!f).length > 0) {
					filteredOutData = filteredOutData.filter((d) => {
						const topics = d.topics.map((t) => t.text)
						return selected.every((s) => topics.includes(s))
					})
				}
			}
			// if (filter.name === 'year') {
			//   const selected = params.year
			//   if (selected && selected.filter((f) => !!f).length > 0) {
			//     filteredOutData = Array.prototype.concat.apply(
			//       [],
			//       selected.map((s) => filteredOutData.filter((d) => d.pubYear === Number(s) || d.pubYear === Number(s))),
			//     )
			//   }
			// } else if (filter.name === 'brands') {
			//   const selected = params.brand
			//   if (selected && selected.filter((f) => !!f).length > 0) {
			//     filteredOutData = Array.prototype.concat.apply(
			//       [],
			//       selected.map((s) => filteredOutData.filter((d) => d.brands.some((t) => t.text === s))),
			//     )
			//   }
			// } else if (filter.name === 'category') {
			//   const selected = params.category
			//   if (selected && selected.filter((f) => !!f).length > 0) {
			//     filteredOutData = Array.prototype.concat.apply(
			//       [],
			//       selected.map((s) => filteredOutData.filter((d) => d.topics.some((t) => t.text === s))),
			//     )
			//   }
			// }
		})
		filteredOutData = filteredOutData.filter(
			(v, i, a) => a.findIndex((t) => t._id === v._id) === i,
		)
		setFilteredGalleryItems(filteredOutData)
		// const newFilters = createMediaGalleryFilter(filteredOutData)
		// setFilters(setSelectedCategoriesBasedOnUrlParams(newFilters))
	}, [router.query, initialData])

	const onFilterChange = (groupIndex, optionIndex, selectedFilter) => {
		const urlParams = {}
		const updatedFilters = [...filters]
		const currentFilter = updatedFilters[groupIndex].options[optionIndex]
		currentFilter.isSelected = !selectedFilter.isSelected
		setFilters(updatedFilters)
		setSearchTerm('')

		filters.map((filter) => {
			if (filter.name === 'year') {
				const selectedOptions = filter.options
					.filter((o) => o.isSelected)
					.map((s) => s.value)
				if (selectedOptions) {
					urlParams['year'] = selectedOptions
				}
			} else if (filter.name === 'brands') {
				const selectedOptions = filter.options
					.filter((o) => o.isSelected)
					.map((s) => s.value)
				if (selectedOptions) {
					urlParams['brand'] = selectedOptions
				}
			} else if (filter.name === 'category') {
				const selectedOptions = filter.options
					.filter((o) => o.isSelected)
					.map((s) => s.value)
				if (selectedOptions) {
					urlParams['category'] = selectedOptions
				}
			}
		})
		const path = prepareUrlParams(urlParams)
		const { asPath } = router
		const querylessPath =
			asPath && asPath.includes('?') ? asPath.split('?')[0] : asPath
		router.replace(`${querylessPath}?${path}`, undefined, { shallow: true })
	}

	const onClearAllFilters = () => {
		const { asPath } = router
		const querylessPath =
			asPath && asPath.includes('?') ? asPath.split('?')[0] : asPath
		setFilteredGalleryItems(initialData)
		setFilters(
			filters.map((filter) => ({
				...filter,
				options: filter.options.map((o) => ({ ...o, isSelected: false })),
			})),
		)
		router.replace(`${querylessPath}`, undefined, { shallow: true })
	}
	const onFilterExpandChange = (groupIndex) => {
		const updatedFilters = [...filters]
		const currentGroup = updatedFilters[groupIndex]
		currentGroup.isExpanded = !currentGroup.isExpanded
		setFilters(updatedFilters)
	}

	const setSelectedCategoriesBasedOnUrlParams = (filters: FilterGroup[]) => {
		const params = readUrlParams()
		const newFilters = filters.map((f) => ({
			...f,
			options: f.options.map((o) => ({
				...o,
				isSelected: params[f.dataKey] && params[f.dataKey].includes(o.value),
			})),
		}))
		return newFilters
	}
	const withFullBleed = (BaseComponent, fullbleedContainerOnly = false) => {
		if (!fullbleedContainerOnly) {
			return BaseComponent
		}
		return <div className="pageblock--fullbleed">{BaseComponent}</div>
	}

	const noItemsFoundMessage =
		'There are currently no galleries available that match this criteria. Please try another search criteria.'

	const handleContentTypeChange = (type) => {
		onClearAllFilters()
		if (selectedContentType === 'all') {
			setSelectedContentType(type)
		} else if (selectedContentType === type) {
			setSelectedContentType('all')
		} else {
			setSelectedContentType(type)
		}
	}

	useEffect(() => {
		const items = galleryItems.filter((item) => {
			if (selectedContentType === 'all') {
				return true
			}
			return selectedContentType === 'zip'
				? !!item.downloadZip
				: !item.downloadZip
		})
		setFilteredGalleryItems(items)
	}, [selectedContentType])

	const [filteredGalleryItems, setFilteredGalleryItems] = useState(galleryItems)
	const [searchedGalleryItems, setSearchedGalleryItems] = useState(initialData)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		const rootArray = searchTerm ? searchedGalleryItems : filteredGalleryItems
		const dataFilteredByContentType = rootArray.filter((item) => {
			if (selectedContentType === 'all') {
				return true
			}
			return selectedContentType === 'zip'
				? !!item.downloadZip
				: !item.downloadZip
		})
		setFilteredGalleryItemsByContentType(dataFilteredByContentType)
	}, [
		filteredGalleryItems,
		searchTerm,
		searchedGalleryItems,
		selectedContentType,
	])

	const [
		filteredGalleryItemsByContentType,
		setFilteredGalleryItemsByContentType,
	] = useState(filteredGalleryItems)

	const executeDebouncedAutoComplete = useCallback(
		debounce(async function (query) {
			if (!query) {
				setSearchedGalleryItems(initialData)
				return
			} else {
				const updatedFilters = [...filters]
				updatedFilters.map((filter) => {
					filter.options.map((option) => {
						option.isSelected = false
					})
				})
				setFilters(updatedFilters)
				const results = initialData.filter(
					(item) =>
						item.description?.toLowerCase().includes(query.toLowerCase()) ||
						item.brands?.some((brand) =>
							brand.text.toLowerCase().includes(query.toLowerCase()),
						) ||
						item.longTitle?.toLowerCase().includes(query.toLowerCase()) ||
						item.pubDate?.toLowerCase().includes(query.toLowerCase()) ||
						item.pubYear?.toString().includes(query.toLowerCase()) ||
						item.shortTitle?.toLowerCase().includes(query.toLowerCase()) ||
						item.topics?.some((topic) =>
							topic.text.toLowerCase().includes(query.toLowerCase()),
						),
				)
				setSearchedGalleryItems(results)
			}
			setSearchTerm(query || '')
		}, 500),
		[initialData, filters],
	)
	const handleSearchTermChange = async (query?: string) => {
		executeDebouncedAutoComplete(query)
	}

	const emptyMessageToShow = searchTerm
		? 'No results found'
		: noItemsFoundMessage

	return (
		<Layout>
			{header}
			{breadcrumbs}
			<section className="content-block p--l theme-white">
				<span className="offset-bg--reset" />
				<div className="block-banner">
					<div className="pageblock--fullbleed">
						{withFullBleedContainer(
							<SearchInput
								size="large"
								name="search"
								placeholder="Search by keyword"
								label="I'm interested in..."
								buttonOnClick={setSearchTerm}
								onChange={({ value }) => {
									handleSearchTermChange(value)
								}}
								defaultValue={searchTerm}
							/>,
							false,
							{},
						)}
						{withFullBleed(
							<div className="media-gallery theme-purple">
								<div>
									{galleryIntro && (
										<div
											className="media-gallery__main-copy"
											dangerouslySetInnerHTML={{ __html: galleryIntro }}
										></div>
									)}

									<div className="media-gallery__results-grid">
										<div className="media-gallery__filter">
											<Filters
												filters={filters}
												onChange={onFilterChange}
												onExpandChange={onFilterExpandChange}
												onClearAllFilters={onClearAllFilters}
											/>
										</div>
										<div>
											<SelectedFilterBadges
												filters={filters}
												onChange={onFilterChange}
											/>
											<div className="media-gallery__content-type-selector">
												<div className="media-gallery__content-type-selector__text">
													Content type:
												</div>
												<div>
													<div
														className={cn({
															'media-gallery__content-type-selector__option':
																true,
															'media-gallery__content-type-selector__option--selected':
																selectedContentType === 'images',
														})}
														onClick={() => handleContentTypeChange('images')}
													>
														{mediaTabTitle}
													</div>
												</div>
												<div>
													<div
														className={cn({
															'media-gallery__content-type-selector__option':
																true,
															'media-gallery__content-type-selector__option--selected':
																selectedContentType === 'zip',
														})}
														onClick={() => handleContentTypeChange('zip')}
													>
														{zipFileTabTitle}
													</div>
												</div>
											</div>

											{(!filteredGalleryItemsByContentType ||
												filteredGalleryItemsByContentType.length === 0) && (
												<div>{emptyMessageToShow}</div>
											)}
											<div>
												<PaginationProvider
													pageSize={15}
													align="center"
													data={filteredGalleryItemsByContentType}
												>
													<div className="media-listing">
														<Results
															renderItem={(row: GalleryItem) => (
																<Item row={row} key={row.description} />
															)}
															isGrid
														/>
													</div>
												</PaginationProvider>
											</div>
										</div>
									</div>
								</div>
							</div>,
						)}
					</div>
				</div>
			</section>
		</Layout>
	)
}

const Item = ({ row }: ItemProps) => {
	const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

	const getFileExtension = (filename: GalleryItem) => {
		const isZip = !!filename.downloadZip
		const file = isZip ? filename.downloadZip : filename.displayImage.url
		const index = file.lastIndexOf('.')
		const ext = file.substring(index + 1).toUpperCase()
		return ext
	}
	const handleWrapperClick = (e) => {
		e.stopPropagation()
	}

	const handleModalClick = (e) => {
		setSelectedItem(null)
	}

	const handleCloseClick = (e) => {
		setSelectedItem(null)
	}

	return (
		<>
			<div className="media-listing__col" onClick={() => setSelectedItem(row)}>
				<div className="media-card">
					<div className="media-card__imageContainer">
						{/* <Image
              image={row.displayImage}
              dimensions={{ styleDesk: 'media-gallery-image', widthDesk: 0, heightDesk: 0, pureimage: true }}
              isLegacy={true}
            /> */}
						<Image
							src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${row.displayImage.url}`}
							alt={row.displayImage.alt}
							quality={60}
							fill
							style={{
								objectFit: 'contain',
							}}
						/>
					</div>
					<div className="media-card__description">
						<div className="media-card__title">{row.shortTitle}</div>
						<div className="media-card__subtitle">{row.description}</div>
						{/* <div className="media-card__metadata">
              {row.downloadZip ? 'ZIP' : 'Image'} - {row.humanReadableSize}
            </div> */}
					</div>
				</div>
			</div>
			{selectedItem && (
				<div
					className="media-gallery__modal"
					onClick={(e) => handleModalClick(e)}
				>
					<div
						className="media-gallery__modal__wrapper"
						onClick={(e) => handleWrapperClick(e)}
					>
						<div className="media-gallery__modal__content">
							<div className="media-gallery__modal__content__header">
								<div
									className="media-gallery__modal__content__close-cta"
									onClick={(e) => handleCloseClick(e)}
								>
									<IcoMoonIcon icon={EnumsIcon.Close} size={32} />
								</div>
							</div>
							<div className="media-gallery__modal__content__body">
								<div className="media-gallery__modal__content__body__image">
									{/* <Image image={selectedItem.displayImage} /> */}
									<Image
										src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${row.displayImage.url}`}
										alt={row.displayImage.alt}
										quality={60}
										fill
										style={{
											objectFit: 'contain',
										}}
									/>
								</div>
								<div>
									<div className="media-gallery__modal__content__body__title">
										{selectedItem.shortTitle}
									</div>
									<div className="media-gallery__modal__content__body__description">
										{selectedItem.description}
									</div>
								</div>
							</div>
							<div className="media-gallery__modal__content__footer">
								{/* <div className="media-gallery__modal__content__footer__terms">
                  <span className="media-gallery__modal__content__footer__terms__bold">Terms and conditions</span>. All
                  photos can be downloaded and used for free. Photos cannot be sold without significant modification.
                  Diageo grants you an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify,
                  distribute, perform, and use photos from Diageo for free.
                </div> */}
								<div className="media-gallery__modal__content__footer__download">
									<div className="media-gallery__modal__content__footer__download--icon">
										<IcoMoonIcon icon={EnumsIcon.Download} size={16} />
									</div>
									<div className="media-gallery__modal__content__footer__download__cta">
										<div>
											<LinkHelper3
												linkText={`Download ${
													getFileExtension(selectedItem) || 'File'
												}`}
												link={{
													name:
														selectedItem.downloadImage?.alt ||
														selectedItem.downloadZip,
													url:
														selectedItem.downloadImage?.url ||
														selectedItem.downloadZip,
												}}
												linkClass={''}
												showicon={false}
												isDownload
											/>
										</div>
										<div className="media-gallery__modal__content__footer__download__cta--size">
											{selectedItem.humanReadableSize}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
