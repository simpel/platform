import React, { useState } from 'react'
import { AccordionProps } from '../../../components/propTypes'
import Heading from '../plain/Heading'
import { HeadingLevel } from '../../../enums'
import Image from '../plain/Image'
import { FixMediaPathsInHtml } from 'utilities/functions'

export default function NPAccordionBlock({
	heading,
	richText,
	letter,
	image,
	className,
}: AccordionProps) {
	const [isActive, setIsActive] = useState<boolean>(false)

	const handleClick = () => {
		setIsActive(!isActive)
	}

	return (
		<div
			className={`accordion ${className ? className : ''} ${
				isActive ? 'active' : ''
			}`}
		>
			<div className="accordion__head" onClick={handleClick}>
				{letter && letter !== '' ? (
					<span className="accordion__letter font-italic">{letter}</span>
				) : null}
				{heading && heading.length > 0 && (
					<Heading
						heading={heading}
						headingLevel={HeadingLevel.H5}
						className="accordion__heading"
					/>
				)}
				<button
					className="accordion__toggler"
					aria-label={`toggle - ${heading}`}
				></button>
			</div>
			<div className="accordion__body">
				<div
					className={`accordion__content ${
						image ? 'accordion__content--with-image' : ''
					}`}
				>
					{image && (
						<div className="accordion__image">
							<Image image={image} />
						</div>
					)}
					<div
						className="accordion__rich-text"
						dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(richText) }}
					></div>
				</div>
			</div>
		</div>
	)
}
