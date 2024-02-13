import React from 'react'
import DContainer from '../DContainer'

import Card from '../cards/DCard'
import { CardProps } from '../../../propTypes'

import { HeadingLevel } from '../../../../enums'
import Heading from '../../plain/Heading'

type BlockCardProps = {
	heading?: string
	card: CardProps
}

function BlockCard({ heading, card }: BlockCardProps) {
	return (
		<section className="block-card">
			<DContainer>
				{heading && (
					<Heading
						className="block-card__heading"
						heading={heading}
						headingLevel={HeadingLevel.H3}
					/>
				)}
				<Card {...card} />
			</DContainer>
		</section>
	)
}

export default BlockCard
