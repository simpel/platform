import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { type TImageListBlock } from 'components/theme/plain/ImageListBlock/TImageListBlock'

export default function BlockImageList({
	customComponent,
}: BlockProps<TImageListBlock>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')
	const pageMediaRef = page.referencedMedia

	const items = f.blocks('items').map((item) => {
		const label =
			item.fields.find((field) => field.alias === 'description')?.text ?? ''
		const icon = item.fields.find((field) => field.alias === 'image')?.mediaList
		const image = pageMediaRef.find((refMedia) => {
			if (icon && icon?.length > 0) {
				return refMedia._id === icon[0]._id
			}

			return null
		})

		return {
			label,
			image: {
				// eslint-disable-next-line n/prefer-global/process
				src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
				alt: image?.title ?? '',
			},
		}
	})

	const props = {
		title: f.html('title') ?? '',
		body: f.html('body') ?? '',
		items,
	}

	return getComponent<TImageListBlock>(
		Block.ImageList,
		props,
		componentIdentifier,
		customComponent,
	)
}
