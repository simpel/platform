import React from 'react'

import { ImageProps } from 'components/propTypes'
import ImageBlockWithLink from './custom/ImageBlockWithLink'

export default function ImageBlock({
	image,
	centered,
	dimensions,
	isResponsive,
	alignItems,
	fixedSvg,
	isLegacy,
}: ImageProps) {
	return (
		<ImageBlockWithLink
			image={image}
			centered={centered}
			dimensions={dimensions}
			isResponsive={isResponsive}
			alignItems={alignItems}
			fixedSvg={fixedSvg}
			isLegacy={isLegacy}
		/>
	)
	// const center = classnames('flex', 'justify-center')
	// const imgurl = image ? image.url : ''
	// const wdesk = dimensions ? dimensions.widthDesk : 500
	// const hdesk = dimensions ? dimensions.heightDesk : 400
	// let cropped1 = ''

	// if (imgurl && imgurl.length > 0) {
	//   // cropped1 = imgurl.replace(
	//   //   `d3cpanmcca5z4p.cloudfront.net/PR1346a`,
	//   //   `d1gdpwj97lps0w.cloudfront.net/${wdesk}x${hdesk}/PR1346a`,
	//   // )
	//   if (wdesk === 0 && hdesk === 0) {
	//     cropped1 = process.env.NEXT_PUBLIC_MEDIACROP + `` + process.env.NEXT_PUBLIC_MEDIAPREFIX + imgurl
	//   } else {
	//     cropped1 = process.env.NEXT_PUBLIC_MEDIACROP + `/${wdesk}x${hdesk}` + process.env.NEXT_PUBLIC_MEDIAPREFIX + imgurl
	//   }
	// }

	// const pureimg = dimensions ? dimensions.pureimage : false
	// // original : https://d3cpanmcca5z4p.cloudfront.net/PR1346a/aws/media/y2ensz4z/ali.jpg
	// // cropped:  https://d1gdpwj97lps0w.cloudfront.net/fit-in/600x400/PR1346a/aws/media/y2ensz4z/ali.jpg
	// if (pureimg) {
	//   return <>{image && <img src={cropped1} alt={image.alt} className={dimensions?.styleDesk} />}</>
	// } else {
	//   return (
	//     <div className={`image-box ${classnames({ [center]: centered })}`}>
	//       {image && <img src={cropped1} alt={image.alt} className={`fit-to-object ${dimensions?.styleDesk} `} />}
	//     </div>
	//   )
	// }
}
