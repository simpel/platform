import React from 'react'
import DContainer from '../DContainer'
import { HeadingLevel } from 'enums'
import { Icons as EnumsIcon } from '../../../../enumsIcon'
import Heading from '../../plain/Heading'
import Image from '../../plain/Image'
import DLinkUnderline from '../DLinkUnderline'
import { Image as ImageType, Link as LinkType } from 'types'

type DBlockCtaType = {
	image: ImageType
	heading: string
	linkCta?: LinkType
	reversed?: boolean
}

function DBlockBrandCta({ image, heading, linkCta, reversed }: DBlockCtaType) {
	return (
		<section
			className={`block-brand-cta ${
				reversed ? 'block-brand-cta--reversed' : ''
			}`}
		>
			<div className="block-brand-cta__inner">
				<div className="block-brand-cta__bg-color"></div>
				<DContainer>
					<div className="block-brand-cta__image">
						<Image image={image} />
					</div>
					<div className="block-brand-cta__body">
						{heading && heading.length > 0 && (
							<Heading
								heading={heading}
								headingLevel={HeadingLevel.H3}
								className="block-brand-cta__heading"
							/>
						)}
						{linkCta && (
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
					</div>
				</DContainer>
			</div>
		</section>
	)
}

export default DBlockBrandCta
