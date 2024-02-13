import React, { useState } from 'react'
import Link from 'next/link'
import { NavMenuItemProps, NavLinkProps } from 'components/propTypes'

export default function NavMenuItem({
	url,
	children,
	...rest
}: NavMenuItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	const [open, setOpen] = useState(false)

	const props = { ...rest, setOpen, open }
	return (
		<li className="primary-nav">
			{/* <Icon name="icon_add" /> */}
			{(() => {
				if (url && !url.includes('http')) {
					return (
						<Link href={url} legacyBehavior>
							<NavLink {...props} hasChildren={!!children} />
						</Link>
					)
				} else if (url && url.includes('http')) {
					return <NavLink href={url} {...props} hasChildren={!!children} />
				} else {
					return <NavLink {...props} hasChildren={!!children} />
				}
			})()}
			<div className="sub-menu-wrapper">
				<div className="sub-menu">{children}</div>
			</div>
		</li>
	)
}

type NavLinkWithToggleProps = NavLinkProps & {
	open?: boolean
	setOpen: (open: boolean) => void
}

const NavLink = React.forwardRef<
	HTMLAnchorElement,
	NavLinkWithToggleProps &
		React.DetailedHTMLProps<
			React.AnchorHTMLAttributes<HTMLAnchorElement>,
			HTMLAnchorElement
		>
>(
	(
		//@ts-ignore
		{
			text,
			active,
			centered,
			hasChildren,
			open,
			setOpen,
			...rest
		}: NavLinkWithToggleProps,
		ref,
	) => {
		return (
			<a ref={ref} className="nav-link" {...rest}>
				{'Nav-'}
				{text}
			</a>
		)
	},
)
NavLink.displayName = 'NavLink'
