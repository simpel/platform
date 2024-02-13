export type TItem = {
	title?: string
	body?: string
	hex?: string
	image?: { src: string; alt: string } | null
}

export type TCardListBlock = {
	title?: string
	body?: string
	items: TItem[]
}
