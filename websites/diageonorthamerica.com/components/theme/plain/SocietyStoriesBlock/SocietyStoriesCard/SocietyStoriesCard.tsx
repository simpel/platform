import React from 'react'
import classNames from 'classnames'
import styles from './SocietyStoriesCard.module.scss'
import Link from 'next/link'
import Image from 'next/legacy/image'

export interface SocietyStoriesCardProperties {
	heading: string
	date: string
	tags: string[]
	imageUrl: string
	link: string
	isBig?: boolean
}

function SocietyStoriesCard({
	heading,
	date,
	tags,
	imageUrl,
	link = '/',
	isBig = false,
}: SocietyStoriesCardProperties) {
	const renderTags = () => {
		if (!tags || tags.length === 0) {
			return null
		}

		return (
			<ul className={styles.tags}>
				{tags.map((tag, index) => (
					<li key={index}>{tag}</li>
				))}
			</ul>
		)
	}

	return (
		<div
			className={classNames({
				[styles.card]: true,
				[styles.small]: !isBig,
				[styles.big]: isBig,
			})}
		>
			{imageUrl && imageUrl !== '' ? (
				<Link href={link} className={styles.imageLink}>
					{/* <img src={imageUrl} alt={heading} /> */}
					<Image
						src={imageUrl}
						alt={heading}
						objectFit="cover"
						width={656}
						height={656}
						quality={60}
					/>
				</Link>
			) : null}
			<div className={styles.cardContent}>
				<div>
					<p className={styles.dateAndLabel}>
						<time dateTime={date}>{date}</time> | Story
					</p>
					{heading && (
						<h4>
							<Link href={link}>{heading}</Link>
						</h4>
					)}
				</div>
				{renderTags()}
			</div>
		</div>
	)
}

export default SocietyStoriesCard
