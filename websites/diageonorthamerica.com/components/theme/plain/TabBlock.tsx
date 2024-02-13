import React, { useContext } from 'react'
import { TabBlockProps } from '../../../components/propTypes'
import ImageBlock from './Image'
import TabsContext from 'context/tabs'
import DSocietyTarget from '../Diageo/DSocietyTarget'
import Heading from './Heading'
import { HeadingLevel } from 'enums'
import { FixMediaPathsInHtml } from 'utilities/functions'
import LinkHelper2 from './custom/LinkHelper2'

export default function TabBlock({ tabTitle, blocks, id }: TabBlockProps) {
	// 0 TextItem,
	// 1 HeadingItem,
	// 2 ImageItem,
	// 3 LinkItem,
	// 5 OnTrackItem,

	const { activeTabId } = useContext(TabsContext)

	const getItems = (block) => {
		const textBody = block.itemText ? FixMediaPathsInHtml(block.itemText) : ''
		switch (block.itemType) {
			case 0:
				if (block.itemOption) {
					return (
						<div className="society-post__body">
							<div
								className="society-post__subheading"
								dangerouslySetInnerHTML={{ __html: textBody }}
							></div>
						</div>
					)
				} else {
					return (
						<div className="society-post__body">
							<div
								className="society-post__text"
								dangerouslySetInnerHTML={{ __html: textBody }}
							></div>
						</div>
					)
				}
				break
			case 1:
				const dim2 = {
					styleDesk: '',
					widthDesk: 100,
					heightDesk: 100,
					pureimage: true,
				}
				return (
					<div className="society-post">
						<div className="society-post__heading-wrapper">
							{block.image && (
								<div className="society-post__heading-logo">
									<ImageBlock
										image={block.image}
										dimensions={dim2}
										isLegacy={false}
									/>
								</div>
							)}
							{textBody && (
								<Heading
									heading={textBody}
									headingLevel={HeadingLevel.H3}
									className="society-post__heading"
								/>
							)}
						</div>
					</div>
				)
				break
			case 2:
				const dim1 = {
					styleDesk: 'fit-to-object',
					widthDesk: 600,
					heightDesk: 337,
					pureimage: true,
				}
				return (
					<div className="tabItemImage">
						{block.image && (
							<ImageBlock
								image={block.image}
								dimensions={dim1}
								isLegacy={false}
							></ImageBlock>
						)}
					</div>
				)

				break
			case 3:
				//const linkurl = block.itemLink?.url ? block.itemLink?.url : ''
				return (
					<div className="society-post__body">
						{/* <DLinkUnderline
              link={{
                name: block.itemLink?.name,
                url: linkurl,
              }}
              icon={{
                icon: EnumsIcon.ArrowRight,
              }}
              size="medium"
            /> */}
						<LinkHelper2
							name={block.itemLink.name}
							url={block.itemLink.url}
							contentId={block.itemLink.contentId}
							mediaId={block.itemLink.mediaId}
							target={block.itemLink.target}
							linkClass={'card__link link'}
							divClass={'link__inner'}
							showicon={true}
						></LinkHelper2>
					</div>
				)
				break
			case 4:
				const track = 'on track'
				return (
					<section className="block-society-target">
						<div className="block-society-target__list">
							<DSocietyTarget text={textBody} track={track} />
						</div>
					</section>
				)
				break
		}
		return block.itemType
	}

	return (
		<div
			id={id}
			className={`tab-block-item ${activeTabId !== id ? ' hidden' : ''}`}
		>
			{tabTitle && tabTitle.length > 0 && <h2>{tabTitle}</h2>}
			{blocks &&
				blocks.map((item, index) => <div key={index}>{getItems(item)}</div>)}
		</div>
	)
}
