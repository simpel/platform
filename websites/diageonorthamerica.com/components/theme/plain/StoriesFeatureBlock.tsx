import React from 'react'

import DContainer from '../Diageo/DContainer'
import DCard from '../Diageo/cards/DCard'

import { BlockWithStoriesProps } from '../../propTypes'
import { HeadingLevel } from '../../../enums'
import { latestStoriesSliderSetting } from '../../../shared/sliderSetting'

import DHeadingStories from '../Diageo/DHeadingStories'

import DSlider from '../Diageo/DSlider'
import LinkHelper2 from './custom/LinkHelper2'

function StoriesFeatureBlock({
	heading,
	items,
	linkCta,
}: BlockWithStoriesProps) {
	return (
		<section className="block-latest-stories">
			<DContainer>
				<DHeadingStories heading={heading} linkCta={linkCta} />
				<div className="block-latest-stories__desktop">
					<div className="latest-stories">
						{items &&
							items.length &&
							items.map((card) => (
								<div key={card._id} className="latest-stories__col">
									<DCard
										{...card}
										direction={false}
										className="card-latest-story"
										headingLevel={HeadingLevel.H4}
									/>
								</div>
							))}
					</div>
				</div>
				<div className="block-latest-stories__mobile">
					<div className="latest-stories-slider">
						{items && items.length && (
							<DSlider
								settings={latestStoriesSliderSetting}
								progressSlides={false}
							>
								{items.map((card, index) => (
									<DCard
										key={index}
										{...card}
										className="card-latest-story"
										headingLevel={HeadingLevel.H4}
									/>
								))}
							</DSlider>
						)}
					</div>
				</div>
				{linkCta && linkCta.url && (
					<div className="block-latest-stories__link-wrapper">
						<LinkHelper2
							name={linkCta.name}
							url={linkCta.url}
							contentId={linkCta.contentId}
							mediaId={linkCta.mediaId}
							target={linkCta.target}
							linkClass={'link'}
							divClass={'link__inner'}
							showicon={false}
						/>
					</div>
				)}
				{/* {linkCta && linkCta.url && (
          <div className="block-latest-stories__link-wrapper">
            <DLinkUnderline
              link={{
                name: linkCta.name,
                url: linkCta.url,
              }}
              icon={{
                icon: EnumsIcon.ArrowRight,
              }}
              size="large"
            />
          </div>
        )} */}
			</DContainer>
		</section>
	)
}

export default StoriesFeatureBlock
