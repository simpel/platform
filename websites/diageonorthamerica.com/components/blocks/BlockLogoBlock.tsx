import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { type MediaRef } from 'types'
import { type TLogoBlock } from 'components/theme/plain/LogoBlock/TLogoBlock'

export default function BlockLogoBlock({
	customComponent,
}: BlockProps<TLogoBlock>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	const getImage = (media: MediaRef | undefined) => {
		if (media) {
			return page.referencedMedia.find((refMedia) => refMedia._id === media._id)
		}

		return undefined
	}

	const items = f.blocks('blocks').map((block) => {
		const media = getImage(
			block.fields.find((field) => field.alias === 'image')?.mediaList?.[0],
		)
		const link = block.fields.find((field) => field.alias === 'link')?.link

		return {
			image: {
				// eslint-disable-next-line n/prefer-global/process
				src: `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${media?.url}`,
				alt: media?.title ?? '',
			},
			link,
		}
	})

	const props = {
		title: f.html('title'),
		backgroundColor: f.text('backgroundColor'),
		items,
	}

	return getComponent<TLogoBlock>(
		Block.LogoBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
