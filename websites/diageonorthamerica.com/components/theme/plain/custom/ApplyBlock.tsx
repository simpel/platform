import { ApplyBlockProps } from 'components/propTypes'
import { getGradient } from 'components/styled-components/utils'
import Link from 'next/link'
import React from 'react'
import * as S from './ApplyBlock.styled'

export default function ApplyBlock({
	theme,
	applyUrl,
	isEVP = false,
}: ApplyBlockProps) {
	// applyUrl is not used temporarily.
	const applyBlockClass = `flex-col-sm12 apply-block `
	let applyHref = '/en/careers/search-and-apply/'
	if (applyUrl && applyUrl.length) {
		applyHref = applyUrl
	}
	if (isEVP && theme) {
		const gradientOpaque = getGradient(theme?.toString(), 60)
		const gradient = getGradient(theme?.toString())

		return (
			<S.Colour gradient={gradientOpaque}>
				<div className={applyBlockClass}>
					<div className={`main-coloured-bar rte-themed ${theme ? theme : ''}`}>
						<div className="layout-wrapper">
							<S.Filler gradient={gradientOpaque} />
							<S.ButtonWrapper gradient={gradient}>
								<div
									className={`rte-themed-low-opacity search-and-apply-cta ${
										theme ? theme : ''
									}`}
								>
									<Link href={applyHref} className="cta-text">
										Search and Apply
									</Link>
								</div>
							</S.ButtonWrapper>
						</div>
					</div>
				</div>
			</S.Colour>
		)
	}
	return (
		<div>
			<div className={applyBlockClass}>
				<div className={`main-coloured-bar rte-themed ${theme ? theme : ''}`}>
					<div className="layout-wrapper">
						<div className="white-overlay">
							<div
								className={`rte-themed-low-opacity search-and-apply-cta ${
									theme ? theme : ''
								}`}
							>
								<Link href={applyHref} className="cta-text">
									Search and Apply
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
