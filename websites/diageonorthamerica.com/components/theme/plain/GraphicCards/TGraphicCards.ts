import { type TGraphicCard } from '@diageo/designsystem'
import { type ImgHTMLAttributes } from 'react'

export type TGraphicCards = {
	smallText: string
	heading: string
	top?: TTop
	middle: TMiddle
	bottom: TBottom
}

export type TTop = {
	card: TGraphicCard
} & TLevel

export type TMiddle = {
	cards: TGraphicCard[]
} & TLevel

export type TBottom = {
	text: string
} & TLevel

export type TLevel = {
	image: ImgHTMLAttributes<HTMLImageElement>
	theme: string
}

export type TDecoration = {
	theme: TDecorationTheme
	width?: TDecorationWidth
	height?: TDecorationHeight
	className?: string
}

export type TDecorationTheme = 'blue' | 'blue-orange'

export type TDecorationWidth = 'thin' | 'wide'

export type TDecorationHeight = 'small' | 'medium' | 'large'
