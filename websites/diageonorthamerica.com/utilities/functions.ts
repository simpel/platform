/* eslint-disable unicorn/filename-case */
/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/switch-case-braces */
/* eslint-disable default-case */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable unicorn/prefer-array-find */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
/* eslint-disable unicorn/no-lonely-if */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable unicorn/no-for-loop */
/* eslint-disable unicorn/explicit-length-check */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable no-implicit-coercion */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/prefer-includes */
/* eslint-disable unicorn/prefer-string-slice */
/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable capitalized-comments */
/* eslint-disable eqeqeq */
/* eslint-disable unicorn/prefer-includes */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import DoubleFigureItems from 'components/theme/plain/DoubleFigureItems'
import { isOutputType } from 'graphql'
import {
	PartialPage,
	ContentBlock,
	Page,
	NavPage,
	DoubleFigureItem,
	CmsLink,
} from 'types'
import { BrandCardProps } from '../components/propTypes'

enum ContentFields {
	Title = 'itemTitle',
	Text = 'itemText',
	MainImage = 'itemMainImage',
	InsetImage = 'itemInsetImage',
	Link = 'itemLink',
}

export const ExtractDoubleFigureItems = (
	blocks: ContentBlock[],
): DoubleFigureItem[] => {
	const ells: Array<DoubleFigureItem> = []

	let utextsymbol = ''
	let utext = ''
	let utextsuffix = ''
	let ltext = ''

	if (blocks) {
		blocks.map((fig) => {
			utextsymbol = ''
			utext = ''
			utextsuffix = ''
			ltext = ''
			fig.fields.map((el) => {
				switch (el.alias) {
					case 'symbol':
						utextsymbol = el.text ? el.text : ''
						break
					case 'upperText':
						utext = el.text ? el.text : ''
						break
					case 'upperTextSuffix':
						utextsuffix = el.text ? el.text : ''
						break
					case 'lowerText':
						ltext = el.text ? el.text : ''
						break
				}
			})
			ells.push({
				symbol: utextsymbol,
				upperText: utext,
				upperTextSuffix: utextsuffix,
				lowerText: ltext,
			})
		})
	}
	return ells
}

export const filterPartialPageByTitle = ({
	value,
	categories,
}: {
	value: string | ''
	categories?: PartialPage[]
}): PartialPage[] | [] => {
	let filteredArray = categories
	if (value !== '') {
		filteredArray = categories?.filter((item) => {
			if (
				item.title
					.toLowerCase()
					.replaceAll('î', 'i')
					.indexOf(value.toLowerCase().replaceAll('î', 'i')) >= 0
			) {
				return item
			}
		})
		if (filteredArray) return filteredArray
	}
	return []
}

export const getCategoriesByType = (
	categories: PartialPage[],
	type: string,
): PartialPage[] => {
	return categories.filter(
		(o) => o.contentType === 'categoryItem' && o.parent._id === type,
	)
}

export const getPostsByFields = (
	blocks: ContentBlock[],
	page: Partial<Page>,
): Partial<BrandCardProps>[] | [] => {
	const pageMediaRef = page.referencedMedia
	const posts = blocks.map((post) => {
		const fields = post.fields
		const postFields = {} as BrandCardProps
		for (let i = 0; i < fields.length; i++) {
			const item = fields[i]
			if (item.alias === ContentFields.Title) {
				postFields.title = item.text
			}
			if (item.alias === ContentFields.Link) {
				postFields.linkCta = item.link
			}
			if (item.alias === ContentFields.Text) {
				postFields.text = item.text
			}
			if (item.alias === ContentFields.MainImage) {
				if (item.mediaList && item.mediaList.length && pageMediaRef) {
					const mediaItem = item.mediaList[0]
					const image = pageMediaRef.filter(
						(refMedia) => refMedia._id === mediaItem._id,
					)[0]
					if (image) {
						postFields.image = {
							...image,
							alt: image.title ? image.title : '*',
						}
					}
				}
			}
			if (item.alias === ContentFields.InsetImage) {
				if (item.mediaList && item.mediaList.length && pageMediaRef) {
					const mediaItem = item.mediaList[0]
					const image = pageMediaRef.filter(
						(refMedia) => refMedia._id === mediaItem._id,
					)[0]
					if (image) {
						postFields.imageLogo = {
							...image,
							alt: image.title ? image.title : '*',
						}
					}
				}
			}
		}
		return postFields
	})
	return posts || []
}

export function GiveFullLinkTarget(link: CmsLink): string {
	let target = ''
	if (link.contentId && link.contentId.length > 0) {
		target = '_self'
	} else if (link.mediaId && link.mediaId.length > 0) {
		target = '_blank'
	} else if (link.url.indexOf('/media') > -1) {
		target = '_blank'
	} else if (
		link.target &&
		(link.target === '_blank' || link.url.startsWith('http'))
	) {
		target = '_blank'
	} else {
		target = '_self'
	}
	return target
}

export function GiveFullLinkUrl(link: CmsLink): string {
	let fileurl = ''
	if (link.contentId && link.contentId.length > 0) {
		fileurl = link.url
	} else if (link.mediaId && link.mediaId.length > 0) {
		fileurl =
			process.env.NEXT_PUBLIC_MEDIAHOST +
			`` +
			process.env.NEXT_PUBLIC_MEDIAPREFIX +
			'/media' +
			link.url.split('/media')[1]
	} else if (link.url.indexOf('/media') > -1) {
		fileurl =
			process.env.NEXT_PUBLIC_MEDIAHOST +
			`` +
			process.env.NEXT_PUBLIC_MEDIAPREFIX +
			'/media' +
			link.url.split('/media')[1]
	} else if (
		link.target &&
		(link.target === '_blank' || link.url.startsWith('http'))
	) {
		fileurl = link.url
	} else {
		fileurl = link.url
	}
	return fileurl
}

