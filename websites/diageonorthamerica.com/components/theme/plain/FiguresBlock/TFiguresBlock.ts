import type { TStat } from '@diageo/designsystem'

export type TFigure = {
	progress: string
	description: string
	stat: TStat
}

export type TFiguresBlock = {
	caption: string
	heading: string
	items: TFigure[]
}
