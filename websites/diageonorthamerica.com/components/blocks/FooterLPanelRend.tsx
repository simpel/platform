import React from 'react'
import NextLink from 'next/link'
import { CmsLink, ContentBlock } from '../../types'
import Icon from 'components/theme/plain/Icon'
import { FixMediaPathsInHtml } from 'utilities/functions'

type FooterLPanelRendProp = {
	panelContent: ContentBlock[]
}

export default function FooterLPanelRend({
	panelContent,
}: FooterLPanelRendProp) {
	let richtext = ''
	let thelink = {} as CmsLink
	if (panelContent[0] && panelContent[0].fields) {
		richtext = FixMediaPathsInHtml(
			panelContent[0].fields[0].html ? panelContent[0].fields[0].html : '',
		)
		if (panelContent[0].fields.length > 1 && panelContent[0].fields[1].link) {
			thelink = panelContent[0].fields[1].link
		}
	}
	//console.log(thelink)
	if (thelink) {
		if (thelink?.contentId || thelink?.mediaId) {
			return (
				<>
					{richtext && (
						<div dangerouslySetInnerHTML={{ __html: richtext }}></div>
					)}
					{thelink && (
						<NextLink href={thelink?.url} className="link">
							<span className="link__inner">
								<span className="link__text">{thelink?.name}</span>
								<Icon
									name="icon_arrow_right"
									size="middle"
									className="link__icon"
								/>
							</span>
						</NextLink>
					)}
				</>
			)
		} else {
			return (
				<>
					{richtext && (
						<div dangerouslySetInnerHTML={{ __html: richtext }}></div>
					)}
					{thelink && (
						<a
							className="link"
							href={thelink?.url}
							target="_blank"
							rel="noreferrer"
						>
							<span className="link__inner">
								<span className="link__text">{thelink?.name}</span>
								<Icon
									name="icon_arrow_right"
									size="middle"
									className="link__icon"
								/>
							</span>
						</a>
					)}
				</>
			)
		}
	} else {
		return (
			<>
				{' '}
				{richtext && (
					<div dangerouslySetInnerHTML={{ __html: richtext }}></div>
				)}{' '}
			</>
		)
	}
}
