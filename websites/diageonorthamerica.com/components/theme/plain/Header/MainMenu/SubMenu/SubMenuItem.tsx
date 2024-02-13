import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import mainMenuStyles from '../MainMenu.module.scss'
import Icon from '../../../Icon'
import styles from './Submenu.module.scss'

function SubMenuItem({
	url = '/',
	label = 'Link label',
	hasSubMenu = false,
	isActive = false,
	onClick,
	isParent = false,
}: {
	url: string
	label: string
	hasSubMenu: boolean
	isActive: boolean
	onClick: () => void
	isParent?: boolean
}) {
	const linkClasses = classNames({
		[mainMenuStyles.mainMenuButton]: true,
		[styles.subMenuLink]: true,
		[styles.hasSubMenu]: hasSubMenu,
		// [styles.isParent]: isParent,
		[mainMenuStyles.active]: isActive,
	})

	const liClasses = classNames({
		[styles.subMenuItem]: true,
		[mainMenuStyles.activeBackground]: isActive,
	})
	const renderLabel = isParent ? `${label} overview` : label
	return (
		<li className={liClasses}>
			{hasSubMenu ? (
				<button
					type="button"
					role="link"
					aria-current={isActive}
					className={linkClasses}
					onClick={(event) => {
						event.preventDefault()
						onClick()
					}}
				>
					{renderLabel}
					{hasSubMenu && (
						<Icon
							name="icon_angle_right"
							size="middle"
							className={styles.subMenuIcon}
						/>
					)}
				</button>
			) : (
				<Link href={url} className={linkClasses}>
					{renderLabel}
				</Link>
			)}
		</li>
	)
}

export default SubMenuItem
