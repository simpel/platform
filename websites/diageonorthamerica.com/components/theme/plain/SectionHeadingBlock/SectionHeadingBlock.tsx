import {
	RichTextBody,
	RichTextTitle,
	SectionHeading,
} from '@diageo/designsystem'
import { type TSectionHeadingBlock } from './TSectionHeadingBlock'

const getBackground = (hex: string) => {
	switch (hex) {
		case 'e6f4ff': {
			return 'linear-gradient(90deg, #E8F5FF 67.5674%, #F6E7FF 100%)'
		}

		default: {
			return ''
		}
	}
}

const SectionHeadingBlock = ({
	caption,
	title,
	body,
	hex,
}: TSectionHeadingBlock) => {
	const background = getBackground(hex)

	return (
		<SectionHeading
			caption={caption}
			heading={<RichTextTitle html={title} />}
			body={body && <RichTextBody html={body} />}
			columns={body ? 2 : 1}
			background={background}
		/>
	)
}

export default SectionHeadingBlock
