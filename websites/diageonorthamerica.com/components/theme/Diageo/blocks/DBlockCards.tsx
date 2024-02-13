import React from 'react'
import DContainer from '../DContainer'
import cn from 'classnames'

import Card from '../cards/DCard'

import { HeadingLevel } from '../../../../enums'
import { Icons as EnumsIcon } from '../../../../enumsIcon'
import { CardProps } from '../../../propTypes'
import { Link as LinkType } from '../../../../types'
import Heading from '../../plain/Heading'
import DLinkUnderline from '../DLinkUnderline'

export type enumCardCount = '2' | '3' | '4'

type BlockCardsProps = {
	cardCount: enumCardCount
	heading?: string
	headingLevel: HeadingLevel.H2 | HeadingLevel.H3
	reversed?: boolean
	items?: CardProps[]
	withBg?: boolean
	linkCta?: LinkType
}

function BlockCards({
	cardCount,
	heading,
	headingLevel,
	reversed,
	items,
	withBg,
	linkCta,
}: BlockCardsProps) {
	const cardClasses = cn({
		'block-cards--two-cards': cardCount === '2',
		'block-cards--three-cards': cardCount === '3',
		'block-cards--four-cards': cardCount === '4',
	})

	return (
		<section
			className={`block-cards 
        ${reversed ? 'block-cards--reversed' : ''}
        ${withBg ? 'block-cards--with-bg' : ''}
        ${cardClasses}`}
		>
			<DContainer>
				<div className="block-cards__inner">
					{heading && (
						<Heading
							heading={heading}
							headingLevel={headingLevel}
							className="block-cards__heading"
						/>
					)}
					<div className="block-cards__list">
						{items &&
							items.length &&
							items.map((card, index) => (
								<div key={index} className="block-cards__list-item">
									<Card {...card} />
								</div>
							))}
					</div>
				</div>
				{linkCta && linkCta.url && (
					<DLinkUnderline
						link={{
							name: linkCta.name,
							url: linkCta.url,
						}}
						icon={{
							icon: EnumsIcon.ArrowRight,
							size: 20,
						}}
						size="large"
					/>
				)}
			</DContainer>
		</section>
	)
}

export default BlockCards
