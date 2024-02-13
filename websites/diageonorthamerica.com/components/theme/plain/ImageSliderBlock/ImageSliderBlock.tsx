import { ImageSlider } from '@diageo/designsystem'
import Image from 'next/image'
import { lighten } from 'utilities/colors'
import { type TImageSliderBlock } from './TImageSliderBlock'

const ImageSliderBlock = ({ title, images, hex }: TImageSliderBlock) => {
	return (
		<ImageSlider
			title={title}
			background={`linear-gradient(124.79deg, ${lighten(
				`#${hex}`,
				0.3,
			)} 0%, ${lighten(`#${hex}`, 0.5)} 45%, #${hex} 99%)`}
			images={
				images?.map((image, index) => (
					<Image
						key={index}
						width={430}
						height={500}
						src={image.url}
						alt={image.alt}
					/>
				)) ?? []
			}
		/>
	)
}

export default ImageSliderBlock
