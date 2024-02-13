import React from 'react'

import DContainer from '../Diageo/DContainer'
import DBrandCard from '../Diageo/cards/DBrandCard'
import { HeadingLevel } from '../../../enums'
import Heading from './Heading'
import { CardProps } from '../../propTypes'
import { BrandCardType } from '../../../enums'

type BenefitsTypes = {
	heading?: string
	items?: CardProps[]
}

function Benefits({ heading, items }: BenefitsTypes) {
	return (
		<section className="block-benefits">
			<DContainer>
				{heading && (
					<Heading
						heading={heading}
						className="block-benefits__heading font-bold text-align--center"
						headingLevel={HeadingLevel.H3}
					/>
				)}
				<div className="block-benefits__list">
					{items &&
						items.length &&
						items.map((item) => (
							<div key={item._id} className="block-benefits__list-col">
								<DBrandCard
									_id={item._id}
									image={item.image}
									title={item.title}
									text={item.text}
									linkCta={item.linkCta}
									typeCard={BrandCardType.benefit}
								/>
							</div>
						))}
				</div>
			</DContainer>
		</section>
	)
}

export default Benefits
