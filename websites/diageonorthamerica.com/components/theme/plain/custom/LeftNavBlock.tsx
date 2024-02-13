import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { type NavPage } from 'types'
import { type NavBlockProps } from 'components/propTypes'
import { usePages } from 'context/pages'
import IcoMoonIcon from '../IcoMoonIcon'
import { Icons as EnumsIcon } from '../../../../enumsIcon'

export type TNavvyPage = {
	// eslint-disable-next-line react/no-unused-prop-types
	id?: number
	title: string
	url: string
	children: [NavPage]
	currentPageId: number
	targetAncestorId?: string
	pageId: number
	isInitiallyActive?: boolean
}

function NextLevel({
	title,
	url,
	children,
	pageId,
	currentPageId,
	targetAncestorId,
	isInitiallyActive = false,
}: TNavvyPage) {
	const [isActive, setIsActive] = useState<boolean>(isInitiallyActive)
	const [isFinalLink, setIsFinalLink] = useState<boolean>(false)
	const [{ page }] = usePages()
	const pageAncestors = page.ancestors ?? ''

	let navIds = [] as string[]
	if (pageAncestors && pageAncestors.length > 0 && pageAncestors.length > 3) {
		navIds = pageAncestors.split(',').slice(4, pageAncestors.length)
	}

	useEffect(() => {
		if (targetAncestorId) {
			// SetIsActive(currentPageId.toString() === targetAncestorId.toString())
			setIsActive(
				navIds.includes(currentPageId.toString()) || isInitiallyActive,
			)
			setIsFinalLink(navIds[navIds.length - 1] === currentPageId.toString())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPageId, targetAncestorId])

	const toggleAccordionContent = (children) => {
		if (children && children.length > 0) {
			setIsActive(!isActive)
		}
	}

	return (
		<li
			className={`left-nav-accordion__item${isActive ? ' active' : ''}${
				isFinalLink ? ' final-link' : ''
			}`}
		>
			<div className="left-nav-accordion__heading">
				<Link href={url} className="left-nav-accordion__link">
					{title}
				</Link>
				{children && children.length > 0 && navIds[0] !== pageId.toString() ? (
					<button
						type="button"
						aria-label={`Toggle - ${title}`}
						className="left-nav-accordion__opener"
						onClick={() => {
							toggleAccordionContent(children)
						}}
					>
						<IcoMoonIcon icon={EnumsIcon.ChevronDown} size={16} />
					</button>
				) : null}
			</div>

			{children && children.length > 0 && (
				<ul className="left-nav-accordion__sublist bare-list">
					{children?.map((lev2, index) => {
						return (
							<NextLevel
								// eslint-disable-next-line react/no-array-index-key
								key={index}
								id={index}
								title={lev2.title}
								url={lev2.url}
								pageId={lev2.pageId}
								currentPageId={lev2.pageId}
								targetAncestorId={targetAncestorId}
							>
								{lev2.children}
							</NextLevel>
						)
					})}
				</ul>
			)}
		</li>
	)
}

export default function LeftNavBlock({
	section,
	currentPageId,
	targetAncestorId,
}: NavBlockProps) {
	return (
		<div className="left-nav-accordion">
			<ul className="left-nav-accordion__list bare-list">
				{section && (
					<NextLevel
						isInitiallyActive
						title={section.title}
						url={section.url}
						currentPageId={currentPageId}
						pageId={section.pageId}
						targetAncestorId={targetAncestorId}
					>
						{section.children}
					</NextLevel>
				)}
			</ul>
		</div>
	)
}
