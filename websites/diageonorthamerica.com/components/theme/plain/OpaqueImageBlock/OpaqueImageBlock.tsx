import Image from 'next/image'
import { Badge, RichTextTitle, TwoColumnHero } from '@diageo/designsystem'
import Link from 'next/link'
import { type TOpaqueImageBlock } from './TOpaqueImageBlock'

const OpaqueImageBlock = ({ heading, link, image }: TOpaqueImageBlock) => {
	return (
		<TwoColumnHero
			heading={<RichTextTitle html={heading} />}
			rightContent={
				<Image
					src={image.url ?? ''}
					alt={image.alt ?? ''}
					width={1220}
					height={860}
				/>
			}
			background="#64B0C6"
		>
			{link?.name && link?.url && (
				<Link href={link.url}>
					<Badge label={link.name} />
				</Link>
			)}
		</TwoColumnHero>
	)
}

export default OpaqueImageBlock
