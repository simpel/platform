import React from 'react'
import { AccordionBlockProps } from '../../../components/propTypes'
import DAccordion from '../Diageo/DAccordion'

export default function LargeAccordianBlock({
	items,
	blockTheme,
}: AccordionBlockProps) {
	return (
		<div className={`accordion-block ${blockTheme ? blockTheme : ''}`}>
			{items && items.length
				? items.map((item, index) => (
						<DAccordion
							key={index}
							heading={item.heading}
							richText={item.richText}
							letter={`Q${++index}`}
							image={item.image}
							className="accordion--careers"
						/>
				  ))
				: ''}
		</div>
	)
}
