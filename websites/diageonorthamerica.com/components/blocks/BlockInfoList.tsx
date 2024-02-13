import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { type TInfoListBlock } from 'components/theme/plain/InfoListBlock/TInfoListBlock'

export default function BlockInfoList({
	customComponent,
}: BlockProps<TInfoListBlock>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')
	const pageMediaRef = page.referencedMedia

	const items = f.blocks('list').map((item) => {
		const title = item.fields.find((field) => field.alias === 'title')?.text
		const hex = item.fields.find((field) => field.alias === 'backgroundColor')
			?.text
		const icon = item.fields.find((field) => field.alias === 'icon')?.mediaList
		const image = pageMediaRef.find((refMedia) => {
			if (icon && icon?.length > 0) {
				return refMedia._id === icon[0]._id
			}

			return null
		})
		const description = item.fields.find((field) => field.alias === 'title')
			?.html

		return {
			title,
			hex,
			image: {
				// eslint-disable-next-line n/prefer-global/process
				src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
				alt: image?.title ?? '',
			},
			alt: image?.title ?? '',
			description,
		}
	})

	const props = {
		caption: f.text('caption') ?? '',
		title: f.html('title') ?? '',
		items,
	}

	return getComponent<TInfoListBlock>(
		Block.InfoList,
		props,
		componentIdentifier,
		customComponent,
	)
}
