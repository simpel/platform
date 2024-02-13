import React, { useState } from 'react'
import { LargeTabBlockProps } from '../../../components/propTypes'
import LargeTabBlockSingle from './LargeTabBlockSingle'
import TabbedNavigation from './TabbedLayout/TabbedNavigation'

export default function LargeTabBlock({
	blocks,
	blockTheme,
}: LargeTabBlockProps) {
	const [validActiveTab, setValidActiveTab] = useState(0)
	const tabs = blocks.map((b) => ({ title: b.tabTitle }))
	const sectionClass = `rte-themed ${blockTheme ? blockTheme : ''}`

	return (
		<section className={sectionClass}>
			<TabbedNavigation
				tabs={tabs}
				leftBarText="Our locations"
				onTabClick={(index) => setValidActiveTab(index)}
			/>
			<div className="content-block--wrapper with-overflow">
				{blocks &&
					blocks.map(
						(itm, index) =>
							index === validActiveTab && (
								<LargeTabBlockSingle key={index} {...itm} />
							),
					)}
			</div>
		</section>
	)
}
