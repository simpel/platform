export enum EBlockType {
	BlockTile,
	ContentTile,
}
export enum EImageAlign {
	Left,
	Right,
}
export enum EBlockContentType {
	Text,
	Quote,
}

export type TBlockImage = {
	src: string
	alt: string
}

export type TQuote = {
	type: EBlockContentType
	quote?: string
	author?: string
	topic?: string
}

export type TText = {
	type: EBlockContentType
	topText?: string
	bottomText?: string
}

export type TBlockTile = {
	type: EBlockType
	headline?: string
	amount?: string
	unit?: string
	subText?: string
	description?: string
	icon?: TBlockImage
	image?: TBlockImage
	color?: string
}
export type TContentTile = {
	type: EBlockType
	image: TBlockImage
	items: Array<TQuote | TText>
}

export type TTilesListBlock = {
	caption?: string
	title?: string
	imageAlign?: EImageAlign
	splitterColor?: string
	backgroundColor?: string
	bottomColor?: string
	items: Array<TBlockTile | TContentTile>
}
