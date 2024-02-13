import React from 'react'

import { HeadingLevel } from '../../../enums'
import { Icons as EnumsIcon } from '../../../enumsIcon'
import { Image as ImageType, Link as LinkType } from 'types'
import Heading from '../plain/Heading'
import DLinkUnderline from './DLinkUnderline'
import Image from '../plain/Image'
import { FixMediaPathsInHtml } from 'utilities/functions'

type SocietyPostProps = {
	heading: string
	headingLogo?: ImageType
	image: ImageType
	subHeading: string
	text?: string
	linkCta?: LinkType
}

function DSocietyPost({
	heading,
	headingLogo,
	image,
	subHeading,
	text,
	linkCta,
}: SocietyPostProps) {
	return (
		<div className="society-post">
			<div
				className={`society-post__heading-wrapper${
					headingLogo ? ' with-logo' : ''
				}`}
			>
				{headingLogo && (
					<div className="society-post__heading-logo">
						<Image image={headingLogo} />
					</div>
				)}
				{heading && heading.length > 0 && (
					<Heading
						heading={heading}
						headingLevel={HeadingLevel.H3}
						className="society-post__heading"
					/>
				)}
			</div>
			{image && image.url && (
				<div className="society-post__image">
					<Image image={image} />
				</div>
			)}
			<div className="society-post__body">
				{subHeading && <p className="society-post__subheading">{subHeading}</p>}
				{text && (
					<div
						className="society-post__text"
						dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(text) }}
					></div>
				)}
				{linkCta && linkCta.url && (
					<DLinkUnderline
						link={{
							name: linkCta.name,
							url: linkCta.url,
						}}
						icon={{
							icon: EnumsIcon.ArrowRight,
						}}
						size="medium"
					/>
				)}
			</div>
		</div>
	)
}

export default DSocietyPost
