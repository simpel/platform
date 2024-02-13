import type { HTMLAttributes } from 'react'

export type TGraphicCardsV3ListItem = {
	imageAndTextItem?: TImageAndTextItem
	tileItem?: TGraphicCardsV3BlockItem
}

export type TGraphicCardsV3BlockItem = {
	align: string
	card: {
		badge: string
		stat: {
			stat: string
			suffix: string
			description: string
		}
		icon: {
			src: string
			alt: string
		}
		description: string
		color: string
	}
}

export type TImageAndTextItem = {
	topText?: string
	bottomText?: string
	image?: {
		src: string
		alt: string
	}
	imageAlign: string
}

export type TGraphicCardsV3Block = {
	title: string
	caption: string
	items: TGraphicCardsV3ListItem[]
	lineBackground: string
} & HTMLAttributes<HTMLDivElement>
