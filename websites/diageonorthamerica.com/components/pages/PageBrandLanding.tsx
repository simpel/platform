import media from 'constants/media'
import React, { useState, useEffect } from 'react'
import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import {
	type PartialPage,
	type CategoryLite,
	type PageBrandLandingProps,
} from 'types'
import { BrandCardType, HeadingLevel } from 'enums'
import Layout from 'components/Layout'
import { usePages } from 'context/pages'
import { useNavigation } from 'context/navigation'
import BreadcrumbsHelper from 'components/theme/plain/custom/BreadcrumbHelper'
import { type BreadcrumbsProps } from 'components/propTypes'
import orderBy from 'lodash/orderBy'
import Image from 'next/image'
import Link from 'next/link'
import IcoMoonIcon from 'components/theme/plain/IcoMoonIcon'
import { useMediaQuery } from 'hooks/useMediaQuery/useMediaQuery'
import { Icons as EnumsIcon } from '../../enumsIcon'
import Heading from '../theme/plain/Heading'
import DContainer from '../theme/Diageo/DContainer'
import DCategoriesFilter from '../theme/Diageo/DCategoriesFilter'
import DCategoriesFilterMobile from '../theme/Diageo/DCategoriesFilterMobile'
import DCategoriesSearchFilterMobile from '../theme/Diageo/DCategoriesSearchFilterMobile'
import DLinkUnderline from '../theme/Diageo/DLinkUnderline'
import DBlockSimpleIntro from '../theme/Diageo/blocks/DBlockSimpleIntro'
import DBlockBrandSearch from '../theme/Diageo/blocks/DBlockBrandSearch'

const getFilterdPostsByCategories = (
	categories: PartialPage[],
	posts: PartialPage[],
): PartialPage[] => {
	const filteredArray: PartialPage[] = []
	for (let i = 0; i <= categories.length - 1; i++) {
		const itemCategory = categories[i]
		for (const post of posts) {
			if (post.categoryPages?.some((s) => s._id === itemCategory._id)) {
				filteredArray.push(post)
			}
		}
	}

	return filteredArray
}

const BreadcrumbsRender = ({ breadcrumbs }: BreadcrumbsProps) => {
	return (
		<div className="breadcrumbs">
			<ul className="flex flex-wrap breadcrumbs__list bare-list">
				<BreadcrumbsHelper breadcrumbs={breadcrumbs} />
			</ul>
		</div>
	)
}

// 5c44cfc44b8dd44dbd61ebe5

