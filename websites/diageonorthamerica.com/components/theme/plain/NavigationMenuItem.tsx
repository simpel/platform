import React, { useState } from 'react'
import Link from 'next/link'
import { classnames as cn } from 'tailwindcss-classnames'
import { NavMenuItemProps, NavLinkProps } from 'components/propTypes'
import { useFields } from 'context/fields'

export default function NavMenuItem({
	url,
	children,
	...rest
}: NavMenuItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	const [open, setOpen] = useState(false)
	const closed = cn('opacity-0', 'invisible', 'h-0')
	const props = { ...rest, setOpen, open }
	return (
		<div className={cn('relative')}>
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
			<div
				className={cn('transition-all', 'duration-300', { [closed]: !open })}
			>
				{children}
			</div>
		</div>
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
		const [{ settings }] = useFields()
		const small = settings?.container === 'secondLevelNav'
		return (
			<a
				ref={ref}
				className={cn(
					'inline-block',
					small ? 'py-2' : 'py-4',
					'text-sm',
					small ? 'text-black' : 'text-white',
					small ? 'text-xl' : 'text-2xl',
					small ? 'md:text-3xl' : 'md:text-4xl',
					small ? 'opacity-50' : 'opacity-100',
					'leading-loose',
					'font-bold',
					'uppercase',
					centered ? 'sm:text-center' : 'sm:text-left',
					'transition',
					'duration-500',
					'relative',
					'z-10',
					'cursor-pointer',
					{
						[cn()]: active,
					},
				)}
				{...rest}
			>
				{text}{' '}
				{hasChildren && (
					<img
						className={cn(
							'inline',
							'w-4',
							'md:w-auto',
							'transition-transform',
							'duration-300',
							{
								['rotate-180']: !open,
							},
						)}
						src="/images/down-carret-icon.svg"
						onClick={() => setOpen(!open)}
					/>
				)}
			</a>
		)
	},
)
NavLink.displayName = 'NavLink'
