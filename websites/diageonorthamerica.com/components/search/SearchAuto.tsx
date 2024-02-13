import React, { useState, useEffect } from 'react'
import { MiniPage } from 'types'
import { fetchSearchResultsDocType } from 'lib/cms/api'
import Link from 'next/link'

export default function SearchAuto() {
	const [query, setQuery] = useState('')
	const [active, setActive] = useState(false)
	const [results, setResults] = useState<MiniPage[]>([])

	useEffect(() => {
		if (query.length) {
			// fetchSearchResultsPressReleases(query).then((ressy) => {
			//   setResults(ressy as MiniPage[])
			// })
			fetchSearchResultsDocType('brandPage', query, 100).then((ressy) => {
				setResults(ressy as MiniPage[])
			})
		} else {
			setResults([])
		}
	}, [query])

	const onChange = (event) => {
		setQuery(event.target.value)
	}

	const onFocus = () => {
		setActive(true)
		//window.addEventListener('click', onClick)
	}

	return (
		<section className="promo-content">
			<div className="container">
				<ul>
					<li>This search form brings back results as you type</li>
					<li>
						{' '}
						<span className="search-icon"></span>
						<input
							type="text"
							placeholder="Search"
							onChange={onChange}
							onFocus={onFocus}
							value={query}
						/>
						<input type="submit" value="Search" />
					</li>
					<li>
						{' '}
						{active &&
							results &&
							results.length > 0 &&
							results.map((value, i) => {
								return (
									<div key={i}>
										<Link href={value.url}>{value.title}</Link>
										<p>
											{value.metaDescription} {value.articleDate}
										</p>
										{value.pageListingImage && (
											<img
												src={value.pageListingImage.url}
												alt="addsa"
												width="400"
												height="auto"
											/>
										)}
									</div>
								)
							})}
					</li>
				</ul>
			</div>
		</section>
	)
}
