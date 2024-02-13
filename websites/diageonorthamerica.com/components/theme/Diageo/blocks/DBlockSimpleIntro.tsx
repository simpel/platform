import React from 'react'
import DContainer from '../DContainer'
import { HeadingLevel } from 'enums'
import Heading from '../../plain/Heading'

function DBlockSimpleIntro({
	heading,
	children,
}: {
	heading: string
	children?: React.ReactNode
}) {
	return (
		<section
			className={`block-simple-intro ${
				!children ? 'block-simple-intro--without-children' : ''
			}`}
		>
			<DContainer>
				{children}
				{heading && (
					<Heading
						heading={heading}
						headingLevel={HeadingLevel.H1}
						className="block-simple-intro__heading"
					/>
				)}
			</DContainer>
		</section>
	)
}

export default DBlockSimpleIntro
