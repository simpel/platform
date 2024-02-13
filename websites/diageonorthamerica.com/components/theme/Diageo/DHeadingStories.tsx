import React from 'react'

import { HeadingLevel } from '../../../enums'
import { HeadingStoriesProps } from '../../propTypes'
import LinkHelper2 from '../plain/custom/LinkHelper2'
import Heading from '../plain/Heading'

function DHeadingStories({ heading, linkCta }: HeadingStoriesProps) {
	return (
		<div className="heading-stories">
			{heading && (
				<Heading
					heading={heading}
					headingLevel={HeadingLevel.H3}
					className="heading-stories__heading"
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
					size={'large'}
				/>
			)}
			{/* {linkCta && linkCta.url && (
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
      )} */}
		</div>
	)
}

export default DHeadingStories
