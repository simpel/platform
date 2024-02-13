import React from 'react'
import Image from 'next/legacy/image'
import { ImageWithLinkProps } from 'components/propTypes'
import classnames from 'classnames'
import Link from 'next/link'

export default function ImageBlockWithLink({
	image,
	centered,
	alignItems,
	dimensions,
	link,
	isResponsive,
	isLegacy,
}: ImageWithLinkProps) {
	const center = classnames('flex', 'justify-center')
	const imgurl = image ? image.url : ''
	const wdesk = dimensions ? dimensions.widthDesk : 500
	const hdesk = dimensions ? dimensions.heightDesk : 400
	let imagepath = ''
	let croppedpath = ''
	// if (isLegacy) {
	//   console.log('isLegacy', image)
	// }
	// console.log(`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${imgurl}`)
	// console.log(process.env.NEXT_PUBLIC_MEDIACROP + `/filters:quality(85)` + process.env.NEXT_PUBLIC_MEDIAHOST + imgurl)

	// if (image?.url?.includes('.svg')) {
	//   return (
	//     <div className={`image-box`}>
	//       {image && (
	//         <img
	//           src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${imgurl}`}
	//           alt={image.alt}
	//           style={wdesk && wdesk > 0 ? { maxWidth: wdesk } : {}}
	//           className={`fit-to-object `}
	//         />
	//       )}
	//     </div>
	//   )
	// }
	if (image?.url?.includes('.svg')) {
		return (
			<div className={`image-box`}>
				{image && (
					<Image
						// placeholder="blur"
						// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
						src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${imgurl}`}
						alt={image.alt}
						// style={wdesk && wdesk > 0 ? { maxWidth: wdesk } : {}}
						// className={`fit-to-object `}
						// layout={isTest ?  "fill" : "fill"}
						quality={60}
						// width='100%'
						// height='100%'
						objectFit="contain"
						width={wdesk} // 500
						height={hdesk} // 200
					/>
				)}
			</div>
		)
	}

	if (image && image.url && image.url.length > 0) {
		if (imgurl && imgurl.length > 0) {
			// cropped1 = imgurl.replace(
			//   `d3cpanmcca5z4p.cloudfront.net/PR1346a`,
			//   `d1gdpwj97lps0w.cloudfront.net/${wdesk}x${hdesk}/PR1346a`,
			// )
			if (wdesk === 0 && hdesk === 0) {
				imagepath = `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${imgurl}`
				// process.env.NEXT_PUBLIC_MEDIACROP + `/filters:quality(85)` + process.env.NEXT_PUBLIC_MEDIAHOST + imgurl
			} else {
				imagepath = `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${imgurl}`
				croppedpath = `${process.env.NEXT_PUBLIC_MEDIACROP}/${wdesk}x${hdesk}/filters:quality(88)${process.env.NEXT_PUBLIC_MEDIAPREFIX}${imgurl}`
				//cropped1 = `${process.env.NEXT_PUBLIC_MEDIACROP}/${wdesk}x${hdesk}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${imgurl}`
				// process.env.NEXT_PUBLIC_MEDIACROP +
				// `/${wdesk}x${hdesk}/filters:quality(85)` +
				// process.env.NEXT_PUBLIC_MEDIAHOST +
				// imgurl
			}
		}

		const pureimg = dimensions ? dimensions.pureimage : false
		const useLink = link && link.url && link.url.length
		let mediaUrl = ''

		if (useLink) {
			if (link && link.mediaId && link.mediaId.length) {
				mediaUrl =
					process.env.NEXT_PUBLIC_MEDIAHOST +
					`` +
					process.env.NEXT_PUBLIC_MEDIAHOST +
					link.url
			}
		}
		// original : https://d3cpanmcca5z4p.cloudfront.net/PR1346a/aws/media/y2ensz4z/ali.jpg
		// cropped:  https://d1gdpwj97lps0w.cloudfront.net/fit-in/600x400/PR1346a/aws/media/y2ensz4z/ali.jpg

		if (pureimg) {
			if (useLink) {
				if (link && link.contentId && link.contentId.length) {
					return (
						<Link href={link.url}>
							{image && (
								<Image
									// placeholder="blur"
									quality={60}
									// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
									width={wdesk}
									height={hdesk}
									src={imagepath}
									alt={image.alt}
									className={dimensions?.styleDesk}
								/>
							)}{' '}
						</Link>
					)
				} else if (link && link.mediaId && link.mediaId.length) {
					return (
						<a href={mediaUrl} target="_blank" rel="noreferrer">
							{image && (
								<Image
									// placeholder="blur"
									quality={60}
									// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
									width={wdesk}
									height={hdesk}
									src={imagepath}
									alt={image.alt}
									className={dimensions?.styleDesk}
								/>
							)}
						</a>
					)
				} else if (link && link.target && link.target === '_blank') {
					return (
						<a href={link.url} target="_blank" rel="noreferrer">
							{image && (
								<Image
									// placeholder="blur"
									quality={60}
									// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
									width={wdesk}
									height={hdesk}
									src={imagepath}
									alt={image.alt}
									className={dimensions?.styleDesk}
								/>
							)}
						</a>
					)
				} else {
					return (
						<>
							{link && (
								<Link href={link.url}>
									{image && (
										<Image
											// placeholder="blur"
											quality={60}
											// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
											width={wdesk}
											height={hdesk}
											src={imagepath}
											alt={image.alt}
											className={dimensions?.styleDesk}
										/>
									)}
								</Link>
							)}
						</>
					)
				}
			} else {
				// if (true) {
				//   return <img src={cropped1} style={{ width: '100%' }} />
				//   // return <ImageBlockWithLinkLegacy image={image}
				//   // centered={centered}
				//   // dimensions={dimensions}
				//   // link={link}
				//   //  />
				// }
				return (
					<>
						{image && (
							<>
								{isLegacy ? (
									<img
										style={{ maxWidth: '100%' }}
										src={croppedpath}
										alt={image?.alt}
										loading="lazy"
									/>
								) : (
									<Image
										// placeholder="blur"
										quality={100}
										// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
										layout={isResponsive ? 'responsive' : undefined}
										width={wdesk}
										height={hdesk}
										src={imagepath}
										alt={image?.alt}
										className={`${dimensions?.styleDesk}`}
										// height="100%"
										// width="100%"
										objectFit="contain"
									/>
								)}
								{/* <Image
                  // placeholder="blur"
                  quality={60}
                  // blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  layout={isResponsive ? 'responsive' : undefined}
                  width={wdesk}
                  height={hdesk}
                  src={cropped1}
                  alt={image.alt}
                  // className={`${dimensions?.styleDesk}`}
                  // height="100%"
                  // width="100%"
                  objectFit="cover"
                /> */}
							</>
						)}
					</>
				)
			}
		} else {
			if (useLink) {
				if (link && link.contentId && link.contentId.length) {
					return (
						<div className={`image-box ${classnames({ [center]: centered })}`}>
							<Link href={link.url}>
								{image && (
									<Image
										// placeholder="blur"
										quality={60}
										// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
										width={wdesk}
										height={hdesk}
										src={imagepath}
										alt={image.alt}
										className={`fit-to-object ${dimensions?.styleDesk} `}
									/>
								)}
							</Link>
						</div>
					)
				} else if (link && link.mediaId && link.mediaId.length) {
					return (
						<div className={`image-box ${classnames({ [center]: centered })}`}>
							<a href={mediaUrl} target="_blank" rel="noreferrer">
								{image && (
									<Image
										// placeholder="blur"
										quality={60}
										// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
										width={wdesk}
										height={hdesk}
										src={imagepath}
										alt={image.alt}
										className={`fit-to-object ${dimensions?.styleDesk} `}
									/>
								)}
							</a>
						</div>
					)
				} else if (link && link.target && link.target === '_blank') {
					return (
						<div className={`image-box ${classnames({ [center]: centered })}`}>
							<a href={link.url} target="_blank" rel="noreferrer">
								{image && (
									<Image
										// placeholder="blur"
										quality={60}
										// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
										width={wdesk}
										height={hdesk}
										src={imagepath}
										alt={image.alt}
										className={`fit-to-object ${dimensions?.styleDesk} `}
									/>
								)}
							</a>
						</div>
					)
				} else {
					return (
						<div className={`image-box ${classnames({ [center]: centered })}`}>
							{link && (
								<Link href={link.url}>
									{image && (
										<Image
											// placeholder="blur"
											quality={60}
											// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
											width={wdesk}
											height={hdesk}
											src={imagepath}
											alt={image.alt}
											className={`fit-to-object ${dimensions?.styleDesk} `}
										/>
									)}
								</Link>
							)}
						</div>
					)
				}
			} else {
				return (
					<div
						className={`image-box ${classnames({
							[center]: centered,
							['align-items']: alignItems,
						})}`}
					>
						{image && (
							<div style={{ width: '100%' }}>
								<Image
									// placeholder="blur"
									quality={60}
									// blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
									layout="responsive"
									width={wdesk}
									height={hdesk}
									src={imagepath}
									alt={image.alt}
									className={`fit-to-object ${dimensions?.styleDesk} `}
								/>
							</div>
						)}
					</div>
				)
			}
		}
	} else {
		return <></>
	}
}
