import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import {
	type TImage,
	type TImageSliderBlock,
} from 'components/theme/plain/ImageSliderBlock/TImageSliderBlock'

export default function BlockImageSlider({
	customComponent,
}: BlockProps<TImageSliderBlock>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')
	const pageMediaRef = page.referencedMedia

	const images = f.fields.find((item) => item.alias === 'images')

	const tImages: TImage[] | undefined = images?.mediaList?.map(
		(media): TImage => {
			const image = pageMediaRef.find((refMedia) => refMedia._id === media._id)
			return {
				// eslint-disable-next-line n/prefer-global/process
				url: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
				alt: image?.title ?? '',
			}
		},
	)

	const props = {
		title: f.text('title') ?? '',
		hex: f.text('backgroundColor'),
		images: tImages,
	}

	return getComponent<TImageSliderBlock>(
		Block.ImageSlider,
		props,
		componentIdentifier,
		customComponent,
	)
}
