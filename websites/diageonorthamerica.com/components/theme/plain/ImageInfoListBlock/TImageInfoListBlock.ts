import { type Image } from 'types'

export type TItem = {
	title?: string
	body?: string
	hex?: string
	image?: { src: string; alt: string }
}

export type TImageInfoListBlock = {
	heading: string
	quote: string
	items: TItem[]
	background?: string
	image: Pick<Image, 'url' | 'alt'>
}
