import React from 'react'
import Link from 'next/link'
import { ButtonProps } from 'components/propTypes'

function ButtonOverlay({ url, ...rest }: ButtonProps) {
	return (
		<Link
			href={url || ''}
			className="absolute top-0 left-0 z-20 w-full h-full cursor-pointer"
			{...rest}
		></Link>
	)
}

export default ButtonOverlay
