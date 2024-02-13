import React from 'react'
import { PressReleasePageContentRowProps } from 'components/propTypes'
import { renderBlocks } from 'components'

export default function PressReleasePageContentRow({
	mainContent,
	asideContent,
	theme,
}: PressReleasePageContentRowProps) {
	const cssclass = 'pageblock p--l ' + theme
	return (
		<section className={cssclass}>
			<div className="filler"></div>
			<div className="pageblock--textarea">
				<div className="pageblock--textarea-sm">
					{mainContent && mainContent.length && renderBlocks(mainContent)}
				</div>
			</div>
			<aside className="pageblock--aside">
				{asideContent && asideContent.length && renderBlocks(asideContent)}
			</aside>
		</section>
	)
}
