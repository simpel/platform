import { type Image } from 'types'

export type TMediaBlockWithGraphics = {
	title: string
	body: string
	image: Pick<Image, 'url' | 'alt'>
}
