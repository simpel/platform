export type TItem = {
	title?: string
	alt?: string
	hex?: string
	description?: string
	image?: { src: string; alt: string } | null
}

export type TInfoListBlock = {
	caption?: string
	title?: string
	items: TItem[]
}
