import React from 'react'
import cn from 'classnames'
import { useMediaQuery } from 'hooks/useMediaQuery/useMediaQuery'
import DContainer from '../DContainer'
import DBreadcrumbs from '../DBreadcrumbs'
import DAudioPlayer from '../DAudioPlayer'
import Author from '../DAuthor'
import DTagsList from '../DTagsList'
import media from '../../../../constants/media'

import { type AudioProp, type AuthorProps } from '../../../propTypes'
import { type PartialPage } from '../../../../types'

type TTagsProp = {
	title: string
}

type TBlockIntro = {
	title: string
	description: string
	breadcrumbs: PartialPage[]
	categories?: any[]
	tags?: TTagsProp[]
	bgColor?: 'violet' | 'orange' | 'yellow'
	audio?: AudioProp
	hasExtraPadding?: boolean
	author?: AuthorProps
}

function BlockIntro({
	title,
	description,
	breadcrumbs,
	categories,
	tags,
	bgColor,
	hasExtraPadding,
	audio,
	author,
}: TBlockIntro) {
	const typeBgIntro = cn({
		'block-intro--violet bg-color-header-gradient-vertical-4':
			bgColor === 'violet',
		'block-intro--orange': bgColor === 'orange',
		'block-intro--yellow': bgColor === 'yellow',
	})

	const typeBgIntroContent = cn({
		'block-intro--without-description': description && categories,
		'block-intro--with-extra-padding': hasExtraPadding,
	})

	const isTablet = useMediaQuery(`(min-width: ${media.tablet}px)`)

	return (
		<section className={`block-intro ${typeBgIntro} ${typeBgIntroContent}`}>
			<DContainer>
				<div className="block-intro__top">
					<div className="block-intro__main-content">
						<DBreadcrumbs breadcrumbs={breadcrumbs} />
						<div
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: title }}
							className="block-intro__heading h1 font-semibold"
						/>
						{tags && (
							<ul className="block-intro__tags bare-list flex flex-wrap">
								{tags.map((tag, key) => (
									// eslint-disable-next-line react/no-array-index-key
									<li key={key}>
										{key === tags.length - 1 ? (
											tag.title
										) : (
											<>
												<span>{tag.title}</span>
												{tags.length > 1 && (
													<span className="block-intro__tags-separate">|</span>
												)}
											</>
										)}
									</li>
								))}
							</ul>
						)}

						{isTablet && audio?.audioLink && <DAudioPlayer {...audio} />}
					</div>
					<div className="block-intro__description">
						<p className="block-intro__description-text font-light">
							{description}
						</p>
						{categories && <DTagsList categories={categories} />}
					</div>
				</div>
				<div className="block-intro__bottom">
					{author && (
						<div className="block-intro__author-block">
							<Author {...author} />
						</div>
					)}
				</div>

				{!isTablet && audio && audio.audioLink && <DAudioPlayer {...audio} />}
			</DContainer>
		</section>
	)
}

export default BlockIntro
