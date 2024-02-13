import React from 'react'

import { StoriesSliderBlockProps } from 'components/propTypes'

import DContainer from '../Diageo/DContainer'
import DStoryCard from '../Diageo/DStoryCard'

import DSlider from '../Diageo/DSlider'
import { storiesSliderSetting } from '../../../shared/sliderSetting'
import LinkHelper4 from './custom/LinkHelper4'
import LatestStories from 'components/styled-components/Careers/LatestStories/LatestStories'

export default function StoriesSliderBlock(props: StoriesSliderBlockProps) {
	// const dim1 = { styleDesk: '', widthDesk: 500, heightDesk: 400, pureimage: true }
	return (
		<LatestStories {...props} />
		/*
    <section className="slider-stories">
      <div className={`slider-stories__decor-bg  ${blockTheme ? blockTheme : ''}`}></div>
      <DContainer containerWidth="middle">
        {richTextHeading && (
          <div className="slider-stories__heading h3" dangerouslySetInnerHTML={{ __html: richTextHeading }} />
        )}
        {viewMoreLink && viewMoreLink.url && (
          <div>
            <LinkHelper4 link={viewMoreLink} linkText={viewMoreLinkText} />
          </div>
        )}
        <div className="slider-stories__slider">
          {slides && slides.length ? (
            <DSlider settings={storiesSliderSetting} progressSlides={false}>
              {slides.map((card, index) => (
                <DStoryCard
                  key={index}
                  {...card}
                  image={{
                    _id: card.image?._id ? card.image._id : '',
                    url: card.image?.url ? card.image.url : '',
                    alt: card.title,
                  }}
                  dimensions={dim1}
                />
              ))}
            </DSlider>
          ) : null}
        </div>
      </DContainer>
    </section>
    */
	)
}
