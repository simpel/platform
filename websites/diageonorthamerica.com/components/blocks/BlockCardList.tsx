import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import {
	type TCardListBlock,
	type TItem,
} from 'components/theme/plain/CardListBlock/TCardListBlock'

export default function BlockCardList({
	customComponent,
}: BlockProps<TCardListBlock>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')
	const pageMediaRef = page.referencedMedia

	const items = f.blocks('list').map((item): TItem => {
		const title = item.fields.find((field) => field.alias === 'title')?.html
		const body = item.fields.find((field) => field.alias === 'description')
			?.html
		const hex = item.fields.find((field) => field.alias === 'backgroundColor')
			?.text
		const icon = item.fields.find((field) => field.alias === 'icon')?.mediaList
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

	const props = {
		body: f.html('body') ?? '',
		title: f.html('title') ?? '',
		items,
	}

	return getComponent<TCardListBlock>(
		Block.CardList,
		props,
		componentIdentifier,
		customComponent,
	)
}
