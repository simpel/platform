import {
	type TImageListItem,
	RichTextTitle,
	ImageListBackground,
	RichTextBody,
} from '@diageo/designsystem'
import Image from 'next/image'
import { type TImageListBlock } from './TImageListBlock'

const ImageListBlock = ({ title, body, items }: TImageListBlock) => {
	const images = items.map((item): TImageListItem => {
		const image: TImageListItem = {
			label: item.label,
			image: (
				<Image
					src={item.image?.src ?? ''}
					alt={item.image?.alt ?? ''}
					width={180}
					height={180}
				/>
			),
		}
		return image
	})

	return (
		<ImageListBackground
			heading={<RichTextTitle html={title ?? ''} />}
			body={body && <RichTextBody html={body} />}
			items={images}
			background="linear-gradient(35deg, #96D9ED 0%, #D9CFFF 45.19%, #FBECD6 98.9%)"
		/>
	)
}

export default ImageListBlock
