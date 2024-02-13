import { type CareersCarouselBlockProps } from 'components/propTypes'
import WhyJoinUsCarousel from 'components/styled-components/Careers/carousel/WhyJoinUsCarousel'
import React from 'react'

export default function CareersCarouselBlock(props: CareersCarouselBlockProps) {
	const { blockRichTextTitle, items = [], blockTheme } = props

	return (
		<WhyJoinUsCarousel
			cards={items.map((card) => ({
				gradient: blockTheme,
				title: card.richTextTitle,
				text: card.richTextBody,
				itemLink: card.itemLink,
				linkCta: undefined,
				imageSrc: `${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${card.itemImage.url}`,
				imageAlt: card.authorImage.alt,
				quote: card.quoteText,
				personName: `${card.authorName}`,
				personPosition: card.authorSubtext,
				personSrc: `${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${card.authorImage.url}`,
				personSrcAlt: card.authorImage.alt,
			}))}
			richTextTitle={blockRichTextTitle}
		/>
	)
}
