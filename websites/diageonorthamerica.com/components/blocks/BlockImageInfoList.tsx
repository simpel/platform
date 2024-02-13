import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { type TImageInfoListBlock } from 'components/theme/plain/ImageInfoListBlock/TImageInfoListBlock'
import { usePages } from 'context/pages'

export default function BlockImageInfoList({
	customComponent,
}: BlockProps<TImageInfoListBlock>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')
	const image = f.imageRefStandard('image')
	const pageMediaRef = page.referencedMedia

	const items = f.blocks('list').map((card) => {
		const title = card.fields.find((field) => field.alias === 'title')?.html
		const body = card.fields.find((field) => field.alias === 'description')
			?.html
		const hex = card.fields.find((field) => field.alias === 'backgroundColor')
			?.text
		const icon = card.fields.find((field) => field.alias === 'icon')?.mediaList
		const image = pageMediaRef.find((refMedia) => {
			if (icon && icon?.length > 0) {
				return refMedia._id === icon[0]._id
			}

			return null
		})

		return {
			title,
			body,
			hex,
			image: {
				// eslint-disable-next-line n/prefer-global/process
				src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
				alt: image?.title ?? '',
			},
		}
	})

	const props: TImageInfoListBlock = {
		heading: f.html('title'),
		image: {
			// eslint-disable-next-line n/prefer-global/process
			url: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
			alt: image?.alt ?? '',
		},
		quote: f.html('quotes'),
		items,
	}

	return getComponent<TImageInfoListBlock>(
		Block.ImageInfoList,
		props,
		componentIdentifier,
		customComponent,
	)
}
