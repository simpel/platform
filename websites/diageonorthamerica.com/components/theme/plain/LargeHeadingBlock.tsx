import React from 'react'
import { LargeHeadingBlockProps } from '../../../components/propTypes'

export default function LargeHeadingBlock({
	richTextHeading,
}: LargeHeadingBlockProps) {
	//const sectionClass = 'flex-col-md-12 h2 '
	const sectionClass = 'h2 '
	return (
		// <section className="flex-container-wrapper -mt-7">
		//   <div className="flex-row no-gutters">
		//     <div className={sectionClass} dangerouslySetInnerHTML={{ __html: richTextHeading }}></div>
		//   </div>
		// </section>
		<section className={'content-block--contact -mt-7'}>
			<div className="block-banner">
				<div className="flex-container-wrapper">
					<div
						className={sectionClass}
						dangerouslySetInnerHTML={{ __html: richTextHeading }}
					></div>
				</div>
			</div>
		</section>
	)
}
