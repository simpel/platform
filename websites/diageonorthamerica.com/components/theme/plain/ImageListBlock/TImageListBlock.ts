export type TItem = {
	label: string
	image?: { src: string; alt: string } | null
}

export type TImageListBlock = {
	title?: string
	body?: string
	items: TItem[]
}
