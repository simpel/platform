import React from 'react'
import cn from 'classnames'

import { HeadingLevel } from '../../../enums'
// import { Icons as EnumsIcon } from '../../../enumsIcon'
import { HeadingSliderProps } from '../../propTypes'
import Image from '../plain/Image'
import Heading from '../plain/Heading'

// import DLinkUnderline from './DLinkUnderline'
import { FixMediaPathsInHtml } from 'utilities/functions'
import LinkHelper2 from '../plain/custom/LinkHelper2'

// const getTypeUnderlineLink = (type: TypeLink | undefined) => {
//   if (type === TypeLink.internal) {
//     return EnumsIcon.ArrowRight
//   }
//   if (type === TypeLink.external) {
//     return EnumsIcon.Launch
//   }
// }

function DHeadingSlider({
	heading,
	headingSize = 'small',
	text,
	textSize = 'small',
	linkCta,
	alignCentre = false,
	logoImage,
	logoImageDimensions,
	layout,
}: HeadingSliderProps) {
	const headingTypeSize = cn({
		'heading-slider__heading--small': headingSize === 'small',
		'heading-slider__heading--medium': headingSize === 'medium',
		'heading-slider__heading--large': headingSize === 'large',
		'heading-slider__heading--extra-large': headingSize === 'extraLarge',
	})

	const textTypeSize = cn({
		'heading-slider__text--small': textSize === 'small',
		'heading-slider__text--medium': textSize === 'medium',
	})

	const logoRight = () => (
		<div className="heading-slider__logo">
			{logoImage && logoImage.url && (
				<Image image={logoImage} dimensions={logoImageDimensions} />
			)}
		</div>
	)
	const textRight = () => (
		<>
			{text && (
				<div
					className={`heading-slider__text ${textTypeSize}`}
					dangerouslySetInnerHTML={{ __html: FixMediaPathsInHtml(text) }}
				/>
			)}
			{linkCta && linkCta.url && (
				<LinkHelper2
					name={linkCta.name}
					url={linkCta.url}
					contentId={linkCta.contentId}
					mediaId={linkCta.mediaId}
					target={linkCta.target}
					linkClass={'link'}
					divClass={'link__inner'}
					showicon={true}
				></LinkHelper2>
			)}
			{/* {linkCta && linkCta.url && (
        <DLinkUnderline
          link={{
            name: linkCta.name,
            url: linkCta.url,
            target: linkCta.target || '',
          }}
          icon={{
            icon: getTypeUnderlineLink(typeLinkCta),
          }}
        />
      )} */}
		</>
	)

	const centeredHeadingCls = 'heading-slider--center-heading text-align--center'

	return (
		<div
			className={`heading-slider ${
				alignCentre === true ? centeredHeadingCls : ''
			}`}
		>
			<div className="heading-slider__left">
				{heading && (
					<Heading
						heading={heading}
						headingLevel={HeadingLevel.H2}
						className={`heading-slider__heading ${headingTypeSize}`}
					/>
				)}
			</div>
			{!alignCentre ? (
				<div className="heading-slider__right">
					{layout === 'logo-right' ? logoRight() : null}
					{layout !== 'logo-right' ? textRight() : null}
				</div>
			) : null}
		</div>
	)
}

export default DHeadingSlider
