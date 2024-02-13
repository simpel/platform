import Link from 'next/link'
import Image from 'next/image'
import { CorporateStories, RichTextTitle } from '@diageo/designsystem'
import { type TCorporateStoriesBlock } from './TCorporateStoriesBlock'

const CorporateStoriesBlock = ({
	title,
	paginationLabel,
	items,
	viewAllLink,
	icon,
	slider = false,
}: TCorporateStoriesBlock) => {
	return (
		<CorporateStories
			viewAllLink={
				<Link href={viewAllLink?.url ?? ''} {...viewAllLink}>
					{viewAllLink?.name}
				</Link>
			}
			slider={
				slider
					? {
							paginationLabel,
							icon: icon && (
								<Image width={80} height={80} src={icon.src} alt={icon.alt} />
							),
					  }
					: undefined
			}
			title={<RichTextTitle html={title ?? ''} />}
			items={items.map((item) => ({
				...item,
				title: <h3>{item.title}</h3>,
				image: item?.image?.src && (
					<Image
						width={600}
						height={600}
						src={item.image.src}
						alt={item.image.alt}
					/>
				),
			}))}
		/>
	)
}

export default CorporateStoriesBlock
