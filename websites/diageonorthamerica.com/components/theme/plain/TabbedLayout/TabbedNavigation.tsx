import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './TabbedLayout.module.scss'

type TTabData = {
	title: string
}

type TTabbedLayout = {
	leftBarText: string
	tabs: TTabData[]
	onTabClick: (index: number) => void
}

function TabbedNavigation({ leftBarText, tabs, onTabClick }: TTabbedLayout) {
	const [validActiveTab, setValidActiveTab] = useState(0)

	const ulClasses = classNames({
		[styles.mainMenu]: true,
	})

	const getLinkClasses = (index: number) =>
		classNames({
			[styles.menuLink]: true,
			[styles.mainMenuLink]: true,
			[styles.active]: index === validActiveTab,
		})

	const handleClickTab = (index: number) => {
		onTabClick(index)
		setValidActiveTab(index)
	}

	return (
		<div className={styles.menuWrapper}>
			<div className={styles.menuContent}>
				<div className={styles.tabsContent}>
					<div className={styles.leftBarText}>{leftBarText}</div>
					<ul className={ulClasses}>
						{tabs.map((tab, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<li key={`tab_link_${index}`} className={styles.mainMenuItem}>
								{tab.title && (
									<button
										type="button"
										className={getLinkClasses(index)}
										onClick={() => {
											handleClickTab(index)
										}}
									>
										{tab.title}
									</button>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default TabbedNavigation
