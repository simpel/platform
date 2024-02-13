import { type DetailedHTMLProps, type ImgHTMLAttributes } from 'react'

export type THeadlineBlock = {
	title: string
	background: string
	image: DetailedHTMLProps<
		ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>
}
