import { useFields } from 'context/fields'
import { type BlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import {
	type TNotification,
	type TRowHeroBlock,
} from 'components/theme/plain/RowHeroBlock/TRowHeroBlock'

export default function BlockRowHero({
	customComponent,
}: BlockProps<TRowHeroBlock>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	const items = f.blocks('list').map((item): TNotification | undefined => {
		const title = item.fields.find((field) => field.alias === 'title')?.html
		const caption = item.fields.find((field) => field.alias === 'intro')?.text

		return title && caption
			? {
					title,
					caption,
			  }
			: undefined
	})

	const image = f.imageRefStandard('image')
	const link = f.link('link')

	const props = {
		caption: f.text('caption') ?? '',
		title: f.html('title') ?? '',
		image: image
			? {
					// eslint-disable-next-line n/prefer-global/process
					src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image?.url}`,
					alt: image.alt ?? '',
			  }
			: null,
		hex: f.text('backgroundColor') ?? '',
		link,
		notification: items.length > 0 ? items[0] : undefined,
	}

	return getComponent<TRowHeroBlock>(
		Block.RowHero,
		props,
		componentIdentifier,
		customComponent,
	)
}
