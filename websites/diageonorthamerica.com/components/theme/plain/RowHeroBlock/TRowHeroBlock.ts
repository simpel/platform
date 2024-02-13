export type TNotification = {
	caption?: string
	title?: string
}

export type TRowHeroBlock = {
	caption?: string
	title?: string
	image?: { src: string; alt: string } | null
	hex?: string
	link?: { name: string; url: string; target?: string }
	notification?: TNotification
}
