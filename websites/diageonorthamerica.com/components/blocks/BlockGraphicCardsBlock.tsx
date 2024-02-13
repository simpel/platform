import { usePages } from 'context/pages'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { type TGraphicCards } from 'components/theme/plain/GraphicCards/TGraphicCards'
import { type TGraphicCard, type TStat } from '@diageo/designsystem'

export default function BlockGraphicCardsBlock({
	customComponent,
}: BlockProps<TGraphicCards>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')

	const pageMediaRef = page.referencedMedia

	const getTopLayer = (): TGraphicCards['top'] => {
		const topBlock = f.blocks('topCard')[0]

		if (!topBlock) return

		const topObject: TGraphicCards['top'] | Record<string, any> = {
			card: { variant: 'large' },
		}

		for (const field of topBlock.fields) {
			switch (field.alias) {
				case 'image': {
					const mediaItem = field.mediaList?.[0]
					const elementImage = pageMediaRef.find(
						(refMedia) => refMedia._id === mediaItem?._id,
					)

					topObject.image = {
						src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${elementImage?.url}`,
						alt: elementImage?.title,
					}

					break
				}

				case 'headline': {
					topObject.card.badge = field.text

					break
				}

				case 'amount': {
					topObject.card.amount = field.text

					break
				}

				case 'stats': {
					const stats = field.blocks?.map((block) => {
						const statsObject: TStat | Record<string, any> = {}

						for (const field of block.fields) {
							switch (field.alias) {
								case 'amount': {
									statsObject.stat = field.text
									break
								}

								case 'description': {
									statsObject.description = field.text
									break
								}

								default: {
									break
								}
							}
						}

						return statsObject
					})

					topObject.card.stats = stats

					break
				}

				case 'icon': {
					const mediaItem = field.mediaList?.[0]
					const elementImage = pageMediaRef.find(
						(refMedia) => refMedia._id === mediaItem?._id,
					)

					topObject.card.icon = {
						src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${elementImage?.url}`,
						alt: elementImage?.title,
					}

					break
				}

				case 'theme': {
					topObject.card.theme = field.text

					break
				}

				default: {
					break
				}
			}
		}

		return topObject as TGraphicCards['top']
	}

	const getMiddleLayer = (): TGraphicCards['middle'] => {
		const middleBlock = f.blocks('middleCard')[0]

		const middleObject: TGraphicCards['middle'] | Record<string, any> = {
			cards: [],
		}

		for (const field of middleBlock.fields) {
			switch (field.alias) {
				case 'image': {
					const mediaItem = field.mediaList?.[0]
					const elementImage = pageMediaRef.find(
						(refMedia) => refMedia._id === mediaItem?._id,
					)

					middleObject.image = {
						src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${elementImage?.url}`,
						alt: elementImage?.title,
					}

					break
				}

				case 'cards': {
					const cards = field.blocks?.map((block) => {
						const cardObject: TGraphicCard | Record<string, any> = {
							stat: {
								stat: '',
							},
							variant: 'small',
						}

						for (const field of block.fields) {
							switch (field.alias) {
								case 'headline': {
									cardObject.badge = field.text
									break
								}

								case 'prefix': {
									cardObject.stat.prefix = field.text
									break
								}

								case 'stat': {
									cardObject.stat.stat = field.text
									break
								}

								case 'suffix': {
									cardObject.stat.suffix = field.text
									break
								}

								case 'description': {
									cardObject.stat.description = field.text
									break
								}

								case 'icon': {
									const mediaItem = field.mediaList?.[0]
									const elementImage = pageMediaRef.find(
										(refMedia) => refMedia._id === mediaItem?._id,
									)

									cardObject.icon = {
										src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${elementImage?.url}`,
										alt: elementImage?.title,
									}

									break
								}

								case 'theme': {
									cardObject.theme = field.text

									break
								}

								default: {
									break
								}
							}
						}

						return cardObject
					})

					middleObject.cards = cards

					break
				}

				default: {
					break
				}
			}
		}

		return middleObject as TGraphicCards['middle']
	}

	const getBottomLayer = (): TGraphicCards['bottom'] => {
		const bottomBlock = f.blocks('bottomCard')[0]

		const bottomObject: TGraphicCards['top'] | Record<string, any> = {}

		for (const field of bottomBlock.fields) {
			switch (field.alias) {
				case 'image': {
					const mediaItem = field.mediaList?.[0]
					const elementImage = pageMediaRef.find(
						(refMedia) => refMedia._id === mediaItem?._id,
					)

					bottomObject.image = {
						src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${elementImage?.url}`,
						alt: elementImage?.title,
					}

					break
				}

				case 'text': {
					bottomObject.text = field.text

					break
				}

				default: {
					break
				}
			}
		}

		return bottomObject as TGraphicCards['bottom']
	}

	const props: TGraphicCards = {
		smallText: f.text('smallTitle'),
		heading: f.html('title'),
		top: getTopLayer(),
		middle: getMiddleLayer(),
		bottom: getBottomLayer(),
	}

	return getComponent<TGraphicCards>(
		Block.GraphicCardsBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
