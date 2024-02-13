import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import {
	type TCarouselTheme,
	type TCarousel,
	type TCarouselCard,
} from '@diageo/designsystem'

export default function BlockCarouselBlock({
	customComponent,
}: BlockProps<TCarousel>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')

	const pageMediaRef = page.referencedMedia

	const cards = f.blocks('slides').map((block) => {
		const cardProps: TCarouselCard | Record<string, unknown> = {}

		for (const field of block.fields) {
			switch (field.alias) {
				case 'leftContent':
				case 'rightContent': {
					cardProps[field.alias] = field.blocks?.map((block) => {
						switch (block.contentType) {
							case 'slideImage': {
								const mediaItem = block.fields[0].mediaList?.[0]
								const elementImage = pageMediaRef.find(
									(refMedia) => refMedia._id === mediaItem?._id,
								)
								return {
									component: 'Image',
									props: {
										url: elementImage?.url
											? `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${elementImage?.url}`
											: '',
										alt: elementImage?.title ?? '',
									},
								}
							}

							case 'slideRichText': {
								return {
									component: 'RichText',
									props: {
										richText: block.fields[0].html ?? '',
									},
								}
							}

							case 'slideStatistic': {
								const stats: Record<string, unknown> = {}

								for (const field of block.fields) {
									stats[field.alias] = field.text
								}

								return {
									component: 'Stats',
									props: { stats },
								}
							}

							case 'slideLineSeparator': {
								return {
									component: 'Line',
									props: {
										theme: f.text('theme'),
									},
								}
							}

							case 'slideIcons': {
								const mediaItems = block.fields[0].mediaList

								const logos = mediaItems?.map((item) => {
									const elementImage = pageMediaRef.find(
										(refMedia) => refMedia._id === item?._id,
									)

									return {
										url: elementImage?.url
											? `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${elementImage?.url}`
											: '',
										alt: elementImage?.title ?? '',
									}
								})

								return {
									component: 'Logos',
									props: { logos },
								}
							}

							default: {
								return {
									component: '',
									props: {},
								}
							}
						}
					})
					break
				}

				case 'showIcon': {
					cardProps[field.alias] = field.boolean
					break
				}

				default: {
					break
				}
			}
		}

		return {
			...(cardProps as TCarouselCard),
			theme: f.text('theme') as TCarouselTheme,
		}
	})

	const props: TCarousel = {
		cards,
		theme: f.text('theme') as TCarouselTheme,
		title: f.html('title'),
		backgroundTheme: f.text('backgroundTheme'),
	}

	return getComponent<TCarousel>(
		Block.CarouselBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
