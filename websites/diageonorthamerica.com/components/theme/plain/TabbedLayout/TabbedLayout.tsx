import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './TabbedLayout.module.scss'

export type TTabData = {
	body: Array<JSX.Element | undefined> | JSX.Element
	title: string
}

export type TTabbedLayout = {
	leftBarText: string
	tabs: TTabData[]
	tabsTheme: string
	// Careers: {
	//   content: Content | undefined
	// }
}

function TabbedLayout({
	leftBarText,
	tabs,
	tabsTheme /* careers */,
}: TTabbedLayout) {
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

	const sectionClass = `${styles.menuWrapper} ${tabsTheme || ''}`

	return (
		<>
			<div className={sectionClass}>
				<div className={styles.menuContent}>
					<div className={styles.tabsContent}>
						<div className={styles.leftBarText}>{leftBarText}</div>
						<ul className={ulClasses}>
							{tabs.map((tab, index) => {
								return (
									// eslint-disable-next-line react/no-array-index-key
									<li key={`tab_link_${index}`} className={styles.mainMenuItem}>
										{tab.title && (
											<button
												type="button"
												className={getLinkClasses(index)}
												onClick={() => {
													setValidActiveTab(index)
												}}
											>
												{tab.title}
											</button>
										)}
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
			{tabs.map((tab, index) => index === validActiveTab && tab.body)}
		</>
	)
}

export default TabbedLayout
