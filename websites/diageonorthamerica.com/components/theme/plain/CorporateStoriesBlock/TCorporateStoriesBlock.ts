import { type AnchorHTMLAttributes } from 'react'

export type TItem = {
	time?: Date
	categories?: string[]
	title: string
	image?: { src: string; alt: string } | null
	tags?: string[]
	link?: AnchorHTMLAttributes<HTMLAnchorElement>
}

export type TCorporateStoriesBlock = {
	viewAllLink?: { name: string; url: string; target?: string }
	title?: string
	paginationLabel?: string
	icon?: { src: string; alt: string } | null
	items: TItem[]
	slider?: boolean
}
