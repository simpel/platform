import React, { type ReactChild } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './MainMenu.module.scss'

const MainMenuItem = ({
	children,
	isActive = false,
	url,
	onClick,
}: {
	readonly children: ReactChild | ReactChild[]
	readonly isActive: boolean
	readonly url?: string
	readonly onClick: () => void
}) => {
	const classes = classNames({
		[styles.active]: isActive,
	})

	return (
		<li className={`${styles.mainMenuItem} ${classes}`}>
			{url ? (
				<Link
					href={url}
					aria-current={isActive}
					className={styles.mainMenuButton}
				>
					{children}
				</Link>
			) : (
				<button
					type="button"
					aria-current={isActive}
					className={styles.mainMenuButton}
					onClick={(event) => {
						event.preventDefault()
						onClick()
					}}
				>
					{children}
				</button>
			)}
		</li>
	)
}

export default MainMenuItem
