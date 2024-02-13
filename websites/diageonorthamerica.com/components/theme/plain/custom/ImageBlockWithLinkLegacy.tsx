import React from 'react'
import { ImageWithLinkProps } from 'components/propTypes'
import classnames from 'classnames'
import Link from 'next/link'

export default function ImageBlockWithLinkLegacy({
	image,
	centered,
	dimensions,
	link,
}: ImageWithLinkProps) {
	const center = classnames('flex', 'justify-center')
	const imgurl = image ? image.url : ''
	const wdesk = dimensions ? dimensions.widthDesk : 500
	const hdesk = dimensions ? dimensions.heightDesk : 400
	let cropped1 = ''
	// let nextImage = true // this can be reinstated maybe?

	if (image?.url?.includes('.svg')) {
		return (
			<div className={`image-box`}>
				{image && (
					<img
						src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image.url}`}
						alt={image.alt}
						style={wdesk && wdesk > 0 ? { maxWidth: wdesk } : {}}
						className={`fit-to-object `}
					/>
				)}
			</div>
		)
	}

	if (image && image.url && image.url.length > 0) {
		// if (wdesk === 0 || hdesk === 0) {
		//   nextImage = false
		// }

		if (imgurl && imgurl.length > 0) {
			// cropped1 = imgurl.replace(
			//   `d3cpanmcca5z4p.cloudfront.net/PR1346a`,
			//   `d1gdpwj97lps0w.cloudfront.net/${wdesk}x${hdesk}/PR1346a`,
			// )
			if (wdesk === 0 && hdesk === 0) {
				cropped1 =
					process.env.NEXT_PUBLIC_MEDIACROP +
					`/filters:quality(85)` +
					process.env.NEXT_PUBLIC_MEDIAPREFIX +
					imgurl
			} else {
				cropped1 =
					process.env.NEXT_PUBLIC_MEDIACROP +
					`/${wdesk}x${hdesk}/filters:quality(85)` +
					process.env.NEXT_PUBLIC_MEDIAPREFIX +
					imgurl
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
					process.env.NEXT_PUBLIC_MEDIAPREFIX +
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
								<img
									src={cropped1}
									alt={image.alt}
									className={dimensions?.styleDesk}
								/>
							)}
						</Link>
					)
				} else if (link && link.mediaId && link.mediaId.length) {
					return (
						<a href={mediaUrl} target="_blank" rel="noreferrer">
							{image && (
								<img
									src={cropped1}
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
								<img
									src={cropped1}
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
										<img
											src={cropped1}
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
				return (
					<>
						{image && (
							<img
								src={cropped1}
								alt={image.alt}
								className={dimensions?.styleDesk}
							/>
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
									<img
										src={cropped1}
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
									<img
										src={cropped1}
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
									<img
										src={cropped1}
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
										<img
											src={cropped1}
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
					<div className={`image-box ${classnames({ [center]: centered })}`}>
						{image && (
							<img
								src={cropped1}
								alt={image.alt}
								className={`fit-to-object ${dimensions?.styleDesk} `}
							/>
						)}
					</div>
				)
			}
		}
	} else {
		return <></>
	}
}
