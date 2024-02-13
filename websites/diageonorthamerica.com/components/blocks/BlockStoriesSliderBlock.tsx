import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	StoriesSliderBlockProps,
	StoryCardProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { Image, Theme, UrlsGqlResponse } from 'types'
import { useEffect, useState } from 'react'
import {
	fetchPageDataByDocType,
	fetchPagesLite,
	fetchPressReleasesFeatures,
} from 'lib/cms/api'
import { usePages } from 'context/pages'

export default function BlockStoriesSliderBlock({
	customComponent,
}: BlockProps<StoriesSliderBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let itemz = {} as StoryCardProps[]

	const selectedIds = [] as string[]
	const selectedStories = f.list('stories')

	selectedStories.map((itm) => {
		selectedIds.push(itm._id)
	})

	let doctype = 'featurePage'

	const categories = [] as string[]
	const catfields1 = f.list('topic')
	const catfields2 = f.list('jobCategories')
	const catfields3 = f.list('regions')
	const catfields4 = f.list('country')
	const catfields5 = f.list('brands')

	const careerArts = f.boolean('showCareersArticles')
	const allMatch = f.boolean('allCategoriesMatch')

	if (catfields1) {
		catfields1.map((x) => {
			categories.push(x._id)
		})
	}
	if (catfields2) {
		catfields2.map((x) => {
			categories.push(x._id)
		})
	}
	if (catfields3) {
		catfields3.map((x) => {
			categories.push(x._id)
		})
	}
	if (catfields4) {
		catfields4.map((x) => {
			categories.push(x._id)
		})
	}
	if (catfields5) {
		catfields5.map((x) => {
			categories.push(x._id)
		})
	}

	if (careerArts) {
		doctype = 'careersArticlePage'
	} else {
		doctype = 'featurePage'
	}

	// console.log('mhp', f.list('country'))

	const [features, setFeatures] = useState({} as UrlsGqlResponse)

	useEffect(() => {
		if (selectedIds && selectedIds.length) {
			fetchPagesLite(selectedIds).then((res: UrlsGqlResponse) => {
				setFeatures(res)
			})
		} else {
			fetchPageDataByDocType(
				doctype,
				6,
				true,
				0,
				categories,
				allMatch,
				false,
				true,
			).then((res: UrlsGqlResponse) => {
				setFeatures(res)
			})
			// } else if (selectedCategories && selectedCategories.length) {
			//   fetchPressReleasesFeatures(true, 6, false, false, 0, selectedCategories, false).then((res: UrlsGqlResponse) => {
			//     setFeatures(res)
			//   })
			// } else {
			//   fetchPressReleasesFeatures(true, 6, false, false, 0).then((res: UrlsGqlResponse) => {
			//     setFeatures(res)
			//   })
		}
	}, [])

	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	if (features && features.contents) {
		itemz = features.contents.map((eetem, index) => {
			let uuurl = ''
			if (
				eetem.pageListingImage != null &&
				eetem.pageListingImage.url != null
			) {
				uuurl = eetem.pageListingImage.url
			}
			return {
				title: eetem.title ? eetem.title : '',
				link: {
					name: 'View all Stories',
					url: eetem.url,
				},
				image: { _id: 'k_' + index, url: uuurl, alt: eetem.title } as Image,
				withIconPlay: false,
				articleDate: eetem.articleDate,
				tags: eetem.categoryPages?.map((x) => x.title),
			} as StoryCardProps
		})
	}
	const props = {
		richTextHeading: f.html('richTextHeading'),
		viewMoreLink: f.link2('viewMoreLink'),
		viewMoreLinkText: f.text('viewMoreLinkText'),
		slides: itemz,
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<StoriesSliderBlockProps>(
		Block.StoriesSliderBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
