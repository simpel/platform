import React from 'react'
import styles from './MobileMenu.module.scss'
import Link from 'next/link'
import Icon from '../../Icon'
import classNames from 'classnames'

const MobileSubMenu = ({
	onNextClick,
	onPrevClick,
	isFirstTier = false,
}: {
	onNextClick: () => void
	onPrevClick: () => void
	isFirstTier?: boolean
}) => {
	const menuClasses = classNames({
		[styles.menu]: true,
		[styles.firstTier]: isFirstTier,
	})

	return (
		<ul className={menuClasses}>
			<li className={styles.backToPrevious} onClick={onPrevClick}>
				<Icon
					name="icon_arrow_left"
					size="middle"
					className={styles.menuItemBackArrow}
				/>
				<span>Back to prev</span>
			</li>
			<li onClick={onNextClick}>
				<span>A menu item with quite</span>
				<Icon
					name="icon_angle_right"
					size="middle"
					className={styles.menuItemForwardArrow}
				/>
			</li>
			<li>
				<Link href={'/'}>A menu item</Link>
				<Icon
					name="icon_angle_right"
					size="middle"
					className={styles.menuItemForwardArrow}
				/>
			</li>
			<li>
				<Link href={'/'}>A menu item</Link>
				<Icon
					name="icon_angle_right"
					size="middle"
					className={styles.menuItemForwardArrow}
				/>
			</li>
			<li>
				<Link href={'/'}>A menu item</Link>
				<Icon
					name="icon_angle_right"
					size="middle"
					className={styles.menuItemForwardArrow}
				/>
			</li>
			<li>
				<Link href={'/'}>A menu item</Link>
			</li>
			<li>
				<Link href={'/'}>A menu item</Link>
			</li>
		</ul>
	)
}

export default MobileSubMenu
