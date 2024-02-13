import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Icons as EnumsIcon } from '../../../enumsIcon'
import IcoMoonIcon from '../plain/IcoMoonIcon'
import { NavPage } from 'types'
import { AccordionNavLinksBlockProps } from '../../propTypes'
import cn from 'classnames'

type SubMenuLevelType = 1 | 2 | 3

const getClassBySubMenuLevel = (level: SubMenuLevelType) => {
	return cn({
		'first-level': level === 1,
		'second-level': level === 2,
		'third-level': level === 3,
	})
}

const AsideHeading = ({
	url,
	title,
	level,
	hasToggler,
	toggleClick,
}: {
	url: string
	title: string
	level: SubMenuLevelType
	hasToggler: boolean
	toggleClick?: () => void
}) => {
	const handleClick = () => {
		if (toggleClick) toggleClick()
	}
	return (
		<div className="accordion-nav-links__heading">
			<Link
				href={url}
				className={`accordion-nav-links__link font-semibold ${getClassBySubMenuLevel(
					level,
				)}`}
			>
				{title}
			</Link>
			{hasToggler && (
				<button
					aria-label={`Toggle - ${title}`}
					className="accordion-nav-links__opener"
					onClick={() => handleClick()}
				>
					<IcoMoonIcon icon={EnumsIcon.ChevronDown} size={16} />
				</button>
			)}
		</div>
	)
}

const expanded = (items: NavPage[]): NavPage[] => {
	const array = items
	for (let i = 0; i < array.length; i++) {
		if (array[i].children.length) {
			array[i]['isExpanded'] = false
			expanded(array[i].children)
		}
	}
	return array
}

const toggleAccordion = (items: NavPage[], key): NavPage[] => {
	const array = items
	for (let i = 0; i < array.length; i++) {
		if (array[i].children.length) {
			if (array[i]['key'] !== key) {
				toggleAccordion(array[i].children, key)
			} else {
				array[i]['isExpanded'] = !array[i]['isExpanded']
			}
		}
	}
	return array
}

function AccordionNavLinksBlock({ links }: AccordionNavLinksBlockProps) {
	const [navigation, setNavigation] = useState<NavPage[]>([])

	useEffect(() => {
		setNavigation([...expanded(links)])
	}, [links])

	const onToggleClick = (key) => {
		setNavigation([...toggleAccordion(navigation, key)])
	}

	return (
		<div className="accordion-nav-links theme-amber">
			{navigation && navigation.length && (
				<ul className="accordion-nav-links__list bare-list">
					{navigation.map((firstLevel) => (
						<li
							key={firstLevel.key}
							className={`accordion-nav-links__item first-level ${
								firstLevel.isExpanded ? 'active' : ''
							}`}
						>
							<AsideHeading
								url={firstLevel.url}
								title={firstLevel.title}
								level={1}
								hasToggler={firstLevel.children.length > 0}
								toggleClick={() => onToggleClick(firstLevel.key)}
							/>
							{firstLevel.children && firstLevel.children.length ? (
								<ul
									className={`accordion-nav-links__sublist first-level bare-list ${
										firstLevel.isExpanded ? 'open' : ''
									}`}
								>
									{firstLevel.children.map((secondLevel) => (
										<li
											key={secondLevel.key}
											className={`accordion-nav-links__item second-level ${
												secondLevel.isExpanded ? 'active' : ''
											}`}
										>
											<AsideHeading
												url={secondLevel.url}
												title={secondLevel.title}
												level={2}
												hasToggler={secondLevel.children.length > 0}
												toggleClick={() => onToggleClick(secondLevel.key)}
											/>
											{secondLevel.children && secondLevel.children.length ? (
												<ul
													className={`accordion-nav-links__sublist second-level bare-list ${
														secondLevel.isExpanded ? 'open' : ''
													}`}
												>
													{secondLevel.children.map((thirdLevel) => (
														<li
															key={thirdLevel.key}
															className={`accordion-nav-links__item third-level ${
																thirdLevel.isExpanded ? 'active' : ''
															}`}
														>
															<AsideHeading
																url={thirdLevel.url}
																title={thirdLevel.title}
																level={3}
																hasToggler={thirdLevel.children.length > 0}
																toggleClick={() =>
																	onToggleClick(thirdLevel.key)
																}
															/>
														</li>
													))}
												</ul>
											) : null}
										</li>
									))}
								</ul>
							) : null}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default AccordionNavLinksBlock