export function FixMediaPathsInHtml(html: string): string {
	// http://127.0.0.1/media/uu5drwkz/liquid-magic-blue-background.jpg  -- Image
	// https://diageofe-uat.comprend-test.com/en/our-business/building-world-class-brands -- page
	// https://d3cpanmcca5z4p.cloudfront.net/PR1346a/aws/media/3f5o40zz/how-do-we-meet-dickens-today.doc -- download

	if (html && html.length && html.length > 0) {
		let outy = html.replace(
			/http:\/\/127.0.0.1\/media\//g,
			process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				'/media/',
		)
		outy = outy.replace(
			/https:\/\/corporate-diageo.diageoplatform.com\/en/g,
			'/en',
		)
		outy = outy.replace(/https:\/\/diageofe-uat.comprend-test.com\/en/g, '/en')
		outy = outy.replace(/https:\/\/diageofe.comprend-test.com\/en/g, '/en')
		outy = outy.replace(
			/https:\/\/corporate-diageoindia.diageoplatform.com\/en/g,
			'/en',
		)
		outy = outy.replace(
			/https:\/\/diageoindia-dev.comprend-test.com\/en/g,
			'/en',
		)
		outy = outy.replace(
			/https:\/\/diageoindia-uat.comprend-test.com\/en/g,
			'/en',
		)
		outy = outy.replace(/https:\/\/diageo.com\/en/g, '/en')
		outy = outy.replace(/https:\/\/diageoindia.com\/en/g, '/en')
		outy = outy.replace(
			/https:\/\/secure.diageo.com\/media\//g,
			process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				'/media/',
		)
		outy = outy.replace(
			/http:\/\/secure.diageo.com\/media\//g,
			process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				'/media/',
		)
		outy = outy.replace(
			/https:\/\/d3cpanmcca5z4p.cloudfront.net\/PR1346a\/aws\/media\//g,
			process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				'/media/',
		)
		outy = outy.replace(
			/src="\/media\//g,
			'src="' +
				process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				'/media/',
		)
		outy = outy.replace(
			/href="\/media\//g,
			'href="' +
				process.env.NEXT_PUBLIC_MEDIAHOST +
				`` +
				process.env.NEXT_PUBLIC_MEDIAPREFIX +
				'/media/',
		)
		return outy
	}
	return ''
}

export function getClearIdFromVideoUrl(videoUrl: string): string {
	let videoId = ''
	if (
		videoUrl.indexOf('youtu.be') > -1 ||
		videoUrl.indexOf('youtube.com') > -1
	) {
		if (videoUrl.indexOf('v=') > -1) {
			videoId = videoUrl.split('v=')[1]
		} else if (videoUrl.indexOf('youtu.be') > -1) {
			videoId = videoUrl.split('youtu.be/')[1]
		} else if (videoUrl.indexOf('youtube.com/embed/') > -1) {
			videoId = videoUrl.split('youtube.com/embed/')[1]
		} else {
			videoId = videoUrl
		}
	} else if (videoUrl.indexOf('vimeo.com') > -1) {
		// https://vimeo.com/713621191
		// https://player.vimeo.com/video/713621191?h=2807072a0c

		const n = videoUrl.lastIndexOf('/')
		if (n > -1) {
			videoId = videoUrl.substring(n + 1)
		}
	} else {
		videoId = videoUrl
	}
	return videoId
}

export function getVideoEmbedUrl(videoUrl: string): string {
	let embedUrl = ''
	let videoId = ''
	if (
		videoUrl.indexOf('youtu.be') > -1 ||
		videoUrl.indexOf('youtube.com') > -1
	) {
		if (videoUrl.indexOf('v=') > -1) {
			videoId = videoUrl.split('v=')[1]
		} else if (videoUrl.indexOf('youtu.be') > -1) {
			videoId = videoUrl.split('youtu.be/')[1]
		} else if (videoUrl.indexOf('youtube.com/embed/') > -1) {
			videoId = videoUrl.split('youtube.com/embed/')[1]
		} else {
			videoId = videoUrl
		}
		embedUrl = 'https://www.youtube.com/embed/' + videoId
	} else if (videoUrl.indexOf('vimeo.com') > -1) {
		// https://vimeo.com/713621191
		// https://player.vimeo.com/video/713621191?h=2807072a0c

		const n = videoUrl.lastIndexOf('/')
		if (n > -1) {
			videoId = videoUrl.substring(n + 1)
		}
		embedUrl = 'https://player.vimeo.com/video/' + videoId
	} else {
		embedUrl = 'https://www.youtube.com/embed/' + videoUrl
	}
	return embedUrl
}

export const getModifyUrl = (url: string): string => {
	return `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${url}`
}

// export const getNiceDate = (theDate: Date): string => {
//   return theDate.getDate() + ' ' + GetMonthName(theDate.getMonth()) + ', ' + theDate.getFullYear()
// }

// export const getNiceDate2 = (theDateS: string): string => {
//   const theDate = new Date(theDateS)
//   return getNiceDate(theDate)
// }

// export const GetMonthName = (theMonth: number): string => {
//   const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '']
//   if (theMonth > -1 && theMonth < 12) {
//     return months[theMonth]
//   } else {
//     return ''
//   }
// }

export function except(array, excluded) {
	const check1 = array.filter(function (value) {
		return excluded.indexOf(value) == -1
	})

	const check2 = excluded.filter(function (value) {
		return array.indexOf(value) == -1
	})

	const output = check1.concat(check2)

	return output
}
