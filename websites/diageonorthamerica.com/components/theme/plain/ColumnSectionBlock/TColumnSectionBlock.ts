import { type AnchorHTMLAttributes } from 'react'

export type TItem = {
	body?: string
	link?: AnchorHTMLAttributes<HTMLAnchorElement> & { label: string }
}

export type TColumnSectionBlock = {
	caption?: string
	title?: string
	items: TItem[]
}
