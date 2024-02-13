import React from 'react'
import { HeadingLevel } from '../../../../enums'
import Heading from '../../plain/Heading'
import DSocietyTarget from '../DSocietyTarget'

type DSocietyTargetProps = {
	_id?: string | number
	text: string
	track?: string
}

type DBlockSocietyTargetProps = {
	heading?: string
	items: DSocietyTargetProps[]
}

function DBlockSocietyTarget({ heading, items }: DBlockSocietyTargetProps) {
	return (
		<section className="block-society-target">
			{heading && (
				<Heading
					className="block-society-target__heading"
					heading={heading}
					headingLevel={HeadingLevel.H3}
				/>
			)}
			<div className="block-society-target__list">
				{items &&
					items.length &&
					items.map((target) => (
						<DSocietyTarget key={target._id} text={target.text} />
					))}
			</div>
		</section>
	)
}

export default DBlockSocietyTarget
