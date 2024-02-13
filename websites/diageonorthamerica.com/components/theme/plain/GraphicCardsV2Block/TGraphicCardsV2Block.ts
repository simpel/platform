export type TGraphicCardsV2ListItem = {
	textItem: TGraphicCardsV2TextItem
	tileItem?: TGraphicCardsV2TileItem
}

export type TGraphicCardsV2TileItem = {
	image: { src: string; alt: string }
	card: TGraphicCardsV2Card
	invert: boolean
}

export type TGraphicCardsV2Card = {
	badge: string
	stat?: {
		stat: string
		suffix: string
		description: string
	}
	icon: {
		src: string
		alt: string
	}
	description: string
	headline: string
}

export type TGraphicCardsV2TextItem = {
	topText: string
	bottomText: string
}

export type TGraphicCardsV2Block = {
	title: string
	caption: string
	items: TGraphicCardsV2ListItem[]
	bottomImage: Array<{ src: string; alt: string }>
	lineBackground: string
}
