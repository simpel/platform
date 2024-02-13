import classNames from 'classnames'
import React from 'react'

export interface TabProps {
	tabs: Tab[]
	activeTab: string
	setActiveTab: (string) => void
}

export interface Tab {
	id: string
	text: string
}

export default function Tabs({ tabs, activeTab, setActiveTab }: TabProps) {
	return (
		<section data-component="tabs" className="theme-green tabs-section">
			<div className="tabs-container">
				<ul className="tabs">
					{tabs.map(({ id, text }) => (
						<li
							key={id}
							className={classNames({
								tab: true,
								active: activeTab === id,
							})}
							onClick={() => setActiveTab(id)}
						>
							<span>{text}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
