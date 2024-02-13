import React, { useState } from 'react'
import Link from 'next/link'
import { SitemapBlockProps } from '../../../components/propTypes'
import DContainer from '../Diageo/DContainer'
import Heading from './Heading'
import Icon from 'components/theme/plain/Icon'

import { HeadingLevel } from 'enums'
import alphabet from 'utilities/alphabet'
import { except } from 'utilities/functions'
import { SitemapBlockItem } from '../../propTypes'
import uniqBy from 'lodash/uniqBy'
import { scroller } from 'react-scroll'

interface IGroupData {
	id: number
	letter: string
	data: SitemapBlockItem[] | []
}

interface IAlphabetModify {
	id: number
	letter: string
	isActive: boolean
}

const getFormattedAlphabet = (
	alphabet: string[],
	disabledAlphabet: string[],
): IAlphabetModify[] => {
	return alphabet.map((item, index) => {
		return disabledAlphabet.indexOf(item) !== -1
			? ({
					id: index,
					letter: item,
					isActive: false,
			  } as IAlphabetModify)
			: ({
					id: index,
					letter: item,
					isActive: true,
			  } as IAlphabetModify)
	})
}

function Alphabet({
	alphabet,
	className,
	onClick,
	activeLetter,
}: {
	alphabet: IAlphabetModify[]
	className?: string
	onClick: (value: string) => void
	activeLetter: string
}) {
	const handleClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		value: string,
	) => {
		e.preventDefault()
		onClick(value)
	}
	return (
		<ul
			className={`alphalist bare-list text-uppercase theme-amber ${
				className ? className : className
			}`}
		>
			{alphabet.map((item) => (
				<li key={item.id}>
					<a
						className={`${activeLetter === item.letter ? 'target' : ''} ${
							!item.isActive ? 'disabled' : ''
						}`}
						href={`#${item}`}
						onClick={(e) => handleClick(e, item.letter)}
					>
						{item.letter}
					</a>
				</li>
			))}
		</ul>
	)
}

function SiteList({ siteArray }: { siteArray: SitemapBlockItem[] | [] }) {
	return (
		<ul className="site-list bare-list theme-amber">
			{siteArray && siteArray.length ? (
				<>
					{siteArray.map((item: SitemapBlockItem) => (
						<li key={item.id} className="site-list__item">
							<p className="site-list__text">{item.title}</p>
							<Link href={item.url} className="site-list__link">
								<Icon
									name="icon_arrow_right"
									size="middle"
									className="site-list__link-icon"
								/>
								{item.linktext}
							</Link>
						</li>
					))}
				</>
			) : null}
		</ul>
	)
}

export default function SitemapBlock({ title, pages }: SitemapBlockProps) {
	const [selectedLetter, setSelectedLetter] = useState<string>('')
	const uniqLetters: string[] = uniqBy(pages, 'letter').map((item) =>
		item.letter.toLowerCase(),
	)
	const groupData: IGroupData[] = uniqLetters
		.map((letter, index) => {
			const page = pages.filter((page, index) => {
				if (page.letter.toLowerCase() === letter.toLowerCase()) {
					return {
						id: index,
						page,
					}
				}
			})
			return {
				id: index,
				letter,
				data: page,
			}
		})
		.sort((a, b) => a.letter.localeCompare(b.letter))

	const updatedAlphabet = [...new Set([...alphabet, ...uniqLetters])]

	const disabledLetters = (): string[] | [] => {
		const data = except(alphabet, uniqLetters)
			.map((item) => (alphabet.indexOf(item) !== -1 ? item : null))
			.filter((item) => item)

		return data || []
	}

	function handleClick(value: string) {
		setSelectedLetter(value)
		scroller.scrollTo(`#${value}`, {
			offset: -100,
			duration: 800,
			delay: 0,
			smooth: 'easeInOutQuad',
		})
	}

	return (
		<section className="block-sitemap">
			<DContainer containerWidth="middle" className="block-sitemap__container">
				{title && title.length > 0 && (
					<Heading
						heading={title}
						headingLevel={HeadingLevel.H1}
						className="block-sitemap__title"
					/>
				)}
				<Alphabet
					alphabet={getFormattedAlphabet(updatedAlphabet, disabledLetters())}
					onClick={handleClick}
					className="block-sitemap__alphalist"
					activeLetter={selectedLetter}
				/>
				<div className="sitemap">
					{groupData && groupData.length ? (
						<>
							{groupData.map((item: IGroupData) => (
								<div
									key={item.id}
									className="sitemap__item"
									id={`#${item.letter}`}
								>
									<Heading
										heading={item.letter}
										headingLevel={HeadingLevel.H2}
										className="sitemap__title text-uppercase"
									/>
									<SiteList siteArray={item.data} />
								</div>
							))}
						</>
					) : null}
				</div>
			</DContainer>
		</section>
	)
}
