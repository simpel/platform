import { RowHero, RichTextTitle, Badge } from '@diageo/designsystem'
import Image from 'next/image'
import Link from 'next/link'
import { type TRowHeroBlock } from './TRowHeroBlock'

const RowHeroBlock = ({
	title,
	caption,
	image,
	hex,
	link,
	notification,
}: TRowHeroBlock) => {
	return (
		<RowHero
			caption={caption}
			title={title && <RichTextTitle html={title} />}
			background={`#${hex}`}
			image={<Image fill src={image?.src ?? ''} alt={image?.alt ?? ''} />}
			link={
				link?.url ? (
					<Link href={link?.url} target={link?.target}>
						<Badge label={link?.name} />
					</Link>
				) : undefined
			}
			notification={
				notification
					? {
							...notification,
							title: <RichTextTitle html={notification?.title ?? ''} />,
							caption: notification.caption ?? '',
							background: 'linear-gradient(180deg, #FFF 25.56%, #F0DFF6 100%)',
					  }
					: undefined
			}
		/>
	)
}

export default RowHeroBlock