export default function PageBrandLanding() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const body = renderBlocks(f.blocks('body'))
	const [{ breadcrumbs }] = useNavigation()

	const [isVisibleLoadMore, setIsVisibleLoadMore] = useState<boolean>(true)
	const notFoundMessage = 'Brands not found'
	const visibleCountPosts = 14
	const headingPage = 'Brand <i>explorer</i>'

	const [categories, setCategories] = useState([] as CategoryLite[])
	const [posts, setPosts] = useState([] as PartialPage[])
	// eslint-disable-next-line react/hook-use-state
	const [activeFilterCategory, setFilterCategory] = useState('all')
	// eslint-disable-next-line react/hook-use-state
	const [_countResults, setCountResults] = useState(0)
	const [filteredPosts, setFilteredPosts] = useState([] as PartialPage[])
	const [targetPage, setTargetPage] = useState<PartialPage | undefined>()

	const isTablet = useMediaQuery(`(min-width: ${media.tablet}px)`)

	useEffect(() => {
		if (page.contentType === 'brandLandingPage') {
			setTargetPage(page)
		}
	}, [page])

	useEffect(() => {
		const passedObject = page.miscdata as PageBrandLandingProps

		if (passedObject) {
			if (passedObject.brandPages) {
				setPosts(passedObject.brandPages)
				const sortedPagesList = passedObject.brandPages.slice(
					0,
					visibleCountPosts,
				)
				setFilteredPosts(sortedPagesList)
			}

			if (passedObject.categories) {
				const pageCats = [] as string[]
				if (passedObject.brandPages) {
					for (const brandPage of passedObject.brandPages) {
						if (brandPage.categoryPages) {
							for (const catPage of brandPage.categoryPages) {
								if (!pageCats.includes(catPage._id)) {
									pageCats.push(catPage._id)
								}
							}
						}
					}
				}

				const passedCategories = [] as CategoryLite[]
				if (pageCats.length > 0) {
					for (const [_index, element] of passedObject.categories.entries()) {
						if (pageCats.includes(element._id)) passedCategories.push(element)
					}
				}

				const sortedCategories: CategoryLite[] = orderBy(
					passedCategories,
					['title'],
					['asc'],
				)

				setCategories(sortedCategories)
			}
		}

		// Console.log('marshall', 'useEffect(targetPage)')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [targetPage])

	const handleFilterClick = (categories: string[]) => {
		if (categories[0]?.toLowerCase() === 'all') {
			setIsVisibleLoadMore(true)
			setFilterCategory(categories[0])
			setFilteredPosts(posts)
			return
		}

		const array = posts.filter(
			(post) =>
				Array.isArray(post.categoryPages) &&
				post.categoryPages.some((s) => s._id === categories[0]),
		)
		if (categories[0]) setFilterCategory(categories[0])
		setIsVisibleLoadMore(false)
		setFilteredPosts(array)
	}

	const handleFilterMobileClick = (categories: PartialPage[]) => {
		if (categories.length === 0) {
			setIsVisibleLoadMore(true)
			setFilteredPosts(posts.slice(0, visibleCountPosts))
			setCountResults(posts.slice(0, visibleCountPosts).length)
			return
		}

		const filteredArray = getFilterdPostsByCategories(categories, posts)
		setIsVisibleLoadMore(false)
		setFilteredPosts(filteredArray)
		setCountResults(filteredArray.length)
	}

	const loadMoreHandle = () => {
		const array = [...filteredPosts, ...posts.slice(visibleCountPosts)]
		setIsVisibleLoadMore(false)
		setFilteredPosts(array)
	}

	const getLoadMoreLink = () => {
		return (
			<div className="brand-explorer__load-more text-align--center">
				<p className="brand-explorer__showing-message">
					Showing {visibleCountPosts} of {posts.length}
				</p>
				<DLinkUnderline
					link={{
						name: 'Load more brands',
						url: '#',
					}}
					icon={{
						icon: EnumsIcon.Plus,
					}}
					size="large"
					onClick={loadMoreHandle}
				/>
			</div>
		)
	}

	return (
		<Layout>
			<DBlockSimpleIntro heading={headingPage}>
				<BreadcrumbsRender breadcrumbs={breadcrumbs} />
			</DBlockSimpleIntro>
			<section className="block-brand-explorer">
				<DContainer>
					<div className="block-brand-explorer__categories-filter-mobile-wrapper">
						<DCategoriesFilterMobile
							closeFilterAfterSearch
							heading="Filters:"
							categories={categories}
							handleChooseFilter={(categories) => {
								handleFilterMobileClick(categories as unknown as PartialPage[])
							}}
							className="block-brand-explorer__categories-filter-mobile-item"
						/>
						<DCategoriesSearchFilterMobile
							categories={posts}
							className="block-brand-explorer__categories-filter-mobile-item"
						/>
					</div>
					<div className="block-brand-explorer__categories-filter-wrapper">
						<DCategoriesFilter
							allCategories
							heading="Our portfolio:"
							categories={categories}
							handleChooseFilter={(categories) => {
								handleFilterClick(categories as unknown as string[])
							}}
						/>
					</div>
					{filteredPosts && filteredPosts.length > 0 ? (
						<div
							className={`brand-explorer ${
								activeFilterCategory.toLowerCase() === 'all'
									? 'brand-explorer--all'
									: ''
							}`}
						>
							{filteredPosts.map((post, index) => (
								<div key={index} className="brand-explorer__col">
									<div
										className={`brand-card brand-card--${BrandCardType.brandExplorer} `}
									>
										{post?.pageListingImage && (
											<div className="brand-card__image">
												<Image
													fill
													quality={60}
													// Width={index <= 5 ? 800 : 320}
													// height={index <= 5 ? 550 : 320}
													src={`${process.env.NEXT_PUBLIC_MEDIAHOST!}${process
														.env.NEXT_PUBLIC_MEDIAPREFIX!}${post
														?.pageListingImage.url}`}
													alt={post?.title}
													// Objec
													// objectFit: "contain"
													// width='100%'
													// height='100%'
													// objectFit='contain'
													style={{
														objectFit: 'cover',
													}}
												/>
											</div>
										)}
										<div className="brand-card__body">
											{post?.pageListingImage2 && (
												<div className="brand-card__image-logo">
													<Image
														quality={60}
														width={188}
														height={105}
														src={`${process.env.NEXT_PUBLIC_MEDIAHOST!}${process
															.env.NEXT_PUBLIC_MEDIAPREFIX!}${post
															?.pageListingImage2.url}`}
														alt={post?.title}
													/>
												</div>
											)}
											<div className="brand-card__content" />
											{post.alternateUrl ? (
												<div>
													<a
														className="card__link link link--medium"
														target="_blank"
														rel="noreferrer"
														href={post?.alternateUrl}
													>
														<span className="link__inner">
															<span className="link__text">{post?.title}</span>
															<IcoMoonIcon
																icon={EnumsIcon.Launch}
																size={16}
																className="link__icon"
															/>
														</span>
													</a>
												</div>
											) : (
												<Link
													href={post?.url}
													prefetch={false}
													className="card__link link link--medium"
												>
													<span className="link__inner">
														<span className="link__text">{post?.title}</span>
														<IcoMoonIcon
															icon={EnumsIcon.ArrowRight}
															size={16}
															className="link__icon"
														/>
													</span>
												</Link>
											)}
										</div>
									</div>

									{/* <DBrandCard
                    {...post}
                    image={{
                      _id: post?.pageListingImage?._id,
                      url: post?.pageListingImage?.url,
                      alt: post.urlSegment,
                    }}
                    imageLogo={{
                      _id: post?.pageListingImage2?._id,
                      url: post?.pageListingImage2?.url,
                      alt: post.urlSegment,
                    }}
                    title={post.title}
                    linkCta={{
                      name: post.title,
                      url: post.url,
                    }}
                    text="The world’s best selling Scotch Whisky"
                    typeCard={BrandCardType.brandExplorer}
                    itemIndex={index}
                  /> */}
								</div>
							))}
						</div>
					) : (
						<div>
							<Heading
								heading={notFoundMessage}
								headingLevel={HeadingLevel.H4}
								className="text-align--center"
							/>
						</div>
					)}
					{filteredPosts.length > 0 ? (
						<>
							{!isTablet && isVisibleLoadMore ? getLoadMoreLink() : ''}

							{isTablet &&
								activeFilterCategory === 'all' &&
								isVisibleLoadMore &&
								getLoadMoreLink()}
						</>
					) : null}
				</DContainer>
			</section>

			{body}
			<DBlockBrandSearch
				heading="<i>Brands</i>"
				subheading="Brand Explorer"
				headingLg="200+"
				categories={posts}
			/>
		</Layout>
	)
}
