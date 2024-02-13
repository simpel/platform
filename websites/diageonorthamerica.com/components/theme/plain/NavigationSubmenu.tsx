import React from 'react'
import Icon from 'components/theme/plain/Icon'

type Props = {
	visible?: boolean
	children?: React.ReactNode
}

export default function NavigationSubmenu({
	children,
	//@ts-ignore
	visible,
	...rest
}: Props &
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>) {
	return (
		<div className={'secondary-nav'} {...rest}>
			{children}

			<a title="Who we are" target="" href="#">
				<div className="nav-children">
					<span>Item with 3rd level</span>{' '}
					<Icon size="small" color="black" name="icon_angle_right" />
				</div>
				<div className={'tertiary-nav'}>
					{children}

					<a title="Who we are" target="" href="#">
						<div className="nav-children">
							<span>Item with 4th level</span>{' '}
							<Icon size="small" color="black" name="icon_angle_right" />
						</div>
						<div className={'quaternary-nav'}>{children}</div>
					</a>
				</div>
			</a>
		</div>
	)
}
