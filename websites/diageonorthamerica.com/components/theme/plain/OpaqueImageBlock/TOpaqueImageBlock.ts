import { type Image, type Link } from 'types'

export type TOpaqueImageBlock = {
	heading: string
	link: Link
	image: Pick<Image, 'url' | 'alt'>
}
