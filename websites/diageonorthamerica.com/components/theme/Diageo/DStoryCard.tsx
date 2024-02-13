import React from 'react'
import Link from 'next/link'
import Image from '../plain/Image'
import Heading from '../plain/Heading'
import { HeadingLevel } from '../../../enums'
import IcoMoonIcon from '../plain/IcoMoonIcon'
import { Icons as EnumIcons } from '../../../enumsIcon'
import { StoryCardProps } from '../../propTypes'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { FixMediaPathsInHtml } from 'utilities/functions'
import LinkHelper2 from '../plain/custom/LinkHelper2'
import ImageBlock from '../plain/Image'

function DStoryCard({
	image,
	title,
	title2,
	text,
	playIcon,
	link,
	videoUrl,
	dimensions,
	articleDate,
	extImage,
	itemLink,
	onImageClick,
}: StoryCardProps) {
	const ImageCard = () => {
		const imgUrl = image
		return (
			<>
				{extImage && <img src={imgUrl.url || ''} alt={title || 'Video'} />}
				{!extImage && (
					<ImageBlock
						image={image}
						dimensions={{
							widthDesk: 540,
							heightDesk: 310,
							styleDesk: 'fit-to-object',
							pureimage: true,
						}}
						isLegacy={true}
					/>
				)}
				{playIcon ? (
					<IcoMoonIcon
						icon={EnumIcons.Play}
						size={32}
						className="story-card__image-icon flex flex-align-center flex-justify-center"
						color="white"
					/>
				) : null}
			</>
		)
	}

	const handleClick = () => {
		if (onImageClick && videoUrl) {
			onImageClick(videoUrl)
		}
	}

	return (
		<div className="story-card">
			{link?.url ? (
				<Link
					href={`${link.url}`}
					className="story-card__image next-image-initial"
				>
					<ImageCard />
				</Link>
			) : (
				<div
					tabIndex={0}
					className="story-card__image next-image-initial"
					onClick={handleClick}
				>
					<ImageCard />
				</div>
			)}
			<div className="story-card__body">
				{articleDate && <p>{getBaseDateFormat(articleDate)}</p>}
				{link?.url && title && title !== '' ? (
					<>
						<Link href={`${link.url}`}>
							<Heading
								heading={title || ''}
								headingLevel={HeadingLevel.H4}
								className="story-card__pre-heading "
							/>
						</Link>
					</>
				) : (
					<>
						{title && title !== '' && (
							<Heading
								heading={title || ''}
								headingLevel={HeadingLevel.H4}
								className="story-card__pre-heading "
							/>
						)}
					</>
				)}

				{title2 && title2 !== '' && link?.url ? (
					<Link href={`${link.url}`} className="story-card__heading-link">
						<Heading
							heading={title2 || ''}
							headingLevel={HeadingLevel.H4}
							className="story-card__heading"
						/>
					</Link>
				) : (
					<>
						{title2 && title2 !== '' && (
							<Heading
								heading={title2 || ''}
								headingLevel={HeadingLevel.H4}
								className="story-card__heading"
							/>
						)}
					</>
				)}
				{text && (
					<div
						dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(text) }}
					/>
				)}
				{itemLink && (
					<LinkHelper2
						name={itemLink.name}
						url={itemLink.url}
						contentId={itemLink.contentId}
						mediaId={itemLink.contentId}
						target={itemLink.target}
						linkClass={''}
						divClass={''}
						showicon={true}
					/>
				)}
			</div>
		</div>
	)
}

export default DStoryCard
