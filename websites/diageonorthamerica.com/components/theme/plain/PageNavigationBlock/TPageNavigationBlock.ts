import { type AnchorHTMLAttributes } from 'react'

export type TItem = { label: string } & AnchorHTMLAttributes<HTMLAnchorElement>

export type TPageNavigationBlock = {
	navTitle?: string
	items: TItem[]
}
