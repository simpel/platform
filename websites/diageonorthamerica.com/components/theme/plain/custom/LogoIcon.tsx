import React from 'react'
import Image from 'next/legacy/image'

export type TLogoIconProps = {
	readonly altText?: string | undefined
}

const LogoIcon = ({ altText }: TLogoIconProps) => {
	const logoPath = '/images/logo.svg'
	let logoText = 'Diageo North America'
	const logoHeight = 50
	const logoWidth = 120

	if (altText && altText.length > 0) {
		logoText = altText
	}

	return (
		<Image
			src={logoPath}
			alt={logoText}
			quality={60}
			objectFit="contain"
			width={logoWidth}
			height={logoHeight}
		/>
	)
}

export default LogoIcon
