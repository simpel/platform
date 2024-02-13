import React from 'react'
import { AccordionBlockProps } from '../../../components/propTypes'
import DAccordion from '../Diageo/DAccordion'

export default function AccordionBlock({
	items,
	blockTheme,
	wider,
}: AccordionBlockProps) {
	let widthClass = 'flex-col-md-8'
	if (wider) {
		widthClass = 'flex-col-md-10'
	}
	return (
		<section className="flex-container-wrapper -mb-5">
			<div className="flex-row flex-row--align-h-center">
				<div className={widthClass}>
					<div className={`accordion-block ${blockTheme ? blockTheme : ''}`}>
						{items && items.length
							? items.map((item, index) => (
									<DAccordion
										key={index}
										heading={item.heading}
										richText={item.richText}
									/>
							  ))
							: ''}
					</div>
				</div>
			</div>
		</section>
	)
}
