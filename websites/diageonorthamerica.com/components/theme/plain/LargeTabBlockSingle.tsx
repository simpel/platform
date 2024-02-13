import React from 'react'
import { type CmsLink, type Image } from 'types'
import Icon from 'components/theme/plain/Icon'
import Link from 'next/link'
import { useMediaQuery } from 'hooks/useMediaQuery/useMediaQuery'
import media from '../../../constants/media'
import ImageBlock from './Image'
import LinkHelper from './custom/LinkHelper'

type TLargeTabBlockSingle = {
	richTextTitle: string
	richTextIntro: string
	tabImage?: Image
	tabMainLink?: CmsLink
	tabLinks?: CmsLink[]
	stat1Prefix?: string
	stat1Large?: string
	stat1Suffix?: string
	stat1Small?: string
	stat2Prefix?: string
	stat2Large?: string
	stat2Suffix?: string
	stat2Small?: string
}
const dimensionsDesktop = {
	styleDesk: 'fit-to-object',
	widthDesk: 540,
	heightDesk: 850,
	pureimage: true,
}
const dimensionsMobile = {
	styleDesk: '',
	widthDesk: 700,
	heightDesk: 700,
	pureimage: true,
}

function LargeTabBlockSingle(props: TLargeTabBlockSingle) {
	const {
		richTextTitle,
		richTextIntro,
		tabImage,
		tabMainLink,
		stat1Prefix,
		stat1Large,
		stat1Suffix,
		stat2Prefix,
		stat2Large,
		stat2Suffix,
		stat1Small,
		stat2Small,
		tabLinks = [],
	} = props

	const isTablet = useMediaQuery(`(min-width: ${media.tablet}px)`)

	return (
		<div className="large-tab-block">
			<div className="main-info">
				<div
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: richTextTitle }}
					className="title"
				/>
				<div className="intro">
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={{ __html: richTextIntro }} />
					{tabMainLink && (
						<LinkHelper {...tabMainLink} extraclass="tab-main-link" />
					)}
				</div>
				{!isTablet && (
					<div className="mobile-image">
						{tabImage && (
							<ImageBlock image={tabImage} dimensions={dimensionsMobile} />
						)}
					</div>
				)}
				<div className="details">
					<div className="stats">
						<div className="stat">
							<div className="large">
								{stat1Prefix && <div className="affix">{stat1Prefix}</div>}
								{stat1Large && <div className="value">{stat1Large}</div>}
								{stat1Suffix && <div className="affix">{stat1Suffix}</div>}
							</div>
							<div className="small">{stat1Small}</div>
						</div>
						<div className="stat">
							<div className="large">
								{stat2Prefix && <div className="affix">{stat2Prefix}</div>}
								{stat2Large && <div className="value">{stat2Large}</div>}
								{stat2Suffix && <div className="affix">{stat2Suffix}</div>}
							</div>
							<div className="small">{stat2Small}</div>
						</div>
					</div>
					{tabLinks?.length > 0 && (
						<div className="links">
							<div className="horizontal-splitter" />
							{tabLinks?.map(({ name, url }) => (
								<React.Fragment key={url}>
									<div className="link-container">
										<Link href={url} className="link">
											<span className="link__inner row-link">
												<span className="link__text">{name}</span>
												<Icon
													name="icon_arrow_right"
													size="middle"
													className="link__icon"
												/>
											</span>
										</Link>
									</div>
									<div className="horizontal-splitter" />
								</React.Fragment>
							))}
						</div>
					)}
				</div>
			</div>
			{isTablet && tabImage && (
				<div className="side-image">
					{tabImage && (
						<ImageBlock image={tabImage} dimensions={dimensionsDesktop} />
					)}
				</div>
			)}
		</div>
	)
}

export default LargeTabBlockSingle
