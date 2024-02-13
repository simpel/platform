import React from 'react'
import ImageBlock from 'components/theme/plain/Image'
import { useLocale } from 'context/locale'
import { ContentBlock, Media } from 'types'

type FooterLogoProp = {
	item?: ContentBlock
}

type FooterLogosProp = {
	logoList: ContentBlock[]
}

function FooterLogo({ item }: FooterLogoProp) {
	let alttext = ''
	let imgurl = ''
	const [{ localePage }] = useLocale()

	const dimensions = {
		styleDesk: '',
		widthDesk: 130,
		heightDesk: 110,
		pureimage: true,
	}

	if (item && item.fields) {
		alttext = item.fields[0].text as string

		if (localePage.referencedMedia) {
			const field = item?.fields[1]
			const mediaList = field?.mediaList
			if (Array.isArray(mediaList) && mediaList?.length !== 0) {
				const mediaid = mediaList[0]?._id
				if (mediaid != null) {
					const thisimage = localePage.referencedMedia.find(
						(m) => m._id === mediaid,
					) as Media
					if (thisimage) {
						imgurl = thisimage.url
					}
				}
			}
		}
		const immg = { _id: '----', url: imgurl, alt: alttext }
		return (
			<div className="footer__brand-logos">
				<ImageBlock image={immg} dimensions={dimensions} fixedSvg />
			</div>
		)
	} else {
		return <></>
	}
}

export default function FooterLogos({ logoList }: FooterLogosProp) {
	return (
		<>
			{logoList.map((child, key) => (
				<FooterLogo key={key} item={child}></FooterLogo>
			))}
		</>
	)
}
