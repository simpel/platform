import {
	ColumnSection,
	RichTextTitle,
	RichTextBody,
} from '@diageo/designsystem'
import Link from 'next/link'
import { type TColumnSectionBlock } from './TColumnSectionBlock'

const ColumnSectionBlock = ({ title, caption, items }: TColumnSectionBlock) => {
	return (
		<ColumnSection
			caption={caption}
			title={<RichTextTitle html={title ?? ''} />}
			items={items.map((item) => ({
				link: item?.link?.href && (
					<Link {...item.link} href={item.link.href}>
						{item.link?.label}
					</Link>
				),
				body: <RichTextBody html={item.body ?? ''} />,
			}))}
		/>
	)
}

export default ColumnSectionBlock
