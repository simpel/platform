import { type AnchorHTMLAttributes } from 'react'

export type TItem = {
	link?: AnchorHTMLAttributes<HTMLAnchorElement>
	image: { src: string; alt: string }
}

export type TLogoBlock = {
	title?: string
	backgroundColor?: string
	items?: TItem[]
}
