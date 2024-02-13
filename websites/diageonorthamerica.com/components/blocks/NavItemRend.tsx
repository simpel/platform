import React from 'react'
import { NavPage } from 'types'

import NextLink from 'next/link'
import Icon from 'components/theme/plain/Icon'

function NavItemRend({ navitem }: any) {
	if (navitem.url) {
		if (navitem.children) {
			return (
				<li className="has-submenu" role="none">
					<NextLink
						key={navitem.pageId}
						href={navitem.url}
						className="nested menu__link"
						aria-haspopup="true"
						aria-expanded="false"
					>
						{navitem.title}{' '}
						<Icon
							name="icon_angle_right"
							size="middle"
							className="link__icon"
						/>
					</NextLink>
					<NavItemRend2 navitem={navitem}></NavItemRend2>
				</li>
			)
		} else {
			return (
				<li role="none">
					<NextLink key={navitem.pageId} href={navitem.url} className="nested">
						{navitem.title}
					</NextLink>
				</li>
			)
		}
	} else {
		return <li role="none"> {navitem.title} </li>
	}
}

function NavItemRend2({ navitem }: any) {
	if (navitem.children) {
		return (
			<div className="sub-nav-container">
				<ul className="sub-menu level-2" role="menu" aria-label={navitem.title}>
					<li role="none">
						<NextLink key={navitem.pageId} href={navitem.url} className="h5">
							{navitem.title}
						</NextLink>
					</li>
					{navitem.children.map((child, key) => {
						if (child.showonnav) {
							return (
								<NavItemRend3
									key={key}
									navitem={child}
									level="3"
								></NavItemRend3>
							)
						}
					})}
				</ul>
			</div>
		)
	} else {
		return null
	}
}

function NavItemRend3({ navitem, level }: any) {
	if (navitem.children && navitem.children.length) {
		return (
			<li className="has-submenu" role="none">
				<NextLink
					key={navitem.pageId}
					href={navitem.url}
					aria-haspopup="true"
					aria-expanded="false"
				>
					{navitem.title}{' '}
					<Icon name="icon_angle_right" size="middle" className="link__icon" />
				</NextLink>
				<NavItemRend4 navitem={navitem} level={level}></NavItemRend4>
			</li>
		)
	} else {
		return (
			<li role="none">
				<NextLink href={navitem.url}>{navitem.title}</NextLink>
			</li>
		)
	}
}
function NavItemRend4({ navitem, level }: any) {
	const cccc = 'sub-menu level-' + level
	if (navitem.children) {
		return (
			<ul className={cccc} role="menu" aria-label={navitem.title}>
				<li role="none">
					<NextLink key={navitem.pageId} href={navitem.url} className="h5">
						{navitem.title}
					</NextLink>
				</li>
				{navitem.children.map((child, key) => {
					if (child.showonnav) {
						return (
							<NavItemRend3 key={key} navitem={child} level="4"></NavItemRend3>
						)
					}
				})}
			</ul>
		)
	} else {
		return null
	}
}

export default NavItemRend
