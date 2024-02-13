import {
	type TStoryVideo,
	StoryVideo,
	RichTextTitle,
} from '@diageo/designsystem'
import { type Image as TImage } from 'types'
import Image from 'next/image'

const getBg = (bg: TStoryVideo['background']) => {
	switch (bg) {
		case 'dcf6d8': {
			return `linear-gradient(130deg, #dcf6d8 0%, #dff3cb 47.52%, #f1f8cc 100%)`
		}

		default: {
			return undefined
		}
	}
}

type TOwnProps = {
	readonly title: string
	readonly image: TImage
}

export type TStoryVideoWithBackground = TOwnProps &
	Omit<TStoryVideo, keyof TOwnProps | 'thumbnailImage'>

const StoryVideoWithBackground = ({
	title,
	image,
	background,
	...props
}: TStoryVideoWithBackground) => {
	return (
		<StoryVideo
			title={title && <RichTextTitle html={title} />}
			thumbnailImage={
				<Image
					fill
					src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`} // eslint-disable-line n/prefer-global/process
					alt={image.alt}
				/>
			}
			background={getBg(background)}
			{...props}
		/>
	)
}

export default StoryVideoWithBackground
